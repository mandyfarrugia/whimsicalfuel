import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import { watch } from 'vue';
import vuetifySetup from './plugins/vuetifySetup';
import { useAuthenticationPiniaStore } from './stores/authenticationPiniaStore.js';
import 'animate.css';
import './style.css';
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/styles";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(Toast);
app.use(vuetifySetup);
app.use(router);
app.use(SnackbarService);
app.component('vue3-snackbar', Vue3Snackbar);

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