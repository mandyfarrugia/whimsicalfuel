<script setup>
    import { useAuthenticationPiniaStore } from '../../../stores/authenticationPiniaStore';
    const authenticationPiniaStore = useAuthenticationPiniaStore();
</script>
<template>
    <!-- border="b" denotes add a border at the bottom of the app bar. -->
    <v-app-bar color="primary-dark" app border="b">
        <!-- <v-app-nav-icon></v-app-nav-icon> -->
        <v-toolbar-title class="text-uppercase">WhimsicalFuelX26</v-toolbar-title>
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