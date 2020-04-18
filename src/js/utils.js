Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
const dateFormats = ["hh:mm", "yyyy-MM-dd"];
export const getTimeString = timestamp => {
  timestamp *= 1000;
  var date = new Date(timestamp);
  var now = new Date();
  if (
    now.getMonth() == date.getMonth() &&
    now.getFullYear() == date.getFullYear()
  ) {
    if (now.getDate() == date.getDate()) {
      return date.format(dateFormats[0]);
    } else if (now.getDate() == date.getDate() + 1) {
      return "昨天" + date.format(dateFormats[0]);
    } else {
      return date.format(dateFormats[1]);
    }
  }
  return date.format(dateFormats[1]);
};

export const getCountString = count => {
  if (count > 1000) {
    // xx.xK
    return Math.round(count / 100) / 10 + "K";
  }
  return count;
};

export const toLogin = Vue => {
  Vue.$router.push("/login");
};

export const nowTimestamp = () => {
  return new Date().getTime() / 1000;
};
import store from "../store";
export const userInfo = anonymous => {
  var UserInfo = {
    anonymous: anonymous,
    user: store.getters.user
  };
  return UserInfo;
};
