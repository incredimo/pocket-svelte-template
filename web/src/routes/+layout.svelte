<script lang="ts">
	import { onMount } from 'svelte';
	import PageLoader from '$lib/components/PageLoader.svelte';
	import { Recycle } from 'lucide-svelte';
	import Header from '$lib/components/Header.svelte';
	import './styles.css';
	import '../app.css';

	import { Toaster } from 'svelte-sonner';
    import { client } from '$lib/pocketbase';

	let signupAllowed =  $state(false);

	onMount(async () => {
		const { allowSignUp } = await client.settings.getAll();
		signupAllowed = allowSignUp;
	});
</script>

<div class="app">
	<Header  />
	<Toaster />
	<PageLoader>
		<main class="w-full flex-auto">
			<slot />	
		</main>
	</PageLoader>

	<footer class="bg-white py-8">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
			<div class="flex items-center space-x-2">
				<Recycle class="h-6 w-6 text-green-600" />
				<span class="text-lg font-semibold text-gray-800">ecoscrap.ae</span>
			</div>
			<div class="flex space-x-4">
				<a href="/privacy" class="text-gray-600 hover:text-green-600">Privacy Policy</a>
				<a href="/terms" class="text-gray-600 hover:text-green-600">Terms of Service</a>
				<a href="/contact" class="text-gray-600 hover:text-green-600">Contact</a>
			</div>
		</div>
		<div class="mx-auto mt-8 max-w-7xl text-center text-sm text-gray-600">
			&copy; {new Date().getFullYear()} Ecoscrap.ae. All rights reserved.
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>