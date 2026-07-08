<script setup>
  import AppBar from './components/user-interface/navigation/AppBar.vue';
  import NavigationDrawer from './components/user-interface/navigation/NavigationDrawer.vue';
  import { onMounted, ref } from 'vue';
  import { useAuthenticationPiniaStore } from './stores/authenticationPiniaStore.js';

  const authenticationPiniaStore = useAuthenticationPiniaStore();

  onMounted(() => {
    authenticationPiniaStore.initialiseAuthenticationListener();
  });

  const drawer = ref(false);

  const drawerItems = [
    {
      title: 'Recipes Catalogue',
      route: '/recipes-catalogue'
    },
    {
      title: 'Add New Recipe',
      route: '/add-new-recipe'
    }
  ];
</script>
<template>
  <v-app class="bg-background">
    <NavigationDrawer
      v-model="drawer"
      title="WHIMSICALFUELX26"
      subtitle="One step closer to a healthier you!"
      :drawer-items="drawerItems"></NavigationDrawer>
    <AppBar v-model:drawer="drawer"></AppBar>
    <v-main class="bg-background d-flex fill-height justify-center align-center">
      <router-view></router-view>
      <vue3-snackbar
        bottom end
        dense
        shadow
        success="#5C8A5C"
        error="#C65B4B"
        warning="#D9A441"
        info="#7A9E7E">
      </vue3-snackbar>
    </v-main>
  </v-app>
</template>