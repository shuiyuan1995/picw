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
  },
  // 设置焦点红包同步所有房间红包列表
  [types.SET_ROOM_RED_EVELOPE_LIST_UPDATA]({commit, state}, {packetData, index}) {
    const {roomRedEnvelopeList, roomId} = state;
    // 复制单个房间红包
    let _ItemRoomRedEnvelopeList = [
      ...roomRedEnvelopeList[index]
    ]
    _ItemRoomRedEnvelopeList.push(packetData);
    // 复制所有红包
    let _roomRedEnvelopeList = [
      ...roomRedEnvelopeList
    ]
    // 更新所有红包
    _roomRedEnvelopeList[index] = _ItemRoomRedEnvelopeList;
    // 改变所有红包
    commit(types.SET_ROOM_RED_EVELOPE_LIST, _roomRedEnvelopeList);
    // 修改焦点红包
    commit(types.SET_ACTIVE_RED_EVELOPE_LIST, _roomRedEnvelopeList[roomId]);
  }
};

export default actions;