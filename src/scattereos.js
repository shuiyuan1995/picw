import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
ScatterJS.plugins(new ScatterEOS());
export let scatter = ScatterJS.scatter;

let chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
let endpoint = 'https://eospro.pickown.com';
let network = {
    blockchain: 'eos',
		host: 'eospro.pickown.com',
		port: '',
    chainId: chainId,
    protocol: "https",
    httpEndpoint : endpoint,
};

// let scatterEos = scatter.eos(network, Eos);
let currentAccount = null;

function hasScatter() {
	return scatter !== undefined;
}

/**
 * 登陆
 * @param gameName 游戏名称（string）
 * code 001 未连接钱包，请链接钱包
 */
export function eoslogin(gameName) {
	if (!hasScatter()) {
		alert('scatter required');
		return;
	}
	return new Promise((resolve, reject) => {
		ScatterJS.scatter.connect(gameName).then((val) => {
			if (!val) return alert("连接失败")
			open(function (identity) {
				resolve(identity)
			}, function (error) {
				console.log(`登陆出错：${JSON.stringify(error)}，请关闭重新打开或者刷新本页面`);
				reject(error)
			});
		})
	})
}

function open(successCallback, errorCallbak) {
	ScatterJS.scatter.suggestNetwork(network).then(() => {
		const requirements = {
			accounts: [network]
		};
		ScatterJS.scatter.getIdentity(requirements)
			.then((i)=>{
				// 没有数据返回
				if (!i) return errorCallbak(null);
				// 登录成功
				currentAccount = i.accounts[0];
				successCallback(i);
			}
		).catch(error => {
			errorCallbak(error);
		});
	}).catch(error => {
		errorCallbak(error);
	});
}
/**
 * 注销
 */
export function eosclose() {
	ScatterJS.scatter.forgetIdentity();
}

/**
 * 获取账户信息
 * @param {cd} cd 
 */
export function getinfo(cd) {
	if (!currentAccount) {
		return false
	}
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.getAccount({
			account_name: currentAccount.name
		}).then((val) => {
			console.log(val, "cpu")
			let info = {
				cpu: Math.round((val.cpu_limit.used / val.cpu_limit.max) * 100),
				net: Math.round((val.net_limit.used / val.net_limit.max) * 100)
			}
			resolve(info)
		}).catch(e => {
			console.error(e)
			reject()
		})
	})
}

/**
 * 创建红包
 * @param userName 用户名(string)
 * @param amount 金额(number)
 * @param bomb 踩雷号码(number)
 * @param contractOwner 建立该合约的账户名(string)
 * @param tokenName 代币合约所有人名称（string）
 * @Result packetId 红包唯一标识
 * @Result txId 红包对应的区块
 * @Result referralFee
 */
export function createRedPacket(userName, amount, bomb, contractOwner, tokenName) {
	if (currentAccount == null) {
			console.log('请先登录');
			return false;
	}
	if (typeof userName !== "string"
			|| typeof amount !== "number"
			|| typeof bomb !== "number"
			|| typeof contractOwner !== "string"
			|| typeof tokenName !== "string")
			return false;

	if (userName === undefined
			|| amount === undefined
			|| bomb === undefined
			|| contractOwner === undefined
			|| tokenName === undefined)
			return false;

	return new Promise(function (resolve, reject) {
			let eos = scatter.eos(network, Eos);
			eos.transaction({
					actions: [
							{
									account: tokenName,
									name: 'transfer',
									authorization: [{
											actor: currentAccount.name,
											permission: currentAccount.authority
									}],
									data: {
											from: currentAccount.name,
											to: contractOwner,
											quantity: amount + ".0000 EOS",
											memo: "create:" + bomb
									}
							}
					]
			}).then(result => {
					console.log("创建红包成功");
		console.log(result);
					let consoleJson = JSON.parse(result.processed.action_traces[0].inline_traces[1].console);
					if (consoleJson.ERROR !== undefined) {
							resolve(analysisException(consoleJson.ERROR));
					} else {
							let response = {
									"packetId": consoleJson.packet_id,
									"txId": result.transaction_id
							};
							resolve(response);
					}
			}).catch(error => {
					if (typeof error !== "object" && JSON.parse(error).error.what === 'eosio_assert_message assertion failure') {
							resolve("交易异常");
					} else {
							reject(error);
					}
			});
	});
}

