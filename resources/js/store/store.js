import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import userStore from './user-store';

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'demo',
    storage: localStorage
});


export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: {
        userStore
    }
});
