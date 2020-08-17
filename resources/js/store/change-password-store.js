import {HTTP} from "../common_services/api-services";

var baseUrl = '/api/v1/mypreferences/business/user/';

function initialState() {
    return {
        model: {
            current_password: '',
            password: '',
            password_confirmation: '',
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
                HTTP.post(baseUrl + "change_password", param).then(response => {
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
