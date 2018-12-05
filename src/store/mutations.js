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
        state.packages.data[data.index] = [...state.packages.data[data.index],data.data]
      }else{
        state.packages.data[data.index][0] = data.data
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
  [types.SET_CHANGE](state,obj) {
    state.change = {
      ...state.change,
      ...obj
    }
  },
  [types.SET_INFO](state,obj) {
    if(typeof obj[0] == 'number') {
      state.info.newmore[obj[0]] = obj[1]
    }else{
      state.info = {
        ...state.info,
        ...obj
      }
    }
  },
};

export default mutations;
