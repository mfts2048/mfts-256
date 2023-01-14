import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [
        {
            path: '/',
            component: () => import('./views/playground.vue')
        },
        {
            path: '/page2',
            component: () => import('./views/playground2.vue')
        }
    ]
})

export default router
