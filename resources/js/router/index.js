import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
/* Create new instance of VueRouter */
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/users',
            name: 'users',
            component: () => import('../components/user/Users.vue')
        }]
});

export default router
