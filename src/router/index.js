import { createRouter, createWebHistory } from 'vue-router';
import HomeComp from '../views/HomeComp.vue';
import LoginComp from '../views/LoginComp.vue';
import CartComp from '../views/CartComp.vue';
import CheckoutComp from '../views/CheckoutComp.vue';
import CareCosPage from '../views/CareCosPage.vue';
import HairPage from '../views/HairPage.vue';
import DecCosPage from '../views/DecCosPage.vue';
import ParfumePage from '../views/ParfumePage.vue';
import OtzvPage from '@/views/OtzvPage.vue';
import ProductDetail from '@/components/ProductDetail';
import UserProfile from '../views/UserProfile.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComp
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComp
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartComp
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutComp
  },
  {
    path: '/carecos',
    name: 'CareCos',
    component: CareCosPage
  },
  {
    path: '/hair',
    name: 'Hair',
    component: HairPage
  },{
    path: '/deccos',
    name: 'DecCos',
    component: DecCosPage
  },
  {
    path: '/parf',
    name: 'Parf',
    component: ParfumePage
  },
  {
    path: '/otzv',
    name: 'Otzv',
    component: OtzvPage
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  { path: '/user-profile', name: 'UserProfile', component: UserProfile }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
