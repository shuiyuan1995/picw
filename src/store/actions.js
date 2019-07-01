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
  /**
   * 添加单个红包到对应房间
   * @param {*} {commit, state}
   * @param {*} {packetData, index} 红包数据, 房间id
   */
  [types.SET_ROOM_RED_EVELOPE_LIST_UPDATA]({commit, state}, {packetData, index}) {
    const {roomRedEnvelopeList, roomId} = state;
    // 复制单个房间红包
    let _ItemRoomRedEnvelopeList = roomRedEnvelopeList[index]? [
      ...roomRedEnvelopeList[index]
    ] : [];
    _ItemRoomRedEnvelopeList = [
      ..._ItemRoomRedEnvelopeList,
      packetData
    ]
    // 复制所有红包
    let _roomRedEnvelopeList = {
      ...roomRedEnvelopeList
    }
    // 更新所有红包
    _roomRedEnvelopeList[index] = _ItemRoomRedEnvelopeList;
    // 改变所有红包
    commit(types.SET_ROOM_RED_EVELOPE_LIST, _roomRedEnvelopeList);
    // 修改焦点红包
    commit(types.SET_ACTIVE_RED_EVELOPE_LIST, _roomRedEnvelopeList[roomId]);
  },
  /**
   * 修改已抢完红包状态
   * @param {*} {commit}
   * @param {*} {roomId, index, packetData}房间id，红包索引，红包数据
   */
  [types.SET_ROOM_RED_EVELOPE_EXPIRED]({commit,state}, {roomId, index, packetData,type}) {
    const {roomRedEnvelopeList} = state;
    // 复制单个房间红包
    let _ItemRoomRedEnvelopeList = [
      ...roomRedEnvelopeList[roomId]
    ]
    if(type==2){
      _ItemRoomRedEnvelopeList[index] = {
        ...packetData,
        isgo: 1,
        none: 1
      };
    }else{
      _ItemRoomRedEnvelopeList[index] = {
        ...packetData,
        isgo: 1
      };
    }
    // 复制所有红包
    let _roomRedEnvelopeList = {
      ...roomRedEnvelopeList
    }
    // 更新所有红包
    _roomRedEnvelopeList[roomId] = _ItemRoomRedEnvelopeList;
    // 改变所有红包
    commit(types.SET_ROOM_RED_EVELOPE_LIST, _roomRedEnvelopeList);
    // 修改焦点红包
    commit(types.SET_ACTIVE_RED_EVELOPE_LIST, _roomRedEnvelopeList[state.roomId]);
  }
};

export default actions;