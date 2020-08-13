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
import persistentState from 'vue-persistent-state';
// import VeeValidate from 'vee-validate';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(persistentState);
/*Vue.use(Vuetify);*/
// Vue.use(VeeValidate);
const app = new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#appMain');

const version = "__VERSION__";
export {version};
