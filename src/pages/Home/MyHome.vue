<template>
    <el-container class="home-container">
         <el-aside :width="width">
           <el-button type="info" @click="isShow=!isShow">|||</el-button>
           <!-- 
             菜单激活时的样式、是否折叠菜单、是否开启折叠菜单动画、菜单打开唯一 
             使用vue-router模式 激活导航时以index做为path
           -->
           <el-menu
           class="el-menu-vertical-demo"
           background-color="#C0C4CC"
           text-color="#fff"
           active-text-color="#409EFF"
           :collapse="isShow"
           :collapse-transition="false"
           :unique-opened="true"
           :router="true"
           :default-active="this.$route.path">
           <el-menu-item :index="'/'">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </template>
            </el-menu-item>
            <el-submenu :index="item.id+''"  v-for="(item,index) in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconList[index]"></i>
                <span>{{item.authName}}</span>
              </template>
                
                <el-menu-item :index="'/'+secItem.path" v-for="secItem in item.children" :key="secItem.id">
                  <template slot="title">
                    <span>{{secItem.authName}}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
           </el-menu>
         </el-aside>
         <el-main>
           <router-view></router-view>
         </el-main>
 </el-container>
 
 
 </template>
 
 <script>

 export default {
     name:'HomePage',
     data(){
       return{
         // 左侧菜单数据
         // menuList:[],
         isShow:false,
         menuList:[
          {
            id:1,authName:"题库中心",
            children:[
              {id:11,authName:"我的题库",path:"mybank"},
              {id:12,authName:"上传题库",path:"upload"},
              {id:13,authName:"全部错题",path:"mistake"},
              {id:14,authName:"练习记录",path:'bank'}
            ]
          },
          {
            id:2,authName:"发起考试",
            children:[
              {id:21,authName:"发布历史",path:"exam"},
              {id:22,authName:"新增考试",path:"add_exam"},
            ]
          },
          {
            id:3,authName:"在线测试",
            children:[
              {id:31,authName:"进行中的测试",path:"currenttest"},
            ]
          },
          {
            id:4,authName:"个人中心",
            children:[
              {id:41,authName:"用户信息",path:"user"},
            ]
          },
         ],
         iconList:['el-icon-folder-checked','el-icon-s-promotion','el-icon-edit','el-icon-user'],
         activePath:''
       }
     },
     computed:{
       width(){
         return this.isShow?'64px':'200px'
       }
     },
    
     methods:{
     }
 }
 </script>
 
 <style lang="less">
   .home-container{
     height: 100vh;
     width: 100vw;
   }
     
     .el-aside {
     background-color: #C0C4CC;
     transition: width .4s;
     .el-button{
       position: relative;
       width: 100%;
       height: 30px;
       background-color: #909399;
       border: 0;
       border-radius: 0;
       font-size: 10px;
       color:#fff;
       letter-spacing: 0.2em;
     }
     .el-menu{
       border-right: 0;
     }
   }
   
   .el-main {
     background-color: #EAEDF1;
   }
 </style>
 
   