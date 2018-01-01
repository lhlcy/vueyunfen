
<template>
<div class="seo_container">
  <div class="navigation">
    <p>新闻消息 - SEO设置</p>
  </div>
  <div class="content_container">
      <el-row class="mb20 header-title clearfix">
      <span class="">名称：</span>
      <el-input v-model="filter.title.input" style="width: 300px;" @keyup.enter.native="filterData()"></el-input>
      <span class="ml50">时间：</span>
      <el-date-picker v-model="filter.time" type="daterange" :picker-options="pickerOptions" placeholder="选择时间范围" style="width: 300px;" align="right">
      </el-date-picker>
      <el-button type="primary" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterData()">查询</el-button>
      <el-button type="danger" style="width: 140px;height: 37px;line-height: 18px;" @click="filterClean()">清空</el-button>
      </el-row>
    <el-table :data="getSiteKeyWord" stripe style="width: 100%;margin-bottom:20px;" @selection-change="selectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="columnType" label="栏目">
        <template scope="scope">
          <span v-if="scope.row.columnType == 1">首页</span>
          <span v-if="scope.row.columnType == 2">品牌故事</span>
          <span v-if="scope.row.columnType == 3">新闻资讯</span>
          <span v-if="scope.row.columnType == 4">我要加盟</span>
          <span v-if="scope.row.columnType == 5">案例</span>
          <span v-if="scope.row.columnType == 6">联系我们</span>
          <span v-if="scope.row.columnType == 7">创新营销</span>
          <span v-if="scope.row.columnType == 8">产品介绍</span>
          <span v-if="scope.row.columnType == 9">加盟流程</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="keyWord" label="关键字"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button size="mini" type="warning" @click="change(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="mb20 text-c">
      <el-button class="fl" type="info" @click="addSeo">新增</el-button>
      <el-button class="fl" type="info" @click="delSeo">删除</el-button>

      <el-pagination @current-change="pagesChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="getSiteKeyWordNum">
      </el-pagination>
    </el-row>
  </div>
  <el-dialog title="新增栏目" v-model="addSeoFormDialog" size="tiny" @close =close()>
    <el-form :model="addSeoForm" ref="addSeoForm">
      <el-form-item label="选择栏目:" class="is-required" label-width="120px" prop="type">
        <el-select style="width: 350px;" v-model="addSeoForm.columnType" placeholder="请选择" :disabled="editSeo">
          <el-option label="首页" value="1"></el-option>
          <el-option label="品牌故事" value="2"></el-option>
          <el-option label="新闻资讯" value="3"></el-option>
          <el-option label="我要加盟" value="4"></el-option>
          <el-option label="案例" value="5"></el-option>
          <el-option label="联系我们" value="6"></el-option>
          <el-option label="创新营销" value="7"></el-option>
          <el-option label="产品介绍" value="8"></el-option>
          <el-option label="加盟流程" value="9"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" class="is-required" label-width="120px"  >
        <el-input v-model="addSeoForm.title" auto-complete="off" style="width: 350px;" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="关键字:" class="is-required" label-width="120px">
        <el-input v-model="addSeoForm.keyWord" auto-complete="off" style="width: 350px;" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item label="描述:" class="is-required" label-width="120px">
        <el-input v-model="addSeoForm.description" auto-complete="off" style="width: 350px;" placeholder="描述"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-c">
      <el-button @click="addSeoFormDialog = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  Message,
  Dialog,
  MessageBox,
  Select,
  Option,
  Table,
  TableColumn,
  DatePicker,
  Row,
  Pagination
} from 'element-ui'

