<script setup>
  import AppBar from './components/user-interface/navigation/AppBar.vue';
  import { onMounted } from 'vue';
  import { useAuthenticationPiniaStore } from './stores/authenticationPiniaStore.js';

  const authenticationPiniaStore = useAuthenticationPiniaStore();

  onMounted(() => {
    authenticationPiniaStore.initialiseAuthenticationListener();
  });
</script>
<template>
  <v-app class="bg-background">
    <AppBar></AppBar>
    <v-main class="d-flex fill-height justify-center align-center">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>