import {HTTP} from "../common_services/api-services";
var baseUrl='/api/v1/';

function initialState() {
    return {
        pagination:{
            query: '',
            page: 1,
            limit: 10,
            orderBy: '',
            ascending: true,
            filter: {}
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
    }
}

const stateStore = {
    namespaced:true,
    state: initialState,
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
        /**
         * Used for add state
         * @param commit
         * @param param
         */
        add({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "states", param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for edit state
         * @param commit
         * @param param
         */
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.put(baseUrl + "states/" + param.editId, param.model).then(response => {
                    resolve(response);

                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used to get all state
         * @param commit
         * @param param
         */
        getAll({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "states" + "?page=" + param.page + "&filter=" + (param.filter ? param.filter : "") + "&per_page=" + param.limit + "&search=" + (param.query ? param.query : "") + "&sort=" + (param.orderBy ? param.orderBy : "") + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for delete state
         * @param commit
         * @param param
         */
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

        /**
         * Used for multiple delete
         * @param commit
         * @param param
         */
        multiDelete({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "states-delete-multiple", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used to get a particular state record
         * @param commit
         * @param state - used for edit Id
         */
        getById({commit, state}) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + 'states' + "/" + state.editId).then(response => {
                    resolve(response.data);
                })
                    .catch(e => {
                        reject(e);
                    })
            })
        },

        /**
         * Used for export functionality
         * @param commit
         * @param param
         */
        export({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "states-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&sort=" + param.orderBy + "&order_by=" + (param.orderBy.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for import functionality (upload file)
         * @param commit
         * @param param
         */
        import({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "states-import-bulk", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used to display import history
         * @param commit
         * @param param
         */
        getAllImport({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "import-csv-log" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&filter=" + param.filter + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for display particular import history
         * @param commit
         * @param state
         */
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

export default stateStore;
