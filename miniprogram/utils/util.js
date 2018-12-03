const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
}

const formatTime = date => {
  const hour = date.getHours();
  const minute = date.getMinutes();

  return [hour, minute].map(formatNumber).join(':');
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// let formatDate = (nDate, date) => {
//   if (isNaN(nDate.getTime())) {
//     // 不是时间格式
//     return '--'
//   }
//   let o = {
//     'M+': nDate.getMonth() + 1,
//     'd+': nDate.getDate(),
//     'h+': nDate.getHours(),
//     'm+': nDate.getMinutes(),
//     's+': nDate.getSeconds(),
//     // 季度
//     'q+': Math.floor((nDate.getMonth() + 3) / 3),
//     'S': nDate.getMilliseconds()
//   }
//   if (/(y+)/.test(date)) {
//     date = date.replace(RegExp.$1, (nDate.getFullYear() + '').substr(4 - RegExp.$1.length))
//   }
//   for (let k in o) {
//     if (new RegExp('(' + k + ')').test(date)) {
//       date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
//     }
//   }
//   return date
// }

let isEmptyObject = (obj) => {
  for (let i in obj) {
    return false
  }
  return true
}

let themeSetting = () => {
  let bcgColor = '#a9aeb0'
  // let hour = new Date().getHours()
  // if (hour >= 6 && hour <= 17) {
  //   bcgColor = '#40a7e7'
  // } else {
  //   bcgColor = '#384148'
  // }
  wx.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: bcgColor,
  })
  return bcgColor
}

// 比较版本号：left > right 1, left < right -1, left == right 0
// 用途：旧版本不执行写入、删除 日历操作
let cmpVersion = (left, right) => {
  if (typeof left + typeof right !== 'stringstring') {
    return false
  }
  let a = left.split('.')
  let b = right.split('.')
  let i = 0
  let len = Math.max(a.length, b.length)
  for (; i < len; i++) {
    if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
      return 1
    } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
      return -1
    }
  }
  return 0
}

let timestamp2datetime =(time_stamp) => {
  var date = new Date(time_stamp)
  console.log(date)
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  console.log(Y + M + D + h + m + s)
  return Y + M + D + h + m + s
}

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

module.exports = {
  isEmptyObject,
  themeSetting,
  cmpVersion,
  formatDate,
  formatTime,
  formatDateTime,
  timestamp2datetime,
  uuid: uuid
}
