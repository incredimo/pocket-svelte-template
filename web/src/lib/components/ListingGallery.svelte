<!-- .\src\lib\components\ListingGallery.svelte -->
<script lang="ts">
  import { getPhotoUrl } from '$lib/utils';
  import type { Listing } from '$lib/types';
  import * as Card from '$lib/components/ui/card/index.js';
  import { writable } from 'svelte/store';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  export let listing: Listing | null = null;
  $: images = listing?.photos?.map(photo => getPhotoUrl('listings', listing.id, photo, '800x800')) ?? [];
  
  let currentIndex = writable(0);
  
  function next() {
    currentIndex.update(n => (images.length ? (n + 1) % images.length : 0));
  }

  function prev() {
    currentIndex.update(n => (images.length ? (n - 1 + images.length) % images.length : 0));
  }

  function goToIndex(index: number) {
    currentIndex.set(index);
  }
</script>

<style>
  .carousel-image {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .carousel-images {
    display: flex;
    transition: transform 0.5s;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-top: 1px solid #e5e7eb;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .pagination-buttons {
    display: flex;
    gap: 0.5rem;
  }
</style>

<Card.Root class="col-span-2 lg:col-span-3 p-0 h-full flex flex-col justify-between ">
 <Card.Content class="p-0 m-0">

    {#if images.length > 0}
      <div class="p-2 h-full " style="transform: translateX({-$currentIndex * 100}%)">
        {#each images as image (image)}
          <img src={image} alt="carousel image" class="" />
        {/each}
      </div>
    {:else}
      <div class="p-4 text-center text-gray-500">No photos available</div>
    {/if}


    </Card.Content>
  <Card.Footer class=" justify-between p-4  m-0 bg-muted/50 border-t">
    <Button size="sm" variant="outline" on:click={prev}>
      <ChevronLeft class="h-6 w-6 m-0" />
    </Button>

      {#each Array(images.length) as _, index}
        <Button
          size="sm"
          variant={index === $currentIndex ? 'default' : 'outline'}
          on:click={() => goToIndex(index)}
        >
          {index + 1}
        </Button>
      {/each}

    <Button size="sm" variant="outline" on:click={next}>
      <ChevronRight class="h-6 w-6 m-0" />
    </Button>
  </Card.Footer>
</Card.Root>
