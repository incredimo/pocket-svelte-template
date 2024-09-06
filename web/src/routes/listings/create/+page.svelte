<!-- .\src\routes\listings\create\+page.svelte -->
<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { formSchema, type FormSchema } from "./schema";
	import { createForm } from "sveltekit-superforms/client";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { category_store, location_store, listing_preferences_store } from '$lib/stores/common.store';
	import TagsInput from '$lib/components/tags_input.svelte';
	import { Select } from '$lib/components/ui/select';
	import PocketBase from 'pocketbase';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
  
	const pb = new PocketBase('https://dev.ecoscrap.ae');
  
	const form = createForm({
	  schema: formSchema,
	  validators: zodClient(formSchema),
	  defaultValues: {
		title: '',
		description: '',
		address: '',
		qty: 0,
		tags: [],
		location: null,
		preferences: [],
		unit: null,
		category: null
	  }
	});
  
	const { form: formData, enhance, handleSubmit, setValue, errors } = form;
  
	let attachments: File[] = [];
	let fileInput: HTMLInputElement;
  
	async function onSubmit(values: z.infer<typeof formSchema>) {
	  try {
		toast.loading('Creating Lot...');
		const formData = new FormData();
  
		formData.append('title', values.title);
		formData.append('description', values.description);
		formData.append('address', values.address);
		formData.append('tags', JSON.stringify(values.tags || []));
		formData.append('location', JSON.stringify(values.location || {}));
		formData.append('preferences', JSON.stringify(values.preferences || []));
		formData.append('unit', JSON.stringify(values.unit || {}));
		formData.append('category', JSON.stringify(values.category || {}));
		formData.append('qty', values.qty.toString());
  
		attachments.forEach((attachment) => {
		  formData.append('photos', attachment);
		});
  
		const response = await pb.collection('listings').create(formData);
  
		if (response) {
		  toast.success('Listing created successfully');
		  goto('/listings');
		}
	  } catch (error) {
		console.error('Error posting listing:', error);
		toast.error('An unexpected error occurred');
	  }
	}
  
	function handleFileChange(event: Event) {
	  const files = (event.target as HTMLInputElement).files;
	  if (files) {
		attachments = [...attachments, ...files];
	  }
	}
  
	function handleTagsUpdate(event: CustomEvent<{ tags: Tag[] }>) {
	  setValue('tags', event.detail.tags);
	}
  </script>
  
  <form method="POST" use:enhance on:submit|preventDefault={handleSubmit(onSubmit)}>
	<Form.Field {form} name="title">
	  <Form.Control let:attrs>
		<Form.Label>Title</Form.Label>
		<Input {...attrs} bind:value={$formData.title} />
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<Form.Field {form} name="description">
	  <Form.Control let:attrs>
		<Form.Label>Description</Form.Label>
		<Textarea {...attrs} bind:value={$formData.description} />
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<Form.Field {form} name="address">
	  <Form.Control let:attrs>
		<Form.Label>Address</Form.Label>
		<Textarea {...attrs} bind:value={$formData.address} />
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<Form.Field {form} name="category">
	  <Form.Control let:attrs>
		<Form.Label>Category</Form.Label>
		<Select {...attrs} bind:selected={$formData.category}>
		  <Select.Trigger class="w-full">
			<Select.Value placeholder="Select category" />
		  </Select.Trigger>
		  <Select.Content>
			<Select.Group>
			  {#each $category_store as category}
				<Select.Item label={category.name} value={category} />
			  {/each}
			</Select.Group>
		  </Select.Content>
		</Select>
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<Form.Field {form} name="tags">
	  <Form.Control let:attrs>
		<Form.Label>Tags</Form.Label>
		<TagsInput {...attrs} label={(x) => x?.name ?? ''} on:update={handleTagsUpdate} />
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<Form.Field {form} name="location">
	  <Form.Control let:attrs>
		<Form.Label>City</Form.Label>
		<Select {...attrs} bind:selected={$formData.location}>
		  <Select.Trigger class="w-full">
			<Select.Value placeholder="Select city" />
		  </Select.Trigger>
		  <Select.Content>
			<Select.Group>
			  {#each $location_store as city}
				<Select.Item label={city.short_text} value={city} />
			  {/each}
			</Select.Group>
		  </Select.Content>
		</Select>
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<Form.Field {form} name="preferences">
	  <Form.Control let:attrs>
		<Form.Label>Inspection Preference</Form.Label>
		<Select {...attrs} bind:selected={$formData.preferences} multiple>
		  <Select.Trigger class="w-full">
			<Select.Value placeholder="Select preferences" />
		  </Select.Trigger>
		  <Select.Content>
			<Select.Group>
			  {#each $listing_preferences_store as preference}
				<Select.Item value={preference} label={preference.short_text} />
			  {/each}
			</Select.Group>
		  </Select.Content>
		  <Select.Input />
		</Select>
	  </Form.Control>
	  <Form.Description />
	  <Form.FieldErrors />
	</Form.Field>
  
	<!-- Images section -->
	<Form.Field>
	  <Form.Label>Images</Form.Label>
	  <button on:click|preventDefault={() => fileInput.click()}>
		<img
		  alt="Product"
		  class="aspect-video w-full rounded-md object-cover"
		  src={attachments[0] ? URL.createObjectURL(attachments[0]) : '/images/placeholder.svg'}
		/>
	  </button>
	  <div class="grid grid-cols-8 gap-2">
		{#each attachments.slice(1) as attachment}
		  <button on:click|preventDefault={() => attachments = attachments.filter((att) => att !== attachment)}>
			<img
			  alt="Product"
			  class="aspect-square w-full rounded-md object-cover"
			  src={attachment ? URL.createObjectURL(attachment) : '/images/placeholder.svg'}
			/>
		  </button>
		{/each}
		<button class="flex aspect-square w-full items-center justify-center rounded-md border border-dashed" on:click|preventDefault={() => fileInput.click()}>
		  <Upload class="text-muted-foreground h-4 w-4" />
		  <span class="sr-only">Upload</span>
		</button>
	  </div>
	  <input type="file" accept="image/*" multiple bind:this={fileInput} on:change={handleFileChange} class="hidden" />
	</Form.Field>
  
	<Form.Button>Submit</Form.Button>
  </form>
  