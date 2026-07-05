<script setup>
    import { useAuthenticationPiniaStore } from '../../../stores/authenticationPiniaStore';
    const authenticationPiniaStore = useAuthenticationPiniaStore();

    const props = defineProps({
        drawer: Boolean
    });

    const emit = defineEmits(['update:drawer']);

    function toggleNavigationDrawer() {
        emit('update:drawer', !props.drawer);
    }
</script>
<template>
    <!-- border="b" denotes add a border at the bottom of the app bar. -->
    <v-app-bar color="primary-dark" app border="b">
        <v-app-bar-nav-icon @click="toggleNavigationDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="app-title d-none d-sm-inline text-uppercase">WhimsicalFuelX26</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="px-4">
            <div v-if="!authenticationPiniaStore.isAuthenticated">
                <v-btn prepend-icon="mdi-login" color="surface" to="/login">Login</v-btn>
                <v-btn prepend-icon="mdi-account-plus" color="surface" to="/register">Register</v-btn>
            </div>
            <v-btn v-else prepend-icon="mdi-logout" @click="authenticationPiniaStore.logout">Logout</v-btn>
        </div>
    </v-app-bar>
</template>