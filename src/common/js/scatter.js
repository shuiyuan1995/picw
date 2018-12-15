import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import store from "@store"
import {SET_OWNBALANCE, SET_EOSBALANCE, SET_CPU_NET, SET_LOGINOUT} from "@store/mutation-types";
import {Notify, Loading} from 'quasar'
import {getMoneyListget} from "./"

ScatterJS.plugins( new ScatterEOS() );
let chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
let endpoint = 'https://eospro.pickown.com';
let network = {
    blockchain: 'eos',
    host: 'eospro.pickown.com',
    port: "",
    chainId: chainId,
    protocol: "https",
    httpEndpoint : endpoint,
};

/**
 * 登陆scatter
 * @param {*} gameName 游戏名称
 * @returns
 */
const scatGameLogin = (gameName) => {
  return new Promise((resolve, reject) => {
    ScatterJS.scatter.connect(gameName).then(status => {
      if (!status) return reject("连接游戏失败");
      // 连接scatter网络
      ScatterJS.scatter.suggestNetwork(network).then(() => {
        const requirements = {accounts: [network]};
        // scatter 登陆获取用户信息
        ScatterJS.scatter.getIdentity(requirements).then(i => {
          if (!i) return reject("获取身份失败");
          // 获取登陆用户信息
          const account = i.accounts[0] || {};
          // 获取publicKey
          if (!account.publicKey) account.publicKey = i.publicKey
          // 登陆成功返回用户信息
          resolve(account);
        }).catch(() => {
          reject("获取用户信息失败")
        });
      }).catch(() => {
        reject("连击网络失败")
      });
    });
  })
}

/**
 * 推出游戏
 */
const scatGameLoginOut = () => {
  ScatterJS.scatter.forgetIdentity();
  // 推出登陆
  store.dispatch(SET_LOGINOUT);
  // 推出登陆重新获取红包列表
  getMoneyListget();
}

/**
 *  查询
 * @param {*} symbol 类型
 * @param {*} code code
 * @returns
 */
const getBalance = (symbol, code) => {
  return new Promise((resolve, reject) => {
    // 获取vuex用户信息
    const {userInfo} = store.state;
    if (JSON.stringify(userInfo) === "{}") return reject("请先登陆在查询");
    let eos = ScatterJS.scatter.eos(network, Eos);
    // 查询eos
    eos.getCurrencyBalance({
      code,
      account: userInfo.name,
      symbol
    })
    .then(result => {
      let balance = result[0] ? result[0].split(" ")[0] : "00.0000";
      resolve(balance);
    })
    .catch(err => reject(err))
  })
}

/**
 * 查询EosBalance同步vuex
 * @returns
 */
const scatGetEosBalance = () => {
  return getBalance("eos", "eosio.token")
    .then(eosbalance => store.commit(SET_EOSBALANCE, eosbalance))
    .catch(err => Notify.create({
      message: err,
      timeout: 1500,
      color: 'red',
      position:"center"
    }))
}

/**
 * 查询OwnBalance
 * @returns
 */
const scatGetOwnBalance = () => {
  return getBalance("OWN", "pickowntoken")
    .then(ownbalance => store.commit(SET_OWNBALANCE, ownbalance))
    .catch(err => Notify.create({
      message: err,
      timeout: 1500,
      color: 'red',
      position:"center"
    }))
}

// 查询EosBalance同步vuex， 查询OwnBalance
const scatGetAllBalance = () => {
  // EosBalance
  scatGetEosBalance();
  // OwnBalance
  scatGetOwnBalance();
}

/**
 * 用户cpu查询
 * @returns
 */
