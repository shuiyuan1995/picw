import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import store from "@store"
import {SET_OWNBALANCE, SET_EOSBALANCE, SET_CPU_NET, SET_LOGINOUT, SET_LOADING} from "@store/mutation-types";
import { Toast } from 'cube-ui'
import {getMoneyListget} from "./"

ScatterJS.plugins( new ScatterEOS() );
// let chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
// let endpoint = 'https://eospro.pickown.com';
// let network = {
//     blockchain: 'eos',
//     host: 'eospro.pickown.com',
//     port: "",
//     chainId: chainId,
//     protocol: "https",
//     httpEndpoint : endpoint,
// };
let chainId = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';
let endpoint = 'http://35.197.130.214:8888';
let network = {
    blockchain: 'eos',
    host: '35.197.130.214',
    port: "8888",
    chainId: chainId,
    protocol: "http",
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
      if (!status) return reject(101);
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
          reject("登录失败")
        });
      }).catch(() => {
        reject("链接网络失败")
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
const getBalance = (symbol, code,name) => {
  return new Promise((resolve, reject) => {
    // 获取vuex用户信息
    const {userInfo} = store.state;
    if (JSON.stringify(userInfo) === "{}") return reject("请先登陆在查询");
    let eos = ScatterJS.scatter.eos(network, Eos);
    // 查询eos
    eos.getCurrencyBalance({
      code,
      account: name?name:userInfo.name,
      symbol
    })
    .then(result => {
      console.log(symbol,result)
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
    .catch(err => console.log(err))
}

/**
 * 查询OwnBalance
 * @returns
 */
const scatGetOwnBalance = () => {
  return getBalance("OWN", "pickowntoken")
    .then(ownbalance => store.commit(SET_OWNBALANCE, ownbalance))
    .catch(err => console.log(err))
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
    .catch(err => console.log(err))
  })
}

/**
 * 创建红包
 * @param amount 金额(number)
 * @param bomb 踩雷号码(number)
 * @Result packetId 红包唯一标识
 * @Result txId 红包对应的区块
 * @Result referralFee
 */
function scatcreateRedPacket(amount, bomb) {
  console.log(amount, bomb)
  store.commit(SET_LOADING, true);
  const {name, authority} = store.state.userInfo;
	return new Promise(function (resolve, reject) {
      let eos = ScatterJS.scatter.eos(network, Eos);
      console.log(amount, bomb)
			eos.transaction({
        actions: [
          {
            account: "eosio.token",
            name: 'transfer',
            authorization: [{
              actor: name,
              permission: authority
            }],
            data: {
              from: name,
              to: "pickowngames",
              quantity: amount>=1?amount+".0000 EOS":amount+"000 EOS",
              memo: "create:" + bomb
            }
          }
        ]
			}).then(result => {
        store.commit(SET_LOADING, false);
        let consoleJson = JSON.parse(result.processed.action_traces[0].inline_traces[1].console);
        if (consoleJson.ERROR !== undefined) {
          reject(3123457);
        } else {
          let response = {
            "packetId": consoleJson.packet_id,
            "txId": result.transaction_id
          };
          resolve(response);
        }
			}).catch(error => {
        console.log(error)
        store.commit(SET_LOADING, false);
        if (typeof error !== "object") {
          const {code} = JSON.parse(error).error;
          reject(code);
        } else {
          if (error.code === 402) return reject(3123458)
          reject(3123457)
        }
			});
	});
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
  console.log(roomId)
  roomId = formatRoomId(roomId);
  console.log(roomId)
  const {name, authority} = store.state.userInfo;
  return new Promise(function (resolve, reject) {
    if (roomId === null) {
      return reject(3123457)
    }
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
          to: "pickowngames",
          quantity: transferAmount,
          memo: referral === undefined ? "select:" + roomId : "select:" + roomId + ":" + referral
        }
      }]
    }).then(result => {
      console.log(result)
      let consoleString = result.processed.action_traces[0].inline_traces[1].console;
      if (consoleString.indexOf("Cannot find Packet") > -1) {
        return reject(3123456);
      }else if(consoleString.indexOf("Packet size not equal to transfer amount") > -1){
        return reject(3123455)
      }else{
        resolve()
      }
      // let consoleString = result.processed.action_traces[0].inline_traces[1].console;
      // if (consoleString.indexOf("Cannot find Packet") > -1) {
      //   return reject(3123456);
      // }
      // if (consoleString.indexOf("{") === -1) {
      //   reject(consoleString);
      // }
      // if (JSON.parse(consoleString).ERROR !== undefined) {
      //   reject(analysisException(JSON.parse(consoleString).ERROR));
      // } else {
      //   consoleString = consoleString.substring(consoleString.indexOf("{"), consoleString.indexOf("}") + 1);
      //   let response = {
      //     "packetId": JSON.parse(consoleString).packet_id,
      //     "block_num": result.processed.action_traces[0].block_num,
      //     "packetAmount": JSON.parse(consoleString).packet_amount,
      //     "isBomb": JSON.parse(consoleString).bomb,
      //     "isLast": JSON.parse(consoleString).is_last,
      //     "isLuck": JSON.parse(consoleString).luck,
      //     "luckyAmount": JSON.parse(consoleString).prize_amount,
      //     "own": JSON.parse(consoleString).own_mined,
      //     "txid": JSON.parse(consoleString).txid,
      //     "newPrizePool": JSON.parse(consoleString).new_prize_pool,
      //     "oldPrizePool": JSON.parse(consoleString).old_prize_pool
      //   };
      //   resolve(response);
      // }
    }).catch(error => {
      console.log(error)
      store.commit(SET_LOADING, false);
      if (typeof error !== "object") {
        const {code} = JSON.parse(error).error;
        reject(code);
      } else {
        if (error.code === 402) return reject(3123458)
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
function analysisException(e) {
  if (e === 'NO_ROOM') {
    return 3123456;
  }
  if (e === 'NO_REF') {
    return 10001;
  }
  if (e === 'WITHDRAW_VAL_IS_ZERO') {
    return 10002;
  }
  return 3123457
}
/**
 * 领渠道奖励
 */
function scatWithdrawref() {
  const {userInfo} = store.state;
	return new Promise(function (resolve, reject) {
    let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: "pickowngames",
				name: 'withdrawref',
				authorization: [{
					actor: userInfo.name,
					permission: userInfo.authority
				}],
				data: {
					"user": userInfo.name
				}
			}]
		}).then(result => {
			console.log(result);
			let consoleString = result.processed.action_traces[0].console;
			if (JSON.parse(consoleString).ERROR !== undefined) {
				reject(analysisException(JSON.parse(consoleString).ERROR));
			} else {
				resolve(JSON.parse(consoleString).value);
			}
		}).catch(e => {
			reject(e.message)
		});
	})
}

/**
 * 发红包榜单
 */
function scatRedPacketList() {
  const {userInfo} = store.state;
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: "pickowngames",
				name: 'printboard',
				authorization: [{
					actor: userInfo.name,
					permission: userInfo.authority
				}],
				data: {}
			}]
		}).then(result => {
			resolve(JSON.parse(result.processed.action_traces[0].console).data);
		}).catch(e => {
      console.log('e: ', e);
      if(e.code == 402){
        store.commit(SET_LOADING, false);
        return false
      }
			reject(e.message)
		});
	})
}

