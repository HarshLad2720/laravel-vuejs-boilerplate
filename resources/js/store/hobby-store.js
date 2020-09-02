import {HTTP} from "../common_services/api-services";
var baseUrl='/api/v1/';
const hobbyStore = {
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
        hobbyList:[],
        model: {
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
                HTTP.get(baseUrl + "hobbies" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + (param.query ? param.query : "") + "&filter=" + (param.filter ? param.filter : "") + "&sort=" + (param.orderBy ? param.orderBy : "") + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
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
        multiDelete({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "hobbies-delete-multiple", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'hobbies' + "/" + state.editId).then(response => {
                    resolve(response.data);
                })
                    .catch(e => {
                        reject(e);
                    })
            })
        },
        export({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "hobbies-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.orderBy.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        import({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "hobbies-import-bulk", param).then(response => {
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

export default hobbyStore;
