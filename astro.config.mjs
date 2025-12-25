// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://sehwanlee.github.io",
  base: "/wiseup",
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});