function analysisException(e) {
	if (e === 'NO_ROOM') {
		return '没有该红包';
	}
	if (e === 'INVALID_BOMB_NUM') {
		return '炸弹号码错误';
	}
	if (e === 'SAME_USER_REF') {
		return '推荐人与红包发起人相同';
	}
	if (e === 'NO_REF') {
		return '没有该推荐人的信息';
	}
	if (e === 'WITHDRAW_VAL_IS_ZERO') {
		return '无可提取余额';
	}
}


/**
 * 抢红包
 * @param userName 用户名(string)
 * @param roomId 红包唯一标识(number)
 * @param contractOwner 建立该合约的账户名(string)
 * @param tokenName 代币合约所有人名称（string）
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
export function selectPacket(userName, roomId, contractOwner, tokenName, transferAmount, referral) {
	if (currentAccount == null) {
			console.log('请先登录');
			return false;
	}
	if (typeof userName !== "string"
			|| typeof roomId !== "number"
			|| typeof contractOwner !== "string"
			|| typeof tokenName !== "string"
			|| typeof transferAmount !== "string")
			return false;

	if (userName === undefined
			|| roomId === undefined
			|| contractOwner === undefined
			|| tokenName === undefined
			|| transferAmount === undefined)
			return false;

	roomId = formatRoomId(roomId);
	if(roomId === null) {
			console.log("无效的红包号码");
			return false;
	}

	return new Promise(function (resolve, reject) {
			let eos = scatter.eos(network, Eos);
			eos.transaction({
					actions: [
							{
									account: tokenName,
									name: 'transfer',
									authorization: [{
											actor: currentAccount.name,
											permission: currentAccount.authority
									}],
									data: {
											from: currentAccount.name,
											to: contractOwner,
											quantity: transferAmount,
											memo: referral === undefined ? "select:" + roomId : "select:" + roomId + ":" + referral
									}
							}
					]
			}).then(result => {
					let consoleString = result.processed.action_traces[0].inline_traces[1].console;
					if(consoleString.indexOf("{") === -1){
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
					if (typeof error !== "object" && JSON.parse(error).error.what === 'eosio_assert_message assertion failure') {
							resolve("交易异常");
					}else {
							reject(error);
					}
			});
	});
}

function formatRoomId(roomId) {
	let length = roomId.toString().length;
	let z = 6 - length;
	if (z === 1) return "0" + roomId;
	else if (z === 2) return "00" + roomId;
	else if (z === 3) return "000" + roomId;
	else if (z === 4) return "0000" + roomId;
	else if (z === 5) return "00000" + roomId;
	else return null;
}

/**
 * 发红包榜单
 * @param contractOwner 建立该合约的账户名(string)
 */
export function redPacketList(contractOwner) {
	if (currentAccount == null) {
		console.log('请先登录');
		return false;
	}
	if (typeof contractOwner !== "string" || contractOwner === undefined) return false;
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: contractOwner,
				name: 'printboard',
				authorization: [{
					actor: currentAccount.name,
					permission: currentAccount.authority
				}],
				data: {}
			}]
		}).then(result => {
			resolve(JSON.parse(result.processed.action_traces[0].console).data);
		}).catch(e => {
			reject(e.message)
		});
	})
}

/**
 * 奖金池
 * @Result 返回奖金数量(eg:16910 = 1.6910 EOS)
 */
export function prizePool(contractOwner) {
	if (currentAccount == null) {
		console.log('请先登录');
		return false;
	}
	if (typeof contractOwner !== "string" || contractOwner === undefined) return false;
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: contractOwner,
				name: 'printpool',
				authorization: [{
					actor: currentAccount.name,
					permission: currentAccount.authority
				}],
				data: {}
			}]
		}).then(result => {
			resolve(result.processed.action_traces[0].console);
		}).catch(e => {
			reject(e.message)
		});
	})
}

