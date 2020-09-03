import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

// theme store file
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";


// module store
import snackbarStore from './snackbar-store.js';
import userStore from './user-store';
import roleStore from './role-store';
import forgotPasswordStore from './forgot-password-store';
import changePasswordStore from './change-password-store';
import permissionStore from './permission-store';
import countryStore from './country-store';
import cityStore from './city-store';
import stateStore from './state-store';
import hobbyStore from './hobby-store';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'demo',
    storage: localStorage
});


export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: {
        htmlClass,
        config,
        breadcrumbs,
        userStore,
        snackbarStore,
        roleStore,
        forgotPasswordStore,
        changePasswordStore,
        permissionStore,
        countryStore,
        cityStore,
        stateStore,
        hobbyStore
    }
});
