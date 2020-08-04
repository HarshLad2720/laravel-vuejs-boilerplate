require('./bootstrap');
import router from "./router";
import Vue from 'vue';
import App from './components/App.vue';
import Vuetify from '../../node_modules/vuetify'
import store from './store/store';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(Vuetify);
const app = new Vue({
    router,
    store,
    vuetify:new Vuetify(),
    render: h => h(App)
}).$mount('#appMain');

/*const version = "__VERSION__";
export {version};*/
