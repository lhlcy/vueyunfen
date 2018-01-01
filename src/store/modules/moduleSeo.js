import { get, post } from "../../utils/axios";
// import { baseUrl } from "../../config/env";
import { Message } from 'element-ui'
export default {
  state:{
    getSiteKeyWord: [],
    getSiteKeyWordNum: 0
  },
  mutations:{
    getSiteKeyWord(state, payload) {
      state.getSiteKeyWord = payload.getSiteKeyWord;
    },
    getSiteKeyWordNum(state, payload) {
      state.getSiteKeyWordNum = payload.getSiteKeyWordNum;
    },
  },
  actions:{
    //查询关键字
    async getSiteKeyWord({ commit, state, rootState }, info) {
      let data = await post("/seo/get", info);
      console.log(data);
      if (data.code == 200) {
        commit("getSiteKeyWord", {
          getSiteKeyWord: data.extraInfo.sysSeoList
        });
        commit("getSiteKeyWordNum", {
          getSiteKeyWordNum: data.extraInfo.totalCount
        });
      } else {
        Message.warning(data.message);
      }
    },

    //保存修改关键字
    async addSysSeo({ commit, state, rootState }, info) {
      let data = await post("/seo/add", info);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function () {
          location.reload()
        },500)
      } else {
        Message.warning(data.message);
      }
    },

    //删除关键字
    async deleteSysSeo({ commit, state, rootState }, info) {
      let data = await post("/seo/delete", info);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function () {
          location.reload()
        },500)
      } else {
        Message.warning(data.message);
      }
    },

  },
  getters:{

  }
}
