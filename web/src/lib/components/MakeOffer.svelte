<!-- .\src\lib\components\MakeOffer.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import PocketBase from 'pocketbase';
	import type { Listing } from '$lib/types';
	import { extractDate } from '$lib/utils';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Content } from './ui/select';
	import { pb } from '$lib/pocketbase';
	import { Truck } from 'lucide-svelte';
	export let listing: Listing | null = null;
	export let offerUnitPrice: number = 0;
	export let offerQuantity: number = 0;
	
	let open = false;


	
	const postOffer = async () => {
		
   
	  const data = {
		status: 'created',
		offer_terms: '',
		listed_price: listing?.price || 0,
		listed_qty: listing?.qty || 0,
		offer_price: offerUnitPrice,
		offer_qty: offerQuantity,
		remarks: '',
		listing: listing?.id || ''
	  };
  
	  try {
		const record = await pb.collection('offers').create(data);
		console.log('Offer created:', record);
		
	  } catch (error) {
		console.error('Error creating offer:', error);
		alert('Failed to create offer.');
	  }
	};

	const closeModal = () => {
		open = false;
	};


  
 
  </script>
  
  <Dialog.Root   open={open} >
	<Dialog.Trigger >
	  <Button size="sm" variant="outline" class="h-8 gap-1"  on:click={() => open = true}>
		<Truck class="h-3.5 w-3.5" />
		<span class="ml-2 xl:whitespace-nowrap">Make Offer</span>
	  </Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
	  <Dialog.Header>
		<Dialog.Title>Make an Offer</Dialog.Title>
		<Dialog.Description>
		  Offer the seller a price for the listing.
		</Dialog.Description>
	  </Dialog.Header>
 
		<Table.Root>
		  <Table.Header>
			<Table.Row>
			  <Table.Head>Offer Unit Price</Table.Head>
			  <Table.Head>Offer Quantity</Table.Head>
			</Table.Row>
		  </Table.Header>
		  <Table.Body>
			<Table.Row>
			  <Table.Cell>
				<Label for="offerUnitPrice" class="sr-only">Offer Unit Price</Label>
				<Input id="offerUnitPrice" type="number" bind:value={offerUnitPrice} min={listing?.price * 0.9} />
			  </Table.Cell>
			  <Table.Cell>
				<Label for="offerQuantity" class="sr-only">Offer Quantity</Label>
				<Input id="offerQuantity" type="number" bind:value={offerQuantity} min={1} max={listing?.qty} />
			  </Table.Cell>
			</Table.Row>
		  </Table.Body>
		</Table.Root>
		<div class="text-center font-semibold mt-4">Order Summary</div>
		<div class="grid grid-cols-2 items-center gap-4">
		  <Label>Offer Subtotal:</Label>
		  <div>{offerUnitPrice * offerQuantity} AED</div>
		</div>
		<div class="grid grid-cols-2 items-center gap-4">
		  <Label>Transaction Charges:</Label>
		  <div>00 AED</div>
		</div>
		<div class="grid grid-cols-2 items-center gap-4">
		  <Label>Transportation:</Label>
		  <div>00 AED</div>
		</div>
		<div class="grid grid-cols-2 items-center gap-4 font-bold">
		  <Label>Total:</Label>
		  <div>{offerUnitPrice * offerQuantity} AED</div>
		</div>
		<div class="text-xs text-gray-500 mt-2">Your offer is binding and can't be changed once submitted. Offer amount to be paid after seller confirmation.</div>


		  <Button on:click={postOffer} class="bg-blue-500 text-white">Make Offer</Button>
		  <Button on:click={closeModal} variant="outline"> Cancel</Button>

	</Dialog.Content>
  </Dialog.Root>
  