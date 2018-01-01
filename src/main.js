import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import store from './store'
import filter from './filter'
import "./style/normalize.css";
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/icon/iconfont.css';

// Vue.use(ElementUI)
Vue.prototype.moment = moment

store.subscribe((mutation, state) => {
  window.__VUEXTREE_GLOBAL_HOOK__ && window.__VUEXTREE_GLOBAL_HOOK__({
    type: '@update',
    mutation,
    state
  });
})
// 路由判断
import auth from './utils/auth';
router.beforeEach(auth);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  filter,
  template: '<App/>',
  components: {
    App
  }
})
