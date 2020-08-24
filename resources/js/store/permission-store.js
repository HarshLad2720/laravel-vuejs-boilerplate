import {HTTP} from "../common_services/api-services";

var baseUrl = '/api/v1/';
const permissionStore = {
    namespaced: true,
    state: {
        permissions: [],
        userPermissions: [],
        permissionDialog: false,
    },
    mutations: {
        setPermissions(state, param) {
            state.permissions = param;
        },
        clearPermissions(state, param) {
            state.permissions = [];
        },
        setUserPermissions(state, param) {
            state.userPermissions = param;
        },
        setPermissionDialog(state, payload) {
            state.permissionDialog = payload;
        }
    },
    actions: {
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "set_unset_permission_to_role", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getById({commit, state}, param) {
            // debugger;
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'get_role_by_permissions/' + param).then(response => {
                    commit('setPermissions', response.data.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    },
    getters: {}
}

export default permissionStore;
