<!-- .\src\lib\components\Carousel.svelte -->
<script lang="ts">
    import { writable } from 'svelte/store';
    import ChevronLeft from 'lucide-svelte/icons/chevron-left';
    import ChevronRight from 'lucide-svelte/icons/chevron-right';
  
    export let images: string[] = [];
    let currentIndex = writable(0);
  
    const next = () => {
      currentIndex.update(n => (n + 1) % images.length);
    };
  
    const prev = () => {
      currentIndex.update(n => (n - 1 + images.length) % images.length);
    };
  </script>
  
  <style>
    .carousel {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
  
    .carousel-images {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }
  
    .carousel-image {
      min-width: 100%;
      transition: opacity 0.5s ease-in-out;
    }
  
    .carousel-controls {
      position: absolute;
      top: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
    }
  
    .carousel-button {
      background: rgba(0, 0, 0, 0.5);
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
    }
  </style>
  
  <div class="carousel">
    <div class="carousel-images" style="transform: translateX({-$currentIndex * 100}%)">
      {#each images as image (image)}
        <img src={image} alt="carousel image" class="carousel-image" />
      {/each}
    </div>
    <div class="carousel-controls">
      <button class="carousel-button" on:click={prev}>
        <ChevronLeft class="h-5 w-5" />
      </button>
      <button class="carousel-button" on:click={next}>
        <ChevronRight class="h-5 w-5" />
      </button>
    </div>
  </div>
  