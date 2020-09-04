import { HTTP } from '../common_services/api-services.js';
/*var baseUrl = '';*/ // set url here e.g.'/api/v1/mypreferences/business/user/'
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
        currentUserData: {},

        model: {
            name: '',
            email: '',
            password: '',
            mobile_no:'',
            profile:'',
            profile_upload: null,
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
        galleryList:[],
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
        removeAuthorization(state, payload) {
            state.currentUserData.authorization = payload;
        },
        clearUserData(state) {
            state.currentUserData = {};
        },
        setCurrentUserData(state, payload) {
            state.currentUserData = payload;
        },

        setEditId(state, payload) {
            state.editId = payload;
        },
        setModel(state, param) {
            state.model = param.model;
            state.model.name = param.model.name;
            state.model.email = param.model.email;
            state.model.mobile_no = param.model.mobile_no;
            state.model.profile = param.model.profile;
            state.model.profile_upload = null;
            state.model.gender = param.model.gender;
            state.model.dob = param.model.dob;
            state.model.address = param.model.address;
            state.model.country_id = param.model.country_id;
            state.model.state_id = param.model.state_id;
            state.model.city_id = param.model.city_id;
            state.galleryList = state.model.gallery;
            state.model.gallery = null;
            state.model.hobbies =param.model.hobby;
            state.model.hobby = [];
            for(var i=0; i< param.model.hobbies.length; i++){
                state.model.hobby[i] = param.model.hobbies[i].id;
            }
        },
        setGalleryImageList(state, payload) {
            state.galleryList = payload;
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
        logoff({commit}, param) {
            commit('removeAuthorization', param);
        },

        /**
         * Used to get all user
         * @param commit
         * @param param
         */
        getAll({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl + "users" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + (param.query ? param.query : "") + "&filter=" + (param.filter ? param.filter : "") + "&sort=" + (param.orderBy ? param.orderBy : "") + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for registration
         * @param commit
         * @param param
         */
        register({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "register", param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used to get a particular user record
         * @param commit
         * @param state - used for edit Id
         */
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

        /**
         * Used for edit user
         * @param commit
         * @param param
         */
        edit({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.post(baseUrl + "users/" + param.editId, param.model).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for delete user
         * @param commit
         * @param param
         */
        delete({ commit }, param) {
            return new Promise((resolve, reject) => {
                HTTP.delete(baseUrl + "users/"  + param, { _method: 'DELETE' }).then(response => {
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
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
                HTTP.post(baseUrl + "users-delete-multiple", param).then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        /**
         * Used for delete gallery image
         * @param commit
         * @param param
         */
        deleteImage({commit}, param) {
            return new Promise((resolve, reject) => {
                HTTP.delete(baseUrl + "gallery/" + param).then(response => {
                    resolve(response);
                }).catch(e => {
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
                HTTP.get(baseUrl + "users-export" + "?page=" + param.page + "&per_page=" + param.limit + "&search=" + param.query + "&filter=" + param.filter + "&sort=" + param.orderBy + "&order_by=" + (param.ascending == 1 ? "asc" : "desc")).then(response => {
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
                HTTP.post(baseUrl + "users-import-bulk", param).then(response => {
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
    getters:{
        /**
         * Used to get user fullname
         */
        userFullName: state => {
            let user_name = state.currentUserData.name;
            return user_name;
        },

        /**
         * Used to get user profile image
         */
        userProfilePicture: state => {
            if (state.currentUserData.profile == '') {
                return '/images/profile.png';
            } else {
                return state.currentUserData.profile;
            }
        },
    }
}

export default userStore;
