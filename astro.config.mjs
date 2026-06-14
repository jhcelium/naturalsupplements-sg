import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://naturalsupplements.neoi.jp",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
