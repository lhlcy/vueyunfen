<template>
<div class="column_container">
  <div class="navigation">
    <p>新闻消息 - 栏目设置</p>
  </div>
  <div class="content_container">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="平台公告" name="0">
        <el-row class="mb20 header-title clearfix">
          <span class="">名称：</span>
          <el-input v-model="filter.title.input" style="width: 300px;" @keyup.enter.native="filterData()"></el-input>
          <span class="ml50">时间：</span>
          <el-date-picker v-model="filter.time" type="daterange" :picker-options="pickerOptions" placeholder="选择时间范围" style="width: 300px;" align="right">
          </el-date-picker>
          <el-button type="primary"style="width: 140px;height: 37px;line-height: 18px;"  @click="filterData()">查询</el-button>
          <el-button type="danger" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterClean()">清空</el-button>
        </el-row>
        <el-row class="mb20">
          <el-table :data="noticeSetList" stripe style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="栏目名称"></el-table-column>
            <el-table-column prop="ctime" label="创建时间">
              <template scope="scope">
                {{scope.row.ctime | time}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template scope="scope">
                <el-button size="mini" type="danger" @click="changeName(scope.row.id, scope.row.type, scope.row.name)">修改名称</el-button>
                <!--<el-button size="mini" type="info" @click="categorySort(scope.row.id)" >排序</el-button>-->
				      </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="帮助中心" name="1">
        <el-row class="mb20 header-title clearfix">
          <span class="">名称：</span>
          <el-input v-model="filter.title.input" style="width: 300px;"></el-input>
          <span class="ml50">时间：</span>
          <el-date-picker v-model="filter.time" type="daterange" :picker-options="pickerOptions" placeholder="选择时间范围" style="width: 300px;" align="right">
          </el-date-picker>
          <el-button type="primary" style="width: 140px;height: 37px;line-height: 18px;" @click="filterData()">查询</el-button>
          <el-button type="danger" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterClean()">清空</el-button>
        </el-row>
        <el-row class="mb20">
          <el-table :data="noticeSetList" stripe style="width: 100%" @selection-change="selectionChange">
            <el-table-column prop="id" label="编号" width="100"></el-table-column>
            <el-table-column prop="name" label="栏目名称"></el-table-column>
            <el-table-column prop="ctime" label="创建时间">
              <template scope="scope">
                {{scope.row.ctime | time}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template scope="scope">
                <el-button size="small" type="danger" @click="changeName(scope.row.id, scope.row.type, scope.row.name)" >修改名称</el-button>
                <el-button size="small" type="primary" @click="categorySort(scope.row.id)" >排序</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-row class="mb20 text-c">
      <el-button class="fl" type="info" @click="addColumn.state = true">新增</el-button>
      <el-button class="fl" type="info" @click="delColumn">删除</el-button>
      <el-pagination @current-change="pagesChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="totalCount">
      </el-pagination>
    </el-row>
  </div>
  <el-dialog title="新增栏目" v-model="addColumn.state" size="tiny">
    <el-form :model="addColumn" :rules="rules" ref="addColumn">
      <el-form-item label="选择分类：" label-width="120px" prop="type">
        <el-select v-model="addColumn.type" placeholder="请选择" style="width: 350px;">
          <el-option v-for="item in ColumnOptions" :label="item.label" :value="item.value" :key = item.id></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="栏目名称：" label-width="120px" prop="name">
        <el-input v-model="addColumn.name" auto-complete="off" style="width: 350px;" placeholder="栏目名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-c">
      <el-button @click="addColumn.state = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addColumn')">保 存</el-button>
    </div>
  </el-dialog>
  <el-dialog title="修改名称" v-model="changeColumn.state" size="tiny">
    <el-form :model="changeColumn" :rules="rules" ref="changeColumn">
      <el-form-item label="选择分类：" label-width="120px" prop="type">
        <el-select v-model="changeColumn.type" placeholder="请选择" disabled style="width: 350px;">
          <el-option v-for="item in ColumnOptions" :label="item.label" :value="item.value"  :key = item.id></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="栏目名称：" label-width="120px" prop="name">
        <el-input v-model="changeColumn.name" auto-complete="off" style="width: 350px;" placeholder="栏目名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-c">
      <el-button @click="changeColumn.state = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('changeColumn')">保 存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
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
  DatePicker,
  Table,
  TableColumn,
  Row,
  Pagination
} from 'element-ui'
import {
  validateName,
  validatePhone
} from '../../../../../utils/validate'

export default {
  name: "column",
  data() {
    return {
      activeName: '1',
      //过滤器
      filter: {
        title: {
          input: ""
        },
        time: ['', '']
      },
      //当前页
      currentPage: 1,
      //多选
      multipleSelection: [],
      //新增栏目
      addColumn: {
        state: false,
        type: '',
        name: ''
      },
      //修改名称
      changeColumn: {
        state: false,
        id: '',
        type: '',
        name: ''
      },
      ColumnOptions: [{
        label: '平台公告',
        value: '0'
      }, {
        label: '帮助中心',
        value: '1'
      }],
      rules: {
        type: [{
          required: true,
          message: '请选择分类',
          trigger: 'change'
        }],
        name: [{
            required: true,
            message: '请输入栏目名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      //日期和时间范围选择
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
    };
  },
  computed: {
    //URL参数
    query() {
      return {
        tenantId: this.$store.state.profile.tenantId,
        type: ''+this.activeName || '0',
        titleInput: this.filter.title.input,
        beginTime: !!this.filter.time[0] ? (this.moment(this.filter.time[0])).format('YYYY-MM-DD') : "",
        endTime: !!this.filter.time[1] ? (this.moment(this.filter.time[1])).format('YYYY-MM-DD') : "",
        currentPage: this.currentPage
      }
    },
    ...mapState({
      noticeSetList: state => state.moduleNew.noticeSetList,
      totalCount: state => state.moduleNew.totalCount,
    })
  },
  methods: {
    //栏目排序
    categorySort(id) {
      this.$store.dispatch('sortNoticeSet', {
        id
      })
    },
    //tab切换
    tabClick(tab) {
      console.log(tab)
      this.currentPage = 1;
      this.$router.push({
        path: this.$route.path,
        query: {
          type: tab.name,
        }
      });
      this.getNoticeFn();
    },
    //过滤器
    filterData() {
      this.currentPage = 1;
      this.$router.push({
        path: this.$route.path,
        query: this.query
      });
      this.getNoticeFn();
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
    //多选
    selectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id
      })
    },
    //删除栏目
    delColumn() {
      if (this.multipleSelection.length == 0) {
        Message.warning("请先选择要删除的栏目");
        return;
      }
      if (this.multipleSelection.length > 1) {
        Message.warning("只能单选删除");
        return;
      }
      MessageBox.confirm("确定删除该栏目记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch('deleteNoticeSet', {
          id: this.multipleSelection[0]
        })
      }).catch(() => {

      });
    },
    //分页
    pagesChange(val) {
      this.currentPage = val;
      this.$router.push({
        path: this.$route.path,
        query: this.query
      });
      this.getNoticeFn();
    },
    //修改名字
    changeName(id, type, name) {
      console.log(type)
      this.$set(this.changeColumn, 'state', true);
      this.$set(this.changeColumn, 'id', id);
      this.$set(this.changeColumn, 'type',  type);
      this.$set(this.changeColumn, 'name', name);
    },
    //添加和修改栏目
    submitForm(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (name == "addColumn") {
            this.$store.dispatch("addNoticeSet", {
              type: this.addColumn.type,
              name: this.addColumn.name,
              tenantId: this.$route.query.tenantId || 1,
            });
          } else {
            this.$store.dispatch("addNoticeSet", {
              id: this.changeColumn.id,
              type: this.changeColumn.type,
              tenantId:  this.$route.query.tenantId || 1,
              name: this.changeColumn.name
            });
          }
        } else {
          return false;
        }
      });
    },
    //获取列表
    getNoticeFn() {
      //基本配置
      let query = {
        tenantId: this.$store.state.profile.tenantId,
        type: ''+ (this.$route.query.type || 0),
        curPage: this.$route.query.currentPage || 1
      }
      //日期搜索
      !!this.$route.query.titleInput && (query.name = this.$route.query.titleInput);
      !!this.$route.query.beginTime && (query.stime = this.$route.query.beginTime);
      !!this.$route.query.endTime && (query.etime = this.$route.query.endTime);
      this.$store.dispatch("getNoticeSetList", query);
    }
  },
  created() {
    this.activeName = '' + (this.$route.query.type || 0);
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
    elDatePicker: DatePicker,
    elTable: Table,
    elTableColumn: TableColumn,
    elRow: Row,
    elPagination: Pagination,
    elTabs: Tabs,
    elTabPane: TabPane,
    elForm: Form,
    elFormItem: FormItem
  }
};
</script>

<style lang="scss">
  .column_container {

  }
</style>
