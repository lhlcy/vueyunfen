/**
 * 配置编译环境和线上环境之间的切换
 */

let baseUrl; //请求路径
// let routerMode; //路由模式
// let buildDir; //发布路径
 let domainName; //主域名用于cookie
 // let homeUrl;
let upUrl;
let editerUrl = ['http://editor.jiagujin.com', 'index_new.html?source=wontun'];

if (process.env.NODE_ENV == "development") {
  baseUrl = "http://10.1.3.40:8083/mk-web-manager";
  //baseUrl = "http://manager.wontun.cn/api";
  upUrl = "http://10.1.3.40:8080/web-member";
  domainName = '';
} else {
  domainName = "";
  baseUrl = "http://manager.wontun.cn/api";
}
upUrl = 'http://upload.jiagujin.cn/index_new.pt?source=wontun';
export { baseUrl,editerUrl,domainName,upUrl};
