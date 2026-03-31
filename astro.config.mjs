import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.forwardfamilymedicine.com',
  base: '/',
  integrations: [sitemap()],
  vite: {
    server: {
      host: true,
      allowedHosts: process.env.VITE_ALLOWED_HOSTS ? process.env.VITE_ALLOWED_HOSTS.split(',') : [],
    },
  },
});
