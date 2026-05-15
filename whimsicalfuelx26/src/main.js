import { createApp } from 'vue';
import './style.css';
import router from './router';
import App from './App.vue'
import vuetifySetup from './plugins/vuetifySetup';

createApp(App).use(vuetifySetup).use(router).mount('#app');