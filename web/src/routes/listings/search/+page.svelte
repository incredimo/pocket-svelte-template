<!-- .\src\routes\listings\search\+page.svelte -->
<script lang="ts">
  import { MapIcon, Calendar } from 'lucide-svelte';
  import { auth_store } from '$lib/stores/user.store';
  import { toast } from 'svelte-sonner';
  import PocketBase from 'pocketbase';
  import { writable, type Writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import ChevronLeft from 'lucide-svelte/icons/chevron-left';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';
  import ListFilter from 'lucide-svelte/icons/list-filter';
  import Search from 'lucide-svelte/icons/search';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Pagination from '$lib/components/ui/pagination/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { location_store, category_store, tag_store } from '$lib/stores/common.store';
  import type { Location, Listing, Category, Tag } from '$lib/types.d';
  import * as Select from '$lib/components/ui/select/index.js';
  import { extractDate, getImageUrl } from '$lib/utils';
  import ListingTile from '$lib/components/ListingTile.svelte';
  import * as Table from '$lib/components/ui/table/index.js';

  const selectedLocations: Writable<string[]> = writable([]);
  const selectedCategories: Writable<string[]> = writable([]);
  const selectedTags: Writable<string[]> = writable([]);
  export let listings: Listing[] = [];
  export let totalPages: number = 1;
  export let currentPage: number = 1;
  let currentView: 'card' | 'table' = 'card';

  let search = '';
  let minPrice = '';
  let maxPrice = '';

  $: query = [
    `created >= "2022-01-01 00:00:00"`,
    search ? `title~"${search}"` : null,
    $selectedLocations.length ? `location.short_text in [${$selectedLocations.map(loc => `"${loc}"`).join(', ')}]` : null,
    $selectedCategories.length ? `category.name in [${$selectedCategories.map(cat => `"${cat}"`).join(', ')}]` : null,
    $selectedTags.length ? `tags.name in [${$selectedTags.map(tag => `"${tag}"`).join(', ')}]` : null,
    minPrice ? `price >= ${minPrice}` : null,
    maxPrice ? `price <= ${maxPrice}` : null
  ].filter(Boolean).join(' && ');

  const handleSearch = async () => {
    try {
      if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        toast.error('Min price cannot be greater than max price.');
        return;
      }

      const pb = new PocketBase('https://dev.ecoscrap.ae');
      pb.authStore.loadFromCookie(document.cookie);
      const response = await pb.collection('listings').getList(currentPage, 20, {
        filter: query,
        expand: 'attachments,tags,location,category',
      });
      listings = response?.items ?? [];
      totalPages = response?.totalPages ?? 1;
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to fetch listings.');
    }
  };

  const handlePageChange = async (event: CustomEvent<number>) => {
    currentPage = event.detail;
    await handleSearch();
  };

  const viewDetails = async (listing: Listing) => {
    await goto(`/listings/${listing.id}`);
  };

  onMount(async () => {
    await handleSearch();
  });
</script>

