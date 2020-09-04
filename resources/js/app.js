require('./bootstrap');
import router from "./router";
import Vue from 'vue';
import Vuex from 'vuex';

// router store and plugins
import App from './components/App.vue';
import store from './store/store';
import constants from './common_services/constantPlugin';
import VueRouter from 'vue-router';
import IdleVue from 'idle-vue';
import vuetify from './plugins/vuetify'
import registerStoreModule from './common_services/register-store-module';
import persistentState from 'vue-persistent-state';
import VeeValidate from 'vee-validate';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import bugsnagVue from '@bugsnag/plugin-vue'

// theme support plugin
import "../js/plugins/metronic";
import { InlineSvgPlugin } from "vue-inline-svg";
import KTUtil from "../assets/js/components/util.js";
window.KTUtil = KTUtil
import PerfectScrollbar from "vue2-perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;


if(process.env.MIX_MODE == 'production') {
    var bugsnagClient = bugsnag({
        apiKey: process.env.MIX_BUGSNAG_API_KEY,
    })
    bugsnagClient.use(bugsnagVue, Vue);
}

Vue.use(VueRouter);

Vue.use(Vuex);
Vue.use(persistentState);
Vue.use(VeeValidate);
Vue.use(constants); //Constants as plugin
Vue.mixin(registerStoreModule);

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
Vue.directive('delete_gallery', hasPermission); // delete gallery
Vue.directive('getPermissionsByRole', hasPermission); // get permission by role
Vue.directive('setUnsetPermissionToRole', hasPermission); // set unset permission
Vue.directive('changePassword', hasPermission); // change password
Vue.directive('logout', hasPermission); // logout
Vue.directive('deleteAll', hasPermission); // delete all functionality


const app = new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#appMain');

/****Screen off after certain time****/
const eventsHub = new Vue();
Vue.use(IdleVue, {eventEmitter: eventsHub, idleTime: 600000});
/****Screen off after certain time****/

const version = "__VERSION__";
export {version};
