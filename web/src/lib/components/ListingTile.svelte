<!-- .\src\lib\components\ListingTile.svelte -->
<script lang="ts">
    import TagChip from './TagChip.svelte';
    import IconTag from './IconTag.svelte';
    import * as Card from './ui/card';
    import { MapIcon, Calendar } from 'lucide-svelte';
    import { extractDate, getImageUrl, truncate } from '$lib/utils';
    import type { Listing } from '$lib/types';
  
    export let listing: Listing;
    export let onClick = async (listing: Listing) => {};
    
  
    const handleOnClick = async () => {
      await onClick(listing);
    };
  </script>
  

  
  <div on:click={handleOnClick}>
    <Card.Root class="overflow-hidden m-0 cursor-pointer shadow active:shadow hover:duration-300 hover:shadow-xl duration-1000 ease-out rounded-xl">
      <Card.Header class="relative p-0">
        <img
          class="w-full h-48 object-cover"
          src={listing?.photos!= null && listing.photos.length >0  ? getImageUrl("listings", listing.id, listing.photos[0], '800x800') : '/images/placeholder.svg'}
          alt={listing.title}
        />
        <div id="tags" class="absolute bottom-0 left-0 right-0 p-2 flex flex-row gap-2">
          {#if listing?.tags}
            {#each listing.tags as tag}
              <TagChip label={tag.name} color={tag.color} />
            {/each}
          {/if}
        </div>
      </Card.Header>
      <Card.Content class="p-4">
        <Card.Title class="text-md uppercase mt-2 truncate">{listing.title}</Card.Title>
        <!-- description -->
        <Card.Description class="text-sm mt-2 truncate-2-lines">{truncate(listing?.description,80) }</Card.Description>
        <!-- qty and price -->
        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold">{listing?.qty}</span>
            <span class="text-sm text-gray-500">{listing?.unit?.value?.short_text}</span>
          </div>
          </div>
      </Card.Content>
      <Card.Footer class="flex justify-between items-center mt-4 px-4 py-2">
        <!-- location with a map icon -->
        <div class="flex items-start gap-1">
          <IconTag label={listing?.location?.value?.short_text}>
            <MapIcon />
          </IconTag>
        </div>
        <!-- date with a calendar icon -->
        <div class="flex items-start gap-1">
          <IconTag label={extractDate(listing.created)}>
            <Calendar />
          </IconTag>
        </div>
      </Card.Footer>
    </Card.Root>
  </div>
  