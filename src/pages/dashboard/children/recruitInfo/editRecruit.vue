<template>
	<div class="editRecruit">
		<div class="navigation">
			<el-button @click="$router.go(-1)" class="goBack">返回</el-button>
		</div>
		<div class="content_container">
			<el-form :model="addMemberForm" :rules="rules" ref="addMemberForm" label-width="100px" class="addMemberForm">
        <el-form-item label="招聘职位" label-width="120px" prop="jobName">
          <el-input v-model="addMemberForm.jobName" auto-complete="off" style="width: 350px;" placeholder="招聘职位" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="招聘状态" label-width="120px" prop="expire">
          <el-select v-model="addMemberForm.expire" placeholder="请选择" style="width: 350px;">
            <el-option label="正常" value="1"></el-option>
            <el-option label="已过期" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点" label-width="120px" prop="address">
          <el-input v-model="addMemberForm.address" auto-complete="off" style="width: 350px;" placeholder="工作地点"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数" label-width="120px" prop="peopleNum">
          <el-input type="number" v-model="addMemberForm.peopleNum" auto-complete="off" style="width: 350px;" placeholder="招聘人数"></el-input>
        </el-form-item>
        <el-form-item label="招聘类型" label-width="120px" prop="jobLevel">
          <el-select v-model="addMemberForm.jobLevel" placeholder="请选择" style="width: 350px;">
            <el-option label="普通招聘" value="1"></el-option>
            <el-option label="急招" value="2"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="招聘要求："  class="content">
          <Editer @output='editerOutput' :input='editerInput' />
				</el-form-item>
				<el-form-item style="margin-top:50px;">
					<el-button type="primary" @click="submitForm('addMemberForm')" style="width: 120px;">发布{{editting ? "(修改)" : ""}}</el-button>
					<el-button @click="cancel" style="width: 120px;">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>


  import { mapState } from 'vuex';
  import { validatePhone ,validaterecTotal } from '../../../../utils/validate'
  import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination} from 'element-ui'
import Editer from '@/components/Editer';
	export default {
		name: "contentNew",
		data() {
			return {
        UeditorContent:'',
        UeditorContentTxt: '',
        rules:{
          jobName: [
            { required: true, message: '请输入招聘职位', trigger: 'blur' },
          ],
          address: [
            { required: true,  message: '请输入工作地址',trigger: 'blur' },
          ],
          jobDesc: [
            { required: true,  message: '请输入招聘描述', trigger: 'blur' },
          ],
          peopleNum: [
            { required: true, validator: validaterecTotal, trigger: 'blur' },
          ],
          expire:[
            { required: true, message: '请选择招聘状态', trigger: 'change' }
          ],
          jobLevel:[
            { required: true, message: '请选择招聘类型', trigger: 'change' }
          ],
        },
			};
		},
		computed:{
			//是否编辑
			editting(){
				return this.$route.query.edit == "1"
			},
			...mapState({
        addMemberForm: state => state.moduleRecruitInfo.addMemberForm,
        editerInput: state => state.moduleRecruitInfo.editerInput,
			})
		},
		methods: {
			//发布
			submitForm(formName) {
	      this.$refs[formName].validate((valid) => {
	        if (valid) {
	            console.log(this.UeditorContent)
						if (this.editting) {
							//编辑
							this.$store.dispatch("addRecruitment", {
                id: this.addMemberForm.id,
                jobName: this.addMemberForm.jobName,
                address: this.addMemberForm.address,
                peopleNum: this.addMemberForm.peopleNum,
                jobLevel: this.addMemberForm.jobLevel,
                expire: this.addMemberForm.expire,
                jobDesc: this.UeditorContent
							});
						} else {
							//发布
							this.$store.dispatch("addRecruitment", {
                jobName: this.addMemberForm.jobName,
                address: this.addMemberForm.address,
                peopleNum: this.addMemberForm.peopleNum,
                jobLevel: this.addMemberForm.jobLevel,
                expire: this.addMemberForm.expire,
                jobDesc: this.UeditorContent
							});
						}
	        } else {
	          return false;
	        }
	      });
	    },
      editerOutput(content, txt){
        this.UeditorContent = content
        this.UeditorContentTxt = txt
      },
			//取消
			cancel(){
        MessageBox.confirm('确定放弃当前编辑？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({
						path: "/dashboard/recruitInfo"
					});
				}).catch(() => {

				});
			},
		},
		created() {
			//编辑状态
	    if (this.$route.query.edit == "1" && !!this.$route.query.id == true) {
				this.$store.dispatch("detailRecruit", {
					id: this.$route.query.id
				});
	    }

		},
		beforeDestroy () {
			setTimeout(function () {
				location.reload()
			},300)
		},
		components: {
      elButton: Button,
      elDialog: Dialog,
      elSelect: Select,
      elOption: Option,
      elInput: Input,
      elDatePicker: DatePicker,
      elTable: Table,
      elTableColumn: TableColumn,
      elRow: Row,
      elPagination: Pagination,
      elForm: Form,
      elFormItem: FormItem,
      [Editer.name]: Editer,
		}
	};
</script>

<style lang="scss">
	.editRecruit {
		.addNoticePublic{
			margin-bottom: 100px;
		}
		.content .el-form-item__content{
			line-height: 1;
		}
		.fileWrap{
			position: relative;
			width: 240px;
			height: 210px;
			.fileUpload{
				position: absolute;
				left:0;
				top:0;
				z-index: 1;
				&.upload{
					opacity: 0;
				}
			}
			img{
				position: absolute;
				left:0;
				top:0;
				z-index: 0;
				width: 240px;
				height: 180px;
			}
		}
	}
</style>
