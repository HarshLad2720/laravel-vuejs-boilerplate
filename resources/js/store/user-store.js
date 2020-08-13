import { HTTP } from '../common_services/api-services.js';
var baseUrl = ''; // set url here e.g.'/api/v1/mypreferences/business/user/'
var loginUrl = '/api/v1/login';
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
        currentUserData: [],

        model: {
            name: '',
            email: '',
            password: '',
            mobile_no:'',
            profile:null,
            gender: '',
            dob:'',
            address: '',
            country_id: '',
            state_id: '',
            city_id: '',
            gallery: [],
            hobby: [],
        },
        editId: 0,
    }
}

const userStore = {
    namespaced: true,
    state: initialState(),
    mutations: {
        setPagination(state,payload){
            state.pagination = payload;
        },
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setCurrentUserData(state, payload) {
            state.currentUserData = payload;
        },

        setEditId(state, payload) {
            state.editId = payload;
        },
        setModel(state, param) {
            state.model = param.model;
        },
        clearStore(state) {
            const s = initialState();
            state.model = s.model;
            state.editId = s.editId;
        },
        clearModel(state) {
            const s = initialState();
            state.model = s.model;
        },
    },
    actions: {
        login({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(loginUrl , param.loginDetail).then(response => {
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
        register({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "register", param.model).then(response => {
                    console.log(response);
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'users' + "/" + state.editId).then(response => {
                    commit('setModel', {model: response.data.data})
                    resolve(response.data);
                })
                    .catch(e => {
                        reject(e);
                    })
            })
        },
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "users/" + param.editId, param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}

export default userStore;
