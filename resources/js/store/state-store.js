import {HTTP} from "../common_services/api-services";
var baseUrl='/api/v1/';
const stateStore = {
    namespaced:true,
    state: {
        pagination:{
            query: '',
            page: 1,
            limit: 10,
            orderBy: '',
            ascending: true,
            filter: ''
        },
        tableData:[],
        list: [],
        stateList:[],
        model: {
            country_id:'',
            name: '',
            remark:'',
        },
        editId: 0,

    },
    mutations: {
        setPagination(state,payload){
            state.pagination = payload;
        },
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setList(state, payload) {
            state.list = payload;
        },
        setEditId(state, payload) {
            state.editId = payload;
        },
        setModel(state, param) {
            state.model = param.model;
        },
        setStateList(state, payload) {
            state.stateList = payload;
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
                HTTP.post(baseUrl + "states", param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.put(baseUrl + "states/" + param.editId, param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },
        getAll({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "states" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                    commit('setList', response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getStateList({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "states").then(response => {
                    resolve(response);
                    commit('setStateList', response.data.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        delete({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.delete(baseUrl + "states" + "/" + param,
                ).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })
            })
        },
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'states' + "/" + state.editId).then(response => {
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
                HTTP.get(baseUrl + "states-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.orderBy.ascending == 1 ? "asc" : "desc")).then(response => {
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

export default stateStore;