/**
 * 添加白名单
 * @param contractOwner 合约所有者
 * @param user 需要添加的账户
 */
function addwlist(){
  console.log(11)
  const {userInfo} = store.state;
  return new Promise(function (resolve, reject) {
      let eos = ScatterJS.scatter.eos(network, Eos);
      eos.contract("pickowngames").then(result => {
        // console.log("result",result)
        // console.log('result.addwlist',result.addwlist)
        result.addwlist(userInfo.name, {
          authorization: [{
              actor: userInfo.name,
              permission: userInfo.authority
          }]
        }).then((v) => {
          console.log(v)
            resolve(true);
        }).catch(e => {
          console.log(e)
            reject(e)
        });
      }).catch(e=>{
        console.log(e)
        reject(e)
      });
  })
}

/**
*查询分红表的数据
*@param contractOwner 合约名称(String)
*@param table 表名(String)
*/
function bonustable(table){
  const {name} = store.state.userInfo;
  return new Promise(function (resolve, reject) {
      let eos = ScatterJS.scatter.eos(network, Eos);
      eos.getTableRows({
        "code": 'pickownbonus',
        "scope": 'pickownbonus',
        "table": table,
        "json":true,
        "lower_bound":name,
        'limit':1
      }).then(rs => {
        console.log('rs: ', rs);
        if(rs.rows.length>0){
          resolve(rs.rows[0])
        }else{
          resolve('')
        }
      })
      .catch(e => console.log(e))
  })
}

