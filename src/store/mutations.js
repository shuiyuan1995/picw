import * as types from "./mutation-types";

const mutations = {
  // 设置token
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  // 设置用户信息
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 设置eosbalance
  [types.SET_EOSBALANCE](state, eosbalance) {
    state.eosbalance = eosbalance;
  },
  // 设置ownbalance
  [types.SET_OWNBALANCE](state, ownbalance) {
    state.ownbalance = ownbalance;
  },
   // 设置用户cpu
  [types.SET_CPU](state, cpu) {
    state.cpu = cpu | 0;
  },
  // 设置用户net
  [types.SET_NET](state, net) {
    state.net = net | 0;
  },
  // 设置房间id
  [types.SET_ROOMID](state, roomId) {
    state.roomId = roomId;
  },
  // 设置红包焦点列表
  [types.SET_ACTIVE_RED_EVELOPE_LIST](state, redEnvelopeList) {
    state.redEnvelopeList = redEnvelopeList;
  },
  // 设置所有房间红包列表
  [types.SET_ROOM_RED_EVELOPE_LIST](state, roomRedEnvelopeList) {
    state.roomRedEnvelopeList = roomRedEnvelopeList;
  },
  // 设置侧边栏显示隐藏
  [types.SET_GOOGLE_MENU](state, status) {
    state.menuStatus = status;
  }
};

export default mutations;
