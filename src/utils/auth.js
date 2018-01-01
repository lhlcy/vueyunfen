import { setStorage, getStorage, delStorage, cleanStorage } from './storage';
import { getCookie, setCookie } from "./cookies";
const isAuthRoute = route => route.path.indexOf("/account") !== -1;
export default (to, from, next) => {

  if (
    to.matched.some(
      record => record.meta.requiresAuth && !getCookie("SYS_ACCESS_TOKEN")
    )
  ) {
    // 未授权
    next({
      path: '/account/login',
      query: { redirect: to.fullPath }
    });
  } else if(isAuthRoute(to)){
    if (!!getCookie("SYS_ACCESS_TOKEN")) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    !!getCookie("SYS_ACCESS_TOKEN") && setCookie("SYS_ACCESS_TOKEN", getCookie("SYS_ACCESS_TOKEN"), "h1");
    next();
  }
};
