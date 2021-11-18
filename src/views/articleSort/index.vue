<template>
  <div class="app-container">
    <div class="my-input">
      <el-input placeholder="请输入要添加的分类，左边选择等级" v-model="type.name" class="input-with-select">
        <el-select v-model="type.order" slot="prepend" placeholder="">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" style="margin-left: 30px" @click="addType">添加</el-button>
    </div>
    <el-table
        v-if="tableData"
        :data="tableData"
        style="width: 100%"
        border>
      <el-table-column
          prop="index"
          label="序号"
          align="center"
          width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="博客类别"
          align="center">
      </el-table-column>
      <el-table-column
          prop="articleCount"
          label="文章数目"
          align="center">
      </el-table-column>
      <el-table-column
          align="center"
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="操作" :hide-after="2000" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="changeDialog(scope.row)" size="mini"
                       circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" :hide-after="2000" placement="top">
            <el-button type="danger" icon="el-icon-delete" @click="handleDialog(scope.row)" size="mini"
                       circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="分类名称" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序等级" label-width="80px">
          <el-select v-model="form.order"  placeholder="">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {  changeBlogType,getBlogType, postBlogType, deleteBlogType } from "@/api/blog"

export default {
  name: 'index',
  data() {
    return {
      tableData: [],
      type: {
        name: '',
        order: 1
      },
      form:{
        name:'',
        order:1
      },
      dialogFormVisible:false,
    }
  },
  created() {
    this.fetchBlogType()
  },
  methods: {
    fetchBlogType() {
      getBlogType().then((res) => {
        this.tableData = res.data
      })
    },
    addType() {
      postBlogType(this.type).then(res => {
        this.fetchBlogType()
      })
    },
    handleDialog(data) {
      this.$confirm('删除该分类后，该分类下面的所有文章将变为未分类状态，是否继续?', '是否删除此文章分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        deleteBlogType(data.id).then((res) => {
          this.fetchBlogType()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeDialog({name,order,id}){
      this.form.name = name
      this.form.order = order
      this.form.id = id
      this.dialogFormVisible = true

    },
    handleDialogConfirm(){
      const data = {
        name:this.form.name,
        order:this.form.order
      }
      changeBlogType(this.form.id,data).then(res=>{
        this.fetchBlogType()
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style scoped>
.my-input {
  margin: 15px 0;
  width: 36%;
  display: flex;
}
</style>
