import NotFound from '@/pages/NotFound.vue'
import About from '@/pages/about.vue'
import Home from '@/pages/index.vue'
import Signin from '@/pages/signin.vue'
import Signup from '@/pages/signup.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', name: 'not_found', component: NotFound },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      auth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  }
]

export default routes
