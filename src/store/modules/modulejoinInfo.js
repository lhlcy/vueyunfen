import { get, post } from "../../utils/axios";
// import { baseUrl } from "../../config/env";
import { Message } from 'element-ui'
export default {
  state:{
    applyJoinList:[],
    totalCount: 0,

  },
  mutations:{
    applyJoinList(state, payload) {
      state.applyJoinList = payload.applyJoinList;
    },
    totalCount(state, payload) {
      state.totalCount = payload.totalCount;
    },
  },
  actions:{
    //查询关键字
    async joinList({ commit, state, rootState }, info) {
      let data = await post("/applyjoin/list", info);
      console.log(data);
      if (data.code == 200) {
        !!data. extraInfo &&　commit('applyJoinList',{
          applyJoinList: data.extraInfo.applyJoinList
        })
        !!data. extraInfo &&　commit('totalCount',{
          totalCount: data.extraInfo.totalCount
        })
      } else {
        Message.warning(data.message);
      }
    },
    async updateJoinInfo({ commit, state, rootState }, info) {
      let data = await post("/applyjoin/update", info);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        info.state = false
        info.callback();
      } else {
        Message.warning(data.message);
      }
    },




  },
  getters:{

  }
}
