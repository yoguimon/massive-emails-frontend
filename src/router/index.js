import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue';
import SideBarView from '@/views/SidebarView.vue';
import SendMessageView from '@/views/SendMessageView.vue';
import ContactView from '@/views/ContactView.vue';
import HistorialView from '@/views/RecordView.vue';

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
        },
        {
          path: "/contacts",
          name: "contacts",
          component: ContactView
        },
        {
          path: "/record",
          name: "record",
          component: HistorialView
        }
      ]
    }
  ]
})

export default router
