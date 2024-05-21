import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '../services/AuthService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
    },
    actions: {
        async login({ commit }, user) {
            const loggedInUser = await AuthService.login(user);
            commit('SET_USER', loggedInUser);
        },
        async register(_, user) {
            await AuthService.register(user);
        },
        logout({ commit }) {
            AuthService.logout();
            commit('SET_USER', null);
        },
    },
    getters: {
        isAuthenticated: state => !!state.user,
        userRole: state => (state.user ? state.user.role : null),
    },
});
