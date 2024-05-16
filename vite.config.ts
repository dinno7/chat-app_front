import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 4000 },
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
      extendRoute(route) {
        if (!['/:path(.*)', '/'].includes(route.path)) route.addAlias(`${route.path}.html`);
        if (route.path === '/') route.addAlias(['/home', '/home.html', '/index', '/index.html']);
      },
    }),
    Vue(),
    VueDevTools(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
