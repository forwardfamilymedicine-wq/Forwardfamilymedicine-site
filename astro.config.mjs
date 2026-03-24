import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://forwardfamilymedicine.com',
  integrations: [sitemap()],
  vite: {
    server: {
      host: true,
      allowedHosts: 'all',
    },
  },
});