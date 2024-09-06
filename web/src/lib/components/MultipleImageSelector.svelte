<!-- .\src\lib\components\MultipleImageSelector.svelte -->
<script>
    import { Eraser, ImagePlusIcon } from 'lucide-svelte';
import { createEventDispatcher } from 'svelte';

    let images = [];
    let dragOver = false;
    const dispatch = createEventDispatcher();

    export let onChange = (images) => {};
    export let onAdd = (images) => { return { accepted: images, rejected: [], reason: "All files added" }; };
    export let onRemove = (image) => {};
    export let onClear = (images) => {};

    class ImageFile {
        constructor(file, url) {
            this.file = file;
            this.url = url;
        }
    }

    function internalOnChange() {
        onChange(images);
    }

    function internalOnAdd(accepted, rejected, reason) {
        let result = onAdd(accepted);
        if (result.accepted.length > 0) {
            images = images.concat(result.accepted);
            internalOnChange();
        }
        if (result.rejected.length > 0) {
            console.log(result.reason);
        }
    }

    function internalOnRemove(image) {
        images = images.filter((img) => img != image);
        onRemove(image);
        internalOnChange();
    }

    function internalOnClear() {
        onClear(images);
        images = [];
        internalOnChange();
    }

    function handleDragOver(event) {
        event.preventDefault();
        dragOver = true;
    }

    function handleDragLeave(event) {
        event.preventDefault();
        dragOver = false;
    }

    function handleDrop(event) {
        event.preventDefault();
        dragOver = false;
        let files = Array.from(event.dataTransfer.files);
        processFiles(files);
    }

    function onClickPickFiles(event) {
        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*';
        input.onchange = (event) => {
            let files = Array.from(input.files);
            processFiles(files);
        };
        input.click();
    }

    function processFiles(files) {
        let accepted = [];
        let rejected = [];
        files.forEach((file) => {
            let url = URL.createObjectURL(file);
            let image = new Image();
            image.src = url;
            image.onload = () => {
                accepted.push(new ImageFile(file, url));
                if (accepted.length + rejected.length == files.length) {
                    internalOnAdd(accepted, rejected, "All files added");
                }
            };
            image.onerror = () => {
                rejected.push(file);
                if (accepted.length + rejected.length == files.length) {
                    internalOnAdd(accepted, rejected, "All files added");
                }
            };
        });
    }
</script>

<div class="outer_frame w-full h-full flex flex-col items-center justify-center drop_zone">
    <div class="inner_frame w-full max-w-5xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-2 transition-all duration-300 ease-in-out rounded-sm"
        on:dragover={handleDragOver} on:dragleave={handleDragLeave} on:drop={handleDrop} class:drag-over={dragOver}>
  
        <div class="image_list w-full flex flex-wrap items-start justify-center mt-2">
            {#each images as image}
                <div class="image_frame w-40 h-40 m-1 relative border rounded overflow-hidden shadow-md transition-transform duration-200 ease-in-out">
                    <img class="image w-full h-full object-cover" src={image.url} alt="image" />
                    <div class="remove_button w-6 h-6  bg-red-500 flex items-center justify-center absolute top-0 right-0 cursor-pointer transition-all duration-200 ease-in-out" on:click={() => internalOnRemove(image)}>
                        <div class="text-white text-sm font-semibold">×</div>
                    </div>
                </div>
            {/each}
            <div class="add_button w-40 h-40 m-1 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ease-in-out" on:click={onClickPickFiles}>
               <ImagePlusIcon class="text-gray-500" size={40} />
            </div>
            {#if images.length>0}
            <div class="add_button w-40 h-40 m-1 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ease-in-out" on:click={onClickPickFiles}>
                <Eraser class="text-gray-500" size={40} />
             </div>
            {/if}
        </div>

        {#if images.length === 0}
        <div class=" w-full h-full flex flex-col items-center justify-center text-center p-2  transition-opacity duration-300 ease-in-out" on:click={onClickPickFiles}>
            <div class="drop_zone_text text-gray-500 text-sm font-semibold">Drag and drop images here</div>
            <div class="drop_zone_text text-gray-500 text-sm font-semibold">or</div>
            <div class="drop_zone_text text-gray-500 text-sm font-semibold">click to pick images</div>
        </div>
    {/if}
    </div>
</div>

<style>
    .outer_frame {
        transition: background-color 0.3s;
    }

    .inner_frame {
        transition: border-color 0.3s;
    }

    .drop_zone:hover {
        background-color: #f9f9f9;
    }

    .drag-over {
        background-color: #e0e0e0;
    }

    img {
        transition: transform 0.2s;
    }

    img:hover {
        transform: scale(1.05);
    }

    .remove_button:hover {
        background-color: #ff6b6b;
    }

    .clear_button:hover, .add_button:hover {
        background-color: #606060;
    }

    .image_list {
        column-count: 3;
        column-gap: 1rem;
    }

    .image_frame {
        display: inline-block;
        width: 100%;
        margin-bottom: 1rem;
        break-inside: avoid;
    }
</style>
