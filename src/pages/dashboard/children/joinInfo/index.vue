<template>
<div class="joinInfo_container">
  <div class="navigation">
    <p>加盟信息 - 申请加盟</p>
  </div>
  <div class="content_container">
    <el-tabs >
        <el-row class="mb20 header-title clearfix">
          <span class="">名称：</span>
          <el-input v-model="filter.title.input" style="width: 300px;" @keyup.enter.native="filterData()"></el-input>
          <span class="ml50">时间：</span>
          <el-date-picker v-model="filter.time" type="daterange" :picker-options="pickerOptions" placeholder="选择时间范围" style="width: 300px;" align="right">
          </el-date-picker>
          <el-button type="primary" style="width: 140px;height: 37px;line-height: 18px;"  @click="filterData()">查询</el-button>
          <el-button type="danger" style="width: 140px;height: 37px;line-height: 18px;" @click="filterClean()">清空</el-button>
        </el-row>
        <el-row class="mb20">
          <el-table :data="applyJoinList" stripe style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="qQ" label="qq号">
              <template scope="scope">
                {{scope.row.qQ  || '未填写'}}
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
              <template scope="scope">
                {{scope.row.remark  || '未填写'}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template scope="scope">
                <el-button size="mini" type="danger" @click="edit(scope.row)">修改</el-button>
				      </template>
            </el-table-column>
          </el-table>
        </el-row>
      <el-row class="mb20 text-c">
        <el-pagination
          @current-change="pagesChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="加盟信息" v-model="editJoinInfo.state" size="tiny">
      <el-form :model="editJoinInfo" :rules="rules" ref="editJoinInfo">
        <el-form-item label="姓名：" label-width="120px" >
          <el-input v-model="editJoinInfo.name" auto-complete="off" style="width: 350px;" placeholder="姓名" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话：" label-width="120px" >
          <el-input v-model="editJoinInfo.phone" auto-complete="off" style="width: 350px;" placeholder="电话"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="120px" >
          <el-input v-model="editJoinInfo.email" auto-complete="off" style="width: 350px;" placeholder="邮箱"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="120px" >
          <el-input type = 'textarea' v-model="editJoinInfo.remark" auto-complete="off" style="width: 350px;" placeholder="备注" :maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-c">
        <el-button @click="editJoinInfo.state = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editJoinInfo')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
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
} from '../../../../utils/validate'

export default {
  name: "joinInfo",
  data() {
    return {
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
      editJoinInfo: {
        state: false,
        id:'',
        name: '',
        phone: '',
        email:'',
        remark:'',
        tenantId: this.$store.state.profile.tenantId,
        callback: this.getNoticeFn
      },
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
        titleInput: this.filter.title.input,
        beginTime: !!this.filter.time[0] ? (this.moment(this.filter.time[0])).format('YYYY-MM-DD') : "",
        endTime: !!this.filter.time[1] ? (this.moment(this.filter.time[1])).format('YYYY-MM-DD') : "",
        currentPage: this.currentPage
      }
    },
    ...mapState({
      applyJoinList: state => state.modulejoinInfo.applyJoinList,
      totalCount: state => state.modulejoinInfo.totalCount,
    })
  },
  methods: {
    //栏目排序
    categorySort(id) {
      this.$store.dispatch('sortNoticeSet', {
        id
      })
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
    edit(info) {
      this.$set(this.editJoinInfo, 'state', true);
      this.$set(this.editJoinInfo, 'id', info.id);
      this.$set(this.editJoinInfo, 'name', info.name);
      this.$set(this.editJoinInfo, 'email', info.email);
      this.$set(this.editJoinInfo, 'phone', info.phone);
      this.$set(this.editJoinInfo, 'remark', info.remark);
    },
    //添加和修改栏目
    submitForm(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            this.$store.dispatch("updateJoinInfo",
              this.editJoinInfo,
            );
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
        curPage: this.$route.query.currentPage || 1
      }
      //日期搜索
      !!this.$route.query.titleInput && (query.name = this.$route.query.titleInput);
      !!this.$route.query.beginTime && (query.stime = this.$route.query.beginTime);
      !!this.$route.query.endTime && (query.etime = this.$route.query.endTime);
      this.$store.dispatch("joinList", query);
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
  .joinInfo_container {

  }
</style>
