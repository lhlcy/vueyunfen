<template>
  	<div class="recruit_container">
      <div class="navigation">
         <p>招聘信息 - 招聘资讯</p>
      </div>
      <div class="content_container">
        <el-row class="mb20 header-title clearfix">
          <span class="">标题：</span>
          <el-select v-model="filter.title.select" style="width: 120px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="招聘地点" value="1"></el-option>
            <el-option label="招聘类型" value="2"></el-option>
            <el-option label="招聘职位" value="3"></el-option>
          </el-select>
          <el-input v-model="filter.title.input" style="width: 300px;" @keyup.enter.native="filterData()"></el-input>
          <span class="ml50">时间：</span>
          <el-date-picker
            v-model="filter.time"
            type="daterange"
            :picker-options="pickerOptions"
            placeholder="选择时间范围"
            style="width: 300px;"
            align="right">
          </el-date-picker>
          <el-button type="primary" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterData()">查询</el-button>
          <el-button type="danger" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterClean()">清空</el-button>
        </el-row>
  			<el-row class="mb20">
			    <el-table :data="getRecruitList" stripe style="width: 100%" @selection-change="selectionChange">
				    <el-table-column type="selection" width="55"></el-table-column>
				    <el-table-column prop="jobName" label="招聘职位"></el-table-column>
				    <el-table-column prop="address" label="工作地点">
            </el-table-column>
				    <el-table-column prop="peopleNum" label="招聘人数">
            </el-table-column>
				    <el-table-column prop="jobLevel" label="招聘类型">
              <template scope="scope">
                {{ scope.row.jobLevel == "1" ? "普通招聘" : scope.row.jobLevel == "2" ? '急招' : '无要求'}}
              </template>
            </el-table-column>
            <el-table-column prop="expire" label="招聘状态">
              <template scope="scope">
                {{ scope.row.expire == "1" ? "正常" : scope.row.expire == "0" ? '已过期' : '无要求'}}
              </template>
            </el-table-column>
				    <el-table-column prop="publishDate" label="招聘时间">
              <template scope="scope">
              {{ scope.row.publishDate | date }}
              </template>
            </el-table-column>
				    <el-table-column label="操作" width="300">
				      <template scope="scope">
				        <el-button size="mini" type="warning" @click="resetPassword(scope.row)">修改</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
  			</el-row>
			  <el-row class="mb20 text-c">
				<el-button class="fl" type="info" @click="Release()">发布</el-button>
          <el-button class="fl" type="warning" @click="delRec">删除</el-button>
        <el-pagination
          @current-change="pagesChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="getRecruitListNum">
        </el-pagination>
		   </el-row>
       </div>
    </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { setStorage, delStorage, getStorage } from "../../../../utils/storage";
import { validatePhone ,validaterecTotal } from '../../../../utils/validate'
import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination} from 'element-ui'
export default {
  name: "recruitInfo",
  data() {
    return {
      //过滤器
      filter: {
        title: {
          select: "0",
          input: ""
        },
        time: ['','']
      },
      //当前页
      currentPage: 1,
      //多选
      multipleSelection: [],
      //新增会员

      addMemberDialog: false,
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
        currentPage: this.currentPage
      }
    },
    ...mapState({
      getRecruitList: state => state.moduleRecruitInfo.getRecruitList,
      getRecruitListNum: state => state.moduleRecruitInfo.getRecruitListNum
    })
  },
  methods: {
    //过滤器
    filterData() {
      if (this.filter.title.select != "0" && this.filter.title.input == "") {
        this.$message.warning("请输入标题过滤条件");
        return false;
      }
      this.currentPage = 1;
      this.$router.push({ path: this.$route.path, query: this.query});
      this.getRecruitListFn();
    },
    //清空
    filterClean(){
      this.$router.push({ path: this.$route.path});
      this.filter = {
        title: {
          select: "0",
          input: ""
        },
        time: ['','']
      };
      this.getRecruitListFn();
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

    delRec() {
      if (this.multipleSelection.length == 0) {
        Message.warning("请选择删除信息");
        return;
      }
      if (this.multipleSelection.length > 1) {
        Message.warning("每次只能删除一条");
        return;
      }
      MessageBox.confirm("是否删除该招聘信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("deleteRecruit", {
          id: this.multipleSelection[0]
        });
      }).catch(() => {

      });
    },
    resetPassword (info){
      this.$router.push({path: "/dashboard/recruitInfo/editRecruit",
        query: {
        edit: 1,
          id: info.id
      }
     })
    },
    Release(){
      this.$router.push({path: "/dashboard/recruitInfo/editRecruit",
      })
    },
    //获取列表
    getRecruitListFn(){
      //基本配置
      let query = {
        tenantId: this.$store.state.profile.tenantId,
        curPage: this.$route.query.currentPage || 1,
      }
      !!this.$route.query.titleSelect && (query.type = this.$route.query.titleSelect)
      !!this.$route.query.titleInput && (query.name = this.$route.query.titleInput)
      !!this.$route.query.beginTime && (query.stime  = this.$route.query.beginTime)
      !!this.$route.query.endTime && (query.publishDate = this.$route.query.endTime)
      !!this.$route.query.display && (query.display = this.$route.query.display)
      this.$store.dispatch("getRecruitList", query);
    }
  },
  created() {
    //获取列表
    this.getRecruitListFn();
    //初始化条件
    !!this.$route.query.titleSelect && this.$set(this.filter.title, 'select', this.$route.query.titleSelect);
    !!this.$route.query.titleInput && this.$set(this.filter.title, 'input', this.$route.query.titleInput);
    !!this.$route.query.beginTime && this.$set(this.filter.time, '0', (new Date(this.$route.query.beginTime)));
    !!this.$route.query.endTime && this.$set(this.filter.time, '1', (new Date(this.$route.query.endTime)));
    !!this.$route.query.currentPage && (this.currentPage = +this.$route.query.currentPage);
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
  }
};

</script>

<style lang="scss">
    .recruit_container{

    }
</style>
