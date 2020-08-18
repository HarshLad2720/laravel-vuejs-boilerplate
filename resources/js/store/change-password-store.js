import {HTTP} from "../common_services/api-services";

var baseUrl ='/api/v1/';

function initialState() {
    return {
        model: {
            old_password: '',
            new_password: '',
            confirm_password: '',
        }
    }
}
const changePasswordStore = {
    namespaced: true,
    state: initialState,
    mutations: {
        clearStore(state) {
            let s = initialState();
            state.model = s.model;
        },
    },
    actions: {
        changePassword({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "change-password", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    },
    getters: {}
}

export default changePasswordStore;
