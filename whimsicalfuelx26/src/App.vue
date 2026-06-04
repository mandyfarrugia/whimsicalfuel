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
  ]
</script>
<template>
  <v-app class="bg-background">
    <NavigationDrawer
      v-model="drawer"
      title="WHIMSICALFUELX26"
      subtitle="One step closer to a healthier you!"
      :drawer-items="drawerItems"></NavigationDrawer>
    <AppBar v-model:drawer="drawer"></AppBar>
    <v-main class="d-flex fill-height justify-center align-center">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>