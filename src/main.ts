import '@unocss/reset/tailwind-compat.css';
import 'uno.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
