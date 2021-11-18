<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 40%">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input v-model="ruleForm.oldLoginPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input v-model="ruleForm.loginPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPwd">
        <el-input v-model="ruleForm.confirmPwd" type="password"></el-input>
      </el-form-item>
        <el-button type="primary" @click="submitForm">修改</el-button>
        <el-button @click="resetForm" type="danger">返回</el-button>
    </el-form>
  </div>
</template>

<script>
import { getInfo,setLoginInfo} from "@/api/user"

export default {
  name: 'index',
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.loginPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name:'',
        loginId:'',
        oldLoginPwd:'',
        loginPwd:'',
        confirmPwd:''
      },
      rules: {
        oldLoginPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
        loginPwd: [{required: true, message: '请输入新密码', trigger: 'blur'}],
        confirmPwd: [{required: true, message: '请输入确认新密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}]
      }
    }
  },
  created() {
    this.fetchUserData()
  },
  methods:{
    fetchUserData(){
      getInfo().then(res=>{
        this.ruleForm.name = res.data.name
        this.ruleForm.loginId = res.data.loginId
      })
    },
    submitForm(){
      if(this.ruleForm.name&&this.ruleForm.oldLoginPwd&&this.ruleForm.confirmPwd){
        setLoginInfo(this.ruleForm).then(res=>{
          if(typeof res === 'string'){
            const obj = JSON.parse(res)
            this.$message.error(obj.msg)
          }else {
            this.$message.success('修改成功')
            console.log(this.$route.fullPath)
            this.$store.dispatch('user/logout').then(()=>{
              this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            })
          }
        })
      }else {
        this.$message.error('请填写完整')
      }

    },
    resetForm(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>
