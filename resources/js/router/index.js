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
                        requiresAuth: true,
                        permission: 'my-users',
                    }
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('../components/role/Role.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-roles',
                    }
                },
                {
                    path: '/country',
                    name: 'country',
                    component: () => import('../components/country/Country.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-countries',
                    }
                },
                {
                    path: '/state',
                    name: 'state',
                    component: () => import('../components/state/State.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-states',
                    }
                },
                {
                    path: '/city',
                    name: 'city',
                    component: () => import('../components/city/City.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-cities',
                    }
                },
                {
                    path: '/hobby',
                    name: 'hobby',
                    component: () => import('../components/hobby/Hobby.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-hobbies',
                    }
                },
                {
                    path: '/permission',
                    name: 'permission',
                    component: () => import('../components/permission/Permission.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-permissions',
                    }
                },
            ]
        },
    ]
});

/*router.beforeEach((to, from, next) => {
    // debugger;
    var authorization = store.state.userStore.currentUser.authorization;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (authorization) {
            next()
        } else if (authorization == '') {
            next('/logoff')
            return
        } else {
            next('/login')
        }
    } else {
        if (to.path == "/" && authorization) {
            next('/users')
        } else if (to.path != "/logoff" && authorization == '') {
            next('/logoff')
            return
        } else {
            next()
        }
    }
})
router.beforeResolve((to, from, next) => {
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
