import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
/* Create new instance of VueRouter */
const router = new VueRouter({
    mode: 'history',
    routes: [
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
                    path: '/forgot-password/:id',
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
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('../components/role/Role.vue')
                },
                {
                    path: '/country',
                    name: 'country',
                    component: () => import('../components/country/Country.vue')
                },
                {
                    path: '/state',
                    name: 'state',
                    component: () => import('../components/state/State.vue')
                },
                {
                    path: '/city',
                    name: 'city',
                    component: () => import('../components/city/City.vue')
                },
                {
                    path: '/hobby',
                    name: 'hobby',
                    component: () => import('../components/hobby/Hobby.vue')
                },
                {
                    path: '/permission',
                    name: 'permission',
                    component: () => import('../components/permission/Permission.vue')
                },
            ]
        },
    ]
});

export default router
