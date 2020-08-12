import { HTTP } from '../common_services/api-services.js';
var baseUrl = ''; // set url here e.g.'/api/v1/mypreferences/business/user/'
var loginUrl = '/api/checklogin';
var baseUrl ='/api/v1/users';


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

        createModel: {
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
        setRoleList(state, payload) {
            state.roleList = payload;
        },
        setCurrentUserData(state, payload) {
            state.currentUserData = payload;
        },

        setEditId(state, payload) {
            state.editId = payload;
        },
        setModel(state, param) {
            Object.keys(state.model).forEach(key => {
                if (param.model[key] == null){
                    param.model[key] = '';
                }
                state.model[key] = param.model[key];
            });
            state.model.timezone = {name: param.model.default_timezone, offset: param.model.timezone_offset};
            state.model.logo_upload=null;
        },
        clearStore(state) {
            const s = initialState();
            state.model = s.model;
            state.editId = s.editId;
        },
        clearCreateModel(state) {
            const s = initialState();
            state.createModel = s.createModel;
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
        },

        add({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "create_sbuscription", param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "update_business_detail/" + param.editId, param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}

export default userStore;
