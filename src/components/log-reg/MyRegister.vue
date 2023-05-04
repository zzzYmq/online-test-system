<template>
  <el-form ref="RegisterForm"  :rules="RegisterRules" :model="RegisterForm"  :hide-required-asterisk="true">
    <el-form-item prop="phonenum">
      <el-input v-model.trim="RegisterForm.phonenum">
        <div slot="prepend" style="padding-right:5px">+86<i class="el-icon-phone" style="margin-left:5px;"></i></div>
      </el-input>
    </el-form-item>
    <el-form-item prop="message">
      <el-input  class="el-icon-message" v-model.trim="RegisterForm.message" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input  class="el-icon-lock" v-model.trim="RegisterForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="primary" class="Register_btn" @click="submitForm('RegisterForm')">注册</el-button>
      <el-button type="info" @click="resetForm('RegisterForm')">重置</el-button>
    </el-form-item>
    <div id="login" style="font-size:12px;">已有账号，<router-link to="/login">立即登录</router-link></div>
  </el-form>
</template>

<script>
import {mixin} from '../../mixin';


export default {
    name:'MyRegister',
    data(){
      var validatePhone=(rule,value,callback)=>{
          if(!value) return callback(new Error('请输入手机号'))
          if(!this.regNum.exec(value)) return callback(new Error('请输入正确的手机号'))
          callback()
      };
      return{
        RegisterForm:{
          phonenum:'',
          password:'',
        },
        RegisterRules:{
          phonenum:[{ validator: validatePhone,trigger: 'blur' }],
          message:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      submitForm(FormName){
        this.$refs[FormName].validate((valid)=>{
          if(valid) {
              this.$http.post('/api/user/base/',{
                params:{
                  choice:'register',
                  ...this.RegisterForm,
                  username:'ymq'
                }
              })
              .then(({data:res})=>{
                if(!res.ret) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.$router.push('/login')
              })
              .catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
          }
          else{
            return this.$message.error('提交数据不合法!')
          }
        })
      },
    },
    mixins:[mixin]
}
</script>

<style>
 
</style>