import { HTTP } from '../common_services/api-services.js';
var baseUrl = ''; // set url here e.g.'/api/v1/mypreferences/business/user/'
var loginUrl = '/api/checklogin';
const userStore = {
    namespaced: true,
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
        roleList: [],
        currentUserData: [],
    },
    mutations: {
        setPagination(state,payload){
            state.pagination = payload;
        },
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setRoleList(state, payload) {
            state.roleList = payload;
        },
        setCurrentUserData(state, payload) {
            state.currentUserData = payload;
        },
    },
    actions: {
        login({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(loginUrl , param.loginParam).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getAll({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "users" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&filter=" + param.filter + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getRoles({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.get("").then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    }
}

export default userStore;
