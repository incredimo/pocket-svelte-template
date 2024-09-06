<script lang="ts">
	import { onDestroy } from "svelte";

	import Alerts, { alerts } from "$lib/components/Alerts.svelte";
	import { page } from '$app/stores';
	import { Box, LayoutDashboardIcon, Recycle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import UserNav from '$lib/components/UserNav.svelte';
    import { authModel, client } from "$lib/pocketbase";

	const unsubscribe = client.authStore.onChange((token:any, model:any) => {
		if (model) {
			const { name, username } = model;
			alerts.success(`Signed in as ${name || username || "Admin"}`, 5000);
		} else {
			alerts.success(`Signed out`, 5000);
		}
	}, false);

	onDestroy(() => {
		unsubscribe();
	});
</script>

<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 transition-colors duration-300 ease-in-out shadow-md z-50">
	<nav class="hidden md:flex flex-col md:flex-row items-center gap-6 text-lg font-small md:gap-5 md:text-sm lg:gap-6">
		<a href="/" class="flex items-center gap-2 text-md font-semibold md:text-base transition-colors duration-300 ease-in-out hover:no-underline">
			<Recycle class="h-6 w-6 text-green-600" />
			<span class="text-green-600 no-underline hover:no-underline">EcoScrap</span>
		</a>
		{#if !$authModel}
			<a href="/" class="px-3 no-underline font-light text-stone-800 rounded-xl py-2 text-sm duration-300 ease-in-out hover:no-underline">
				Home
			</a>
			<a href="/about_us" class="px-3 no-underline font-light text-stone-800 rounded-xl py-2 text-sm duration-300 ease-in-out hover:no-underline">
				About Us
			</a>
		{/if}
		{#if $authModel}
			<a href="/listings/search" class="flex items-center gap-2 px-3 no-underline font-light text-stone-800 rounded-xl py-2 text-sm duration-300 ease-in-out hover:no-underline">
				<Box class="h-5 w-5" />
				Explore
			</a>
			<a href="/account/dashboard" class="flex items-center gap-2 px-3 no-underline font-light text-stone-800 rounded-xl py-2 text-sm duration-300 ease-in-out hover:no-underline">
				<LayoutDashboardIcon class="h-5 w-5" />
				Dashboard
			</a>
		{/if}
	</nav>

	<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
		<div class="flex-1 flex justify-end" />
		{#if $authModel}
			<Button size="sm" href="/listings/create" class="flex items-center gap-2 px-3 rounded-xl py-2 text-sm duration-300 ease-in-out hover:no-underline">
				<Recycle class="h-5 w-5" />
				Sell Scrap
			</Button>
		{/if}
		<UserNav />
	</div>
</header>

<style>
	header {
		transition: background-color 0.3s ease;
	}
	nav a {
		transition: color 0.3s ease;
		white-space: nowrap;
	}
</style>