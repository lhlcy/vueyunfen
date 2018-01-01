<template>
  <div class="imgUpload">
    <div class="uploadBox">
      <el-upload :class="{ uploadActive: url.length > 0 }" drag :action= uploadUrl :on-success="uploadSuccess" :before-upload="beforeUpload" name="Filedata" :show-file-list="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="uploadPre" v-show="url.length > 0">
        <img :src="url">
      </div>
    </div>
    <p class="imgTip">{{imgTip}}</p>
    <div class="uploading el-loading-spinner" v-show="uploading">
      上传中...
    </div>
  </div>
</template>

<script>

import { Upload, Message, Loading } from 'element-ui'
import { upUrl } from '../config/env'

let loadingInstance;

export default {
	name: 'imgUpload',
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
    url:{
      type: String,
      default:''
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
      let fileList = ['ppt','pdf','doc','docx','word','xlsx','xls'];
      let pdfFile = ['pdf'];
      let videoFile = ['mp4'];
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
      } else if (this.fileType === 'video') {
        if ( size >= 20971520) {
          Message.warning('文件太大，不能大于20兆');
          this.uploading = false;
          return false;
        }
        if (videoFile.indexOf(type) == -1) {
          Message.warning('只支持mp4视频格式');
          this.uploading = false;
          return false;
        }
      } else if (this.fileType === 'pdf') {
        if ( size >= 20971520) {
          Message.warning('文件太大，不能大于20兆');
          this.uploading = false;
          return false;
        }
        if (pdfFile.indexOf(type) == -1) {
          Message.warning('只支持pdf格式');
          this.uploading = false;
          return false;
        }
      } else {
        if ( size >= 20971520) {
          Message.warning('文件太大，不能大于20兆');
          this.uploading = false;
          return false;
        }
        if (fileList.indexOf(type) == -1) {
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
        this.uploadUrl = response.imgUrl;
        this.$emit('success', response.imgUrl, this.itemIndex, file);
        console.log('上传成功');
        Message.success(response.message);
      } else {
        console.log('上传失败');
        Message.warning(response.message);
      }
    }
	},
  components: {
    elUpload: Upload
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
