import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Articles from '../views/Articles.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import Signup from '../views/Signup.vue';

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/signup', name: 'Inscription', component: Signup },
    { path: '/articles', name: 'Articles', component: Articles },
    { path: '/articles/:id', name: 'ArticleDetail' ,component: ArticleDetail },
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;