<template>
    <!-- border="b" denotes add a border at the bottom of the app bar. -->
    <v-app-bar color="primary" app border="b">
        <!-- <v-app-nav-icon></v-app-nav-icon> -->
        <v-toolbar-title class="text-uppercase">WhimsicalFuelX26</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="px-4">
            <v-btn prepend-icon="mdi-login" color="surface" to="/login">Login</v-btn>
            <v-btn prepend-icon="mdi-account-plus" color="surface" to="/register">Register</v-btn>
        </div>
    </v-app-bar>
</template>