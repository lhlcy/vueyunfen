<template>
	<div class="contentNew">
		<div class="navigation">
			<el-button @click="goBack" class="goBack">返回</el-button>
		</div>
		<div class="content_container">
			<el-form :model="addNoticePublic" :rules="rules" ref="addNoticePublic" label-width="100px" class="addNoticePublic">
				<el-form-item label="栏目：" prop="cid" class="is-required">
					 <el-cascader expand-trigger="hover" v-model="addNoticePublic.column" :options="getCascadeNotice" @change="cascaderChange" style="width: 940px;"></el-cascader>
				</el-form-item>
				<el-form-item label="标题：" prop="title">
					<el-input v-model="addNoticePublic.title" auto-complete="off" style="width: 940px;" placeholder="标题" :maxlength="100"></el-input>
				</el-form-item>
				<el-form-item label="内容：" prop="content" class="content" v-if="addNoticePublic.pType == 0">
					<!--<div id="UeditorText" style="display:none">{{addNoticePublic.content}}</div>-->
					<!--<iframe src="https://editor.jiagujin.com/index.html" id="Ueditor" ref="Ueditor" name="Ueditor" width="940px" height="620px" scrolling="no" frameborder="0"></iframe>-->
          <Editer @output='editerOutput' :input='editerInput' />
				</el-form-item>
				<el-form-item label="内容：" prop="content" class="content" v-if="addNoticePublic.pType == 1">
					<el-input type="textarea" style="width: 940px;" :rows="5" placeholder="请输入内容" v-model="addNoticePublic.content"></el-input>
				</el-form-item>
				<el-form-item label="关键词：" prop="keyword">
					<el-input v-model="addNoticePublic.keyword" auto-complete="off" style="width: 940px;" placeholder="0-150个字符，每个关键词用“，”号隔离，列如：合兴永盛，互联网金融第一品牌，深圳..." :maxlength="150"></el-input>
				</el-form-item>
				<el-form-item label="来源：" prop="source">
					<el-input v-model="addNoticePublic.source" auto-complete="off" style="width: 400px;" placeholder="1-10个字符" :maxlength="20"></el-input>
				</el-form-item>
				<!--<el-form-item label="标签：" prop="tags">-->
					<!--<el-input v-model="addNoticePublic.tags" auto-complete="off" style="width: 400px;" placeholder="1-100个字符" :maxlength="100"></el-input>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="标签地址：" prop="tagsUrl">-->
					<!--<el-input v-model="addNoticePublic.tagsUrl" auto-complete="off" style="width: 400px;" placeholder="1-100个字符" :maxlength="100"></el-input>-->
				<!--</el-form-item>-->
				<el-form-item label="图片:" prop="newsUrl" v-if="addNoticePublic.pType == 0">
					<div class="fileWrap">
						<ImgUpload class="fileUpload" :class="{upload: !!addNoticePublic.newsUrl}" imgTip="尺寸为560*300，大小不要超过2MB" @success="uploadFileSuccess" />
						<img :src="addNoticePublic.newsUrl" v-if="!!addNoticePublic.newsUrl">
					</div>
				</el-form-item>
				<!--<el-form-item label="资讯置顶：" prop="url" style="margin-top:50px;" v-if="addNoticePublic.pType == 0">-->
					<!--<div class="fileWrap">-->
						<!--<ImgUpload class="fileUpload" :class="{upload: !!addNoticePublic.url}" imgTip="尺寸为1920*400，大小不要超过2MB" @success="uploadFileSuccessNewUrl" />-->
						<!--<img :src="addNoticePublic.url" v-if="!!addNoticePublic.url">-->
					<!--</div>-->
				<!--</el-form-item>-->
        <!--<el-form-item label="是否置顶" prop="siteIsTop" style="margin-top:10px;">-->
          <!--<el-radio-group v-model="addNoticePublic.siteIsTop">-->
            <!--<el-radio label="0">否</el-radio>-->
            <!--<el-radio label="1">是</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
				<el-form-item style="margin-top:50px;">
					<el-button type="primary" @click="submitForm('addNoticePublic')" style="width: 120px;">发布{{editting ? "(修改)" : ""}}</el-button>
					<el-button @click="cancel" style="width: 120px;">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
  import { mapState } from 'vuex';
  import ImgUpload from "../../../../../components/ImgUpload"
  import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination,RadioGroup,Radio,Cascader} from 'element-ui'
  import Editer from '@/components/Editer';
	export default {
		name: "contentNew",
		data() {
			return {
        UeditorContent:'',
        UeditorContentTxt: '',
				rules:{
	        title: [
	          { required: true, message: '请输入标题', trigger: 'blur' }
	        ],
	        keyword: [
	          { required: true, message: '请输入关键词', trigger: 'blur' }
	        ],
          newsUrl: [
	          { required: true, message: '请上传封面', trigger: 'blur' }
	        ],
	        source: [
	          { required: true, message: '请输入来源', trigger: 'blur' }
	        ],
//          siteIsTop: [
//            { required: true, message: '请选择', trigger: 'change' }
//          ],
				}
			};
		},
		computed:{
			//是否编辑
			editting(){
				return this.$route.query.edit == "1"
			},
			...mapState({
				addNoticePublic: state => state.moduleContent.addNoticePublic,
				getCascadeNotice: state => state.moduleContent.getCascadeNotice,
        editerInput: state => state.moduleContent.editerInput,
			})
		},
		methods: {
      //返回
			goBack() {
				this.$router.push({
					path: "/dashboard/new/content"
				});
			},
			//上传文件
			uploadFileSuccess(url){
			    console.log(url)
				this.$set(this.addNoticePublic,'newsUrl', url);
        console.log(this.addNoticePublic.newsUrl)
			},
			uploadFileSuccessNewUrl(url){
				this.$set(this.addNoticePublic,'url', url);
			},
      editerOutput(content, txt){
        //console.log(content, txt);
        this.UeditorContent = content;
        this.UeditorContentTxt = txt;
      },
			//栏目选择
			cascaderChange(value){
        console.log(123)
				this.$set(this.addNoticePublic, 'pType', ''+value[0]);
				this.$set(this.addNoticePublic, 'nid', ''+value[1]);
			},
			//发布
			submitForm(formName) {
	      this.$refs[formName].validate((valid) => {
	        if (valid) {
	            console.log(this.UeditorContent)
              console.log(this.addNoticePublic.newsUrl);
						if (this.editting) {
							//编辑
							this.$store.dispatch("addNoticePublic", {
								id: this.addNoticePublic.id,
                nid: +this.addNoticePublic.nid,
                tenantId: this.$store.state.profile.tenantId,
								title: this.addNoticePublic.title,
								content: this.addNoticePublic.pType == 0 ? this.UeditorContent : this.addNoticePublic.content,
								newsContent: (this.UeditorContentTxt || '').substring(0,100),
								keyword: this.addNoticePublic.keyword,
                newsUrl: this.addNoticePublic.newsUrl,
                url: this.addNoticePublic.url,
                source: this.addNoticePublic.source,
                //tags: this.addNoticePublic.tags,
                //tagsUrl: this.addNoticePublic.tagsUrl,
                siteIsTop:"0",
							});
						} else {
							//发布
							this.$store.dispatch("addNoticePublic", {
                nid: this.addNoticePublic.nid,
                tenantId: this.$store.state.profile.tenantId,
								title: this.addNoticePublic.title,
								content: this.addNoticePublic.pType == 0 ? this.UeditorContent : this.addNoticePublic.content,
								newsContent: (this.UeditorContentTxt || '').substring(0,100),
								keyword: this.addNoticePublic.keyword,
								url: this.addNoticePublic.url,
                newsUrl: this.addNoticePublic.newsUrl,
								source: this.addNoticePublic.source,
                //tags: this.addNoticePublic.tags,
                //tagsUrl: this.addNoticePublic.tagsUrl,
                siteIsTop: "0",
							});
						}
	        } else {
	          return false;
	        }
	      });
	    },
			//取消
			cancel(){
        MessageBox.confirm('确定放弃当前编辑？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({
						path: "/dashboard/new/content"
					});
				}).catch(() => {

				});
			},
		},
		created() {
			//编辑状态
	    if (this.$route.query.edit == "1" && !!this.$route.query.id == true) {
				this.$store.dispatch("getNoticePublicDetail", {
					id: this.$route.query.id
				});
	    }
			this.$store.dispatch("getCascadeNotice",{
        tenantId: this.$store.state.profile.tenantId
      });

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
      elRadioGroup: RadioGroup,
      elRadio: Radio,
      elCascader: Cascader,
      [Editer.name]: Editer,
      ImgUpload
		}
	};
</script>

<style lang="scss">
	.contentNew {
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
