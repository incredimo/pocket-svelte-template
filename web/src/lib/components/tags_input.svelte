<!-- .\src\lib\components\tags_input.svelte -->
<script lang="ts">
    import { tag_store } from '$lib/stores/common.store';
    import type { Tag } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import { writable, get } from 'svelte/store';
    import { fade } from 'svelte/transition';

    export let label: (tag: Tag) => string;
    export let selectedTags: Tag[] = [];

    const inputValue = writable('');
    const suggestions = writable<Tag[]>([]);
    const dispatcher = createEventDispatcher();
    let inputElement: HTMLInputElement;
    let activeIndex = writable(-1);
    let allSelected = writable(false);

    function handleInput(event: Event) {
        const query = (event.target as HTMLInputElement).value;
        inputValue.set(query);

        const filteredTags = get(tag_store).filter(tag => 
            tag.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedTags.includes(tag)
        );
        suggestions.set(filteredTags);
        activeIndex.set(-1);
        allSelected.set(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
        const totalSuggestions = get(suggestions).length;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            activeIndex.update(n => (n + 1) % totalSuggestions);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            activeIndex.update(n => (n - 1 + totalSuggestions) % totalSuggestions);
        } else if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            const index = get(activeIndex);
            if (index >= 0 && index < totalSuggestions) {
                addTag(get(suggestions)[index]);
            } else if (totalSuggestions > 0) {
                addTag(get(suggestions)[0]);
            }
        } else if (event.key === "Backspace" && $inputValue === "") {
            event.preventDefault();
            if (get(allSelected)) {
                selectedTags = [];
            } else {
                selectedTags.pop();
            }
            dispatcher('update', { tags: selectedTags });
        } else if (event.ctrlKey && event.key === "a") {
            event.preventDefault();
            allSelected.set(true);
        }
    }

    function addTag(tag: Tag) {
        if (!selectedTags.includes(tag)) {
            selectedTags = [...selectedTags, tag];
            dispatcher('update', { tags: selectedTags });
            inputValue.set('');
            suggestions.set([]);
            activeIndex.set(-1);
        }
    }

    function removeTag(tag: Tag) {
        selectedTags = selectedTags.filter(t => t !== tag);
        dispatcher('update', { tags: selectedTags });
    }
</script>

<style>
    .tag-picker {
        position: relative;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        border: 1px solid #ccc;
        border-radius: 0.375rem;
        padding: 0.5rem;
        gap: 0.5rem;
        min-height: 40px;
    }
    .tag {
        background-color: #e0e7ff;
        color: #3730a3;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .tag:hover {
        background-color: #c7d2fe;
    }
    .tag svg {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .input {
        border: none;
        outline: none;
        flex: 1;
        min-width: 100px;
    }
    .suggestions {
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 0;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 0.375rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.5rem;
    }
    .suggestion-item {
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        border-radius: 0.375rem;
        background-color: #f8f9fa;
        transition: background-color 0.2s;
    }
    .suggestion-item:hover, .suggestion-item.active {
        background-color: #e9ecef;
    }
</style>

<div class="tag-picker" on:click={() => allSelected.set(false)}>
    {#each selectedTags as tag (tag.id)}
        <div class="tag" on:click={() => removeTag(tag)} in:fade out:fade>
            {label(tag)} 
            <svg on:click={(event) => { event.stopPropagation(); removeTag(tag); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    {/each}
    <div class="input-wrapper">
        <input
            bind:this={inputElement}
            bind:value={$inputValue}
            on:input={handleInput}
            on:keydown={handleKeyDown}
            placeholder="Type to search tags..."
            class="input"
        />
    </div>

    {#if $inputValue && $suggestions.length > 0}
        <div class="suggestions">
            {#each $suggestions as tag, index}
                <div 
                    class="suggestion-item {index === $activeIndex ? 'active' : ''}" 
                    on:click={() => addTag(tag)}
                >
                    {label(tag)}
                </div>
            {/each}
        </div>
    {/if}
</div>
