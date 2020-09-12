import {HTTP} from "../common_services/api-services";
import qs from 'qs'

var baseUrl = '/api/v1/batch_request';
var authBaseUrl = '/api/v1/auth_batch_request';

function mapParams(param) {
    return param;
}
export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        getBatchRegister({commit, rootState}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(baseUrl, {
                    params: {
                        request: mapParams(param),
                        noAuth : true
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                }).then(response => {
                    var obj = response.data.response;
                    commit('countryStore/setCountryList', obj.countryList.data, {root: true});
                    commit('hobbyStore/setHobbyList', obj.hobbyList.data, {root: true});
                    Object.keys(obj).forEach(function (key) {
                        var val = obj[key];
                        if (!val.hasOwnProperty('data')) {
                            return reject(response.data.response);
                        }
                    });
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getBatchUser({commit, rootState}, param) {
            return new Promise((resolve, reject) => {
                HTTP.get(authBaseUrl, {
                    params: {
                        request: mapParams(param),
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                }).then(response => {
                    var obj = response.data.response;
                    commit('countryStore/setCountryList', obj.countryList.data, {root: true});
                    commit('hobbyStore/setHobbyList', obj.hobbyList.data, {root: true});
                    commit('roleStore/setRoleList', obj.roleList.data, {root: true});
                    commit('stateStore/setStateList', obj.stateList.data, {root: true});
                    commit('cityStore/setCityList', obj.cityList.data, {root: true});
                    Object.keys(obj).forEach(function (key) {
                        var val = obj[key];
                        if (!val.hasOwnProperty('data')) {
                            return reject(response.data.response);
                        }
                    });
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    },
    getters: {}
}
