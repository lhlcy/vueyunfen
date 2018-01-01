<template>
<div class="AccoutPermisssion">
  <div class="navigation">
    <p>账户管理</p>
  </div>
  <div class="content_container">
    <el-row class="mb20 header-title clearfix">
      <span class="">标题：</span>
      <el-select v-model="filter.title.select" placeholder="请选择" style="width: 120px;" class="">
        <el-option label="全部" value="1"></el-option>
        <el-option label="真实姓名" value="2"></el-option>
        <el-option label="手机号码" value="3"></el-option>
      </el-select>
      <el-input icon="search" v-model="filter.title.input" style="width: 260px;" @keyup.enter.native="filterData()"></el-input>
      <span class="ml50">时间：</span>
      <el-date-picker v-model="filter.time" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right" style="width:250px"></el-date-picker>
      <el-button type="primary"  style="width: 140px;height: 37px;line-height: 18px;" @click="filterData()">查询</el-button>
      <el-button type="danger"  style="width: 140px;height: 37px;line-height: 18px;" @click="clean()">清空</el-button>
    </el-row>
    <el-row class="mb20">
      <el-table :data="getUserList" stripe style="width: 100%" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column prop="trueName" label="姓名" width="120">
          <template scope="scope">
              {{scope.row.trueName != "" ? scope.row.trueName : "未填写"}}
            </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码">
          <template scope="scope">
              {{scope.row.phone != "" ? scope.row.phone : "未填写"}}
             </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" >
          <template scope="scope">
              {{scope.row.userName != "" ? scope.row.userName : "未填写"}}
            </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" >
          <template scope="scope">
              {{scope.row.createDate | time}}
            </template>
        </el-table-column>
        <!--<el-table-column prop="status" label="状态" width="160">-->
          <!--<template scope="scope">-->
              <!--{{scope.row.status == 0 ? '正常': (scope.row.status == 1 ? "已锁定" : "锁定中")}}-->
            <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作" width="300">
          <template scope="scope">

              <el-button size="mini" type="warning"  @click="editAccount(scope.row.id,scope.row.userName)" >编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="mb20 text-c">
      <!--<el-button class="fl" @click="delEnterprise" >删除</el-button>-->
      <el-button class="fl" @click="addMemberDialog=true">新增</el-button>
      <el-pagination @current-change="pagesChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="totalCount">
      </el-pagination>
      <el-dialog title="重设密码" v-model="editMemberDialog" size="tiny">
        <el-form :model="addMemberForm" :rules="rules" ref="addMemberForm" :label-position="labelPosition">
          <el-form-item label="登录用户名" label-width="120px" prop="name">
            <el-input v-model="addMemberForm.userName" auto-complete="off" style="width: 350px;" placeholder="真实姓名" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" label-width="120px" prop="oldPwd">
            <el-input type="password" v-model="addMemberForm.oldPwd" auto-complete="off" style="width: 350px;" placeholder="旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="120px" prop="newPwd1">
            <el-input type="password" v-model="addMemberForm.newPwd1" auto-complete="off" style="width: 350px;" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" label-width="120px" prop="newPwd2">
            <el-input  type="password" v-model="addMemberForm.newPwd2" auto-complete="off" style="width: 350px;" placeholder="确认密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-c">
          <el-button @click="editMemberDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addMemberForm')">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="账户信息" v-model="addMemberDialog" size="tiny">
        <el-form :model="addMemberForm1" :rules="rules" ref="addMemberForm1">
          <el-form-item label="用户名" label-width="120px" prop="userName">
            <el-input  v-model="addMemberForm1.userName" auto-complete="off" style="width: 350px;" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="登入密码" label-width="120px" prop="pwd">
            <el-input type="password" v-model="addMemberForm1.pwd" auto-complete="off" style="width: 350px;" placeholder="登录密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" label-width="120px" >
            <el-input  v-model="addMemberForm1.phone" auto-complete="off" style="width: 350px;" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="真实名称" label-width="120px" >
            <el-input v-model="addMemberForm1.trueName" auto-complete="off" style="width: 350px;" placeholder="真实名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-c">
          <el-button @click="addMemberDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addMemberForm1')">保 存</el-button>
        </div>
      </el-dialog>
    </el-row>
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
  validateName,
  validatePhone,
  validateSelect
} from '../../../../utils/validate'
import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination} from 'element-ui'

