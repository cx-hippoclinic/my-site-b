<template>
  <div class="app-container">
    <div class="block">项目名称</div>
    <el-input v-model="form.name" autocomplete="off" style="margin-bottom: 15px" placeholder="请输入项目名称"></el-input>
    <div class="block">项目描述（每一项描述以英文逗号分割）</div>
    <el-input v-model="form.description" autocomplete="off" style="margin-bottom: 15px"
              placeholder="请输入项目的描述，每一项描述以英文逗号分割"></el-input>
    <div class="block">项目链接</div>
    <el-input v-model="form.url" autocomplete="off" style="margin-bottom: 15px" placeholder="请输入项目的链接"></el-input>
    <div class="block">github 地址</div>
    <el-input v-model="form.github" autocomplete="off" style="margin-bottom: 15px" placeholder="请输入github地址"></el-input>
    <Upload v-model="form.thumb" title="项目预览图地址"/>
    <div class="block">项目等级</div>
    <el-select v-model="form.order" placeholder="">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4" value="4"></el-option>
      <el-option label="5" value="5"></el-option>
    </el-select>
    <div style="margin-top: 25px">
      <el-button type="primary" @click="uploadProject" plain> 发布项目 </el-button>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload"
import { addProject } from "@/api/project"
export default {
  name: 'index',
  data() {
    return {
      form: {
        name:'',
        description:'',
        utl:'',
        github:'',
        thumb: '',
        order:''
      }
    }
  },
  components: {
    Upload
  },
  methods:{
    uploadProject(){
      const obj = {...this.form}
      obj.description = obj.description.split(',')
      obj.order = +obj.order
      addProject(obj).then(res=>{
        this.$router.push({name:"projectList"})
      })
    }
  }
}
</script>

<style scoped>
.block {
  font-weight: 100;
  margin: 15px auto;
}
</style>
