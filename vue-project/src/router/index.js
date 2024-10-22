import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Home from '../views/Home.vue';
import LogIn from '../views/LogIn.vue';
import Registration from '../views/Registration.vue';
import SellerDashboard from '../views/SellerDash.vue';  // Import the SellerDashboard component
import Settings from '../views/Settings.vue';
import ProductPage from '../views/ProductPage.vue';  // Import the ProductPage component

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/seller-dash',  // New route for the Seller Dashboard
    name: 'SellerDash',
    component: SellerDashboard,
  },
  {
    path: '/settings',  // New route for the Seller Login
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/product/:id',  // New route for the Product Page
    name: 'ProductPage',
    component: ProductPage,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;