import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sidebarIsActive: false
    },
    mutations: {
        sidebarToggleActive(state) {
            state.sidebarIsActive = !state.sidebarIsActive
        }
    }
})