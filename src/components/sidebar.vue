
<template>
  <div class="sidebar">
    <div class="container_left">
      <div class="top">
        <img src="../assets/img/avatar.png" height="80" width="80" class="avatar">
        <p class="mt20 name">{{name}}</p>
        <p class="mt10 auth">{{auth}}</p>
      </div>
      <el-row class="tac">
        <el-col :span="24">
        <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark" :unique-opened="true" :router="true">
          <el-menu-item index="/dashboard"><i class="iconfont icon-shouye"></i>首页</el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="iconfont icon-yingyongchengxu"></i>新闻信息</template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/new/column">新闻分类</el-menu-item>
              <el-menu-item index="/dashboard/new/content">发布新闻</el-menu-item>
              <el-menu-item index="/dashboard/new/seo">SEO设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="iconfont icon-tijikongjian"></i>产品管理</template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/product">产品信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="iconfont icon-yonghu"></i>账户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/AccountManage/tenant">账户信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/dashboard/joinInfo"><i class="iconfont icon-danju"></i>加盟信息</el-menu-item>
          <el-menu-item index="/dashboard/recruitInfo"><i class="iconfont icon-mobankuangjia"></i>招聘信息</el-menu-item>
        </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { Col, Menu, Submenu, MenuItemGroup, MenuItem, Row, CollapseTransition} from 'element-ui'
    name:'Sidebar'
    export default{
        data(){
            return {}
        },
        computed: {

//          avatar () {
//            return this.$store.state.profile.qrCodeUrl;
//          },
          name () {
            return this.$store.state.profile.trueName;
          },
          auth () {
            return this.$store.state.profile.userName;
          },
        },
        methods: {},
        components: {
          elRow: Row,
          elCol: Col,
          elMenu: Menu,
          elSubmenu: Submenu,
          elMenuItemGroup: MenuItemGroup,
          elMenuItem: MenuItem
        }
    }
</script>
<style lang="scss">
  .sidebar{
  .icon{
    display: inline-block;
    float: left;
    margin: 15px 10px 0 0;
    background-repeat: no-repeat;
    width: 27px;
    height: 27px;
  }
  .iconfont{
    margin-right: 10px;
    font-size: 18px;
    vertical-align: top;
  }
  .container_left{
    .top{
      height: 240px;
      background: #324057;
      width: 100%;
      text-align: center;
      color: #EEEEEE;
    .avatar{
      border-radius: 50%;
      margin-top: 50px;
    }
    .name{
      font-size: 18px;
    }
    .auth{
      font-size: 14px;
    }
    }
      .tac{
      .el-menu-item-group__title{
        display: none
      }
      .el-menu-item{
        border-bottom: 1px solid #363b3f;
        border-left: 2px solid transparent;
      &.is-active{
         border-left: 2px solid #33aaff;
       }
      }
      .el-menu--dark{
        background-color: #324057
      }
      .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
        background-color: none;
        color: #fff
      }
      .el-menu--dark .el-submenu .el-menu{
        background-color: #424a4d
        }
      }
    }
  }
</style>
