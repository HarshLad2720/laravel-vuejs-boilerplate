import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './user-store';
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
    }
});
