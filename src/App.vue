<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Header from './components/header/MyHeader.vue'
import {mapMutations} from 'vuex'

export default {
  name: 'App',
  created(){
    const userinfo=window.localStorage.getItem('userinfo')
    if(userinfo){
      this.login(true)
      this.saveinfo(JSON.parse(userinfo))
    }
  },
  components: { Header },
  methods:{
    ...mapMutations({login:'AutoLogin',saveinfo:'SaveUserInfo'}),
  }
  
}
</script>

<style scoped lang="less">
.el-container {
  height: 100vh;

  /deep/ .el-header {
    background-color: #fff;
    width: 1500px;
    padding-left: 0;

    div span {
      margin: 0;
      font-size: 14px !important;
    }
  }

  .el-main {
    padding: 0;
    width: 100vw;
    outline: none;
  }
}
</style>