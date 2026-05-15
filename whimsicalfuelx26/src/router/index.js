import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/guest-views/RegisterView.vue';
import LoginView from '../views/guest-views/LoginView.vue';
import DashboardView from '../views/restricted-views/DashboardView.vue';
import RecipesCatalogueView from '../views/guest-views/RecipesCatalogueView.vue';
import StatusCode403ForbiddenView from '../views/responses/StatusCode403ForbiddenView.vue';
import StatusCode404NotFoundView from '../views/responses/StatusCode404NotFoundView.vue';

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/register',
        component: RegisterView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/dashboard',
        component: DashboardView
    },
    {
        path: '/recipes-catalogue',
        component: RecipesCatalogueView
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

export default router;