/**
*查询排行榜表
*@param contractOwner 合约名称(String)
*@param table 表名(String)
*/
function userboard(table,contractOwner){
  const {name} = store.state.userInfo;
  return new Promise(function (resolve, reject) {
    let eos = ScatterJS.scatter.eos(network, Eos)
    eos.getTableRows({
      "code": contractOwner,
      "scope": contractOwner,
      "table": table,
      "json":true,
    }).then(rs => {
      console.log('panhang',rs)
      if(rs.rows.length>0){
        resolve(rs.rows[0])
      }else{
        resolve('')
      }
    })
    .catch(e => console.log(e))
  })
}

/**
 * 质押OWN
 * @param OWN 质押金额
 */
function pledgeOWN(OWN){
  const {name, authority} = store.state.userInfo;
  return new Promise(function (resolve, reject) {
    let eos = ScatterJS.scatter.eos(network, Eos);
    console.log(OWN)
    eos.transaction({
      actions: [{
        account: "pickowntoken",
        name: 'transfer',
        authorization: [{
          actor: name,
          permission: authority
        }],
        data: {
          from: name,
          to: "pickownbonus",
          quantity: OWN,
          memo:""
        }
      }]
    }).then(json => {
      console.log(json)
      resolve()
    })
    .catch(e => {
      if(e.code == 402) return false
      reject()
    })
  })
}
/**
 * 提取用户的分红
 * @param user 账户名
 * @param contractOwner 建立该合约的账户名(string)
 */
function wdbonus() {
  const {name, authority} = store.state.userInfo;
  return new Promise(function (resolve, reject) {
    let eos = ScatterJS.scatter.eos(network, Eos);
    eos.transaction({
      actions: [
        {
          account: 'pickownbonus',
          name: 'wdbonus',
          authorization: [{
            actor: name,
            permission: authority
          }],
          data: {
            "user": name
          }
        }
      ]
    }).then(result => {
      console.log(result);
      console.log(result);
      if (result !== undefined) {
        resolve("wdbonus success");
      }else{
        resolve()
      }
    }).catch(e => {
      reject(e)
    });
  })
}
/**
* 提取质押的own
* @param String user 账户名  
* @param String amount own数量
* @param String contractOwner 建立该合约的账户名(string)
*/
function withdrawown(amount) {
  const {name, authority} = store.state.userInfo;
  return new Promise(function (resolve, reject) {
    let eos = ScatterJS.scatter.eos(network, Eos);
    console.log(amount)
    eos.transaction({
      actions: [
        {
          account: 'pickownbonus',
          name: 'withdrawown',
          authorization: [{
            actor: name,
            permission: authority
          }],
          data: {
            "user": name,
            "amount":amount
          }
        }
      ]
    }).then(result => {
      console.log(result);
      if (result !== undefined) {
        resolve("withdrawown success");
      }else{
        resolve()
      }
    }).catch(e => {
      console.log(e)
      reject(e)
    });
  })
}

 export {
  scatGameLogin,
  scatGameLoginOut,
  scatGetAllBalance,
  scatSelectPacket,
  scatGetAccount,
  scatcreateRedPacket,
  scatWithdrawref,
  scatRedPacketList,
  addwlist,
  pledgeOWN,
  wdbonus,
  withdrawown,
  bonustable,
  getBalance,
  userboard
 }