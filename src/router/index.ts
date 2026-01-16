import { createRouter, createWebHistory } from "vue-router";
import StudentsView from "@/views/StudentsView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: StudentsView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/student/:id',
            name: 'edit',
            component: () => import('../views/StudentEditView.vue')
        }
    ]
})
export default router;