import Vue from 'vue'
import Vuex from 'vuex'
import coins from './modules/coins'
import contract from './modules/contract'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        coins,
        contract,
        login
    },
})