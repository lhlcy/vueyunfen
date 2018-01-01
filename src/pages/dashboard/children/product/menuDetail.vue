<template>
  	<div class="menuDetail_container">
      <el-button  @click="$router.go(-1)" class="fr" style="margin: 30px 5%">返回</el-button>
      <div class="navigation">
         <p>MENUDETAIL </p>
         <p>产品信息 - 菜单详情</p>
      </div>
      <div class="content_container">
        <el-row class="mb20 header-title clearfix">
          <span class="">标题：</span>
          <el-input v-model="filter.title.input" style="width: 15%;" @keyup.enter.native="filterData()"></el-input>
          <span class="ml50">时间：</span>
          <el-select v-model="filter.title.select" style="width: 120px;">
            <el-option label="上架时间" value="1"></el-option>
            <el-option label="下架时间" value="2"></el-option>
          </el-select>
          <el-date-picker
            v-model="filter.time"
            type="daterange"
            :picker-options="pickerOptions"
            placeholder="选择时间范围"
            style="width: 250px;"
            align="right">
          </el-date-picker>
          <el-button type="primary" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterData()">查询</el-button>
          <el-button type="danger" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterClean()">清空</el-button>
        </el-row>
  			<el-row class="mb20">
			    <el-table :data="productlist" stripe style="width: 100%" @selection-change="selectionChange">
				    <el-table-column type="selection" width="55"></el-table-column>
				    <el-table-column prop="proOrder" label="排序"></el-table-column>
				    <el-table-column prop="name" label="菜名">
            </el-table-column>
				    <el-table-column prop="proPice" label="价格">
              <template scope="scope">
                {{ scope.row.proPice  || '未填写'}}
              </template>
            </el-table-column>
            <el-table-column prop="proCount" label="数量">
              <template scope="scope">
                {{ scope.row.proCount  || '未填写'}}
              </template>
            </el-table-column>
				    <el-table-column prop="beginDate" label="上架时间">
              <template scope="scope">
                {{scope.row.beginDate | date}}
              </template>
            </el-table-column>
            <el-table-column prop="endDate" label="下架时间">
              <template scope="scope">
                {{scope.row.endDate | date}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                <el-tag type="primary" v-if="scope.row.status == 1">上架</el-tag>
                <el-tag type="danger" v-if='scope.row.status == 3 || scope.row.status == 2'>下架</el-tag>
              </template>
            </el-table-column>
				    <el-table-column prop="createByName" label="操作员">
              <template scope="scope">
                <el-tag type="gray">{{scope.row.createByName}}</el-tag>
              </template>
            </el-table-column>
				    <el-table-column label="操作" width="300">
				      <template scope="scope">
				        <el-button size="mini" type="warning" @click="resetPassword(scope.row)">修改</el-button>
                <el-button size="mini" type="success" v-if='scope.row.status == 1' @click="sort(scope.row.id,1,scope.row.proOrder)">
                 升序</el-button>
                <el-button size="mini" type="warning"  v-if='scope.row.status == 1' @click="sort(scope.row.id,2,scope.row.proOrder)">降序</el-button>
                <el-button size="mini" type="danger"  v-if='scope.row.status == 3 || scope.row.status == 2' @click="start(scope.row.id,scope.row.status)">上架</el-button>
                <el-button size="mini" type="danger"  v-if='scope.row.status == 1' @click="start(scope.row.id,scope.row.status)">下架</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
  			</el-row>
			  <el-row class="mb20 text-c">
				<el-button class="fl" type="info" @click="addMemberDialog = true">新增</el-button>
          <el-button class="fl" type="warning" @click="delRec">删除</el-button>
        <el-pagination
          @current-change="pagesChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
		   </el-row>
       </div>
    	 <el-dialog title="发布招聘信息" v-model="addMemberDialog" size="tiny" v-on:close="close" :show-close="false">
    			<el-form :model="addMemberForm" :rules="rules" ref="addMemberForm">
  			    <el-form-item label="菜名" label-width="120px" prop="name">
  			      <el-input v-model="addMemberForm.name" auto-complete="off" style="width: 350px;" placeholder="请输入菜名"></el-input>
  			    </el-form-item>
            <el-form-item label="菜价" label-width="120px" prop="proPice">
              <el-input type="number" v-model="addMemberForm.proPice" auto-complete="off" style="width: 350px;" placeholder="请输入菜价"></el-input>
            </el-form-item>
            <el-form-item label="数量" label-width="120px" prop="proCount">
              <el-input type="number" v-model="addMemberForm.proCount" auto-complete="off" style="width: 350px;" placeholder="请输入数量"></el-input>
            </el-form-item>
            <el-form-item label="折扣" label-width="120px" prop="discount">
            <el-input type="number" v-model="addMemberForm.discount" auto-complete="off" style="width: 350px;" placeholder="请输入折扣"> <template slot="append">%</template></el-input>
          </el-form-item>
            <el-form-item label="产品说明" label-width="120px" prop="introduce">
              <el-input type="textarea" v-model="addMemberForm.introduce" auto-complete="off" style="width: 350px;" placeholder="请输入产品描述" :maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="官网产品图片：" prop="pcPicture"  label-width="120px">
              <div class="fileWrap" v-if="info.picType == 1">
                <ImgUpload class="fileUpload" :class="{upload: !!addMemberForm.pcPicture}" imgTip="尺寸为一定为
                280*188，大小不要超过2MB" @success="uploadFileSuccessNewUrl" />
                <img :src="addMemberForm.pcPicture" v-if="!!addMemberForm.pcPicture">
              </div>
              <div class="file" v-else>
                <ImgUpload class="fileUpload" :class="{upload: !!addMemberForm.pcPicture}" imgTip="尺寸为一定为
                220*330，大小不要超过2MB" @success="uploadFileSuccessNewUrl" />
                <img :src="addMemberForm.pcPicture" v-if="!!addMemberForm.pcPicture">
              </div>
            </el-form-item>
            <el-form-item label="微信产品图片：" prop="appPicture"  label-width="120px" style="margin-top: 50px">
              <div class="fileWrap" v-if="info.picType == 1">
                <ImgUpload class="fileUpload" :class="{upload: !!addMemberForm.appPicture}" imgTip="尺寸为一定为
                220*330，大小不要超过2MB" @success="uploadFileSuccessweUrl" />
                <img :src="addMemberForm.appPicture" v-if="!!addMemberForm.appPicture">
              </div>
              <div class="file" v-else>
                <ImgUpload class="fileUpload" :class="{upload: !!addMemberForm.appPicture}" imgTip="尺寸为一定为
                220*330，大小不要超过2MB" @success="uploadFileSuccessweUrl" />
                <img :src="addMemberForm.appPicture" v-if="!!addMemberForm.appPicture">
              </div>
            </el-form-item>
    			</el-form>
    			<div slot="footer" class="dialog-footer text-c" >
  			    <el-button @click="addMemberDialog = false">取 消</el-button>
  			    <el-button type="primary" @click="submitForm('addMemberForm')">发布</el-button>
    			</div>
    	 </el-dialog>
    </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { setStorage, delStorage, getStorage } from "../../../../utils/storage";
import { validatediscount} from '../../../../utils/validate'
import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination,Tag} from 'element-ui'
import ImgUpload from "../../../../components/ImgUpload"
export default {
  name: "menuDetail",
  data() {
    return {
        info:{

        },
      //过滤器
      filter: {
        title: {
          select: "",
          input: ""
        },
        time: ['','']
      },
      //当前页
      currentPage: 1,
      //多选
      multipleSelection: [],
      //日期和时间范围选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //新增会员
      addMemberForm: {
        cid: this.$route.query.cid,
        tenantId: this.$store.state.profile.tenantId,
        id:'',
        name: "",
        proCount: "",
        discount: '',
        proPice: '',
        introduce: '',
        pcPicture: '',
        appPicture: "",
      },
      rules:{
        name: [
          { required: true, message: '请输入菜名', trigger: 'blur' },
        ],
        proPice: [
          { required: true,  message: '请输入菜价',trigger: 'blur' },
        ],
        pcPicture: [
          { required: true, message: '请上传产品图', trigger: 'blur' }
        ],
        appPicture: [
          { required: true, message: '请上传产品图', trigger: 'blur' }
        ],
      },
      addMemberDialog: false,
    };
  },
  computed:{
    //URL参数
    query(){
      return {
        titleSelect: this.filter.title.select,
        titleInput: this.filter.title.input,
        beginTime: !!this.filter.time[0] ? (this.moment(this.filter.time[0])).format('YYYY-MM-DD') : "",
        endTime: !!this.filter.time[1] ? (this.moment(this.filter.time[1])).format('YYYY-MM-DD') : "",
        currentPage: this.currentPage,
        cid: this.$route.query.cid,
        tenantId: this.$store.state.profile.tenantId,
      }
    },
    ...mapState({
      productlist: state => state.moduleProduct.productlist,
      totalCount: state => state.moduleProduct.totalCount
    })
  },
  methods: {
    //过滤器
    filterData() {
      this.currentPage = 1;
      this.$router.push({ path: this.$route.path, query: this.query});
      this.getRecruitListFn();
    },
    sort(id,type,proOrder){
      this.$store.dispatch('sortProduct',{
        id,
        type,
        proOrder
      })
    },
    //清空
    close(){
      this.addMemberDialog = false;
      this.addMemberForm =  {
        id:'',
        name: "",
        proCount: "",
        discount: '',
        proPice: '',
        introduce: '',
        pcPicture: '',
        appPicture: '',
        cid: this.$route.query.cid,
      }
    },
    filterClean(){
      this.$router.push({ path: this.$route.path,query:{
        cid: this.$route.query.cid
      } });
      this.filter = {
        title: {
          select: "",
          input: ""
        },
        time: ['','']
      };
      this.getRecruitListFn();
    },
    start(id,status){
      this.$store.dispatch("payaway", {
          id,
        status: status == 1 ? 2 : 1,
        tenantId: this.$store.state.profile.tenantId
      });
    },
    //多选
    selectionChange(val) {
      this.multipleSelection = val.map(function (item) {
        return item.id
      })
    },
    //分页
    pagesChange(val) {
      this.currentPage = val;
      this.$router.push({ path: this.$route.path, query: this.query});
      this.getRecruitListFn();
    },
    uploadFileSuccessNewUrl(url){
      this.$set(this.addMemberForm,'pcPicture', url);
    },
    uploadFileSuccessweUrl(url){
      this.$set(this.addMemberForm,'appPicture', url);
    },
    delRec() {
      if (this.multipleSelection.length == 0) {
        Message.warning("请选择删除信息");
        return;
      }
      MessageBox.confirm("是否删除该菜单信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("deletrpoduct", {
          ids: this.multipleSelection.join(',')
        });
      }).catch(() => {
      });
    },
    resetPassword (info){
      this.addMemberDialog = true;
      this.$set(this.addMemberForm,'id',info.id)
      this.$set(this.addMemberForm,'name',info.name)
      this.$set(this.addMemberForm,'proCount',info.proCount)
      this.$set(this.addMemberForm,'discount',info.discount)
      this.$set(this.addMemberForm,'proPice',''+info.proPice)
      this.$set(this.addMemberForm,'introduce',''+info.introduce)
      this.$set(this.addMemberForm,'pcPicture',info.pcPicture)
      this.$set(this.addMemberForm,'appPicture',info.appPicture)
    },
    //添加保存会员信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            if(this.addMemberForm.discount<0 || this.addMemberForm.discount>100){
                Message.warning('请输入正确折扣')
                return false;
            }
            if(this.addMemberForm.id){
              this.$store.dispatch('updateProduct',this.addMemberForm)
            } else {
              this.$store.dispatch('addProduct',this.addMemberForm)
            }
        } else {
          return false;
        }
      })
    },
    //获取列表
    getRecruitListFn(){
      //基本配置
      let query = {
          page:{
            currentPage: this.$route.query.currentPage || 1,
            pageSize: this.$route.query.pageSize || 20,
          },
          cid: this.$route.query.cid,
          tenantId: this.$store.state.profile.tenantId
      }
      //标题搜索
      !!this.$route.query.titleInput && (query.name = this.$route.query.titleInput)
      !!this.$route.query.titleSelect && (query.status = this.$route.query.titleSelect)
      //日期搜索
      !!this.$route.query.beginTime && (query.beginTime = this.$route.query.beginTime)
      !!this.$route.query.endTime && (query.endTime = this.$route.query.endTime)
      this.$store.dispatch("productlist", query);
    }
  },
  created() {
    //获取列表
    this.info = getStorage('product');
    this.getRecruitListFn();
    //初始化条件
    !!this.$route.query.titleSelect && this.$set(this.filter.title, 'select', this.$route.query.titleSelect);
    !!this.$route.query.titleInput && this.$set(this.filter.title, 'input', this.$route.query.titleInput);
    !!this.$route.query.beginTime && this.$set(this.filter.time, '0', (new Date(this.$route.query.beginTime)));
    !!this.$route.query.endTime && this.$set(this.filter.time, '1', (new Date(this.$route.query.endTime)));
    !!this.$route.query.currentPage && (this.currentPage = +this.$route.query.currentPage);
  },
  destroy(){
    delStorage('product');
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
    [Tag.name]: Tag,
    ImgUpload
  }
};

</script>

<style lang="scss">
    .menuDetail_container{
        .fileWrap{
          position: relative;
          width: 280px;
          height: 188px;
          .uploadBox{
            width: 280px;
            height: 188px;
            .el-upload{
              width: 280px;
              .el-upload-dragger{
                height: 188px;
              }
            }
             .uploadPre{
               width: 280px;
               height: 188px;
             }
          }
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
          width: 280px;
          height: 188px;
        }
      }
      .file{
        position: relative;
        width: 220px;
        height: 330px;
          .uploadBox{
            width: 220px;
            height: 330px;
            .el-upload{
              width: 220px;
              .el-upload-dragger{
                height: 330px;
                .el-icon-upload{
                  margin-top: 90px!important;
                }
              }
            }
            .uploadPre{
               width: 220px;
               height: 330px;
            }
          }
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
          width: 220px;
          height: 330px;
        }
      }
    }
</style>
