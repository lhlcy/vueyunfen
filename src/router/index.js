import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)
// 错误页
const error = r => require.ensure([], () => r(require('../pages/error')), 'error')
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')

const centerHome = r => require.ensure([], () => r(require('../pages/dashboard/children/home')), 'centerHome')
const Newcolumn = r => require.ensure([], () => r(require('../pages/dashboard/children/new/column')), 'Newcolumn')
const seo = r => require.ensure([], () => r(require('../pages/dashboard/children/new/seo')), 'seo')
const content = r => require.ensure([], () => r(require('../pages/dashboard/children/new/content')), 'content')
const contentNew = r => require.ensure([], () => r(require('../pages/dashboard/children/new/content/contentNew')), 'contentNew')
const dashboard = r => require.ensure([], () => r(require('../pages/dashboard')), 'dashboard')
const account = r => require.ensure([], () => r(require('../pages/account')), 'account')
const login = r => require.ensure([], () => r(require('../pages/account/children/login')), 'login')
// 招聘信息
const recruitInfo = r => require.ensure([], () => r(require('../pages/dashboard/children/recruitInfo')), 'recruitInfo')
const editRecruit = r => require.ensure([], () => r(require('../pages/dashboard/children/recruitInfo/editRecruit')), 'editRecruit')
//产品信息
const product = r => require.ensure([], () => r(require('../pages/dashboard/children/product')), 'product')
const menuDetail = r => require.ensure([], () => r(require('../pages/dashboard/children/product/menuDetail')), 'menuDetail')
//账户信息
const tenant = r => require.ensure([], () => r(require('../pages/dashboard/children/AccountManage/tenant')), 'tenant')
//加盟信息
const joinInfo = r => require.ensure([], () => r(require('../pages/dashboard/children/joinInfo')), 'joinInfo')
export default new Router({
  routes: [{
    path: '/', //主页默认为空
    component: App,
    title: '云粉世家',
    children: [{
      path: '', //主页
      component: home
    }, {
      path: '/dashboard', //后台页
      component: dashboard,
      meta: {
        requiresAuth: true
      },
      children: [{
        path: '', //为空默认首页
        component: centerHome
      },{
        path: '/dashboard/home', //后台--菜单管理
        component: centerHome
      },{
        path: '/dashboard/new/column', //后台--菜单管理
        component: Newcolumn
      },{
        path: '/dashboard/new/seo', //后台--菜单管理
        component: seo
      },{
        path: '/dashboard/new/content', //后台--菜单管理
        component: content
      },{
        path: '/dashboard/new/content/add', //后台--菜单管理
        component: contentNew
      },{
          path: '/dashboard/product', //后台--招聘信息
          component: product
      },{
        path: '/dashboard/recruitInfo', //后台--招聘信息
        component: recruitInfo
      },{
        path: '/dashboard/recruitInfo/editRecruit', //后台--招聘信息详情
        component: editRecruit
      },{
        path: '/dashboard/product/menuDetail', //后台--招聘信息
        component: menuDetail
      },{
        path: '/dashboard/AccountManage/tenant', //后台--招聘信息
        component: tenant
      },{
        path: '/dashboard/joinInfo', //后台--招聘信息
        component: joinInfo
      }]
    }, {
      path: '/account', //登陆
      component: account,
      children: [{
        path: '', //为空默认登录页
        component: login
      }, {
        path: 'login', //登陆页
        component: login
      }]
    }]
  }, {
    path: '*', //错误页
    component: error,
  }]
})
