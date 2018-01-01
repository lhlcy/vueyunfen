import Vue from 'vue'
import Vuex from 'vuex'
// 顶层store
import mutations from './mutations'
import actions from './action'
import getters from './getters'
// 模块store
Vue.use(Vuex);
// 导入模块
import moduleLogin from './modules/moduleLogin'
import moduleNew from './modules/moduleNew'
import moduleSeo from './modules/moduleSeo'
import moduleContent from './modules/moduleContent'
import moduleRecruitInfo from './modules/moduleRecruitInfo'
import moduleProduct from './modules/moduleProduct'
import moduleaccount from './modules/moduleaccount'
import modulejoinInfo from './modules/modulejoinInfo'
// 此处存放顶层状态，模块状态请按模块放好
const state = {
  profile: {},
  menuList: []
};
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    moduleLogin,
    moduleNew,
    moduleSeo,
    moduleContent,
    moduleRecruitInfo,
    moduleProduct,
    moduleaccount,
    modulejoinInfo

  }
});
