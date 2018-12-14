// 获取用户信息
export const userInfo = state => state.userInfo;
// 获取用户eos余额信息
export const eosbalance = state => state.eosbalance;
// 获取用户own余额信息
export const ownbalance = state => state.ownbalance;
// 获取用户信息cpu
export const cpu = state => state.cpu;
// 获取用户信息net
export const net = state => state.net;
// 获取侧边栏状态
export const menuStatus = state => state.menuStatus;
// 获取焦点红包
export const redEnvelopeList = state => state.redEnvelopeList;
// 获取所有房间红包
export const roomRedEnvelopeList = state => state.roomRedEnvelopeList;
// 获取发红包次数
export const hairRedEnvelopeCount = state => state.hairRedEnvelopeCount;
// 获取幸运奖池数
export const prizeCount = state => state.prizeCount;