
import Vuex from 'vuex';
import {DefineActions, DefineGetters, DefineMutations} from 'vuex-type-helper';

export interface State {
    name: string;
}

export interface Getters {
    name: string;
}

export interface Mutations {
    name: {
        name: string,
    };
}

export interface Actions {
    name: {
        name: string,
    };
}

const state: State = {
    name: 'World',
};

const getters: DefineGetters<Getters, State> = {
    name: (mewState) => mewState.name,
};

const mutations: DefineMutations<Mutations, State> = {
    name(newState, {name}) {
        newState.name = name;
    },
};

const actions: DefineActions<Actions, State, Mutations, Getters> = {
    name({ commit }, payload) {
        commit('name', payload);
    },
};

export const {
    mapState,
    mapGetters,
    mapMutations,
    mapActions,
} = Vuex.createNamespacedHelpers<State, Getters, Mutations, Actions>('sensor');

export const sensor = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
