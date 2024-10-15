import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue';
import SideBarView from '@/views/SidebarView.vue';
import SendMessageView from '@/views/SendMessageView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/api-emails',
      component: SideBarView,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: DashboardView
        },
        {
          path: "/send-message",
          name: "send message",
          component: SendMessageView
        }
      ]
    }
  ]
})

export default router
