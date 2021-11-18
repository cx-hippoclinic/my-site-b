<template>
  <div>
    <!-- 上传组件标题 -->
    <div class="block">{{ title }}</div>
    <!-- 上传控件 -->
    <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="headers"
    >
      <img v-if="value" :src="getImgSrc(value)" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"
export default {
  name: 'index',
  props:["title","value"],
  computed:{
    headers(){
      return {
        Authorization : 'Bearer ' + getToken(), // 从本地获取 token，添加到 header 里面
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res,file)
      this.$emit('input', res.data)
    },
    getImgSrc(img) {
      return process.env.VUE_APP_SEVER + img
    },

  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
