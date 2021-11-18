<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input type="text" v-model="link" :disabled="uneditable"></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="setNewAboutUrl">{{ statue }}</el-button>
  </div>
</template>

<script>
import { getAboutUrl, setAboutUrl} from "@/api/about"

export default {
  name: 'index',
  data(){
    return {
      link:'',
      uneditable:true,
      statue:'编辑'
    }
  },
  created() {
    this.fetchAboutUrl()
  },
  methods:{
    fetchAboutUrl(){
      getAboutUrl().then(res=>{
        this.link = res.data
      })
    },
    setNewAboutUrl(){
      if(this.statue === '编辑'){
        this.uneditable = false
        this.statue = '完成'
      }else{
        const obj = {
          url:this.link
        }
        setAboutUrl(obj).then(res=>{
          console.log(res)
          this.$message.success("更改完成")
          this.uneditable = true
          this.statue = '编辑'
        })
      }

    }
  },

}
</script>

<style scoped>
.block{
  font-weight: 100;
  margin: 15px 0 ;
}
</style>
