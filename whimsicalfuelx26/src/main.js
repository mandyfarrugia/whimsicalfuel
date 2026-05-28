import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue'
import vuetifySetup from './plugins/vuetifySetup';

createApp(App).use(createPinia()).use(vuetifySetup).use(router).mount('#app');