/* --------------- mutation type ------------------ */
// 设置token
export const SET_TOKEN = "SET_TOKEN";
// 设置用户id
export const SET_USERID = "SET_USERID";
// 设置用户信息
export const SET_USER_INFO = "SET_USER_INFO";
// 设置eosbalance
export const SET_EOSBALANCE = "SET_EOSBALANCE";
// 设置ownbalance
export const SET_OWNBALANCE = "SET_OWNBALANCE";
// 设置cpu
export const SET_CPU = "SET_CPU";
// 设置net
export const SET_NET = "SET_NET";
// 设置房间id
export const SET_ROOMID = "SET_ROOMID";
// 设置所有房间红包列表
export const SET_ROOM_RED_EVELOPE_LIST = "SET_ROOM_RED_EVELOPE_LIST";
// 设置焦点红包列表
export const SET_ACTIVE_RED_EVELOPE_LIST = "SET_ACTIVE_RED_EVELOPE_LIST";
// 设置侧边栏显示隐藏
export const SET_GOOGLE_MENU = "SET_GOOGLE_MENU";
// 设置邀请人
export const SET_INVITE_NAME = "SET_INVITE_NAME";
// 设置自己发红包id
export const SET_MY_SEND = "SET_MY_SEND";
//设置抢红包结果
export const SET_RED_RESULTS = "SET_RED_RESULTS";

/* --------------- action type ------------------ */
// 设置用户cpu，net
export const SET_CPU_NET = "SET_CPU_NET";
// 推出登陆
export const SET_LOGINOUT = "SET_LOGINOUT";
// 设置红包焦点列表，房间id
export const SET_CLICK_ROOMID_RED_EVELOPE_LIST = "SET_CLICK_ROOMID_RED_EVELOPE_LIST";
// 更新展示数据,累计发红包数，幸运奖池，玩家数，交易金额
export const SET_ALL_INFO = "SET_ALL_INFO";
// 添加单个红包到对应房间
export const SET_ROOM_RED_EVELOPE_LIST_UPDATA = "SET_ROOM_RED_EVELOPE_LIST_UPDATA";
// 修改已抢完红包状态
export const SET_ROOM_RED_EVELOPE_EXPIRED = "SET_ROOM_RED_EVELOPE_EXPIRED"