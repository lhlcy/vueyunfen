<template>
    <div class="product_container">
      <div class="navigation">
        <p>产品信息 - 产品主菜单</p>
      </div>
      <div class="content_container">
        <el-row class="mb20">
          <el-table :data="Menulist" style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="colOrder" label="序号" >
            </el-table-column>
            <el-table-column prop="cName" label="菜单名">
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template scope="scope">
                  <el-tag type="primary" v-if="scope.row.status == 1">上架</el-tag>
                  <el-tag type="danger" v-if="scope.row.status == 2">下架</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template scope="scope">
                <el-button size="mini" type="success" v-if='scope.row.status == 1' @click="asc(scope.row.id,1)">升序</el-button>
                <el-button size="mini" type="warning"  v-if='scope.row.status == 1' @click="asc(scope.row.id,2)">降序</el-button>
                <el-button size="mini" type="danger"  v-if='scope.row.status == 2' @click="start(scope.row.id,scope.row.status,scope.row.colOrder)">上架</el-button>
                <el-button size="mini" type="danger"  v-if='scope.row.status == 1' @click="start(scope.row.id,scope.row.status,scope.row.colOrder)">下架</el-button>
                <el-button size="mini" type="info" @click="query(scope.row)">查看主菜</el-button>
                <el-button size="mini" type="warning" @click="edit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="mb20 text-c">
          <el-button class="fl" type="info" @click="mainMeun = true" >新增</el-button>
          <el-button class="fl" type="warning" @click="delRec">删除</el-button>
        </el-row>
      </div>
      <el-dialog title="新增主菜单" v-model="mainMeun" size="tiny" @close = close>
        <el-form :model="addMemberForm" ref="addMemberForm" :rules="rules">
          <el-form-item label="菜单名称" label-width="120px" prop="cName">
            <el-input v-model="addMemberForm.cName" auto-complete="off" style="width: 350px;" placeholder="菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="展示方式" label-width="120px" prop="type" >
            <el-select v-model="addMemberForm.type" placeholder="请输入展示方式" style="width: 350px;">
              <el-option label="横排" value="1"></el-option>
              <el-option label="竖排" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="pc端菜单图标" label-width="120px" prop="pcPic" class="mt30 is-required">
            <iconUpload class="fileUpload"  imgTip="尺寸为一定为80*75，大小不要超过2MB" @success="successpcPic" :fileList="addMemberForm.pcPic" @remove = remove />
          </el-form-item>
          <el-form-item label="微信端菜单图标" label-width="120px" prop="appPic" class="mt30 is-required">
            <iconUpload class="fileUpload"  imgTip="尺寸为一定为80*75，大小不要超过2MB" @success="successpcappPic" :fileList="addMemberForm.appPic" @remove = removeApp />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-c">
          <el-button @click="mainMeun = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addMemberForm')">保 存</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Form, FormItem, Input, Button, Checkbox, Message, Dialog, MessageBox, Select, Option, DatePicker, Table, TableColumn, Row, Pagination, Tag} from 'element-ui'
  import ImgUpload from "../../../../components/ImgUpload"
  import iconUpload from "../../../../components/iconUpload"
  import { setStorage, getStorage, delStorage, cleanStorage } from '../../../../utils/storage';

    export default{
        data(){
            return {
              tableData: [],
              multipleSelection: [],
              obj:{item:1},
              mainMeun: false,
              addMemberForm: {
                cName: '',
                id: '',
                pcPic: [],
                type:'',
                tenantId: this.$store.state.profile.tenantId,
                appPic: []
              },
              rules:{
                cName:[
                  { required: true, message: '请输入主菜单', trigger: 'blur' }
                ],
                type:[
                  { required: true, message: '请输入展示方式', trigger: 'change' }
                ],
              },
            }
        },
      computed:{
        ...mapState({
          Menulist: state => state.moduleProduct.Menulist,
          getNoticePublicNum: state =>state.moduleContent.getNoticePublicNum
        })
      },
        methods: {
          //升序
          asc(id,type){
            this.$store.dispatch('sortProductColumn',{
              id,
              type,
            })
          },
          start(id,status,colOrder){
            this.$store.dispatch('switchproductColumn',{
                id,
                status: status == '1' ? 2 : 1,
                colOrder
            })
          },
          query(info){
            setStorage('product',info)
              this.$router.push({path: '/dashboard/product/menuDetail',query:{
                  cid: info.id
              }})
          },
          //上传图片pc
          successpcPic(url,name){
            this.addMemberForm.pcPic.push({url})
          },
          //移动端上传图片
          successpcappPic(url){
            this.addMemberForm.appPic.push({url})
          },
          remove(){
            this.addMemberForm.pcPic = [];
          },
          removeApp(){
            this.addMemberForm.appPic = [];
          },
          edit(info){
            this.mainMeun = true;
            console.log(info)
            this.$set(this.addMemberForm,'cName',info.cName)
            this.$set(this.addMemberForm,'id',info.id)
            this.$set(this.addMemberForm,'type',''+info.picType)
            if(info.pcPic != ''){
              this.addMemberForm.pcPic.push({url: info.pcPic})
            }
            if(info.appPic != ''){
              this.addMemberForm.appPic.push({url: info.appPic})
            }
          },
          //多选
          selectionChange(val) {
            this.multipleSelection = val.map(function (item) {
              return item.id
            })
          },
          close(){
            this.addMemberForm = {
                 cName: '',
                id: '',
                pcPic: [],
                tenantId: this.$store.state.profile.tenantId,
                appPic: [],
                type:''
            }
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
                console.log(1312)
              this.$store.dispatch("deletProductColumn", {
                ids: this.multipleSelection.join(','),
                tenantId: this.$store.state.profile.tenantId,
              });
            }).catch(() => {

            });
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if (this.addMemberForm.pcPic.length < 1){
                    Message.warning('请上传菜单图标')
                    return false
                }
                if (this.addMemberForm.appPic.length < 1){
                  Message.warning('请上传菜单图标')
                  return false
                }
                  if(this.addMemberForm.id){
                    this.$store.dispatch('updateproductColumn',{
                      cName: this.addMemberForm.cName,
                      id: this.addMemberForm.id,
                      pcPic: this.addMemberForm.pcPic[0].url,
                      appPic: this.addMemberForm.appPic[0].url,
                      picType: this.addMemberForm.type,
                      tenantId: this.$store.state.profile.tenantId,
                    })
                  } else{
                    this.$store.dispatch('addProductColumn',{
                      cName: this.addMemberForm.cName,
                      id: this.addMemberForm.id,
                      pcPic: this.addMemberForm.pcPic[0].url,
                      appPic: this.addMemberForm.appPic[0].url,
                      picType: this.addMemberForm.type,
                      tenantId: this.$store.state.profile.tenantId,
                    })
                  }

              } else {
                return false;
              }
            })
          },
        },
      created(){
        this.$store.dispatch("getMenulist",{
          tenantId: this.$store.state.profile.tenantId
        });
        console.log(Object.assign({},this.obj,{item:2}))
        console.log(this.obj)
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
          ImgUpload,
          iconUpload
        }

    }
</script>
<style lang="scss">
  .product_container{
    .fileWrap{
        position: relative;
        width: 80px;
        height: 75px;
        .uploadBox{
          width: 80px;
          height: 75px;
          .el-upload{
            width: 80px;
            .el-upload-dragger{
              height: 75px;
            }
          }
          .uploadPre{
              width: 80px;
              height: 75px;
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
        width: 80px;
        height: 75px;
      }
    }
  }




</style>
