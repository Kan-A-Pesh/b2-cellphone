import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ContactsView from '@/views/ContactsView.vue'
import CallLogView from '@/views/CallLogView.vue'

import AddContactView from '@/views/AddContactView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: ContactsView
        },
        {
            path: '/log',
            name: 'log',
            component: CallLogView
        },

        {
            path: '/add-contact',
            name: 'add-contact',
            component: AddContactView
        }
    ]
})

export default router
