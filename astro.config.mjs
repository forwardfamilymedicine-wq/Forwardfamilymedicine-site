import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://forwardfamilymedicine.com',
  base: '/Forwardfamilymedicine-site',
  integrations: [sitemap()],
  vite: {
    server: {
      host: true,
      allowedHosts: ['juliane-nonproblematic-funkily.ngrok-free.dev']
    },
  },
});