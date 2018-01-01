<template>
		<div class="login_container">
			<div class="login_box clearfix">
				<div class="fl login_poster"></div>
				<div class="fl login_main">
					<div class="title">云粉世家后台管理系统</div>
					<el-form :model="loginFrom" :rules="loginRules" ref="loginFrom" class="loginFrom" :class="{ remeberPass: loginFrom.storage }">
						 <el-form-item prop="userName">
								<el-input type="text" v-model="loginFrom.userName" auto-complete="off" placeholder="请输入用户名" :maxlength="16" @keyup.enter.native="submitForm('loginFrom')"></el-input>
						 </el-form-item>
						 <el-form-item prop="userPwd">
								<el-input type="password" v-model="loginFrom.userPwd" auto-complete="off" placeholder="请输入密码" :maxlength="16" @keyup.enter.native="submitForm('loginFrom')"></el-input>
						 </el-form-item>
            <el-form-item prop="code" class="imageCode">
              <el-input  v-model="loginFrom.code" auto-complete="off" placeholder="请输入验证码" :maxlength="16" @keyup.enter.native="submitForm('loginFrom')"></el-input>
              <img :src="getLoginImageCode" alt="" class="getLoginImageCode" @click="reImageCode">
            </el-form-item>
               <el-form-item class="remeber clearfix">
                  <el-checkbox label="记住用户名" class="fl a-gray" v-model="loginFrom.remeber"></el-checkbox>
                 <el-button  @click="submitForm('loginFrom')">登录</el-button>
               </el-form-item>
				 </el-form>
				</div>
			</div>
		</div>
</template>

<script>

import { mapState } from 'vuex'
import { getStorage } from '../../../utils/storage'
import { validateName, validatePass ,validatepcode} from '../../../utils/validate'
import { baseUrl } from '../../../config/env'
import { Form, FormItem, Input, Button, Checkbox } from 'element-ui'
export default {
  name: 'login',
  data() {
    return {
      imgCodeTime: this.moment().format('YYYYMMDDhhmmss') + (Math.random() * 100000000000000000),
      loginFrom: {
        userName: '',
        userPwd: '',
        remeber: false,
        code: '',
        storage: false
      },
      loginRules: {
        userName: [
          { validator: validateName, trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        userPwd: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 50, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { validator: validatepcode, trigger: 'blur' },
          { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getLoginImageCode(){
      console.log(baseUrl + '/authImage/imageCode?time=' + this.imgCodeTime)
      return baseUrl + '/authImage/imageCode?time=' + this.imgCodeTime
    },
  },
  methods: {
    reImageCode(){
      this.imgCodeTime = this.moment().format('YYYYMMDDhhmmss') + (Math.random() * 100000000000000000);
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('sysUserLogin',{
            userName: this.loginFrom.userName,
            password: this.loginFrom.userPwd,
            code: this.loginFrom.code,
            time: this.imgCodeTime,
            remeber: this.loginFrom.remeber,
            redirect: !!this.$route.query.redirect ? this.$route.query.redirect : null
          })
        } else {
          return false;
        }
      });
    }
  },
  created(){
    //填入账户密码
    let storage = getStorage('YFadminIdRemeber')
    if (!!storage) {
      this.$set(this.loginFrom,'userName',storage.userName)
      this.$set(this.loginFrom,'userPwd',storage.userPwd)
      this.$set(this.loginFrom,'storage', true)
    }
  },
    components: {
      elForm: Form,
      elFormItem: FormItem,
      elInput: Input,
      elButton: Button,
      elCheckbox: Checkbox
  	}
}

</script>

<style lang="scss">
	.login_container{
		position: relative;
		height: 100%;
    background: url(../../../assets/img/login-bg.png);
		background-size: cover;
		.login_box{
			position: fixed;
			top: 50%;
			left: 50%;
			width: 850px;
			height: 441px;
			margin: -215px 0 0 -425px;
			background: #ebf7fd;
			border-radius: 5px;
			box-shadow: 0 0 12px 0 rgba(18, 18, 18, 0.25);
			overflow: hidden;
			.login_poster{
				width: 300px;
				height: 100%;
				background: #999;
        background: url(../../../assets/img/login-pic.png);
			}
			.login_main{
				.title{
					font-size: 20px;
					color: #666;
          text-align: center;
					margin: 40px 0 40px  80px;
				}
				.loginFrom{
        margin: 0 0 0 80px;
          .el-form-item{
            margin-bottom: 32px !important;
          }
					.el-input__inner{
						font-size: 16px;
						width: 380px;
						height: 40px;
						border-radius: 40px;
						padding: 6px 15px;
					}
        .imageCode{
          position: relative;
          .getLoginImageCode{
            position: absolute;
            right: 25px;
            top: 2px;
            width: 100px;
            height: 35px;
            border: 1px solid #d1dbe5;
            cursor: pointer;
          }
        }
					.remeber{
						padding-left: 15px;
						.el-checkbox__label{
								color: #999;
								font-size: 16px;
						}
					}
					.el-button{
						float: right;
						width: 160px;
						height: 40px;
            color: #eff8fe;
						font-size: 20px;
            line-height: 10px;
						border-radius: 50px;
            background: #9fc2e6 !important;
            border-color:  !important; ;
						box-shadow: 0 0 12px 0 rgb(159, 194, 230);
					}
					.el-form-item__error{
						left: 15px
					}
				}
			}
		}
		.remeberPass.loginFrom{
			.el-input__inner{
				background: #ccd0e4;
        opacity: 0.7;
			}
		}
	}
</style>
