import Vue from 'vue'
import Vuex from 'vuex'
import snackbarStore from './snackbar-store.js';
import userStore from './user-store';
import roleStore from './role-store';
import VuexPersist from 'vuex-persist';
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import forgotPasswordStore from './forgot-password-store';
import changePasswordStore from './change-password-store';

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'demo',
    storage: localStorage
});


export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: {
        userStore,
        snackbarStore,
        roleStore,
        htmlClass,
        config,
        breadcrumbs,
        forgotPasswordStore,
        changePasswordStore
    }
});