<div class="flex min-h-screen w-full flex-col bg-base-200 p-5 mx-auto max-w-screen-2xl">
  <div class="flex flex-col sm:gap-4 sm:py-4">
    <main class="flex flex-1 gap-2">
      <div class="w-80 flex-shrink-0 sticky top-0 z-10 bg-base-200">
        <Card.Root class="overflow-hidden shadow-md">
          <Card.Header class="flex flex-row items-start bg-muted/50">
            <div class="grid gap-0.5">
              <Card.Title class="group flex items-center gap-2 text-lg">
                Filter & Search
              </Card.Title>
            </div>
          </Card.Header>
          <Card.Content class="p-6 text-sm">
            <div class="grid gap-3">
              <Input placeholder="Search..." bind:value={search} />

              <!-- Locations -->
              <Select.Root>
                <Select.Trigger class="w-full">
                  {#if $selectedLocations.length > 0}
                    {$selectedLocations.join(', ')}
                  {:else}
                    Select Locations
                  {/if}
                </Select.Trigger>
                <Select.Content>
                  {#each $location_store as loc}
                    <Select.Item value={loc.short_text} on:click={() => {
                      if ($selectedLocations.includes(loc?.short_text ?? '')) {
                        selectedLocations.update(n => n.filter(l => l !== loc.short_text));
                      } else {
                        selectedLocations.update(n => [...n, loc.short_text]);
                      }
                    }}>{loc.short_text}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>

              <!-- Categories -->
              <Select.Root >
                <Select.Trigger class="w-full">
                  {#if $selectedCategories.length > 0}
                    {$selectedCategories.join(', ')}
                  {:else}
                    Select Categories
                  {/if}
                </Select.Trigger>
                <Select.Content>
                  {#each $category_store as cat}
                    <Select.Item value={cat.name} on:click={() => {
                      if ($selectedCategories.includes(cat.name)) {
                        selectedCategories.update(n => n.filter(c => c !== cat.name));
                      } else {
                        selectedCategories.update(n => [...n, cat.name]);
                      }
                    }}>{cat.name}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>

              <!-- tags -->
              <Select.Root >
                <Select.Trigger class="w-full">
                  {#if $selectedTags.length > 0}
                    {$selectedTags.join(', ')}
                  {:else}
                    Select Tags
                  {/if}
                </Select.Trigger>
                <Select.Content>
                  {#each $tag_store as tag}
                    <Select.Item value={tag.name} on:click={() => {
                      if ($selectedTags.includes(tag.name)) {
                        selectedTags.update(n => n.filter(t => t !== tag.name));
                      } else {
                        selectedTags.update(n => [...n, tag.name]);
                      }
                    }}>{tag.name}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>

              <div class="grid grid-cols-2 gap-3">
                <Input placeholder="Min Price" type="number" bind:value={minPrice} />
                <Input placeholder="Max Price" type="number" bind:value={maxPrice} />
              </div>

              <Button size="sm" variant="outline" class="h-8 gap-1" on:click={handleSearch}>
                <Search class="h-3.5 w-3.5" />
                Search
              </Button>
            </div>
          </Card.Content>
          <Card.Footer class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <Pagination.Root count={totalPages} class="ml-auto mr-0 w-auto" current={currentPage} on:change={handlePageChange}>
              <Pagination.Content>
                <Pagination.Item>
                  <Button size="icon" variant="outline" class="h-6 w-6">
                    <ChevronLeft class="h-3.5 w-3.5" />
                    <span class="sr-only">Previous</span>
                  </Button>
                </Pagination.Item>
                {#each Array(totalPages) as _, index (index)}
                  <Pagination.Item>
                    <Button size="icon" variant="outline" class="h-6 w-6" on:click={() => handlePageChange({ detail: index + 1 })}>
                      {index + 1}
                    </Button>
                  </Pagination.Item>
                {/each}
                <Pagination.Item>
                  <Button size="icon" variant="outline" class="h-6 w-6">
                    <ChevronRight class="h-3.5 w-3.5" />
                    <span class="sr-only">Next</span>
                  </Button>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination.Root>
          </Card.Footer>
        </Card.Root>
      </div>

      <div class="flex-1 auto-rows-max items-start">
        <Tabs.Root value="market">
          <div class="flex items-center">
            <Tabs.List class="shadow-md">
              <Tabs.Trigger value="market">Listings</Tabs.Trigger>
            </Tabs.List>
          </div>

          <!-- listings view -->
          <Tabs.Content value="market">
            {#if currentView === 'card'}
            <div class="grid gap-6 mt-5" style="grid-template-columns: repeat(auto-fit, minmax(200px, 300px));">
              {#each listings as listing (listing?.id?.toUpperCase())}
                <div>
                  <ListingTile listing={listing} onClick={viewDetails} />
                </div>
              {/each}
            </div>
            {:else}
              <Table.Root class="mt-10">
                <Table.Head>
                  <Table.Row>
                    <Table.Cell>Title</Table.Cell>
                    <Table.Cell>Quantity</Table.Cell>
                    <Table.Cell>Price</Table.Cell>
                    <Table.Cell>Status</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {#each listings as listing}
                    <Table.Row on:click={() => viewDetails(listing)} class="cursor-pointer">
                      <Table.Cell>{listing.title}</Table.Cell>
                      <Table.Cell>{listing.qty} {listing.unit}</Table.Cell>
                      <Table.Cell>${listing.price}/{listing.unit}</Table.Cell>
                      <Table.Cell>{listing.status}</Table.Cell>
                    </Table.Row>
                  {/each}
                </Table.Body>
              </Table.Root>
            {/if}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  </div>
</div>

<style>
  @media (max-width: 767px) {
    .md\:grid-cols-12 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .md\:col-span-3 {
      grid-column: span 1 / span 1;
    }

    .md\:col-span-9 {
      grid-column: span 1 / span 1;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .md\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .md\:col-span-3 {
      grid-column: span 3 / span 3;
    }

    .md\:col-span-9 {
      grid-column: span 9 / span 9;
    }
  }

  @media (min-width: 1024px) {
    .md\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .md\:col-span-3 {
      grid-column: span 3 / span 3;
    }

    .md\:col-span-9 {
      grid-column: span 9 / span 9;
    }
  }
</style>
