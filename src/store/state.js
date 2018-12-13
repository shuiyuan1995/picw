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
  // 其他数据
  info:{
    B_name:'',
    name:'',
    menu:false,
    info:{},
    eos:0,
    own:0,
    hui:false,
    cpu:0,
    net:0,
    token:"",
    userid:""
  }
};

export default state;
