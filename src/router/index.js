import Vue from 'vue';
import Router from 'vue-router';
import LoginRegister from '@/components/LoginRegister.vue';
import Directory from '@/components/Directory.vue';
import SeatingChart from '@/components/SeatingChart.vue';
import UploadExcel from '@/components/UploadExcel.vue';
import store from '../store';

Vue.use(Router);

const routes = [
    { path: '/', redirect: '/auth' },
    { path: '/auth', name: 'Auth', component: LoginRegister },
    { path: '/directory', name: 'Directory', component: Directory, beforeEnter: authGuard },
    { path: '/seating-chart', name: 'SeatingChart', component: SeatingChart, beforeEnter: authGuard },
    { path: '/upload', name: 'UploadExcel', component: UploadExcel, beforeEnter: authGuard },
    { path: '*', redirect: '/auth' }
];

function authGuard(to, from, next) {
    if (!store.getters.isAuthenticated) {
        next('/auth');
    } else {
        next();
    }
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
