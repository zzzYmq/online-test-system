<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item><span><i class="el-icon-map-location" style="margin-right:2px;"></i>我的题库</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="current">全部题库</span></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="height:100vh">
        <el-row slot="header">  
            <el-col :span="2">
                <el-button type="primary" style="height:80%;" @click="uploadDialogVisible=true">上传题库</el-button>
            </el-col>
            <el-col :span="2">
                <el-button class="del" style="height:80%;">删除选中</el-button>
            </el-col>
            <el-col :span="6" :offset="13"> 
                <el-input placeholder="请输入想搜索的题库名称" v-model="searchTKname" size="medium"></el-input>
                <el-button size="medium" icon="el-icon-search" class="search"></el-button>
            </el-col>
        </el-row>
        <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
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
            prop="bankname"
            label="题库名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="quesNum"
            label="题目数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="update"
            label="更新时间"
            width="200">
          </el-table-column>
          <el-table-column
            label="操作">
            <template  slot-scope="{row}">
              <div class="actions">
                  <el-link type="primary">练习</el-link>
                  <el-link type="danger" style="margin:0 10px;">取消收藏</el-link>
                  <router-link :to="{
                    path:'/managebank',
                    query:{
                      id:row.id
                    }
                  }"><el-link type="primary"  style="margin:0 10px;">管理题库</el-link></router-link>
                  <el-link type="danger">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-empty image="https://resource.zaixiankaoshi.com/mini/def/empty_def.png" v-if="!tableData">
            <template #description>
                <h6 style="font-weight:700">没有题库</h6>
                <p>您可以上传自己的题库，也可以搜索题库进行练习</p>
            </template>
        </el-empty>
    </el-card>
    <el-dialog :visible.sync="uploadDialogVisible" width="30%">
        <template #title>
            <h6 class="title">请输入题库名称</h6>
        </template>
        <el-form>
            <el-form-item prop="name" required :show-message="false">
                <el-input v-model="name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="upload">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
    created(){
      this.$http.get('/api/bank/mybank/',{
        params:{
          choice:"upload",
        }
      }).then(({data:res})=>{
        this.tableData=res.data
        this.loading=false
      })
    },
    data() {
      return {
        loading:true,
        name:'',
        searchTKname:'',
        uploadDialogVisible:false,
        addTkname:'',
        multipleSelection: [],
        tableData: [],
      }
    },
    methods:{
      upload(){
        if(!this.name) return this.$message.error('请输入题库名称')
        // this.$http.post('/'{
        //   params:{

        //   }
        // }).then(({data:res})=>{
        //     this.$router.push({
        //     path:'/upload',
        //     tkid:res.id
        //   })
        // })
       
      },
      tableHeaderClassName(){
        return 'header'
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
}
</script>

<style scoped lang="less">

   /deep/ .el-input{
        width: 80%;
        .el-input__inner{
      border-radius: 0;
    }
   }
   .search{

    border-left: 0;
    border-radius: 0;
  }
  /deep/ .el-table .header{
    background: #F5F7FA;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .del{
    color: #ccc;
    font-weight: 530;
    font-size: 15px;
  }
  .title{
    font-weight:600;
}
</style>