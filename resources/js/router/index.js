import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import store from '../store/store';

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
                    path: '/api/password/reset/:id',
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
                    component: () => import("../components/user/Users.vue"),
                    meta: {
                        permission: 'my-users',
                    }
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


/*router.beforeResolve((to, from, next) => {
    debugger;
    var permissionData = store.state.permissionStore.userPermissions;
    if (to.matched.some(record => record.meta.permission)) {
        var permissionArray = permissionData.filter(permission => permission.name == to.meta.permission);
        if (permissionArray.length > 0) {
            next('/');
            return
        } else {
            next('/');
        }
    } else {
        next();
    }
});*/

// Loading chunk error
/*router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});*/

export default router
