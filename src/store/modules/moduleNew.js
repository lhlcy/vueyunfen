import { get, post } from '../../utils/axios';
// import { baseUrl } from "../../config/env";
import { Message } from 'element-ui'

export default {
  state: {
    noticeSetList: [],
    totalCount:0,
  },
  mutations: {
    noticeSetList(state, payload) {
      state.noticeSetList = payload.noticeSetList;
    },
    totalCount(state, payload) {
      state.totalCount = payload.totalCount;
    },
  },
  actions: {
    async getNoticeSetList({ commit, state, rootState }, NoticeSetList) {
      let data = await post( '/notice/get',NoticeSetList)
        console.log(data);
      if (data.code == 200) {
        !!data.extraInfo.noticeSetList　&&　commit('noticeSetList',{
          noticeSetList: data.extraInfo.noticeSetList
        })
        !!data.extraInfo.totalCount　&&　commit('totalCount',{
          totalCount: data.extraInfo.totalCount
        })
      } else {
        console.log(this);
        Message.warning( data.message);
      }
    },
    async addNoticeSet({ commit, state, rootState }, addNoticeSet) {
      let data = await post( '/notice/add',addNoticeSet)
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
    async deleteNoticeSet({ commit, state, rootState }, addNoticeSet) {
      let data = await post( '/notice/delete',addNoticeSet)
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
    async sortNoticeSet({ commit, state, rootState }, addNoticeSet) {
      let data = await post( '/notice/sort',addNoticeSet)
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
