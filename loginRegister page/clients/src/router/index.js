import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import Register from '../views/register.vue';
import Login from '../views/login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
