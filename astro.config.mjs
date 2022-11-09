import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";
import preact from '@astrojs/preact';

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), astroImageTools, mdx()],
  site: "https://www.nateglenn.com",
});
