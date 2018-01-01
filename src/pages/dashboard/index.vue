<template>
  <div class="dashboard_container">
    <yunHeader/>
    <Sidebar/>
    <div class="main container clearfix">
      <transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { getCookie, delCookie } from '../../utils/cookies'
import { setStorage, getStorage, delStorage} from '../../utils/storage'
import Sidebar from '../../components/sidebar'
import yunHeader from '../../components/Header'

export default {
  name: "dashboard",
  data() {
    return {};
  },
  computed: {},
  methods: {

  },
  created() {
    //验证是否登录
    if (!!getCookie("SYS_ACCESS_TOKEN") == false) {
      delCookie("SYS_ACCESS_TOKEN");
      this.$router.push({ path: "/account/login" });
      return false;
    }
    //初始化个人信息
    this.$store.commit("PROFILE", {
      profile: getStorage("YFadminId")
    });
  },
  mounted() {

  },
  components: {
    Sidebar,
    yunHeader
  }
};

</script>

<style lang="scss">
  .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .1s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
	.dashboard_container{
		position: relative;
		height: 100%;
		.header{
			position: fixed;
			z-index: 1000;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 60px;
			background: #324057;
			line-height: 60px;
			color: #9DA8BC;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
		}
		.sidebar{
			position: fixed;
			z-index: 8;
			padding-top: 60px;
			left: 0;
			bottom: 0;
			width: 240px;
			height: 100%;
			background: #324057;
      overflow: auto;
		}
		.main{
		  z-index: 7;
			width: 100%;
			padding: 60px 0px 0px 240px;
			height: 100%;
      background: white;
			.navigation{
        font-size: 18px;
        color: #444;
    		height: 110px;
    		background: #f8f8f9;
    		padding-left: 20px;
    		padding-top: 20px;
    		line-height: 36px;
    	}
    	.nav_detail{
    		height: 110px;
    		line-height: 110px;
    		background: white;
    		padding-left: 20px;

    	}
    	.content_container{
    		padding: 20px 20px 100px 20px;
    	}
		  .detail_title{
		  	border-left: 2px solid #33AAFF;
		  	padding-left: 9px;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: normal;
		  }
		}
    .goBack{
      margin: 20px 20px 0 0
    }
    .header-title > *{
      float: left;
      line-height: 36px;
      margin-right: 15px;
      margin-left: 0 !important;

    }
	}

</style>
