import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
/* Create new instance of VueRouter */
const router = new VueRouter({
    mode: 'history',
    routes: [
        /*{
            path: '/users',
            name: 'users',
            component: () => import('../components/user/Users.vue')
        },
        {
            path: '/role',
            name: 'role',
            component: () => import('../components/role/Role.vue')
        },
        /*{
            path: '/',
            name: 'login',
            component: () => import('../components/auth/Login')
        },*/

        {
            path: "/",
            component: () => import("../components/auth/Auth"),
            children: [
                {
                    name: "login",
                    path: "/",
                    component: () => import("../components/auth/Login.vue")
                },
                {
                    name: "register",
                    path: "/register",
                    component: () => import("../components/auth/Register.vue")
                },
                {
                    path: '/password/:id',
                    name: 'Reset Password',
                    component: () => import('../components/auth/ResetPassword.vue')
                },
            ]
        },
        {
            path: "/",
            redirect: "/dashboard",
            component: () => import("../components/layout/Layout.vue"),
            children: [
                {
                    path: "/users",
                    name: "users",
                    component: () => import("../components/user/Users.vue")
                },
            ]
        },
    ]
});

export default router
