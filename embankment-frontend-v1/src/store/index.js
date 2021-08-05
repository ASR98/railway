import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chainage_values : [],
    ground_levels: [],
    final_calculation_values: [],
    constant_values: []
  },
  mutations: {
    set_chainage_values(state, chainageValues){
      state.chainage_values = chainageValues;
    },
    set_ground_levels(state, groundLevels) {
      state.ground_levels = groundLevels;
    },
    set_final_calculation_values(state, finalCalculationValues){
      state.final_calculation_values = finalCalculationValues;
    },
    set_constant_values(state, constantValues){
      state.constant_values = constantValues;
    }
  },
  actions: {
  },
  modules: {
  }
})
