import { get, post } from '../../utils/axios';
import { getString, postString } from '../../utils/axiosString';
// import { baseUrl } from "../../config/env";
import { Message } from 'element-ui'

export default {
  state: {
    getUserList: [],
    totalCount:0,
  },
  mutations: {
    getUserList(state, payload) {
      state.getUserList = payload.getUserList;
    },
    totalCount(state, payload) {
      state.totalCount = payload.totalCount;
    },
  },
  actions: {
    async getUserList({ commit, state, rootState }, NoticeSetList) {
      let data = await get( '/user/list/'+ NoticeSetList.tenantId)
        console.log(data);
      if (data.code == 200) {
        !!data. outputList &&　commit('getUserList',{
          getUserList: data.outputList
        })
        !!data. outputList &&　commit('totalCount',{
          totalCount: data.outputList.length
        })
      } else {
        console.log(this);
        Message.warning( data.message);
      }
    },
    async resetPwd({ commit, state, rootState }, addNoticeSet) {
      let data = await postString( '/user/reset',addNoticeSet)
      console.log(data);
      if (data.code == 200) {
        Message.success('提交成功')
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning( data.message);
      }
    },
    async addAccount({ commit, state, rootState }, addNoticeSet) {
      let data = await post('/user/add',addNoticeSet)
      console.log(data);
      if (data.code == 200) {
        Message.success('提交成功')
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning( data.message);
      }
    },



  },
  getters: {

  }
};
