window._ = require('lodash');
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import store from '../store/store';

window.axios = require('axios');
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
export const HTTP = window.axios;

HTTP.interceptors.request.use(
    function (config) {
        if (config.url == "/api/v1/login" || config.url.includes("forgot-passsword") || config.url.includes("reset-password") || config.url.includes("register")) {
            return config;
        }
        if (config.method == 'get' && (config.url.includes("countries") || config.url.includes("states") || config.url.includes("cities") || config.url.includes("hobbies"))) {
            var authorizationtoken = store.state.userStore.currentUserData.authorization; //get authorization token from login response data
            if (authorizationtoken) {
                config.headers.common.Authorization = 'Bearer ' + authorizationtoken;
            }
            return config;
        }
        // Check authorization token
        var authorizationtoken = store.state.userStore.currentUserData.authorization; //get authorization token from login response data

        if (!authorizationtoken) {
            window.location.href = "/";
        } else {
            config.headers.common.Authorization = 'Bearer ' + authorizationtoken;
            return config;
        }
    },
    function (error) {
        return Promise.reject(error)
    })


HTTP.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error)
    })