export default {
  name: "tenant",

  data() {
    return {
      filter: {
        title: {
          select: '1',
          input: ""
        },
        time: ["", ""]
      },
      //对其方式
      labelPosition: "right",
      permissVisable: false,
      currentPage: 1,
      messageSetDialog: false,
      messageSetId: 0,
      //编辑账户信息
      editMemberDialog: false,
      cityLevel: 1,
      addMemberDialog: false,
      provname: "", //省份
      cityname: "", //市
      addMemberForm: {
        id: '',
        userName: '',
        oldPwd: '',
        newPwd1: '',
        newPwd2: ''
      },
      addMemberForm1: {
        tenantId: this.$store.state.profile.tenantId,
        userName: "",
        pwd: "",
        trueName: "",
        phone: "",
      },
      rules: {
        userName: [{
            required: true,
            validator: validateName,
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        oldPwd: [{
          required: true,
          min: 6,
          max: 20,
          message: "请输入正确密码",
          trigger: "change"
        }],
        newPwd1: [{
          required: true,
          message: "长度在 6 到 20 个字符",
          trigger: "change"
        },{
          min: 6,
          max: 20,
          message: "长度在 6 到 20 个字符",
          trigger: "change"
        }],
        newPwd2: [{
            required: true,
            message: "请选择密码类型",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        pwd: [{
          required: true,
          message: "请选择密码类型",
          trigger: "blur"
        },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      //多选
      multipleSelection: [],
      //日期和时间范围选择
      pickerOptions2: {
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
      }
    };
  },
  computed: {
    //URL参数
    query() {
      return {
        tenantId: this.$store.state.profile.tenantId,
        titleSelect: this.filter.title.select,
        titleInput: this.filter.title.input,
        beginTime: (!!this.filter.time[0] ? new Date(this.filter.time[0]).Format("yyyy-MM-dd") : ""),
        endTime: (!!this.filter.time[1] ? new Date(this.filter.time[1]).Format("yyyy-MM-dd") : ""),
        currentPage: this.currentPage,
        pageSize: 10
      };
    },
    //同步状态
    ...mapState({
      getUserList: state => state.moduleaccount.getUserList,
      totalCount: state => state.moduleaccount.totalCount,
    })
  },
  methods: {
    submitFormMessage(){
          this.$store.dispatch("saveInfo",{
            sid: this.messageSetId,
            type: this.messageCheckList[0].type.join(','),
            id: this.infoID
          });
      },
    //删除弹窗
    open() {
      MessageBox.confirm("删除之后会对数据进行改变，请仔细确认", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {});
    },

    //查询
    filterData() {
      if (this.filter.title.select != "1" && this.filter.title.input == "") {
        Message.warning("请输入标题过滤条件");
        return false;
      }
      this.currentPage = 1;
      this.$router.push({
        path: this.$route.path,
        query: this.query
      });
      this.getInvestorsListFn();
    },
    //清空
    clean() {
      this.$router.push({
        path: this.$route.path
      });
      this.filter = {
        title: {
          select: "1",
          input: ""
        },
        auditStatus: "",
        time: ["", ""]
      };
      this.getInvestorsListFn();
    },
    //多选
    selectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id;
      });
    },
    //删除
    delEnterprise() {
      if (this.multipleSelection.length == 0) {
        Message.warning("请先选择要删除的账户");
        return;
      }
      MessageBox.confirm("确定删除该账户记录", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
//          this.$store.dispatch("delBathSysUser", {
//            ids: this.multipleSelection
//          });
        })
        .catch(() => {});
    },
    //编辑账户
    editAccount(id, userName) {
      this.editMemberDialog = true
      this.addMemberForm.userName = userName
      this.addMemberForm.id = id
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addMemberForm") {
            this.$store.dispatch("resetPwd", this.addMemberForm);
          } else if (formName == "addMemberForm1") {
            this.$store.dispatch("addAccount", this.addMemberForm1);
          }
        }
      });
    },
    //分页
    pagesChange(val) {
      this.currentPage = val;
      this.$router.push({
        path: this.$route.path,
        query: this.query
      });
      this.getInvestorsListFn();
    },
    //获取列表
    getInvestorsListFn() {
      let query = {
        page: {
          currentPage: this.$route.query.currentPage || 1,
          pageSize: 10
        },
        tenantId: this.$store.state.profile.tenantId,
        isAll: +this.$route.query.titleSelect || 1,
        conditionStr: this.$route.query.titleInput || "",
      };
      //审核状态
      !!this.$route.query.auditStatus &&
        (query.roleId = this.$route.query.auditStatus);
      //日期搜索
      !!this.$route.query.beginTime &&
        (query.stime = this.$route.query.beginTime);
      !!this.$route.query.endTime && (query.etime = this.$route.query.endTime);
      this.$store.dispatch("getUserList", query);
    },
  },
  created() {

    //获取列表
    this.getInvestorsListFn();
    //初始化条件
    !!this.$route.query.titleSelect && this.$set(this.filter.title, "select", this.$route.query.titleSelect);
    !!this.$route.query.titleInput && this.$set(this.filter.title, "input", this.$route.query.titleInput);
    !!this.$route.query.beginTime && this.$set(this.filter.time, "0", new Date(this.$route.query.beginTime));
    !!this.$route.query.endTime && this.$set(this.filter.time, "1", new Date(this.$route.query.endTime));
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
.AccoutPermisssion {
    .ml50 {
        margin-left: 15px;
    }
    .input_distpicker {
        width: 155px;
        padding-right: 20px;
    }
    .el-form-item__error {
        left: 30px;
    }
    .region {
        .el-form-item__content {
            margin-left: 150px !important;
        }
    }
    .el-checkbox-group{
      .el-checkbox{
        margin-left: 0;
        margin-right: 20px;
        margin-bottom: 20px;
      }
    }
}
</style>
