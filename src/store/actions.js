import * as types from "./mutation-types";

const actions = {
  [types.SET_CPU_NET]({commit}, {cup, net}) {
    commit(types.SET_CPU, cup);
    commit(types.SET_NET, net);
  },
  // 推出登陆删除所有信息
  [types.SET_LOGINOUT]({commit}) {
    commit(types.SET_CPU, 0);
    commit(types.SET_NET, 0);
    commit(types.SET_EOSBALANCE, "00.0000")
    commit(types.SET_OWNBALANCE, "00.0000")
    commit(types.SET_USER_INFO, {});
    commit(types.SET_TOKEN, "");
  },
  // 设置红包焦点列表，房间id
  [types.SET_CLICK_ROOMID_RED_EVELOPE_LIST]({commit}, {roomid, redEnvelopeList}) {
    commit(types.SET_ROOMID, roomid);
    commit(types.SET_ACTIVE_RED_EVELOPE_LIST, redEnvelopeList);
  }
};

export default actions;