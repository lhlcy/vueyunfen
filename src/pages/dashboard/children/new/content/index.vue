<template>
  	<div class="column_container">
      <div class="navigation">
         <p>新闻消息 - 内容设置</p>
      </div>
      <div class="content_container">
        <el-row class="mb20 header-title clearfix">
          <span class="">标题：</span>
          <el-select v-model="filter.title.select" style="width: 120px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="标题" value="1"></el-option>
            <el-option label="栏目" value="2"></el-option>
            <el-option label="来源" value="3"></el-option>
          </el-select>
          <el-input v-model="filter.title.input" style="width: 300px;" @keyup.enter.native="filterData()"></el-input>
          <span class="ml50">状态：</span>
          <el-select v-model="filter.display" style="width: 120px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="隐藏" value="0"></el-option>
            <el-option label="显示" value="1"></el-option>
          </el-select>
          <span class="ml50">时间：</span>
          <el-date-picker
            v-model="filter.time"
            type="daterange"
            :picker-options="pickerOptions"
            placeholder="选择时间范围"
            style="width: 300px;"
            align="right">
          </el-date-picker>
          <el-button type="primary"  style="width: 140px;height: 37px;line-height: 18px;" @click="filterData()">查询</el-button>
          <el-button type="danger"  style="width: 140px;height: 37px;line-height: 18px;" @click="filterClean()">清空</el-button>
        </el-row>
  			<el-row class="mb20">
			    <el-table :data="getNoticePublic" stripe style="width: 100%" @selection-change="selectionChange">
				    <el-table-column type="selection" width="55"></el-table-column>
				    <el-table-column prop="id" label="编号" width="80"></el-table-column>
            <el-table-column prop="title" label="标题">
              <template scope="scope">
                {{scope.row.title || "未定义"}}
				      </template>
            </el-table-column>
            <el-table-column prop="name" label="栏目" width="150">
              <template scope="scope">
                {{scope.row.name || "未定义"}}
				      </template>
            </el-table-column>
            <el-table-column prop="source" label="来源" width="120">
              <template scope="scope">
                {{scope.row.source || "未定义"}}
				      </template>
            </el-table-column>
            <el-table-column prop="readnum" label="阅读" width="80">
              <template scope="scope">
                {{scope.row.readnum || "0"}}
				      </template>
            </el-table-column>
            <el-table-column prop="oncliknum" label="点赞" width="80">
              <template scope="scope">
                {{scope.row.oncliknum || "0"}}
				      </template>
            </el-table-column>
            <el-table-column prop="ctime" label="发布时间" width="200">
              <template scope="scope">
                {{scope.row.ctime | time}}
				      </template>
            </el-table-column>
            <el-table-column prop="display" label="状态" width="80">
              <template scope="scope">
                <el-tag type="primary" v-if="scope.row.display == 0">隐藏</el-tag>
                <el-tag type="danger" v-else>显示</el-tag>
				      </template>
            </el-table-column>
				    <el-table-column label="操作" >
				      <template scope="scope">
                <el-button size="mini" type="warning" @click="edit(scope.row.id)" >编辑</el-button>
                <el-button size="mini" type="info" @click="showHide(scope.row.id, scope.row.display)" v-if="scope.row.display == 0">显示</el-button>
                <!--<el-button size="mini" type="info" @click="showHide(scope.row.id, scope.row.display)"  v-else>隐藏</el-button>-->
				      </template>
				    </el-table-column>
				  </el-table>
  			</el-row>
			  <el-row class="mb20 text-c">
          <el-button class="fl" type="info" @click="addNoticePublic">新增</el-button>
          <el-button class="fl" type="danger" @click="delNoticePublic">删除</el-button>
          <el-pagination
            @current-change="pagesChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="getNoticePublicNum">
          </el-pagination>
		    </el-row>
       </div>
    </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { validateName, validatePhone } from '../../../../../utils/validate'
