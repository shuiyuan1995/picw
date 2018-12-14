import {scatGameLogin, scatGetAllBalance, getMoneyListget, scatGetAccount, scatSelectPacket} from "./"
import store from "@store"
import {SET_USER_INFO, SET_TOKEN} from "@store/mutation-types";
import {Loading, Notify} from 'quasar'
import {get} from '@api';

// 登陆封装
const login = () => {
  Loading.show();
  scatGameLogin("PickOwn").then(account => {
    console.log(account)
    const {publicKey, name} = account;
    // 同步用户信息
    store.commit(SET_USER_INFO, {
      ...account,
      islogin: true
    });
    // 查询用户cpu
    scatGetAccount();
    // 获取EOSBALANCE,OWNBALANCE
    scatGetAllBalance();
    scatSelectPacket(42, "0.0001e", "22")
    // 登陆后台
    get("/login",{
      name,
      publickey: publicKey,
      addr: ""
    }).then(json =>{
      const {token} = json.data || {};
      // 设置token
      store.commit(SET_TOKEN, token);
      Loading.hide();
      // 登陆成功获取一次红包信息
      getMoneyListget();
    }).catch(err => {
      Loading.hide();
      Notify.create({
        message: "服务器错误，稍后再试！",
        timeout: 1500,
        color: 'red',
        position:"center"
      })
    });
    Loading.show();
  }).catch(err => {
    Loading.hide();
    Notify.create({
      message: "服务器错误，稍后再试！",
      timeout: 1500,
      color: 'red',
      position:"center"
    })
  })
}

export default login;