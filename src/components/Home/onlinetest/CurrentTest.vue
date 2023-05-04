<template>
    <div>
     <el-breadcrumb>
       <el-breadcrumb-item><span><i class="el-icon-map-location" style="margin-right:2px;"></i>在线测试</span></el-breadcrumb-item>
       <el-breadcrumb-item><span class="current">进行中的测试</span></el-breadcrumb-item>
     </el-breadcrumb>
     <el-card style="height:100vh">   
         <el-table 
         :data="tableData"
         style="width: 100%;height: 100%;"
         ref="multipleTable"
         header-cell-class-name="header"
         @selection-change="handleSelectionChange"
         v-if="tableData">
           <el-table-column 
           width="55" 
           type="selection">
           </el-table-column>
           <el-table-column
             type="index"
             label="编号"
             width="50">
           </el-table-column>
           <el-table-column
             prop="name"
             label="测试名称"
             width="180">
           </el-table-column>
           <el-table-column
             prop="zip"
             label="测试时长"
             width="100">
           </el-table-column>
           <el-table-column
             prop="zip"
             label="发布者"
             width="180">
           </el-table-column>
           <el-table-column
             prop="zip"
             label="发布时间"
             width="180">
           </el-table-column>
           <el-table-column
             prop="zip"
             label="结束时间"
             width="100">
           </el-table-column>
           <el-table-column
             prop=""
             label="操作">
             <template>
               <el-link type="primary" style="margin:0 10px;">测试</el-link>       
             </template>
           </el-table-column>
         </el-table>
         <el-empty image="https://resource.zaixiankaoshi.com/mini/def/empty_def.png" v-if="!tableData">
             <template #description>
                 <h6 style="font-weight:700">没有发起过考试</h6>
                 <p>您可以随机抽取试题，发起考试，试卷自动判分</p>
             </template>
             <router-link to="/add_exam"><el-button type="primary">增加考试</el-button></router-link>
         </el-empty>
     </el-card>
   </div>
 </template>
 
 <script>
 
 export default {
     name:"MyExam",
     data() {
         return {
             activeName:'-1',
             paperList:[],
             serach_name:'',
             multipleSelection:[],
             tableData: [{
             date: '2016-05-02',
             name: '王小虎',
             province: '上海',
             city: '普陀区',
             address: '上海市普陀区金沙江路 1518 弄',
             zip: 200333,
             tag: '家'
           }, {
             date: '2016-05-04',
             name: '王小虎',
             province: '上海',
             city: '普陀区',
             address: '上海市普陀区金沙江路 1517 弄',
             zip: 200333,
             tag: '公司'
           }, {
             date: '2016-05-01',
             name: '王小虎',
             province: '上海',
             city: '普陀区',
             address: '上海市普陀区金沙江路 1519 弄',
             zip: 200333,
             tag: '家'
           }, {
             date: '2016-05-03',
             name: '王小虎',
             province: '上海',
             city: '普陀区',
             address: '上海市普陀区金沙江路 1516 弄',
             zip: 200333,
             tag: '公司'
           }],
         }
     },
     methods:{
       tableHeaderClassName(){
         return 'header'
       },
       handleSelectionChange(val){
         this.multipleSelection = val;
       },
       
     },
    
 }
 </script>
 
 <style scoped lang="less">
 
   /deep/ .el-table .header{
     background: #F5F7FA;
   }
 
  
 </style>