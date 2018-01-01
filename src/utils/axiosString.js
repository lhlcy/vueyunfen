import "babel-polyfill"
import axios from "axios"
import  router  from "../router"
import { setCookie, delCookie, getCookie } from '../utils/cookies'
import { setStorage, delStorage } from '../utils/storage'
import { baseUrl } from "../config/env";


  let instance = axios.create({
    headers: {
    "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    withCredentials: true,
    baseURL: baseUrl
  });
instance.defaults.withCredentials = true

export default function request(method, url, body) {

  method = method.toUpperCase();
  if (method === "GET") {
    body = undefined;
    return instance.get(url).then(res =>{
      if (res.status === 404) {
        return Promise.reject("Unauthorized.");
      } else {
        if(res.data.code === 215){
          delCookie('accessToken');
          let storage = window.localStorage;
          for (let item in storage) {
            if (item != "YFRemeber") {
              delStorage(item);
            }
          }
          router.push({ path: '/account/login' });
        } else if(res.data.code === 618){
          router.push({ path: '/dashboard' });
        }
        return res.data;
      }
    })
  } else {
    let dataStr = ''; //数据拼接字符串
    Object.keys(body).forEach(key => {
      dataStr += key + '=' + body[key] + '&';
    })
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    body = body && dataStr;
    return instance.post(url,body).then( res =>{
      console.log(res)
      if (res.status === 404) {
        console.log(res)
        return Promise.reject("Unauthorized.");
      } else {
        if(res.data.code === 215){
          delCookie('accessToken');
          let storage = window.localStorage;
          for (let item in storage) {
            if (item != "YFRemeber") {
              delStorage(item);
            }
          }
          router.push({ path: '/account/login' });
        } else if(res.data.code === 618){
          router.push({ path: '/dashboard' });
        }
        return res.data;
      }
    })
  }
  console.log('请求方法：' + method);
  console.log('请求接口：' + url);
  console.log('请求数据：' + body);
  console.log('%c----------------------------------------', 'color: blue');
}

export const getString = url => request("GET", url);
export const postString = (url, body) => request("POST", url, body);
