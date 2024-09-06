import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    alias: {
      $lib: "src/lib",
      $components: "src/components",
      $styles: "src/styles",
      $stores: "src/stores",
      $utils: "src/utils",
      $ui: "src/components/ui"

    },
    adapter: adapter({
      // Prerendering turned off. Turn it on if you know what you're doing.
      prerender: { entries: [] },
      fallback: "index.html", // enable SPA mode
    }),
  },
};

export default config;
