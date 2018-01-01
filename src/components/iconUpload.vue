<template>
  <div class="imgUpload">
    <!--<div class="uploadBox">-->
      <!--<el-upload :class="{ uploadActive: url.length > 0 }" drag :action= uploadUrl :on-success="uploadSuccess" :before-upload="beforeUpload" name="Filedata" :show-file-list="false">-->
        <!--<i class="el-icon-upload"></i>-->
        <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--</el-upload>-->
      <!--<div class="uploadPre" v-show="url.length > 0">-->
        <!--<img :src="url">-->
      <!--</div>-->
    <!--</div>-->
    <!--<p class="imgTip">{{imgTip}}</p>-->
    <!--<div class="uploading el-loading-spinner" v-show="uploading">-->
      <!--上传中...-->
    <!--</div>-->
    <el-upload
      class="upload-demo"
      :action= uploadUrl
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-success="uploadSuccess"
      list-type="picture"
      name="Filedata">
      <div v-if="fileList.length == 0">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">{{imgTip}}</div>
      </div>
    </el-upload>
  </div>

</template>

<script>

import { Upload, Message, Loading ,Button} from 'element-ui'
import { upUrl } from '../config/env'

let loadingInstance;

export default {
	name: 'iconUpload',
	data() {
		return {
      uploading: false,
      uploadUrl: upUrl
		}
	},
  computed:{

  },
  props:{
    success:{
      type: Function,
      default:function () {}
    },
    fileList:{
      type: Array,
      default: []
    },
    fileType:{
      type: String,
      default:'img'
    },
    imgTip:{
      type: String,
      default:''
    },
    itemIndex:{
      type: Number,
      default: 0
    }
  },
  methods: {
    beforeUpload(file){
      this.uploading = true;
      console.log('上传中....');
      //验证格式
      let imgList = ['jpg','jpge','png'];
      let name = encodeURIComponent(file.name);
      let type = name.toLowerCase().substr(name.lastIndexOf(".")).slice(1);
      let size = file.size;
      if (this.fileType === 'img') {
        if ( size >= 2097152) {
          Message.warning('文件太大');
          this.uploading = false;
          return false;
        }
        if (imgList.indexOf(type) == -1) {
          Message.warning('文件格式不支持');
          this.uploading = false;
          return false;
        }
      }
    },
    uploadSuccess(response, file, fileList){
      this.uploading = false;
      if (response.code === 200) {
          console.log(response);
        this.$emit('success', response.imgUrl, response.fileName,this.itemIndex, file,);
        console.log(fileList)
        console.log('上传成功');
        Message.success(response.message);
      } else {
        console.log('上传失败');
        Message.warning(response.message);
      }
    },
    handleRemove(file, fileList) {
        console.log(file)
        this.$emit('remove', file, this.itemIndex);
    },
    handlePreview(file) {
      this.$emit('preview', file, this.itemIndex);
    }
	},
  components: {
    elUpload: Upload,
    elButton: Button
  }
}
</script>

<style lang="scss">
  .imgUpload{
    .el-upload{
      width: 240px;
      .el-upload-dragger{
        width: 100%
      }
    }
    .uploadBox{
      width: 240px;
      height: 180px;
    }
    .uploadActive{
      position: absolute;
      z-index: 2;
      top: 0;
      width: 240px;
      height: 180px;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer
    }
    .uploadPre{
      position: absolute;
      z-index: 1;
      top: 0;
      width: 240px;
      height: 180px;
      overflow: hidden;
      border: 1px dashed #d9d9d9;
      img{
        width: 100%;
      }
    }
    .imgTip{
      margin-top: 10px;
      font-size: 12px;
      line-height: 1.5;
      color: red;
    }
  }
  .uploading{
    position: fixed;
    z-index: 999;
    width: 100px;
    height: 100px;
    line-height: 105px;
    text-align: center;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    padding-top: 30px;
    border-radius: 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    background-image: url('../assets/img/loading.gif');
    background-position: center center;
    background-repeat: no-repeat
  }
</style>
