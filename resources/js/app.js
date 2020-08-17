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
import constants from './common_services/constantPlugin';
import persistentState from 'vue-persistent-state';
// import VeeValidate from 'vee-validate';
import VeeValidate from 'vee-validate';
import { InlineSvgPlugin } from "vue-inline-svg";
// import PerfectScrollbar from "perfect-scrollbar";


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
Vue.use(persistentState);
/*Vue.use(Vuetify);*/
Vue.use(VeeValidate);
Vue.use(InlineSvgPlugin);

// Perfect scrollbar
Vue.use(PerfectScrollbar);

// Install BootstrapVue
Vue.use(BootstrapVue);

const app = new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#appMain');

const version = "__VERSION__";
export {version};
