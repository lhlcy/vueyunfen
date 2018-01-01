import { get, post } from "../../utils/axios";
// import { baseUrl } from "../../config/env";
import { Message, Loading } from "element-ui";
import {  getStorage } from "../../utils/storage";
import router  from "../../router";

export default {
  state:{
    getRecruitList:[],
    editerInput:'',
    addMemberForm: {
      jobName: "",
      address: "",
      peopleNum: '',
      jobLevel: "",
      expire: '',
      jobDesc: ''
    },
    getRecruitListNum: 0,
    getUserInfoById:{
      enterprise:{
        name:''
      },
      investor: null
    },
    getRecruitListLoad: false
  },
  mutations:{
    getRecruitList(state, payload) {
      state.getRecruitList = payload.getRecruitList;
    },
    getRecruitListNum(state, payload) {
      state.getRecruitListNum = payload.getRecruitListNum;
    },
    getUserInfoById(state, payload) {
      state.getUserInfoById = payload.getUserInfoById;
    },
    getRecruitListLoad(state, payload) {
      state.getRecruitListLoad = payload.getRecruitListLoad;
    },
    addMemberForm(state, payload) {
      state.addMemberForm = payload.addMemberForm;
    },
    editerInput(state, payload) {
      state.editerInput = payload.editerInput;
    }
  },
  actions:{
    //获取招聘信息列表
    async getRecruitList({ commit, state, rootState }, userInfo) {
      let data = await post("/recruitment/get", userInfo);
      console.log(data)
      if (data.code == 200) {
        getStorage('YFadminId');
        commit("getRecruitList", {
           getRecruitList: data.extraInfo.recruitmentList
        });
        data.extraInfo && commit("getRecruitListNum", {
           getRecruitListNum: data.extraInfo.totalCount
        });
      } else {
        Message.warning(data.message);
      }
    },
    //添加保存招聘信息
    async addRecruitment({ commit, state, rootState }, userInfo) {
      let data = await post("/recruitment/add", userInfo);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function () {
          location.reload()
        },500)
        router.push({
          path: "/dashboard/recruitInfo"
        });
      } else {
        Message.warning(data.message);
      }
    },
    //删除招聘信息
    async deleteRecruit({ commit, state, rootState }, userInfo) {
      let data = await post("/recruitment/delete", userInfo);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function () {
          location.reload()
        },500)
      } else {
        Message.warning(data.message);
      }
    },
    async detailRecruit({ commit, state, rootState }, userInfo) {
      let data = await get("/recruitment/detail/"+userInfo.id, userInfo);
      console.log(data)
      if (data.code == 200) {
        data.content.jobLevel += '';
        data.content.expire += '';
        !!data.content && commit("addMemberForm", {
          addMemberForm: data.content
        });
        !!data.content && commit("editerInput", {
          editerInput: data.content.jobDesc
        });
      } else {
        Message.warning(data.message);
      }
    },


  },
  getters:{

  }
}
