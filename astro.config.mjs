import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bala-ganesh-g.github.io',
  base: '/balaganesh-g-portfolio/',
  server: {
    host: true,
    allowedHosts: true,
  },
});