const scatGetAccount = () => {
  return new Promise((resolve, reject) => {
     // 获取vuex用户信息
    const {userInfo} = store.state;
    if (JSON.stringify(userInfo) === "{}") return reject("请先登陆在查询");
    let eos = ScatterJS.scatter.eos(network, Eos);
    eos.getAccount({
      account_name: userInfo.name
    })
    .then(json => {
      const {cpu_limit, net_limit} = json
      let cup = (cpu_limit.used / cpu_limit.max * 100) | 0;
      let net = (net_limit.used / net_limit.nax * 100) | 0
      // 设置SET_CPU_NET
      store.dispatch(SET_CPU_NET, {cup: cup > 100 ? 100 : cup, net: net > 100 ? 100 : net})
    })
    .catch(err =>Notify.create({
      message: err,
      timeout: 1500,
      color: 'red',
      position:"center"
    }))
  })
}

/**
 * 抢红包
 * @param roomId 红包唯一标识(number)
 * @param transferAmount 转账金额（string）例：1.0000 EOS
 * @param referral 推荐渠道账户（string）(可选)
 * @Result packetId 抢到的红包唯一标识
 * @Result block_num 抢到的红包高对应的块信息
 * @Result packetAmount 抢到的金额
 * @Result isBomb 是否踩雷（1踩雷）
 * @Result isLast 是否最后一个红包（1是最后一个）
 * @Result isLuck 是否幸运号码
 * @Result luckyAmount 幸运奖金
 * @Result own
 * @Result new_prize_pool
 * @Result old_prize_pool
 */
function scatSelectPacket(roomId, transferAmount, referral) {
  Loading.show();
  roomId = formatRoomId(roomId);
  const {name, authority} = store.state.userInfo;
  if (roomId === null) return Notify.create({
    message: "找不到对应红包",
    timeout: 1500,
    color: 'red',
    position:"center"
  });
  return new Promise(function (resolve, reject) {
    let eos = ScatterJS.scatter.eos(network, Eos);
    eos.transaction({
      actions: [{
        account: "eosio.token",
        name: 'transfer',
        authorization: [{
          actor: name,
          permission: authority
        }],
        data: {
          from: name,
          to: 'shuiyuan2345',
          quantity: '0.0001 EOS',
          memo: 'scatter 转账测试'
        }
      }]
    }).then(result => {
      Loading.hide();
      let consoleString = result.processed.action_traces[0].inline_traces[1].console;
      if (consoleString.indexOf("{") === -1) {
        reject(consoleString);
      }
      if (JSON.parse(consoleString).ERROR !== undefined) {
        resolve(analysisException(JSON.parse(consoleString).ERROR));
      } else {
        consoleString = consoleString.substring(consoleString.indexOf("{"), consoleString.indexOf("}") + 1);
        let response = {
          "packetId": JSON.parse(consoleString).packet_id,
          "block_num": result.processed.action_traces[0].block_num,
          "packetAmount": JSON.parse(consoleString).packet_amount,
          "isBomb": JSON.parse(consoleString).bomb,
          "isLast": JSON.parse(consoleString).is_last,
          "isLuck": JSON.parse(consoleString).luck,
          "luckyAmount": JSON.parse(consoleString).prize_amount,
          "own": JSON.parse(consoleString).own_mined,
          "newPrizePool": JSON.parse(consoleString).new_prize_pool,
          "oldPrizePool": JSON.parse(consoleString).old_prize_pool
        };
        resolve(response);
      }
    }).catch(error => {
      Loading.hide();
      console.log(error)
      if (typeof error !== "object" && JSON.parse(error)) {
        const {code} = JSON.parse(error).error;
        reject(code);
      } else {
        if (error.code === 402) return reject(3123456)
        else reject(3123457)
      }
    });
  });
}

// 红包号码
function formatRoomId(roomId){
  let length = roomId.toString().length;
  let z = 6 - length;
  if(z === 1) return "0" + roomId;
  else if(z === 2) return "00" + roomId;
  else if(z === 3) return "000" + roomId;
  else if(z === 4) return "0000" + roomId;
  else if(z === 5) return "00000" + roomId;
  else return null;
}


 export {
  scatGameLogin,
  scatGameLoginOut,
  scatGetAllBalance,
  scatSelectPacket,
  scatGetAccount
 }