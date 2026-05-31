import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/guest-views/RegisterView.vue';
import LoginView from '../views/guest-views/LoginView.vue';
import DashboardView from '../views/restricted-views/DashboardView.vue';
import RecipesCatalogueView from '../views/guest-views/RecipesCatalogueView.vue';
import StatusCode403ForbiddenView from '../views/responses/StatusCode403ForbiddenView.vue';
import StatusCode404NotFoundView from '../views/responses/StatusCode404NotFoundView.vue';
import UserProfileView from '../views/restricted-views/UserProfileView.vue';
import { useAuthenticationPiniaStore } from '../stores/authenticationPiniaStore.js';

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/register',
        component: RegisterView,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/login',
        component: LoginView,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/dashboard',
        component: DashboardView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/recipes-catalogue',
        component: RecipesCatalogueView
    },
    {
        path: '/user-profile',
        component: UserProfileView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/403-forbidden',
        component: StatusCode403ForbiddenView
    },
    {
        path: '/:pathMatch(.*)*',
        component: StatusCode404NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to) => {
    const authenticationPiniaStore = useAuthenticationPiniaStore();

    while(authenticationPiniaStore.isLoading) {
        await new Promise((resolve) => setTimeout(resolve, 50));
    }

    if(to.meta.requiresAuth && !authenticationPiniaStore.isAuthenticated) {
        return '/login';
    }
})

export default router;