import { HTTP } from '../common_services/api-services.js';
var baseUrl ='/api/v1/';


function initialState() {
    return {
        pagination:{
            query: '',
            page: 1,
            limit: 10,
            orderBy: '',
            ascending: true,
            filter: ''
        },
        tableData:[],
        roleList: [],
        roledropdownlist: [],
        editId: 0,
        model:{
            name:'',
            guard_name:'',
            landing_page:''
        }
    }
}

const roleStore = {
    namespaced: true,
    state: initialState(),
    mutations: {
        setPagination(state,payload){
            state.pagination = payload;
        },
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setEditId(state, payload) {
            state.editId = payload;
        },
        setRoleList(state, payload) {
            state.roledropdownlist = payload;
        },
        setModel(state, param) {
            Object.keys(state.model).forEach(key => {
                if (param.model[key] == null){
                    param.model[key] = '';
                }
                state.model[key] = param.model[key];
            });
        },
        clearStore(state) {
            const s = initialState();
            state.model = s.model;
            state.editId = s.editId;
        },
    },
    actions: {
        getAll({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "roles" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&filter=" + param.filter + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        add({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "roles", param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.put(baseUrl + "roles/" + param.editId, param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        delete({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.delete(baseUrl + "roles/"  + param, { _method: 'DELETE' }).then(response => {
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'roles' + "/" + state.editId).then(response => {
                    commit('setModel', {model: response.data.data})
                    resolve(response.data);
                })
                    .catch(e => {
                        reject(e);
                    })
            })
        },
        getRoleList({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "roles?per_page=1000").then(response => {
                    resolve(response);
                    commit('setRoleList', response.data.data);
                }).catch(e => {
                    reject(e);
                })
            })

        },
        export({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "roles-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&filter=" + param.filter + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    }
}

export default roleStore;
