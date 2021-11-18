<template>
  <div class="home-container">
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
          prop="title"
          label="标题"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述">
      </el-table-column>

      <el-table-column
          prop="address"
          align="center"
          label="中图预览">
        <template slot-scope="scope">
          <el-image
              style="width: 100px"
              :src="getImgSrc(scope.row.midImg)"
              fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="address"
          align="center"
          label="大图预览">
        <template slot-scope="scope">
          <el-image
              style="width: 100px"
              :src="getImgSrc(scope.row.bigImg)"
              fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="操作" :hide-after="2000" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="handleDialog(scope.row)" size="mini" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图" >
              <Upload  v-model="form.midImg"></Upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页中图" >
              <Upload v-model="form.bigImg"></Upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner,postBanner } from "@/api/banner"
import Upload from "@/components/Upload"
export default {
  name: 'index',
  data(){
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData:[],
      form: {
        title: '',
        description: '',
        midImg: '',
        bigImg: ''
      },
    }
  },
  components:{
    Upload
  },

  methods:{
    async fetchBanner(){
      const res = await getBanner()
      this.tableData = res.data
    },
    getImgSrc(img) {
        return process.env.VUE_APP_SEVER + img
    },
    handleDialog(data){
      this.form = {...data}
      this.dialogFormVisible = true
    },
    async editConfirm(){
      console.log(this.form)
      const isUpdateData = this.tableData.map((i)=>{
        if(i.id === this.form.id){
          return this.form
        }else {
          return i
        }
      })
      const res = await postBanner(isUpdateData)
      this.tableData = res.data
      this.dialogFormVisible = false
      this.$message.success('修改成功')
    }
  },
  created() {
    this.fetchBanner()
  }
}
</script>

<style scoped>

</style>
