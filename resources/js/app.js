require('./bootstrap');
import router from "./router";
import Vue from 'vue';
import App from './components/App.vue';
import vuetify from './plugins/vuetify'
import store from './store/store';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuex from 'vuex';
import registerStoreModule from './common_services/register-store-module';
import constants from './common_services/constantPlugin';
import persistentState from 'vue-persistent-state';
import VeeValidate from 'vee-validate';
import { InlineSvgPlugin } from "vue-inline-svg";
import KTUtil from "../assets/js/components/util.js";
window.KTUtil = KTUtil
import "../js/plugins/metronic";
import PerfectScrollbar from "vue2-perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(constants);
Vue.mixin(registerStoreModule); //Constants as plugin
Vue.use(persistentState);
Vue.use(VeeValidate);
Vue.use(InlineSvgPlugin);

// Perfect scrollbar
Vue.use(PerfectScrollbar);

// Install BootstrapVue
Vue.use(BootstrapVue);

// Permission directives
import {hasPermission} from "./common_services/permission/permission-directives";
Vue.directive('store', hasPermission);  // create
Vue.directive('index', hasPermission); // display a listing
Vue.directive('can-show', hasPermission); //  display a single row
Vue.directive('update', hasPermission); //update
Vue.directive('destroy', hasPermission); // delete
Vue.directive('export', hasPermission); // export
Vue.directive('importBulk', hasPermission); // import
Vue.directive('delete_gallery', hasPermission);
Vue.directive('getPermissionsByRole', hasPermission);
Vue.directive('setUnsetPermissionToRole', hasPermission);
Vue.directive('changePassword', hasPermission);
Vue.directive('logout', hasPermission);

const app = new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#appMain');

const version = "__VERSION__";
export {version};
