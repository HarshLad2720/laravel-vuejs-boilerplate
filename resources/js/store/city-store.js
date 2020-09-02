import {HTTP} from "../common_services/api-services";
var baseUrl='/api/v1/';
const cityStore = {
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
        cityList:[],
        model: {
            state_id:'',
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
        setCityList(state, payload) {
            state.cityList = payload;
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
                HTTP.post(baseUrl + "cities", param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.put(baseUrl + "cities/" + param.editId, param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },
        getAll({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "cities" + "?page=" + param.page + "&filter=" + param.filter + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getCityList({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "cities").then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        delete({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.delete(baseUrl + "cities" + "/" + param,
                ).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })
            })
        },
        multiDelete({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "cities-delete-multiple", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'cities' + "/" + state.editId).then(response => {
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
                HTTP.get(baseUrl + "cities-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.orderBy.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        import({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "cities-import-bulk", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getAllImport({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "import-csv-log" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&filter=" + param.filter + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getByImportId({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'import-csv-log' + "/" + state.editId).then(response => {
                    resolve(response.data);
                })
                    .catch(e => {
                        reject(e);
                    })
            })
        },
    },
    getters: {

    }
}

export default cityStore;
