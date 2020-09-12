import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import store from '../store/store';
import { RESET_LAYOUT_CONFIG } from "../store/config.module";

var siteName = " - Admin Panel";
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
                    component: () => import("../components/auth/Login.vue"),
                    meta: {
                        title: "Login" + siteName
                    }
                },
                {
                    name: "Logoff",
                    path: "/logoff",
                    component: () => import("../components/auth/Logoff.vue"),
                    meta: {
                        title: "Logoff" + siteName
                    }
                },
                {
                    name: "register",
                    path: "/register",
                    component: () => import("../components/auth/Register.vue"),
                    meta: {
                        title: "Register" + siteName
                    }
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
                        title: "Users" + siteName
                    }
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('../components/role/Role.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-roles',
                        title: "Role" + siteName
                    }
                },
                {
                    path: '/country',
                    name: 'country',
                    component: () => import('../components/country/Country.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-countries',
                        title: "Country" + siteName
                    }
                },
                {
                    path: '/state',
                    name: 'state',
                    component: () => import('../components/state/State.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-states',
                        title: "State" + siteName
                    }
                },
                {
                    path: '/city',
                    name: 'city',
                    component: () => import('../components/city/City.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-cities',
                        title: "City" + siteName
                    }
                },
                {
                    path: '/hobby',
                    name: 'hobby',
                    component: () => import('../components/hobby/Hobby.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-hobbies',
                        title: "Hobby" + siteName
                    }
                },
                {
                    path: '/permission',
                    name: 'permission',
                    component: () => import('../components/permission/Permission.vue'),
                    meta: {
                        requiresAuth: true,
                        permission: 'my-permissions',
                        title: "Permission" + siteName
                    }
                },
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    var authorization = store.state.userStore.currentUserData.authorization;
    document.title = to.meta.title;

    // reset config to initial state
    store.dispatch(RESET_LAYOUT_CONFIG);

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (authorization) {
            next()
        } else if (authorization == '') {
            next('/logoff')
            return
        } else {
            next('/')
        }
    } else {
        if (to.path != "/logoff" && authorization == '') {
            next('/logoff')
            return
        } else {
            next()
        }
    }
});

router.beforeResolve((to, from, next) => {
    var permissionData = store.state.permissionStore.userPermissions;
    var access = 'index';
    if (to.matched.some(record => record.meta.permission)) {
        var permissionArray = permissionData.filter(permission => permission.name == to.meta.permission);
        if (permissionArray.length > 0) {
            var subpermissionArray = permissionArray[0].sub_permissions;
            if (to.matched.some(record => record.meta.subpermission)) {
                var subpermissionmain = permissionArray[0].sub_permissions.filter(subpermissionmain => subpermissionmain.name == to.meta.subpermission);
                if (subpermissionmain.length > 0) {
                    subpermissionArray = subpermissionmain[0].sub_permissions;
                } else {
                    next('/');
                    return
                }
            }
            if (subpermissionArray.length > 0) {
                var subpermission = subpermissionArray.filter(subpermission => (subpermission.name == access && subpermission.is_permission == "1"));
                if (subpermission.length > 0) {
                    next()
                } else {
                    next('/users');
                    store.commit('permissionStore/setPermissionDialog', true);
                }
            }
        } else {
            next('/');
        }
    } else {
        next();
    }
});

// Loading chunk error
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

export default router