import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination ,Tag} from 'element-ui'
export default {
  name: "content",
  data() {
    return {
      //过滤器
      filter: {
        title: {
          select: "0",
          input: ""
        },
        time: ['',''],
        display:'',
        source:''
      },
      //当前页
      currentPage: 1,
      //多选
      multipleSelection: [],
      ColumnOptions:[{
        label:'平台公告',
        value:'平台公告'
      },{
        label:'帮助中心',
        value:'帮助中心'
      }],
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
        display: this.filter.display,
        source: this.filter.source,
        currentPage: this.currentPage
      }
    },
    ...mapState({
      getNoticePublic: state => state.moduleContent.getNoticePublic,
      getNoticePublicNum: state =>state.moduleContent.getNoticePublicNum
    })
  },
  methods: {
    //资讯置顶
    isNew(id, type){
      this.$store.dispatch('updateDisplayNoticePublic',{
        isNew: type,
        id
      })
    },

    //过滤器
    filterData() {
      this.currentPage = 1;
      this.$router.push({ path: this.$route.path, query: this.query});
      this.getNoticePublicFn();
    },
    //清空
    filterClean(){
      this.$router.push({ path: this.$route.path});
      this.filter = {
        title: {
          select: "0",
          input: ""
        },
        time: ['',''],
        display:'',
        source:''
      };
      this.getNoticePublicFn();
    },
    //多选
    selectionChange(val) {
      this.multipleSelection = val.map(function (item) {
        return item.id
      })
    },
    //编辑
    edit(id){
      this.$router.push({
        path: "/dashboard/new/content/add",
        query: {
          edit: 1,
          id
        }
      });
    },
    //显示隐藏
    showHide(id, display){
      let text = display == 0 ? "确定显示该内容？" : "确定隐藏该内容？";
      let state = display == 0 ? 1 : 0;
      MessageBox.confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch('addNoticePublic',{
        display: state,
        id
      })
    }).catch(() => {

      });
    },
    //详情
    detail(id){
      console.log(id);
    },
    //新增
    addNoticePublic(){
      this.$router.push({
        path: "/dashboard/new/content/add"
      });
    },
    //删除
    delNoticePublic(){
      if (this.multipleSelection.length == 0) {
        Message.warning("请先选择要删除的内容");
        return;
      }
      if (this.multipleSelection.length > 1) {
        Message.warning("只能单选删除");
        return;
      }
      MessageBox.confirm("确定删除该内容记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch('deleteNoticePublic',{
          id: this.multipleSelection[0]
        })
      }).catch(() => {

      });
    },
    //分页
    pagesChange(val) {
      this.currentPage = val;
      this.$router.push({ path: this.$route.path, query: this.query});
      this.getNoticePublicFn();
    },
    //修改名字
    changeName(id, pname, cname){
      this.$set(this.changeColumn, 'state', true);
      this.$set(this.changeColumn, 'id', id);
      this.$set(this.changeColumn, 'type', pname);
      this.$set(this.changeColumn, 'name', cname);
    },
    //添加和修改栏目
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if ( formName == "addColumn") {
            this.$store.dispatch("addNotice", {
              pname: this.addColumn.type,
              cname: this.addColumn.name
            });
          } else {
            this.$store.dispatch("addNotice", {
              id: this.changeColumn.id,
              pname: this.changeColumn.type,
              cname: this.changeColumn.name
            });
          }
        } else {
          return false;
        }
      });
    },
    //获取列表
    getNoticePublicFn(){
      //基本配置
      let query = {
        tenantId: this.$store.state.profile.tenantId,
        curPage: this.$route.query.currentPage || 1,
        option: this.$route.query.titleSelect || '0',
      }
      //条件搜索
      !!this.$route.query.titleSelect && (query.type = this.$route.query.titleSelect)
      !!this.$route.query.titleInput && (query.name = this.$route.query.titleInput)
      !!this.$route.query.beginTime && (query.stime = this.$route.query.beginTime)
      !!this.$route.query.endTime && (query.ctime = this.$route.query.endTime)
      !!this.$route.query.display && (query.display = this.$route.query.display)
      this.$store.dispatch("getNoticePublic", query);
    }
  },
  created() {
    //获取列表

    this.getNoticePublicFn();
    //初始化条件
    !!this.$route.query.titleSelect && this.$set(this.filter.title, 'select', this.$route.query.titleSelect);
    !!this.$route.query.titleInput && this.$set(this.filter.title, 'input', this.$route.query.titleInput);
    !!this.$route.query.beginTime && this.$set(this.filter.time, '0', (new Date(this.$route.query.beginTime)));
    !!this.$route.query.endTime && this.$set(this.filter.time, '1', (new Date(this.$route.query.endTime)));
    !!this.$route.query.display && this.$set(this.filter, 'display', this.$route.query.display);
    !!this.$route.query.source && this.$set(this.filter, 'source', this.$route.query.source);
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
    [Tag.name]: Tag
  }
};

</script>

<style lang="scss">
    .column_container{

    }
</style>
