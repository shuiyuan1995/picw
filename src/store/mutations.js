import * as types from "./mutation-types";

const mutations = {
  [types.SET_LANGUAGE](state, Language) {
    state.language = Language;
  },
  [types.THIS_LANGUAG](state, index) {
    state.thislang = state.language[index];
  },
  [types.SET_PACKAGE](state,data) {
    if(data.index || data.index == 0){
      if(state.packages.data[data.index]){
        state.packages.data[data.index] = [
          ...state.packages.data[data.index],
          data.data
        ]
      }
    }else{
      state.packages.data = data
    }
  },
  [types.SET_PACKI](state,i) {
    state.packages.this = i
  },
  [types.SET_PACKIA](state,i) {
    state.packages.all = i
  },
  [types.SET_INFO](state,obj) {
    state.info = {
      ...state.info,
      ...obj
    }
  },
  [types.SET_PACKDATA](state,obj) {
    state.packages.data[obj.index][obj.index1] = {
      ...state.packages.data[obj.index][obj.index1],
      ...obj.data
    }
  },
  [types.SET_PACKDATAL](state,obj) {
    state.packages.thisdata = obj
  },
};

export default mutations;
