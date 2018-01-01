<template>
  <div class="header">
    <div class="container_head clearfix">
      <router-link to="/dashboard">
        <img src="../assets/img/logo.png" height="40" width="128" class="fl">
      </router-link>
      <div class="fr clearfix">
        <p class="title fl">欢迎来到云粉世家管理平台!</p>
        <a href="#" @click.prevent="logout()" class="logout fl">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    logout(){
      this.$store.dispatch('logout',{
        redirect: this.$route.fullPath
      })
    }
  },
  created() {

  },
  components: {

  }
};

</script>

<style lang="scss">
   .header{
     &.on{
       position: absolute;
       z-index: auto;
     }
   	 .container_head{
   	 	  img{
          width: 128px;
          height: 40px;
   	 	  	margin-left: 50px;
   	 	  	margin-top: 10px;
   	 	  }
   	 }
     .inviteCode{
       margin-right: 40px;
       cursor: pointer;
     }
     .inviteCodeDialog{
       p{
         line-height: 1;
         margin-bottom: 20px;
       }
       .qrCode{
         text-align: center;
         img{
           display: inline-block;
           width: 160px;
           height: 160px;
           border: 1px solid #bfcbd9;
         }
       }
       .btn-download{
         width: 100px;
         display: inline-block;
         height: 36px;
         font-size: 14px;
         text-align: center;
         line-height: 36px;
         background: #20a0ff;
         color: #fff;
         border-radius: 5px;
       }
     }
     .title{
       font-size: 16px;
       display: inline-block;
       margin-right: 40px;
       color: #33AAFF;
     }
     .logout{
       font-size: 16px;
       display: inline-block;
       margin-right: 60px;
       margin-top: 15px;
       width: 100px;
       height: 30px;
       text-align: center;
       line-height: 30px;
       background: #495060;
       color: #33AAFF;
       border-radius: 3px;
       border: 1px solid #484e56;
       &:hover{
         background: #000000
       }
     }
   }
</style>
