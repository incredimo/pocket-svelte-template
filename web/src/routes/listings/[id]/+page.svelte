<!-- .\src\routes\listings\[id]\+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import PocketBase from 'pocketbase';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { Listing } from '$lib/types';
	import ListingSummary from '$lib/components/ListingSummary.svelte';
	import ListingGallery from '$lib/components/ListingGallery.svelte';
	import ListingDetails from '$lib/components/ListingDetails.svelte';
	import MakeOffer from '$lib/components/MakeOffer.svelte';
	import { getPhotoUrl } from '$lib/utils';
	import { pb } from '$lib/pocketbase';

	let listingId: string;
	let listing: Listing | null = null;
	let loading = true;
	let showModal = false;
	let offerUnitPrice = 0;
	let offerQuantity = 0;

	onMount(async () => {
		const params = get(page).params;
		listingId = params.id;
		await fetchListingDetails();
	});

	const fetchListingDetails = async () => {
		try {
			const response = await pb
				.collection('listings')
				.getOne(listingId, { expand: 'attachments,tags,location,unit,category' });
			listing = response;
			offerUnitPrice = listing?.price || 0;
			offerQuantity = listing?.qty || 0;
			loading = false;
		} catch (error) {
			console.error('Error fetching listing details:', error);
		}
	};
</script>

<div class="min-h-screen bg-muted/40">
	<div class="flex flex-col p-10 py-4">
		<main class="grid grid-cols-2 gap-5 lg:grid-cols-6">
			<ListingSummary {listing} />
			<ListingGallery {listing} />
			<ListingDetails {listing} />
		</main>
	</div>

	<!-- Offer Modal -->
</div>
