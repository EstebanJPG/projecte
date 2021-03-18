import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';
import Login from '../views/login.vue';
import Logout from '../views/logout.vue';
import Prod from '../views/prods.vue';

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
  next('/tabs/login')
}
 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/page/prod'
  },
  
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/page/',
    component: Tabs,
    children: [
      {
        path: 'prod',
        name: 'Prod',
        component: Prod,
      },
      
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
    
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
