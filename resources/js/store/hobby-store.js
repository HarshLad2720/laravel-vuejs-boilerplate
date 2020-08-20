import {HTTP} from "../common_services/api-services";
var baseUrl='/api/v1/';
const hobbyStore = {
    namespaced:true,
    state: {
        list: [],
        hobbyList:[],
        model: {
            name: '',
            remark:'',
        },
        editId: 0,

    },
    mutations: {
        setList(state, payload) {
            state.list = payload;
        },
        setEditId(state, payload) {
            state.editId = payload;
        },
        setModel(state, param) {
            state.model = param.model;
        },
        setHobbyList(state, payload) {
            state.hobbyList = payload;
        },
        clearStore(state) {
            state.model = {
                name: '',
                remark:'',
            }, state.editId = 0
        },
    },
    actions: {
        add({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "hobbies", param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.put(baseUrl + "hobbies/" + param.editId, param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },
        getAll({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "hobbies" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                    commit('setList', response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getHobbyList({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "hobbies").then(response => {
                    resolve(response);
                    commit('setHobbyList', response.data.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        delete({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.delete(baseUrl + "hobbies" + "/" + param,
                ).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })
            })
        },
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'hobbies' + "/" + state.editId).then(response => {
                    commit('setModel', {model: response.data.data})
                    resolve(response.data);
                })
                    .catch(e => {
                        reject(e);
                    })
            })
        },
        export({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "hobbies-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy.column + "&order_by=" + (param.orderBy.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    },
    getters: {

    }
}

export default hobbyStore;
