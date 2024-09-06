import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import fs from "fs";
import path from "path";

// detect if we're running inside docker and set the backend accordingly
const pocketbase_url = fs.existsSync("/.dockerenv")
  ? "http://server:8090" // docker-to-docker
  : "http://127.0.0.1:8090"; // localhost-to-localhost

const config: UserConfig = {
  plugins: [sveltekit()],
  server: {
    proxy: {
      // proxy "/api" and "/_" to pocketbase_url
      "/api": pocketbase_url,
      "/_": pocketbase_url,
    },
  },
  resolve: {
    alias: {
      $components: path.resolve("/src/lib/components"),
      $lib: path.resolve("/src/lib"),
      $stores: path.resolve("/src/lib/stores"),
      $utils: path.resolve("/src/lib/utils"),

    },
  },
};

export default config;
