import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    raspisanie: [],
    groupResultArray: [],
    // groupId: null,
    groupId: null,
    isListVis: false,
    isResultVis: false,
    isGroupFound: false,
    page: []
  },
  mutations: {
    SET_GROUP_LESSON: (state, id) => {
      state.groupId = id
      //console.log(state.groupId)
    },
    SET_LIST_VISIBLE: (state, isListVis) => {
      state.isListVis = isListVis
      //console.log(state.groupId)
    },
    SET_RESULT_VISIBLE: (state, isResultVis) => {
      state.isResultVis = isResultVis
      //console.log(state.groupId)
    },
    SET_GROUP_FOUND: (state, boolean) => {
      state.isGroupFound = boolean
    },
    SET_GROUP_ROZKALD: (state, response) => {
      state.raspisanie = response.data.data
    },
    SET_RESULT_GROUP_ARRAY: (state, response) => {
      state.groupResultArray = response

    },
    SET_PARSE_PAGE: (state, response) => {
      console.log('state.page = response')
      state.page = response
    }



  },
  actions: {
    GET_GROUP_NAME({
      commit
    }, id) {
      commit("SET_GROUP_LESSON", id)
    },
    CHANGE_LIST_VIS({
      commit
    }, isListVis) {
      commit("SET_LIST_VISIBLE", isListVis)
    },
    CHANGE_REZULT_VIS({
      commit
    }, isResultVis) {
      commit("SET_RESULT_VISIBLE", isResultVis)
    },
    CHANGE_GROUP_FOUND({
      commit
    }, boolean) {
      commit("SET_GROUP_FOUND", boolean)
    },
    GET_GROUP_ROZKALD({
      commit,
      state
    }) {
      return axios(
          "http://api.rozklad.org.ua/v2/groups/" +
          state.groupId +
          "/lessons", {
            method: "GET",
          }
        )
        .then((response) => {
          if (response.message == 'Lessons not found') {
            commit("SET_GROUP_FOUND", true)
          }
          commit("SET_GROUP_ROZKALD", response)
          commit("SET_RESULT_VISIBLE", true),
            commit("SET_GROUP_FOUND", false)
          //vm.raspisanie = response.data.data;
        })
        .catch((error) => (
          commit("SET_GROUP_FOUND", true),
          commit("SET_RESULT_VISIBLE", false)



        ));
    },
    SEARCH_GROUP({
      commit
    }, groupNameForQuery) {
      console.log(groupNameForQuery)

      return axios("http://api.rozklad.org.ua/v2/groups/?search={'query':'" + groupNameForQuery + "'}", {
          method: "GET"
        })
        .then((response) => {
          commit("SET_RESULT_GROUP_ARRAY", response.data.data)
          // photoFeed = response.data.data;
          commit("SET_GROUP_FOUND", false)
          //this.CHANGE_GROUP_FOUND(false)
        })
        .catch((error) => (
          commit("SET_GROUP_FOUND", true),
          commit("SET_GROUP_LESSON", null),
          commit("SET_RESULT_VISIBLE", false),


          commit("SET_RESULT_GROUP_ARRAY", [])

        ));

    },

    GET_PARSE_PAGE({
      commit
    }) {

      return axios("http://rozklad.kpi.ua/Schedules/ViewSessionSchedule.aspx?g=f7d870b3-3e81-4133-a4b3-90eed09aa8a8", {
          method: "GET",
          dataType: 'jsonp',
          mode: 'cors',
          credentials: 'include'
        })
        .then((response) => {
          onsole.log('Good')
        })
        .catch((error) => (
          console.log('Error')

        ));


    },















  },
  getters: {
    RETURN_GROUP_NAME(state) {
      return state.groupId
    },
    RETURN_LIST_VIS(state) {
      return state.isListVis
    },
    RETURN_REZULT_VIS(state) {
      return state.isResultVis
    },
    IS_GROUP_FOUND(state) {
      return state.isGroupFound
    },
    RASPISANIE_ARRAY(state) {
      return state.raspisanie
    },
    REZULT_ARRAY(state) {
      return state.groupResultArray;
    }
  }
})