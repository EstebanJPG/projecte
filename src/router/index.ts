import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import Login from '../views/login.vue';
import Logout from '../views/logout.vue';
import Prod from '../views/prods.vue';
import Register from "../views/register.vue";
const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("access_token")) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem("access_token")) {
    next()
    return
  }
  next('/login')
}
 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/productos'
  },
  {
    path: '/productos',
    name: 'productos',
    component: Prod,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: ifNotAuthenticated,
  },
  
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    beforeEnter: ifAuthenticated,
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
