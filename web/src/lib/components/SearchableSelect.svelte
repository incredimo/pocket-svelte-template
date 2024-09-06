<!-- .\src\lib\components\SearchableSelect.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Check from "lucide-svelte/icons/check";
    import ChevronDown from "lucide-svelte/icons/chevron-down";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button";
    import { tick } from 'svelte';
  
    // Define a generic type T
    export let items: Array<any> = [];
    export let displayFunc: (item: any) => string = item => item.short_description ?? 'unknown';
    export let label: string = "Select an item";
    export let placeholder: string = "Search...";
    export let selected: any | null = null;
  
    let open = false;
    let value = "";
    let query = "";
  
    const dispatch = createEventDispatcher();
  

  
    function closeAndFocusTrigger(triggerId: string) {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus();
      });
    }
  
    $: filteredItems = items.filter(item => (displayFunc(item) ?? '').toLowerCase().includes(query.toLowerCase()));
  </script>
  
  <div class="grid gap-2">
    <Popover.Root bind:open let:ids>
      <Popover.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          class="w-full justify-between"

        >
          <span class="truncate">{value || label}</span>
          <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-[300px] p-0">
        <Command.Root>
          <Command.Input
            placeholder={placeholder}
            bind:value={query}
          />
          <Command.Empty>No items found.</Command.Empty>
          <Command.Group>
            {#each filteredItems as item}
              <Command.Item
                value={displayFunc(item)}
                onSelect={() => {
                  value = displayFunc(item);
                  dispatch('select', item);
                  selected = item;
                  closeAndFocusTrigger(ids.trigger);
                }}
                class="flex flex-col items-start space-y-1 px-4 py-2"
              >

                {displayFunc(item)}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  </div>
  