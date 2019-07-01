import {addwlist,scatGameLogin, scatGetAllBalance, getMoneyListget, scatGetAccount, scatSelectPacket} from "./"
import store from "@store"
import {SET_USER_INFO, SET_ALL_INFO, SET_INVITE_NAME,SET_ACTIVE_RED_EVELOPE_LIST,SET_LOADING} from "@store/mutation-types";
import { Toast } from 'cube-ui'
import {post} from '@api';

// 登陆封装
const login = (cp,cb) => {
  store.commit(SET_LOADING, true);
  scatGameLogin("PickOwn").then(account => {
    const {publicKey, name} = account;
    const {inviteName,redEnvelopeList} = store.state;
    // 邀请人判断
    if(name == inviteName){
      store.commit(SET_INVITE_NAME, "");
    }
    // 同步用户信息
    store.commit(SET_USER_INFO, {
      ...account,
      islogin: true
    });
    post("/login",{
      name: name,
      publickey: publicKey,
      addr: inviteName
    }).then(json =>{
      const {user_money,user_send_num} = json.data
      let data = {
        ...store.state.allInfo,
        user_money:user_money,
        user_send_num:user_send_num
      }
      store.commit(SET_ALL_INFO, data);
      getMoneyListget();
      cp&&cp()
    }).catch(err =>{
      store.commit(SET_LOADING, false);
      cb&&cb()
      console.log('err' ,err)
    })
    // 查询用户cpu
    // scatGetAccount();
    // 获取EOSBALANCE,OWNBALANCE
    // scatGetAllBalance();
    // 登陆后台
    // post("/login",{
    //   name: name,
    //   publickey: publicKey,
    //   addr: inviteName
    // }).then(json =>{
    // store.commit(SET_LOADING, false);
    // //   const {token} = json.data || {};
    // //   isbian(redEnvelopeList,true)
    // //   // 登陆成功获取一次红包信息
    //   getMoneyListget();
    // // }).catch(err => {
    // //   store.commit(SET_LOADING, false);
    // //   isbian(redEnvelopeList,false)
    // //   const toast = Toast.$create({
    // //     txt: "服务器繁忙，稍后再试！",
    // //     time: 2000,
    // //     type:'txt'
    // //   })
    // //   toast.show()
    // // });
    // }).catch(err => {
    //   console.log('err' ,err)
    //   // store.commit(SET_LOADING, false);
    //   // if(err == 101){
    //   //   cp&&cp()
    //   //   return false
    //   // }
    //   // const toast = Toast.$create({
    //   //   txt: "服务器繁忙，稍后再试！",
    //   //   time: 2000,
    //   //   type:'txt'
    //   // })
    //   // toast.show()
    // })
  }).catch(err=>{
    store.commit(SET_LOADING, false);
    cb&&cb()
  })
}

function isbian(redEnvelopeList,b){
  // 红包变灰
  let arr = []
  for(let i = 0;i<redEnvelopeList.length;i++){
    arr[i] = {
      ...redEnvelopeList[i],
      isgo: b?1:0
    }
  }
  console.log(arr)
  store.commit(SET_ACTIVE_RED_EVELOPE_LIST, arr);
}

export default login;