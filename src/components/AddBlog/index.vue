<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <el-input v-model="form.title" autocomplete="off" style="margin-bottom: 15px"></el-input>
    <div class="block">文章编辑</div>
    <Editor
        height="600px"
        :options="editorOptions"
        ref="toastuiEditor"
    />
    <div class="block">文章描述</div>
    <el-input type="textarea" rows="6" v-model="form.description" autocomplete="off"
              style="margin-bottom: 15px"></el-input>
    <Upload title="文章头图" v-model="form.thumb"/>
    <div class="block">选择分类</div>
    <el-select v-model="form.categoryId" placeholder="">
      <el-option :label="item.name" v-for="item in types" :key="item.id" :value="item.id"></el-option>
    </el-select>
    <div style="margin-top: 25px">
      <el-button type="primary" @click="handleAddBlog">{{ btnName }}</el-button>

    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { Editor } from '@toast-ui/vue-editor'
import Upload from "@/components/Upload"
import { getBlogType,postBlog,getOneBlog,editBlog } from '@/api/blog'

export default {
  name: 'index',
  props:['mode'],
  data() {
    return {
      form: {
        title: '',
        description: '',
        thumb: '',
        htmlContent: '',
        markdownContent: '',
        categoryId: ''
      },
      editorOptions: {
        language: 'zh-CN'
      },
      types: [],
      btnName:'',
      blogId:''
    }
  },
  components: {
    Editor, Upload
  },
  created() {
    getBlogType().then(res => {
      this.types = res.data
    })
    if(this.mode === 'edit'){
      this.btnName = '确认修改'
      this.blogId = this.$route.params.id
      getOneBlog(this.blogId).then(({data})=>{
        this.form = data
        this.form.categoryId = data.category ? data.category.id:null
        this.$refs.toastuiEditor.invoke('setHTML',data.htmlContent)
      })
    }
    if(this.mode === 'add'){
      this.btnName = '发布文章'
    }
  },
  methods: {
    handleAddBlog() {
      let html = this.$refs.toastuiEditor.invoke('getHTML')
      let markdown = this.$refs.toastuiEditor.invoke('getMarkdown')

      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.categoryId,
        toc: [],
        htmlContent: html,
        markdownContent:markdown,
        thumb: this.form.thumb
      }
      if(obj.title && obj.description && obj.categoryId && obj.htmlContent){
        if(this.mode === 'add'){
          postBlog(obj).then(res=>{
            this.$message.success("发布成功")
            this.$router.push({ name: 'articleList' })
          })
        } else{
          obj.toc = this.form.toc
          editBlog(this.blogId,obj).then(res=>{
            this.$message.success("修改成功")
            this.$router.push({ name: 'articleList' })
          })
        }

      }else {
        this.$message.error("请填写完整")
      }
    },

  }
}
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
