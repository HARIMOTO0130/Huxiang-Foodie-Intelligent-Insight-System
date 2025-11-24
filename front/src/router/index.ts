import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import About from '../views/About.vue'
import DataManagement from '../views/DataManagement.vue'
import SystemSettings from '../views/SystemSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/data-management',
      name: 'data-management',
      component: DataManagement,
    },
    {
      path: '/system-settings',
      name: 'system-settings',
      component: SystemSettings,
    },
  ],
})

export default router
