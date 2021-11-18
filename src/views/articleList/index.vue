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
          prop="title"
          label="文章名称"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="description"
          label="文章描述"
          width="180">
      </el-table-column>
      <el-table-column
          prop="scanNumber"
          label="浏览数"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="commentNumber"
          label="评论数"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          label="所属分类"
          align="center"
          width="180">
        <template slot-scope="scope">
          {{scope.row.category.name}}
        </template>
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
          label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="操作" :hide-after="2000" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="changeArticle(scope.row)" size="mini" circle></el-button>
          </el-tooltip>
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
import {  getBlog, deleteBlog } from "@/api/blog"
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
    this.getBlogData()
  },
  computed:{

  },
  methods:{

    async getBlogData(){
      const res = await getBlog()
      this.tableData = res.data.rows.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      this.total = res.data.total
      this.totalPage = Math.ceil(this.total / this.pageSize)
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        await this.getBlogData();
      }
    },
    formDate(T){
      return formAtData(T)
    },
     handleDialog(data){
      this.$confirm('删除该文章会将该文章下面的评论一并删除，是否继续?', '是否删除此篇文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        deleteBlog(data.id).then((res)=>{

          this.getBlogData()

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(data)
    },
    handleSizeChange(value){
      console.log(value)
      this.pageSize = value
      this.getBlogData()
    },
    handleCurrentChange(value){
      this.currentPage = value
      this.getBlogData()
    },
    handlePrevClick(){
      this.currentPage --
    },
    handleNextClick(){
      this.currentPage ++
    },
    changeArticle({id}){
      this.$router.push(`editArticle/${id}`)
    }
  },
}
</script>

<style scoped>

</style>
