import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    projects
  },
  strict: process.env.NODE_ENV !== 'production'
})
