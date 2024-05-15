import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 4000 },
  plugins: [VueRouter(), Vue(), VueDevTools(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
