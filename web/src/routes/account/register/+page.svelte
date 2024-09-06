<!-- .\src\routes\account\register\+page.svelte -->
<script lang="ts">
	import { client } from '$lib/pocketbase';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Alert } from '$lib/components/ui/alert';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { toast } from 'svelte-sonner';

	const coll = client.collection("users");

	let form = {
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
		admin: false,
	};
	let errors: Record<string, string> = {};

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errors = {}; // Reset errors

		if (form.password !== form.passwordConfirm) {
			errors.passwordConfirm = 'Passwords do not match';
			toast.error(errors.passwordConfirm);
			return;
		}

		try {
			await coll.create({
				username: form.username,
				email: form.email,
				password: form.password,
				passwordConfirm: form.passwordConfirm
			});
			toast.success('Registration successful! Redirecting...');
			setTimeout(() => {
				window.location.href = '/';
			}, 1500);
		} catch (err: any) {
		 if (err?.message) {
			toast.error(err.message);
		 } else {
			toast.error('Oops! Something went wrong');
		 }
		}
	}
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Register</h1>
				<p class="text-balance text-muted-foreground">
					Fill in the details below to create a new account
				</p>
			</div>
			<form on:submit={handleSubmit} class="space-y-6">
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Username"
							bind:value={form.username}
							required
							class="border border-input"
						/>
						{#if errors.username}
							<Alert variant="destructive">{errors.username}</Alert>
						{/if}
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Email"
							bind:value={form.email}
							required
							class="border border-input"
						/>
						{#if errors.email}
							<Alert variant="destructive">{errors.email}</Alert>
						{/if}
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Password"
							bind:value={form.password}
							required
							class="border border-input"
						/>
						{#if errors.password}
							<Alert variant="destructive">{errors.password}</Alert>
						{/if}
					</div>
					<div class="grid gap-2">
						<Label for="passwordConfirm">Confirm Password</Label>
						<Input
							id="passwordConfirm"
							type="password"
							placeholder="Confirm Password"
							bind:value={form.passwordConfirm}
							required
							class="border border-input"
						/>
						{#if errors.passwordConfirm}
							<Alert variant="destructive">{errors.passwordConfirm}</Alert>
						{/if}
					</div>
					<div class="flex items-center">
						<Checkbox id="admin" bind:checked={form.admin} />
						<Label for="admin">Admin</Label>
					</div>
					{#if errors.other}
						<Alert variant="destructive">{errors.other}</Alert>
					{/if}
					<Button type="submit" class="w-full">Register</Button>
					<Button variant="outline" class="w-full">Register with Google</Button>
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/account/login" class="underline">Login</a>
			</div>
		</div>
	</div>

	<div class="hidden bg-muted lg:block">
		<img
			src="/images/placeholder.svg"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
