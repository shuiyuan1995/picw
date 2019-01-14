const changedata = (date,fmt) => {
  let data = new Date(date)
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(data.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
  'M+':data.getMonth() + 1,
  'd+':data.getDate(),
  'h+':data.getHours(),
  'm+':data.getMinutes(),
  's+':data.getSeconds()
  };
  
  // 遍历这个对象
  for(let k in o){
  if(new RegExp(`(${k})`).test(fmt)){
   // console.log(`${k}`)
   let str = o[k] + '';
   fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
  }
  }
  return fmt;
 };
  
function padLeftZero(str) {
return ('00'+str).substr(str.length);
}


export {
  changedata
}