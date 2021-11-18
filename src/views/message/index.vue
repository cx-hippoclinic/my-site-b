<template>
  <div class="app-container">
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
          {{ scope.$index + (currentPage-1) * pageSize +1 }}
        </template>
      </el-table-column>
      <el-table-column
          label="头像"
          align="center"
          width="60">
        <template slot-scope="scope">
          <el-image :src="getImgSrc(scope.row.avatar)" style="width: 28px"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          width="150">

      </el-table-column>


      <el-table-column
          prop="content"
          label="内容"
          align="center"
      >

      </el-table-column>


      <el-table-column
          align="center"
          label="创建日期"
          width="220">
        <template slot-scope="scope">
          {{formDate(scope.row.createDate)}}
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="操作"
          width="150">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" content="删除" :hide-after="2000" placement="top">
            <el-button type="danger" icon="el-icon-delete" @click="handleDialog(scope.row)" size="mini" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
        background
        layout="prev, pager, next,total,->, sizes, jumper"
        :page-sizes="[5,10,20]"
        style="margin-top: 30px"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick">
    </el-pagination>

  </div>
</template>

<script>
import {  getMessage, deleteMessage } from "@/api/message"
import formAtData from "@/utils/formAtData"
export default {
  name: 'index',
  data(){
    return {
      tableData:[],
      pageSize:5,
      total:0,
      currentPage:1,
      totalPage:0,

    }
  },
  created() {
    this.getMessage()
  },
  computed:{

  },
  methods:{

    async getMessage(){
      const res = await getMessage({page:this.currentPage,limit:this.pageSize})
      this.tableData = res.data.rows
      console.log(this.tableData)
      this.total = res.data.total
      this.totalPage = Math.ceil(this.total / this.pageSize)
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        await this.getMessage();
      }
    },
    formDate(T){
      return formAtData(T)
    },
    handleDialog(data){
      this.$confirm('是否删除该评论会将该文章下面的评论一并删除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        deleteMessage(data.id).then((res)=>{
          this.getMessage()

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(value){
      console.log(value)
      this.pageSize = value
      this.getMessage()
    },
    handleCurrentChange(value){
      this.currentPage = value
      this.getMessage()
    },
    handlePrevClick(){
      this.currentPage --
    },
    handleNextClick(){
      this.currentPage ++
    },
    changeArticle({id}){
      this.$router.push(`editArticle/${id}`)
    },
    getImgSrc(img) {
      return process.env.VUE_APP_SEVER + img
    }

  },
}
</script>

<style scoped>

</style>
