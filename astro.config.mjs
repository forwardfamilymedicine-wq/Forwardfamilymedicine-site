import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.forwardfamilymedicine.com',
  base: '/',
  redirects: {
    '/what-to-expect': '/new-patients/',
    '/blog/dpc-vs-concierge-which-is-right': '/blog/concierge-medicine-vs-direct-primary-care',
    '/blog/dpc-vs-concierge-which-is-right/': '/blog/concierge-medicine-vs-direct-primary-care',
    '/faqs': { status: 301, destination: '/faq/' },
    '/home/': { status: 301, destination: '/' },
  },
  integrations: [sitemap({
    filter: (page) =>
      !page.endsWith('/patient-experience/') &&
      !page.endsWith('/home/') &&
      !page.endsWith('/become-a-patient/') &&
      page !== 'https://www.forwardfamilymedicine.com/home'
  })],
  vite: {
    server: {
      host: true,
      allowedHosts: process.env.VITE_ALLOWED_HOSTS ? process.env.VITE_ALLOWED_HOSTS.split(',') : [],
    },
  },
});
