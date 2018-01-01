import { get, post } from "../../utils/axios";
// import { baseUrl } from "../../config/env";
import { Message, Loading } from "element-ui";
import router from "../../router";

export default {
  state:{
    getNoticePublic:[],
    getNoticePublicNum: 0,
    editerInput: '',
    addNoticePublic:{
      pname:"",
      cname:"",
      title:"",
      content:"",
      keyword:"",
      url:"",
      newUrl:"",
      source:"",
      column:[],
      siteIsTop:'',
    },
    getCascadeNotice:[]
  },
  mutations:{
    getNoticePublic(state, payload) {
      state.getNoticePublic = payload.getNoticePublic;
    },
    getNoticePublicNum(state, payload) {
      state.getNoticePublicNum = payload.getNoticePublicNum;
    },
    addNoticePublic(state, payload) {
      state.addNoticePublic = payload.addNoticePublic;
    },
    getCascadeNotice(state, payload) {
      state.getCascadeNotice = payload.getCascadeNotice;
    },
    editerInput(state, payload) {
      state.editerInput = payload.editerInput;
    },
  },
  actions:{
    //公告发布(查询)
    async getNoticePublic({ commit, state, rootState }, userInfo) {
      let data = await post("/public/get", userInfo);
      if (data.code == 200) {
        console.log(data);
        commit("getNoticePublic", {
           getNoticePublic: data.extraInfo.noticePublicList
        });
        commit("getNoticePublicNum", {
           getNoticePublicNum: data.extraInfo.totalCount
        });
      } else {
        Message.warning(data.message);
      }
    },

    //公告发布(删除)
    async deleteNoticePublic({ commit, state, rootState }, userInfo) {
      let data = await post( "/public/delete", userInfo);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function () {
          location.reload()
        },500)
      } else {
        Message.warning(data.message);
      }
    },
    //公告发布(新增,修改)
    async addNoticePublic({ commit, state, rootState }, userInfo) {
      let data = await post("/public/add", userInfo);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function () {
          location.reload()
        },200)
        router.push({
          path: "/dashboard/new/content"
        });
      } else {
        Message.warning(data.message);
      }
    },
    //发布类型(查询)
    async getCascadeNotice({ commit, state, rootState },info) {
      let data = await post( "/notice/type",info);

      if (data.code == 200) {
        commit("getCascadeNotice", {
          getCascadeNotice: [{
            value: '0',
            label: '平台公告',
            children: data.extraInfo.pt.map( item => {
              return {
                value: '' + item.id,
                label: '' + item.name,
              }
            })
          },{
            value: '1',
            label: '帮助中心',
            children: data.extraInfo.bz.map( item => {
              return {
                value: '' + item.id,
                label: '' + item.name,
              }
            })
          }]
        });
      } else {
        Message.warning(data.message);
      }
    },
    //公告发布(查询)
    async getNoticePublicDetail({ commit, state, rootState }, userInfo) {
      let data = await post("/public/get/detail", userInfo);

      if (data.code == 200) {
        console.log(data);
        data.content.nid += '';
        data.content.pType += '';
        data.content.siteIsTop += '';
        data.content.column =[data.content.pType,data.content.nid]
        commit("addNoticePublic", {
          addNoticePublic: data.content
        });
        commit("editerInput", {
          editerInput: data.content.content
        });
      } else {
        Message.warning(data.message);
      }
    },

  },
  getters:{

  }
}
