import Vue from 'vue'
import Vuex from 'vuex'
import snackbarStore from './snackbar-store.js';
import userStore from './user-store';
import roleStore from './role-store';
import VuexPersist from 'vuex-persist';

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
        roleStore
    }
});
