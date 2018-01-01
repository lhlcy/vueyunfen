import "babel-polyfill"
import axios from "axios"
import  router  from "../router"
import { setCookie, delCookie, getCookie } from '../utils/cookies'
import { setStorage, delStorage } from '../utils/storage'
import { baseUrl } from "../config/env";


let instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,
  baseURL: baseUrl,
});
instance.defaults.withCredentials=true

export default function request(method, url, body) {
  method = method.toUpperCase();
  console.log('请求方法：' + method);
  console.log('请求接口：' + url);
  console.log('%c----------------------------------------', 'color: blue');
  if (method === "GET") {
    body = undefined;
    return instance.get(url).then(res =>{
      if (res.status === 404) {
        return Promise.reject("Unauthorized.");
      } else {
        if(res.data.code === 215){
          delCookie('SYS_ACCESS_TOKEN');
          let storage = window.localStorage;
          for (let item in storage) {
            if (item != "YFadminIdRemeber") {
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
    body = body && JSON.stringify(body);
    console.log('请求数据：' + body);
      return instance.post(url,body).then( res => {
        if (res.status === 404) {
          return Promise.reject("Unauthorized.");
        } else {
          if(res.data.code === 215){
            delCookie('SYS_ACCESS_TOKEN');
            let storage = window.localStorage;
            for (let item in storage) {
              if (item != "YFadminIdRemeber") {
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
}
export const get = url => request("GET", url);
export const post = (url, body) => request("POST", url, body);
