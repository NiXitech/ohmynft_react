import { getUserInfo } from "../api/services/http/api";

export const isMobile = (): boolean => {
  let isMobile: boolean = false;

  const _isMobile = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  if (_isMobile) {
    isMobile = true;
  }

  return isMobile;
};

export const getQueryVariable = (variable: string) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
};

export const updateQueryStringParameter = (key: string, value: string) => {
  let uri = window.location.href;
  if (!value) {
    const splitUrl = uri.split("?tab")[0];
    return splitUrl;
  }
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
};

export const updateUrl = (key: any, value: any) => {
  let newUrl = updateQueryStringParameter(key, value);
  //向当前url添加参数，没有历史记录
  window.history.replaceState(
    {
      path: newUrl,
    },
    "",
    newUrl
  );
};

export const getDollar = (value: string, price: any) => {
  const data = Number(value) * price.usd;
  let result = 0;
  if (Number.isInteger(data)) {
    result = data;
  } else {
    result = Number(data.toFixed(2));
  }

  return result;
};

export const getClosedDate = (value: string) => {
  const date = new Date(value).toUTCString();
  const arr = date.split(",")[1].split(" ");
  return arr[1] + " " + arr[2] + " " + arr[3];
};

export const getDetailClosedDate = (value: string) => {
  const date = new Date(value).toUTCString();
  const arr = date.split(",")[1].split(" ");
  return arr[1] + " " + arr[2] + " " + arr[3] + " " + arr[4];
};

export const isToday = (str: string) => {
  const newStr = (str + ".000Z").replace(" ", "T");

  const timp = Date.parse(JSON.stringify(new Date(newStr))) - 1000;

  if (new Date(timp).toDateString() === new Date().toDateString()) {
    return true;
  }
  return false;
};

export const TimeInterval = (str: string) => {
  const newStr = (str + ".000Z").replace(" ", "T");
  const date1 = new Date(newStr);
  // var date1 = new Date(); //开始时间
  var date2 = new Date(); //结束时间
  var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数

  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000));

  //计算出小时数

  var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);

  let result = "";

  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        result = seconds + "seconds";
        if (seconds === 1) {
          result = "a second";
        }
      } else {
        result = minutes + "minutes";
        if (minutes === 1) {
          result = "a minute";
        }
      }
    } else {
      result = hours + "hours";
      if (hours === 1) {
        result = "a hour";
      }
    }
  } else {
    result = days + "days";
    if (days === 1) {
      result = "a day";
    }
  }

  return result;
};

export const ActivityIsClosed = (str: string) => {
  const newStr = (str + ".000Z").replace(" ", "T");
  const date1 = new Date(newStr);
  var date2 = new Date();
  var date3 = date2.getTime() - date1.getTime();
  if (date3 > 0) {
    return true;
  }
  return false;
};

// const getWinnerImg = async (displayName: string) => {
//   return await new Promise(async (resolve, rej) => {
//     try {
//       const data: any = await getUserInfo(displayName);
//       if (data.data) {
//         resolve(data.data);
//       }
//     } catch (error) {
//       rej(error);
//     }
//   });
//   // let resultData = undefined

//   // return resultData
// };

// export const getWinnerAvator = (displayName: any) => {
//   let imgUrl = "";
//   getWinnerImg(displayName).then((val: any) => {
//     if (val.avatar_url) {
//       imgUrl = val.avatar_url;
//     }
//   });

//   return imgUrl;
// };
