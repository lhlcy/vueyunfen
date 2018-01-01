import { get, post } from '../../utils/axios';
import {  postString } from '../../utils/axiosString';
// import { baseUrl } from "../../config/env";
import { Message } from 'element-ui'
export default{
  state: {
    Menulist: [],
    productlist: [],
    totalCount: 0
  },
  mutations: {
    Menulist(state, payload) {
      state.Menulist = payload.Menulist;
    },
    productlist(state, payload) {
      state.productlist = payload.productlist;
    },
    totalCount(state, payload) {
      state.totalCount = payload.totalCount;
    },
  },
  actions:{
    //产品栏目列表
    async getMenulist({ commit, state, rootState }, getMenulist) {
      let data = await get("/productColumn/list/"+ getMenulist.tenantId);
      console.log(data);
      if (data.code == 200) {
        !!data.outputList && commit('Menulist', {
          Menulist: data.outputList
        })
      }
       else {
        Message.warning(data.message);
      }
    },
    //添加栏目名称
    async addProductColumn({ commit, state, rootState }, addMenulist) {
      let data = await post("/productColumn/add", addMenulist);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    async updateproductColumn({ commit, state, rootState }, updateproductColumn) {
      let data = await post("/productColumn/update", updateproductColumn);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //获取产品列表
    async productlist({ commit, state, rootState }, productlist) {
      let data = await post("/product/list", productlist);
      console.log(data);
      if (data.code == 200) {
        !!data.outputList && commit('productlist',{
          productlist: data.outputList
        })
        commit('totalCount',{
          totalCount: data.content.page.totalCount
        })
      } else {
        Message.warning(data.message);
      }
    },
    //关闭和开启栏目
    async switchproductColumn({ commit, state, rootState }, switchProduct) {
      let data = await post("/productColumn/switch", switchProduct);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //产品栏目排序
    async sortProductColumn({ commit, state, rootState }, sortProduct) {
      let data = await get("/productColumn/rank/"+sortProduct.id+'/'+sortProduct.type);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //新增产品名称
    async addProduct({ commit, state, rootState }, addProduct) {
      let data = await post( "/product/add", addProduct);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //编辑产品名称
    async updateProduct({ commit, state, rootState }, addProduct) {
      let data = await post( "/product/update", addProduct);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //产品排序
    async sortProduct({ commit, state, rootState }, sortProduct) {
      let data = await get("/product/rank/"+sortProduct.id+'/'+sortProduct.type+'/'+sortProduct.proOrder);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //删除栏目
    async deletProductColumn({ commit, state, rootState }, deletProductColumn) {
      let data = await postString("/productColumn/delete",deletProductColumn);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    //删除产品
    async deletrpoduct({ commit, state, rootState }, deletProductColumn) {
      let data = await postString("/product/delete",deletProductColumn);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
    // 产品下架
    async payaway({ commit, state, rootState }, payaway) {
      let data = await post("/product/payaway/"+payaway.id+'/'+payaway.status+'/'+payaway.tenantId);
      console.log(data);
      if (data.code == 200) {
        Message.success(data.message)
        setTimeout(function() {
          location.reload();
        }, 300);
      } else {
        Message.warning(data.message);
      }
    },
  }
};
