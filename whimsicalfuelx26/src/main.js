import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import { watch } from 'vue';
import vuetifySetup from './plugins/vuetifySetup';
import { useAuthenticationPiniaStore } from './stores/authenticationPiniaStore.js';
import './style.css';

const app = createApp(App);
app.use(createPinia());
app.use(vuetifySetup);
app.use(router);

const authenticationPiniaStore = useAuthenticationPiniaStore();
authenticationPiniaStore.trackAuthenticationState();

const unwatch = watch(
    () => authenticationPiniaStore.isAuthenticationReady,
    (isAuthenticationReady) => {
        if(isAuthenticationReady) {
            app.mount('#app');
            unwatch();
        }
    }
);