export default {
  name: "seo",
  data() {
    return {
      filter: {
        title: {
          input: ""
        },
        time: ['', '']
      },
      currentPage: 1,
      addSeoFormDialog: false,
      multipleSelection: [],
      addSeoFormId: 0,
      editSeo: false,
      addSeoForm: {
        columnType: '',
        title: '',
        keyWord: '',
        description: '',
      },
      pickerOptions: {
        shortcuts: [{
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
      getNotice: []
    };
  },
  computed: {
    ...mapState({
      getSiteKeyWord: state => state.moduleSeo.getSiteKeyWord,
      getSiteKeyWordNum: state => state.moduleSeo.getSiteKeyWordNum,
    }),
    query() {
      return {
        titleInput: this.filter.title.input,
        beginTime: !!this.filter.time[0] ? (this.moment(this.filter.time[0])).format('YYYY-MM-DD') : "",
        endTime: !!this.filter.time[1] ? (this.moment(this.filter.time[1])).format('YYYY-MM-DD') : "",
        currentPage: this.currentPage
      }
    }
  },
  methods: {
    selectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id
      })
    },
    pagesChange(val) {
      this.$store.dispatch("getSiteKeyWord", {
        curPage: val
      });
      this.$router.push({
        path: this.$route.path,
        query: {
          page: val
        }
      });
    },
    //查询
    filterData() {
      this.currentPage = 1;
      this.$router.push({
        path: this.$route.path,
        query: this.query
      });
      this.getNoticeFn();
    },
    addSeo() {
      this.editSeo = false;
      this.addSeoFormDialog = true;
    },
    delSeo() {
      if (this.multipleSelection.length == 0) {
        Message.warning("请选择要删除的信息");
        return;
      }
      if (this.multipleSelection.length > 1) {
        Message.warning("每次只能删除一条");
        return;
      }
      MessageBox.confirm("是否删除该信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("deleteSysSeo", {
          id: this.multipleSelection[0]
        });
      }).catch(() => {

      });
    },
    //清空
    filterClean() {
      this.$router.push({
        path: this.$route.path
      });
      this.filter = {
        title: {
          select: "",
          input: ""
        },
        time: ['', '']
      };
      this.getNoticeFn();
    },
    close(){
      this.addSeoForm = {
          columnType: '',
          title: '',
          keyWord: '',
          description: '',
      }
    },
    change(id) {
      this.addSeoFormDialog = true;
      this.addSeoFormId = id;
      this.editSeo = true;
      this.addSeoForm = this.getSiteKeyWord.filter(item => {
        return item.id == id;
      }).map(item => {
        return {
          columnType: ''+item.columnType,
          title: item.title,
          keyWord: item.keyWord,
          description: item.description,
        }
      })[0];
    },
    getNoticeFn() {
      //基本配置
      let query = {
        curPage: this.$route.query.currentPage || 1
      }
      //日期搜索
      !!this.$route.query.titleInput && (query.keyWord = this.$route.query.titleInput);
      !!this.$route.query.beginTime && (query.stime = this.$route.query.beginTime);
      !!this.$route.query.endTime && (query.createTime = this.$route.query.endTime);
      this.$store.dispatch("getSiteKeyWord", query);
    },
    submitForm() {
      if (this.addSeoForm.columnType == '') {
        this.$message.warning("请选择栏目");
        return;
      }
      if (this.addSeoForm.title == '') {
        this.$message.warning("请输入标题");
        return;
      }
      if (this.addSeoForm.keyWord == '') {
        this.$message.warning("请输入关键字");
        return;
      }
      if (this.addSeoForm.description == '') {
        this.$message.warning("请输入描述");
        return;
      }

      let query = {
        columnType: this.addSeoForm.columnType,
        title: this.addSeoForm.title,
        keyWord: this.addSeoForm.keyWord,
        description: this.addSeoForm.description,
      }

      if (this.editSeo) {
        query.id = this.addSeoFormId;
      }

      this.$store.dispatch("addSysSeo", query);
    }
  },
  created() {
  //获取列表
    this.getNoticeFn();
    //初始化条件
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
    elTable: Table,
    elTableColumn: TableColumn,
    elRow: Row,
    elForm: Form,
    elFormItem: FormItem,
    elDatePicker: DatePicker,
    elPagination: Pagination
  }
};
</script>

<style lang="scss">
  .seo_container {

  }
</style>
