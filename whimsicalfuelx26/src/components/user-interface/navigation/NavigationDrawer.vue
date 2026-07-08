<script setup>
    import { useAuthenticationPiniaStore } from '../../../stores/authenticationPiniaStore';
    import { useToast } from "vue-toastification";
    import { useRouter } from 'vue-router';

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

    const router = useRouter();
    const toast = useToast();

    const emit = defineEmits(['update:modelValue']);

    const authenticationPiniaStore = useAuthenticationPiniaStore();

    const getChipColourBasedOnRole = (role) => {
      return role === 'Administrator' ? 'primary' : 'secondary';
    }
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
                  <v-avatar
                      size="60"
                      class="mx-2 mr-3"
                      color="primary"
                      variant="tonal"
                  >
                      <v-img
                          v-if="authenticationPiniaStore.userProfile?.profilePicture"
                          :src="authenticationPiniaStore.userProfile.profilePicture"
                          @click="router.push('/user-profile')"
                          draggable="false"
                          @contextmenu.prevent.stop="toast.warning('Image previews cannot be saved!')"
                          @dragstart.prevent
                          @drag.prevent
                          cover
                      />
                      <v-icon
                          v-else
                          icon="mdi-account"
                          size="32"
                      />
                  </v-avatar>
                  <div class="drawer-user-details">
                    <div class="drawer-user-name">
                        {{ authenticationPiniaStore.userProfile?.firstName }}
                        {{ authenticationPiniaStore.userProfile?.lastName }}
                    </div>

                    <div class="drawer-username">
                        @{{ authenticationPiniaStore.userProfile?.username }}
                    </div>

                    <v-chip
                        size="x-small"
                        :color="getChipColourBasedOnRole(authenticationPiniaStore.userProfile?.role)"
                        variant="tonal"
                        class="drawer-role-chip"
                    >
                        {{ authenticationPiniaStore.userProfile?.role }}
                    </v-chip>
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
<style scoped>
    .drawer-user-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        min-width: 0;
    }

    .drawer-user-name {
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.15;
    }

    .drawer-username {
        font-size: 0.75rem;
        line-height: 1.1;
        color: rgba(var(--v-theme-on-surface), 0.55);
    }

    .drawer-role-chip {
        margin-top: 3px;
    }

    v-avatar > v-img {
      cursor: pointer;
    }
</style>