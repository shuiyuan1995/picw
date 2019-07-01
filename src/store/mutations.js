import * as types from "./mutation-types";

const mutations = {
  // 设置loading开关
  [types.SET_LOADING](state, loading) {
    state.loading = loading;
  },
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
  // 设置房间列表
  [types.SET_ROOMLIST](state, roomList) {
    state.roomList = roomList;
  },
  // 设置红包焦点列表
  [types.SET_ACTIVE_RED_EVELOPE_LIST](state, redEnvelopeList) {
    // state.redEnvelopeList = [];
    state.redEnvelopeList = redEnvelopeList;
  },
  // 设置所有房间红包列表
  [types.SET_ROOM_RED_EVELOPE_LIST](state, roomRedEnvelopeList) {
    state.roomRedEnvelopeList = roomRedEnvelopeList;
  },
  // 设置侧边栏显示隐藏
  [types.SET_GOOGLE_MENU](state, status) {
    state.menuStatus = status;
  },
  // 设置邀请人名字
  [types.SET_INVITE_NAME](state, inviteName) {
    state.inviteName = inviteName;
  },
  // 设置展示数据,累计发红包，幸运奖池，玩家数，交易金额
  [types.SET_ALL_INFO](state, info) {
    state.allInfo = info;
  },
  // 设置自己发红包id
  [types.SET_MY_SEND](state, id) {
    state.mysend = [
      ...state.mysend,
      id
    ];
  },
  //设置抢红包结果
  [types.SET_RED_RESULTS](state, obj) {
    state.redresults = obj;
  },
  //设置当前币种
  [types.SET_THISMONEY](state, str) {
    state.thismoney = str;
  },
  //设置发抢红包记录状态
  [types.SET_THISJULU](state, num) {
    state.thisjilu = num;
  }
};

export default mutations;
