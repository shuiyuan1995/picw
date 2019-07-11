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
  // loading开关
  loading:false,
  // 邀请人名称
  inviteName: "",
  // 用户标示
  token: "",
  // 用户信息
  userInfo: {},
  // 用户eosbalance
  eosbalance: "0.0000",
  // 用户ownbalance
  ownbalance: "0.0000",
  // 用户cpu
  cpu: 0,
  // 用户net
  net: 0,
  // 所有房间红包列表
  roomRedEnvelopeList: [],
  // 焦点红包列表
  redEnvelopeList: [],
  // 房间id
  roomId: 1,
  // 房间列表
  roomList:["0.1","1", "5","20"],
  // 侧边栏状态
  menuStatus: false,
  // 展示数据,累计发红包，幸运奖池，玩家数，交易金额
  allInfo: {
    // 总红包数
    hb_num:0,
    // 幸运奖池
    jackpot:0.0000,
    // 总钱数
    sum_money:0.0000,
    // 总人数
    sum_user:0,
    // 用户余额
    user_money:0,
    // 用户发红包数
    user_send_num:0,
    // 币种列表
    coin_list:[]
  },
  // 自己发红包id列表
  mysend:[],
  // 抢红包结果
  redresults:{},
  // 当前币种
  thismoney:{
    name:'EOS',
    img:'https://www.ppown.com/merchants/0ecd55754c800c3876ee18da923ecce.png'
  },
  // 发抢红包记录状态
  thisjilu:0,
  // 广告开关
  ifentry:false,
  // 广告链接
  ifentryurl:[]
};

export default state;
