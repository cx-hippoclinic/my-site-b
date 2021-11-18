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
          width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
          label="项目名称"
          align="center"
          width="180">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="proName">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="description"
          label="项目描述"
          align="center">
      </el-table-column>
      <el-table-column
          label="预览图"
          align="center"
          width="180">
        <template slot-scope="scope">
          <el-image :src="scope.row.thumb2" alt="" width="150px"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="github" :hide-after="2000" placement="top">
            <el-button type="info" class="iconfont icon-github" @click="gotoGithub(scope.row)" size="mini"
                       circle></el-button>
          </el-tooltip>
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
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible" :fullscreen="true">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm" >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getProject,deleteProject,changeProject } from "@/api/project"
import Upload from "@/components/Upload"
export default {
  name: 'index',
  data(){
    return{
      tableData:[],
      dialogFormVisible:false,
      form:{}
    }
  },
  created() {
    this.fetchProject()
  },
  components:{
    Upload
  },
  methods:{
    fetchProject(){
      getProject().then(({data})=>{
        console.log(data)
        this.tableData = data
        this.tableData.map(item=>{
          item.thumb2 = process.env.VUE_APP_SEVER + item.thumb
        })
      })
    },
    gotoGithub({github}){
      window.open(github)
    },
    handleDialog(data) {
      this.$confirm('确定删除此项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        deleteProject(data.id).then((res) => {
          console.log(data.id)
          console.log(res)
          this.fetchProject()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeDialog(data){
      this.form = {...data}
      this.form.description = this.form.description.toString()
      this.dialogFormVisible = true
    },
    handleDialogConfirm(){
      const obj = {...this.form}
      obj.description = this.form.description.split(',')
      console.log(obj)
      changeProject(obj.id,obj).then(res=>{
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.dialogFormVisible = false
        this.fetchProject()
      })
    }
  }
}
</script>

<style scoped>
  .proName:hover{
    color:rgb(163,163,163);
  }
  .block {
    font-weight: 100;
    margin: 15px auto;
  }
</style>
