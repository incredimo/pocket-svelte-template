<!-- .\src\lib\components\ListingSummary.svelte -->
<script lang="ts">
	import { MapIcon, Calendar, Copy, Truck, Bookmark } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { Listing } from '$lib/types';
	import { extractDate, isIterable } from '$lib/utils';
	import * as Card from '$lib/components/ui/card/index.js';
	import TagChip from './TagChip.svelte';
	import MakeOffer from './MakeOffer.svelte';
	export let listing: Listing | null = null;
	let showModal = false;
	let offerUnitPrice = 0;
	let offerQuantity = 0;

	const handleMakeOffer = () => {
		showModal = true;
	};

	const closeModal = () => {
		showModal = false;
	};

	const handleAgreeAndOffer = (event) => {
		const offerDetails = event.detail;
		console.log(offerDetails);
		closeModal();
	};
</script>

<Card.Root class="col-span-2 flex flex-col lg:col-span-3">
	<Card.Header class="flex flex-row items-start bg-muted/50 border-b ">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				{listing?.title}
				<Button
					size="icon"
					variant="outline"
					class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
					on:click={() => navigator.clipboard.writeText(listing?.id || '')}
				>
					<Copy class="h-3 w-3" />
					<span class="sr-only">Copy Listing ID</span>
				</Button>
			</Card.Title>
		</div>
		<div class="ml-auto flex items-center gap-1">
			<MakeOffer
				{listing}
				bind:offerUnitPrice
				bind:offerQuantity
				on:agreeAndOffer={handleAgreeAndOffer}
				on:close={closeModal}
			/>
			<Button size="sm" variant="outline" class="h-8 gap-1">
				<Bookmark class="h-3.5 w-3.5" />
			</Button>
		</div>
	</Card.Header>
	<Card.Content class="flex-1 p-6 text-sm">
		<div class="flex flex-row items-center justify-between gap-2">
			<div class="flex flex-row items-center gap-2">
				<MapIcon class="h-4 w-4 text-muted-foreground" />
				<div>{listing?.location?.short_text}</div>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Calendar class="h-4 w-4 text-muted-foreground" />
				<div>{listing ? extractDate(listing.created) : 'Loading...'}</div>
			</div>
		</div>
		<Separator class="my-2" />
		<div class="flex flex-1 flex-col">
			<div class="font-semibold">Description</div>
			<div>{listing?.description}</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-row items-end border-t bg-muted/50 px-6 py-3">
		<div class="text-xs text-muted-foreground">
			{#if listing && isIterable(listing?.tags)}

						{#each listing.tags as tag}
							<TagChip label={tag.name} />
						{/each}
			
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
