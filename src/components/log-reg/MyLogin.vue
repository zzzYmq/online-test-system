<template>
  
  <el-form ref="LoginForm"  :rules="LoginRules" :model="LoginForm" :hide-required-asterisk="true">
    <el-form-item prop="phonenum">
      <el-input class="el-icon-phone" v-model="LoginForm.phonenum"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input class="el-icon-lock" v-model="LoginForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="primary" class="login_btn" @click="submitForm('LoginForm')">登录</el-button>
      <el-button type="info" @click="resetForm('LoginForm')">重置</el-button>
    </el-form-item>
    <div id="actions"><router-link to="/register">免费注册</router-link><router-link to="/find-psw">忘记密码</router-link></div>
  </el-form>
</template>

<script>
import {mixin} from '../../mixin';
import {mapMutations} from 'vuex'

export default {
    name:'MyLogin',
    created(){
      this.LoginForm.phonenum=this.$store.state.userinfo.phonenum||''
    },
    data(){
      var validatePhone=(rule,value,callback)=>{
          if(!value) return callback(new Error('请输入手机号'))
          if(!this.regNum.exec(value)) return callback(new Error('请输入正确的手机号'))
          callback()
      };
      return{
        LoginForm:{
          phonenum:'',
          password:'',
        },
        LoginRules:{
          phonenum:[{ validator: validatePhone, trigger: 'blur' }],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
        }
      }
    },
    methods:{
      ...mapMutations({login:'HandLogin',saveinfo:'SaveUserInfo'}),
      submitForm(FormName){
        this.$refs[FormName].validate((valid)=>{
          if(valid) {
              this.$http.post('/api/user/base/',{
                params:{
                  choice:'login',
                ...this.LoginForm,
                }
              })
              .then(({data:res})=>{
                if(res.code!==200) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                window.localStorage.setItem('userinfo',JSON.stringify(res.userinfo))
                window.localStorage.setItem('token',res.token)
                this.login(true)
                this.saveinfo(res.userinfo)
                this.$router.push('/')
              })
          }
          else{
            this.$message.error('提交数据不合法!')
            return false
          }
        })
      },
    },
    mixins:[mixin]
}
</script>

<!-- 将style局限在此组件 -->
<style scoped lang="less">

  #actions{
        margin-top: -10px;
        display: flex;
        justify-content: space-between;
        a{
          color: rgb(51, 51, 51);
          &:hover{
            color: #409EFF;
          }
        }
      }

</style>