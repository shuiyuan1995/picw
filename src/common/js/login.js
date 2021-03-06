import {scatGameLogin, scatGetAllBalance, getMoneyListget, scatGetAccount, scatSelectPacket} from "./"
import store from "@store"
import {SET_USER_INFO, SET_TOKEN, SET_INVITE_NAME,SET_ACTIVE_RED_EVELOPE_LIST} from "@store/mutation-types";
import {Loading, Notify} from 'quasar'
import {get} from '@api';
import router from '@router'

// 登陆封装
const login = (cp) => {
  Loading.show();
  scatGameLogin("PickOwn").then(account => {
    const {publicKey, name} = account;
    const {inviteName,redEnvelopeList} = store.state;
    const {ref} = router.history.current.query;
    console.log(ref)
    if(!inviteName){
      // 获取邀请人参数
      ref && store.commit(SET_INVITE_NAME, ref);
      console.log(ref)
    }
    // 邀请人判断
    if(name == ref){
      store.commit(SET_INVITE_NAME, "");
    }
    // 同步用户信息
    store.commit(SET_USER_INFO, {
      ...account,
      islogin: true
    });
    // 查询用户cpu
    scatGetAccount();
    // 获取EOSBALANCE,OWNBALANCE
    scatGetAllBalance();
    // 登陆后台
    get("/login",{
      name: name,
      publickey: publicKey,
      addr: inviteName
    }).then(json =>{
      const {token} = json.data || {};
      isbian(redEnvelopeList,true)
      // 设置token
      store.commit(SET_TOKEN, token);
      // 登陆成功获取一次红包信息
      getMoneyListget();
    }).catch(err => {
      Loading.hide();
      isbian(redEnvelopeList,false)
      Notify.create({
        message: "服务器错误，稍后再试！",
        timeout: 1500,
        color: 'red',
        position:"center"
      })
    });
  }).catch(err => {
    Loading.hide();
    if(err == 101){
      cp&&cp()
      return false
    }
    Notify.create({
      message: err||"服务器错误，稍后再试！",
      timeout: 1500,
      color: 'red',
      position:"center"
    })
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