/**
 * 领渠道奖励
 * @param user 账户名
 * @param contractOwner 建立该合约的账户名(string)
 */
export function withdrawref(user, contractOwner) {
	if (currentAccount == null) {
		console.log('请先登录');
		return false;
	}
	if (typeof user !== "string" ||
		typeof contractOwner !== "string" ||
		user === undefined ||
		contractOwner === undefined)
		return false;

	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: contractOwner,
				name: 'withdrawref',
				authorization: [{
					actor: currentAccount.name,
					permission: currentAccount.authority
				}],
				data: {
					"user": user
				}
			}]
		}).then(result => {
			console.log(result);
			let consoleString = result.processed.action_traces[0].console;
			if (JSON.parse(consoleString).ERROR !== undefined) {
				resolve(analysisException(JSON.parse(consoleString).ERROR));
			} else {
				resolve(JSON.parse(consoleString).value);
			}
		}).catch(e => {
			reject(e.message)
		});
	})
}

/**
 * 空投
 * @param contractOwner 建立该合约的账户名(string)
 */
export function airdropsInterface(contractOwner) {
	if (currentAccount == null) {
		console.log('请先登录');
		return false;
	}
	if (typeof contractOwner !== "string" ||
		contractOwner === undefined)
		return false;
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: contractOwner,
				name: 'airdrops',
				authorization: [{
					actor: currentAccount.name,
					permission: currentAccount.authority
				}],
				data: {}
			}]
		}).then(result => {
			resolve(result.processed.action_traces[0].console);
		}).catch(e => {
			reject(e.message)
		});
	})
}

/**
 * 查询用户挖矿奖励列表
 * @param contractOwner 建立该合约的账户名(string)
 */
export function getminings(contractOwner) {
	if (currentAccount == null) {
		console.log('请先登录');
		return false;
	}
	if (typeof contractOwner !== "string" ||
		contractOwner === undefined)
		return false;
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.transaction({
			actions: [{
				account: contractOwner,
				name: 'getminings',
				authorization: [{
					actor: currentAccount.name,
					permission: currentAccount.authority
				}],
				data: {}
			}]
		}).then(result => {
			console.log(result);
			resolve(result.processed.action_traces[0].console);
		}).catch(e => {
			reject(e.message)
		});
	})
}


// redPacketList('pickownowner').then(val =>{
// 	console.log(val)
// })


// 查询余额
export function getjin(type) {
	if (currentAccount == null) {
		console.log('请先登录');
		return false;
	}
	return new Promise(function (resolve, reject) {
		let eos = ScatterJS.scatter.eos(network, Eos);
		eos.getCurrencyBalance({
			code: "eosio.token",
			account: currentAccount.name,
			symbol: type
		}).then(result => {
			resolve(result)
		});

	})
}


// 发红包榜单

// export function bang(contractOwner) {
// 	return new Promise((resolve, reject) => {
// 		eos.contract(contractOwner).then((pickown) => {
// 			console.log(pickown)
// 			let a = pickown.printboard()
// 			console.log(a)
// 			// pickown.printboard().then(result => {
// 			// 	console.log(result)
// 			// 	resolve(result)
// 			// }).catch(e => {
// 			// 	alert(e)
// 			// 	reject(false);
// 			// });''
// 		})
// 	})

// }

// selectPacket("wenbo",2,"pickownowner").then((val)=>{
//   console.log(val)
// }).catch(e=>{
//   console.log(e+'111')
// })
// selectPacket("wenbo",19,"pickownowner","5JqRdMU696xCvtFoMutNBz88N9Q7EdX42W4Hy9rp9VPhxug7jJN").then((val)=>{
//   console.log(val)
// }).catch(e=>{
//   console.log(e+'111')
// })
// createRedPacket("wenbo", 10000, 5, "pickownowner").then(response => console.log(response))