import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/proizvodi',
            name: 'products',
            // route level code-splitting
            // this generates a separate chunk (ProductsView.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ProductsView.vue')
        },
        {
            path: '/korpa',
            name: 'basket',
            component: () => import('../views/BasketView.vue')
        },
        {
            path: '/narudzbina/:id',
            name: 'order',
            component: () => import('../views/OrderView.vue')
        }
    ]
})

export default router
