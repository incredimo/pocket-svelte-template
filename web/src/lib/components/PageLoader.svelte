<!-- .\src\lib\components\PageLoader.svelte -->
<script lang="ts">

	import { beforeNavigate, onNavigate } from '$app/navigation';
	import ProgressTopbar from './ProgressTopbar.svelte';

	beforeNavigate(({ from, to }) => {
		try {
			if (from?.route.id == to?.route.id) {
				key = Math.random();
				window.scroll({ top: 0 });
			}
		} catch (error) {
			console.log(error);
		}
	});

	onNavigate(async (navigation) => {
		if (!(document as any)['startViewTransition']) {
			return;
		}

		return new Promise((oldStateCaptureResolve) => {
			(document as any)['startViewTransition'](async () => {
				oldStateCaptureResolve();
				await navigation.complete;
			});
		});
	});

	let key = Math.random();
</script>

<ProgressTopbar />

{#key key}
	<slot />
{/key}

<style>
</style>
