//import api from 'api';
const state = {
    socket: null
};

const getters = {
    socket: state => {
        return state.socket;
    }
};

const actions = {
    getSocket ({ commit }) {
        var socket = io();
        commit('setSocket', socket);
    }
};

const mutations = {
    setSocket (state,socket) {
        state.socket = socket;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};