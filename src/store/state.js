const state = {
  // 语言
  language: [],
  // 当前语言
  thislang:'',
  // 红包数据
  packages:{
    this:0,
    all:true,
    data:[[],[],[],[],[],[]],
    thisdata:[]
  },
  // 用户标示
  token: "",
  // 用户信息
  userInfo: {},
  // 用户eosbalance
  eosbalance: "00.0000",
  // 用户ownbalance
  ownbalance: "00.0000",
  // 用户cpu
  cpu: 0,
  // 用户net
  net: 0,
  // 所有房间红包列表
  roomRedEnvelopeList: [],
  // 焦点红包列表
  redEnvelopeList: [],
  // 房间id
  roomId: 0,
  // 侧边栏状态
  menuStatus: false,
  // 累计发红包次数
  hairRedEnvelopeCount: 0,
  // 幸运将池数量
  prizeCount: 0,
  // 交易金额
  transactionAmount:0,
  // 玩家总数
  allPlayersNum:0
};

export default state;
