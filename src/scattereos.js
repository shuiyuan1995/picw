import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
ScatterJS.plugins( new ScatterEOS() );
export let scatter = ScatterJS.scatter;

const network = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'mainnet.meet.one',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}
// let eos = ScatterJS.scatter.eos(network, Eos);
let currentAccount = null

/**
 * 登录
 * @param {cd} cd 
 */
export function eoslogin(cd){
  scatter.connect('app').then(connected => {
    if (!connected) return false;
    ScatterJS.scatter.getIdentity({accounts:[network]}).then((identity) => {
      currentAccount = identity.accounts[0]
      getinfo()
      return cd && cd(identity)
    }).catch(error => {
      alert(error)
    })
  });
}

/**
 * 注销
 */
// 注销
export function eosclose(){
  ScatterJS.scatter.forgetIdentity();
}

/**
 * 获取账户信息
 * @param {cd} cd 
 */
export function getinfo(cd){
  if(!currentAccount){
    return false
  }
  eos.getAccount({account_name: currentAccount.name}).then((val)=>{
    let info = {
      cpu:Math.round((val.cpu_limit.available/val.cpu_limit.max)*100),
      net:Math.round((val.net_limit.available/val.net_limit.max)*100)
    }
    return cd && cd(info)
  })
}

let config = {
  keyProvider:['5K1QbYffWia5xra49HV5SBXppNo9mVeLUV2vHboNTvdxhakd5qZ'],
  httpEndpoint: 'http://35.197.130.214:8888',
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  mockTransactions: () => null,
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  verbose: false,
  sign: true
};

let eos = Eos(config);

/**
 * 创建红包
 * @param userName 用户名(string)
 * @param amount 金额(number)
 * @param bomb 踩雷号码(number)
 * @param contractOwner 建立该合约的账户名(string)
 * @Result packetId 红包唯一标识
 * @Result txId 红包对应的区块
 */
export function createRedPacket(userName, amount, bomb, contractOwner){
  return new Promise(function(resolve, reject) {
      if(typeof userName !== "string"
          || typeof amount !== "number"
          || typeof bomb !== "number"
          || typeof contractOwner !== "string")
          reject(false);

      if(userName === undefined
          || amount === undefined
          || bomb === undefined
          || contractOwner === undefined)
          reject(false);

      eos.contract(contractOwner).then(pickown => {
          pickown.createroom(userName, amount, bomb, {
              authorization: [contractOwner]
          }).then(result => {
              let consoleString = result.processed.action_traces[0].console;
              let response = {
                  "packetId": JSON.parse(consoleString).packet_id,
                  "txId": result.transaction_id
              };
              resolve(response);
          }).catch(e => {
              reject(e);
          });
      });
  })
}

/**
 * 抢红包
 * @param userName 用户名(string)
 * @param roomId 红包唯一标识(number)
 * @param contractOwner 建立该合约的账户名(string)
 * @Result packetId 抢到的红包唯一标识
 * @Result block_num 抢到的红包高对应的块信息
 * @Result packetAmount 抢到的金额
 * @Result isBomb 是否踩雷（1踩雷）
 * @Result isLast 是否最后一个红包（1是最后一个）
 * @Result isLuck 是否幸运号码
 * @Result luckyAmount 幸运奖金
 */
export function selectPacket(userName, roomId, contractOwner){
  return new Promise(function(resolve, reject) {
      if(typeof userName !== "string"
          || typeof roomId !== "number"
          || typeof contractOwner !== "string")
          reject(false);

      if(userName === undefined
          || roomId === undefined
          || contractOwner === undefined)
          reject(false);
      eos.contract(contractOwner).then(pickown => {
          pickown.selectpacket(userName, roomId, {
              authorization: [contractOwner]
          }).then(result => {
              let consoleString = result.processed.action_traces[0].console;
              let response = {
                  "packetId": JSON.parse(consoleString).packet_id,
                  "block_num": result.processed.action_traces[0].block_num,
                  "packetAmount": JSON.parse(consoleString).packet_amount,
                  "isBomb": JSON.parse(consoleString).bomb,
                  "isLast": JSON.parse(consoleString).is_last,
                  "isLuck": JSON.parse(consoleString).luck,
                  "luckyAmount": JSON.parse(consoleString).prize_amount,
              };
              resolve(response);
          }).catch(e => {
              reject(e);
          });
      });
  })
}
// selectPacket("wenbo",130,"qizhan").then((val)=>{
//   console.log(val)
// }).catch(e=>{
//   console.log(e+'111')
// })
// selectPacket("wenbo",19,"qizhan","5JqRdMU696xCvtFoMutNBz88N9Q7EdX42W4Hy9rp9VPhxug7jJN").then((val)=>{
//   console.log(val)
// }).catch(e=>{
//   console.log(e+'111')
// })
// createRedPacket("wenbo", 10000, 5, "qizhan").then(response => console.log(response))

