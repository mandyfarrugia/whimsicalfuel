<script setup>
    import { useAuthenticationPiniaStore } from '../../../stores/authenticationPiniaStore';

    defineProps({
        title: String,
        subtitle: String,
        colour: {
            type: String,
            default: 'surface'
        },
        foregroundColour: {
            type: String,
            default: 'primary'
        },
        drawerItems: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const authenticationPiniaStore = useAuthenticationPiniaStore();
</script>
<template>
    <v-navigation-drawer
        :model-value="modelValue"
        :color="colour"
        @update:model-value="emit('update:modelValue', $event)">
      <div class="d-flex flex-column h-100">
        <v-list-item :title="title" :subtitle="subtitle"></v-list-item>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item 
            v-for="drawerItem in drawerItems"
            :prepend-icon="drawerItem.icon"
            :key="drawerItem.title"
            :title="drawerItem.title"
            :to="drawerItem.route"
            :color="foregroundColour"
            link>
          </v-list-item>
        </v-list>
        <div class="mt-auto">
          <v-divider></v-divider>
          <v-list v-if="authenticationPiniaStore.isAuthenticated">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-avatar size="50" class="mx-2 mr-3">
                  <v-img src="https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"></v-img>
                </v-avatar>
                <div class="py-2">
                  <div class="text-subtitle-2 font-weight-medium">User</div>
                  <div class="text-caption text-grey">User</div>
                </div>
              </div>
              <v-btn class="mr-2" prepend-icon="mdi-logout" variant="text" @click="authenticationPiniaStore.logout()"/>
            </div>
          </v-list>
          <v-list v-else>
            <v-list-item title="Login" prepend-icon="mdi-login" to="/login" link/>
            <v-list-item title="Register" prepend-icon="mdi-account-plus" to="/register" link/>
          </v-list>
        </div>
      </div>
      </v-navigation-drawer>
</template>