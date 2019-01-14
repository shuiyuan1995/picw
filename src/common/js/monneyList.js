import {get} from "@api";
import store from "@store";
import {SET_LOADING,SET_ROOM_RED_EVELOPE_LIST, SET_CLICK_ROOMID_RED_EVELOPE_LIST} from "@store/mutation-types";
import { Toast } from 'cube-ui'
// import {Notify, Loading} from 'quasar'
// 获取红包列表接口
const getMoneyListget = (once = false) => get('/get_money_list').then(json => {
  const {data} = json;
  let _roomid = 0;
  let redEnvelopeList = [];
  const {roomId} = store.state;
  // 判断是不是第一次加载红包
  if (once) {
    // 第一次加载红包列表
    _roomid = 0;
  }else {
    // 非第一次加载
    _roomid = roomId
  }
  // 焦点列表
  redEnvelopeList = data[_roomid];
  // 储存数据所有红包列表
  store.dispatch(SET_CLICK_ROOMID_RED_EVELOPE_LIST, {roomid: _roomid, redEnvelopeList});
  store.commit(SET_ROOM_RED_EVELOPE_LIST, data);
  if(!once){
    store.commit(SET_LOADING, false);
  }
})
.catch(() => {
  store.commit(SET_LOADING, false);
  const toast = Toast.$create({
    txt: '服务器错误，稍后再试！',
    time: 2000,
    type:'txt'
  })
  toast.show()
  // Notify.create({
  //   message: "服务器错误，稍后再试！",
  //   timeout: 1500,
  //   color: 'red',
  //   position:"center"
  // })
})

export default getMoneyListget