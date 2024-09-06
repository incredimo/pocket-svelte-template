<!-- .\src\lib\components\ListingDetails.svelte -->
<script lang="ts">
    import { extractDate } from '$lib/utils';
    import * as Card from '$lib/components/ui/card/index.js';
    import type { Listing } from '$lib/types';
	import { onMount } from 'svelte';
	import { user_store } from '$lib/stores/user.store';
	import { pb } from '$lib/pocketbase';
	import JsonBlock from './JsonBlock.svelte';
  
    export let listing: Listing | null = null;

    let user = $user_store;
    let showOfferForm = false;

    onMount(async () => {
      //check if the listing user is the same as the logged in user
      //if it is, show the list of offers
      //if it is not, show the offer form
      if (!listing) return;
      if (listing.user.id ==null ) {
        alert('Listing user is null');
      }
      if (user && listing && user.id === listing.user_id) {
        console.log(user);
        console.log('User is the same as listing user');
        getOffers();
      } else {
        console.log(user);
        console.log('User is not the same as listing user');
        showOfferForm = true;
      }
      
	});

    async function getOffers() {
       const response = await pb.collection('offers').getFullList(100,{ 
        sort: '-created',
        filter: 'listing_id = ' + listing?.id,
        expand: 'created_by'
      });
      console.log(response);


    }

  </script>
  
  <Card.Root class="col-span-2 lg:col-span-6">
    <Card.Header class="px-7">
      <Card.Title>Details</Card.Title>
    </Card.Header>
    <Card.Content>
      {#if listing}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>Main Category: {listing.expand?.category?.name || 'No category'}</div>
          <div>Tags: {listing.expand?.tags?.length ? listing.expand.tags.map(tag => tag.name).join(', ') : 'No tags'}</div>
          <div>Quantity: {listing.qty}</div>
          <div>Unit: {listing.expand?.unit?.short_text || 'No unit'}</div>
          <div>Scrap Assessment: Buyer</div>
          <div>Transport/Collection: Buyer</div>
          <div>Payment: Card</div>
          <div>Creator Verification: Verified</div>
          <div>Location: {listing.expand?.location?.short_text || 'No location'}</div>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
  
<div class="col-span-6" 
>
<JsonBlock data={listing} /></div>