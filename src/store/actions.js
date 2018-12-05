import * as types from "./mutation-types";

const actions = {
  languageAsyn({commit}, {Language,index}) {
    commit(types.SET_LANGUAGE, Language);
    commit(types.THIS_LANGUAG, index);
  }
};

export default actions;