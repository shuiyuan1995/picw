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
  // 邀请人名称
  inviteName: "",
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
  // 展示数据,累计发红包，幸运奖池，玩家数，交易金额
  allInfo: {
    out_packet_count: 0,
    transaction_info_count: "00.0000",
    user_count: 0,
    xinyunjiangchi: "00.0000"
  }
};

export default state;
