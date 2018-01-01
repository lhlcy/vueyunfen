import { setStorage, getStorage, delStorage, cleanStorage } from "../../utils/storage";
import { getString, postString } from '../../utils/axiosString';
// import { baseUrl } from "../../config/env";
import router from "../../router";
import { setCookie, delCookie } from "../../utils/cookies";
import { Message } from 'element-ui'

export default {
  state: {

  },
  mutations: {

  },
  actions: {

    async sysUserLogin({ commit, state, rootState }, userInfo) {
      let data = await postString( '/user/login',userInfo)
        console.log(data);
      if (data.code == 200) {
        //加密记住密码
        if (userInfo.remeber) {
          setStorage("YFadminIdRemeber", {
            userName: userInfo.userName,
            userPwd: userInfo.password
          });
        }
        //保存到本地
        setCookie("SYS_ACCESS_TOKEN", data.extraInfo.accessToken, "h1");
        setStorage("YFadminId", data.extraInfo.user);
        // setStorage("YFadminMenu", data.outputList);
        //保存到状态树
        commit("PROFILE", {
          profile: data.extraInfo.user
        });
        //进入后台
        !!userInfo.redirect
          ? router.push({ path: userInfo.redirect })
          : router.push({ path: "/dashboard" });
        setTimeout(function() {
          location.reload();
        }, 300);
        Message.success('登录成功');
      } else {
        Message.warning( data.message);
      }
    },

    //退出登录
    async logout({ commit, state, rootState }, info) {
      let data= await getString ('/user/exit');
      if(data.code == 200){
        delCookie("SYS_ACCESS_TOKEN");
        let storage = window.localStorage;
        for (let item in storage) {
          if (item != "YFadminIdRemeber") {
            delStorage(item);
          }
        }
        router.push({
          path: "/account/login",
          query: { redirect: info.redirect }
        });
        delStorage('projectInfo');
        Message.success('退出成功');
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.success('退出失败');
      }

    }
  },
  getters: {

  }
};
