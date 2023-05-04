<template>
  <el-row style="width:100%;">
    <el-col :span="3">
        <img class="logo_img" src="https://resource.zaixiankaoshi.com/pc/logo/www.zaixiankaoshi.com.svg" alt="">
    </el-col>
    <el-col :span="4">
        <h4  style="margin-top: 8px;color: #1a8cff;font-weight: 600;">在线习题测试系统</h4>
    </el-col>
    <el-col :span="6" :offset="9">
      <el-select v-model="select" size="small">
          <el-option label="题库" value="1"></el-option>
          <el-option label="作者" value="2"></el-option>
      </el-select>
      <el-input class="text" v-model="content" placeholder="请输入内容" size="small" style="flex:10;" clearable></el-input>
      <el-button icon="el-icon-search" class="search" @click="seachTK"></el-button>
    </el-col>
    <el-col :span="3" :offset="1">
      <div class="btns" v-if="!isLogin">
        <router-link to="/login" class="login" style="margin-right:10px;"><el-button type="primary" size="mini" plain>登录</el-button></router-link>
        <router-link to="/register"  class="register"><el-button type="primary" size="mini">注册</el-button></router-link>  
      </div>
      <el-dropdown @visible-change="changeActive" @command="command" v-if="isLogin">
        <span class="el-dropdown-link">
          <el-avatar @error="errorHandler">
            <img src="../../assets/photo.jpg"/>
          </el-avatar>
          <i class="el-icon--right" :class="active" style="font-size:16px;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user"><i class="el-icon-user-solid" style="font-size:16px;"></i> 个人主页</el-dropdown-item>
          <el-dropdown-item command="exit" divided style="text-indent: 2.5em;">退出当前账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  
    data() {
      return {
        select:'1',
        active:'el-icon-caret-bottom',
        content:''
      }
    },
    computed:{
      ...mapState(['isLogin'])
    },
    methods:{
      changeActive(isVisible){
        if(isVisible) 
          setTimeout(()=>{
          this.active='el-icon-caret-top'
        },16)
        else setTimeout(()=>{
          this.active='el-icon-caret-bottom'
        },16)
      },
      seachTK(){
        if(!this.content) return this.$message.error('请输入搜索的内容')
        if(this.select==='1'){
          this.$router.replace({
            path:'/tks',
            query:{
              tkname:this.content
            }
          })
        }else if(this.select==='2'){
          this.$router.replace({
            path:'/tks',
            query:{
              author:this.content
            }
          })
        }
        this.content=''
      },
      command(command){
        if(command==='user') return this.$router.push('/user')
        else if(command==='exit'){
          this.$store.dispatch('exit',false)
          if(this.$route.path!=='/') this.$router.push('/')
        }
      },
      errorHandler() {
        return true
      }
    },
}
</script>

<style scoped lang="less">
  .el-header {
     display: flex;
     background-color: #fff;
     justify-content: space-between;
     padding-left: 0;
     align-items: center;
     font-size: 20px;
     div{
         display: flex;
         align-items: center;
         height: 100%;
         .logo_img{
           height: 80%;
         }
         span{
           margin-left: 15px;
           font-size: 24px;
         }
       }
   }
  /deep/ .el-input--suffix{
    display: flex;
    align-items: center;
    width: 75px;
  }
  /deep/ .el-input__inner{
      border-radius: 0;
    }
    .el-dropdown-link{
      display: flex;
      align-items: center;
    }
  .search{
    height: 32px;
    border-left: 0;
    border-radius: 0;
    display: flex;
    align-items: center;
  }
  .btns button{
    width: 80px;
  }
</style>