<!-- .\src\lib\components\navbar\Navbar.svelte -->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { authModel, client } from '$lib/pocketbase';
	import LoggedIn from './NavbarLoggedIn.svelte';
	import LoggedOut from './NavbarLoggedOut.svelte';
	import ToggleLightDarkMode from './ToggleLightDarkMode.svelte';

	let avatar: string | undefined;

	const unsubscribe = client.authStore.onChange((token, model) => {
		if (model) {
			avatar = model.avatar;
		} else {
			avatar = undefined;
		}
	}, false);

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="flex items-center space-x-4">
	{#if $authModel}
		{#if avatar}
			<LoggedIn {avatar} />
		{:else}
			<LoggedIn avatar={undefined} />
		{/if}
	{:else}
		<LoggedOut />
	{/if}
</div>