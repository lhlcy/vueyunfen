<template>
 <div class="home_page page_container">
    <el-row :gutter="20" class="row-item f14 c_gray6">
      <el-col :span="4">
        <router-link to="/dashboard/joinInfo" class="item green">
          <p class="num">0</p>
          <p>加盟信息</p>
        </router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/dashboard/product" class="item blue">
          <p class="num">6</p>
          <p>产品美食</p>
        </router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/dashboard/new/content" class="item red">
          <p class="num">6</p>
          <p>新闻信息</p>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCookie } from '../../utils/cookies'
import { mapState } from 'vuex';
import { Row, Col } from 'element-ui';

export default {
	name: 'home',
	created(){
    //验证是否登录
    if (!!getCookie('accessToken') == false ) {
        console.log(123)
      this.$router.push({ path: '/account/login' });
      return false
    } else {
      this.$router.replace({ path: '/dashboard' })
    }
	},
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  }
}
</script>

<style lang="scss">
 .home_page{
   margin: 30px;
    .item{
      display: block;
      height: 150px;
      background: #000;
      border-radius: 5px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      padding: 40px 0 0 0;

      .num{
        font-size: 30px;
        margin-bottom: 10px;
      }

      &.green{
        background: #13ce66;
      }

      &.blue{
        background: #59a3da;
      }

      &.red{
        background: #ff7f7f;
      }

      &:hover{
        opacity: .8;
      }
    }
  }
</style>
