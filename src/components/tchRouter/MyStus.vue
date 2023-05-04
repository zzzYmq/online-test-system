<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/tch/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-button type="primary" style="height:100%;" @click="addDialogVisible=true">添加学生</el-button>
          </div>
        </el-col>
      </el-row>

      <!-- 表格主体 -->
      <el-table
        :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" width="50"></el-table-column>
        <el-table-column prop="stuNum" label="学号" width="180"></el-table-column>
        <el-table-column prop="realname" label="姓名" width="180"></el-table-column>
        <el-table-column prop="_class" label="班级" width="180"></el-table-column>
        <el-table-column prop="profession" label="专业" width="180"></el-table-column>
        <el-table-column prop="idCardNum" label="身份证号" width="230"></el-table-column>
        <el-table-column label="操作">
          <!-- 需要自定义表格数据和样式 并且需要用到整行的数据 要用到作用域插槽 -->
          <template slot-scope="{row}">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editStuInfo(row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delStu(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total,sizes,prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="pageNum"
          :page-sizes="[1,3,5,10]">
        </el-pagination>


      <!-- 修改用户信息的对话框 -->
      <el-dialog
        title="修改学生信息"
        :visible.sync="editDialogVisible"
        width="40%"
        @close="closeForm('editStuInfoForm')">
        <el-form :model="editStuInfoForm"  ref="editStuInfoForm" :rules="editStuInfoFormRules" label-width="70px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="editStuInfoForm.realname"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="stuNum">
            <el-input v-model="editStuInfoForm.stuNum"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="_class">
            <el-input v-model="editStuInfoForm._class"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="profession">
            <el-input v-model="editStuInfoForm.profession"></el-input>
          </el-form-item>
          
          <el-form-item label="身份证号" prop="idCardNum">
            <el-input v-model="editStuInfoForm.idCardNum"  disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editStu('editStuInfoForm')">确 定</el-button>
        </span>
      </el-dialog>
      
    </el-card>
  </div>
</template>

<script>

export default {
  name:'MyStus',
  data() {
    return {
      tableData:[],
      pageSize:5,
      pageNum:1,
      total:0,
      // 添加用户的对话框显示与隐藏
      addDialogVisible:false,
      // 添加用户的表单数据
      addStuInfoForm:{
        realname:'',
        stuNum:'',
        _class:'',
        profession:'',
        idCardNum:''
      },
      // 添加表单的验证规则对象
      addStuInfoFormRules:{
        realname:[
          { required: true, message: '请输入学生名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        stuNum:[
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        _class:[
          { required: true, message: '请输入班级', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        profession:[
          { required: true, message: '请输入班级', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        idCardNum:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      },

      // 修改用户的对话框显示与隐藏
      editDialogVisible:false,
      editStuInfoForm:{
        id:'',
        realname:'',
        stuNum:'',
        _class:'',
        profession:'',
        idCardNum:''
      },
      editStuInfoFormRules:{
        realname:[
          { required: true, message: '请输入学生名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        stuNum:[
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        _class:[
          { required: true, message: '请输入班级', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        profession:[
          { required: true, message: '请输入班级', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  created(){
    window.sessionStorage.setItem('activePath',this.$router.currentRoute.fullPath)
    this.getStuList()
  },
  methods: {
    getStuList(){
      this.$http.get('/api/tch/stus',{
        params:{
          action:"list_students",
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
      })
      .then(({data:res})=>{
        if(res.ret) return this.$message.error(res.msg)
        this.total=res.total
        this.tableData=res.retlist
      })
    },
 
  // 关闭表单后，重置表单内容
  closeForm(FormName){
    setTimeout(()=>{
      this.$refs[FormName].resetFields()
    },100)
  },
  addStu(FormName){
    console.log(this.addStuInfoForm);
    this.$refs[FormName].validate((valid)=>{
      if(valid){
        this.$http.post('/api/tch/stus',{
          params:{
            action:"add_students",
            data:{...this.addStuInfoForm}
          }
        }).then(({data:res})=>{
          if(res.ret) return this.$message.error(res.msg)
          this.$message.success(res.msg)
          this.addDialogVisible=false
          this.getStuList()
        }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
      }
      else{
        this.$message.error('提交数据不合法!')
        return false
      }
    })
  },
   // 展示编辑学生信息的对话框
  editStuInfo(stuInof){
    this.editDialogVisible=true
    this.editStuInfoForm=stuInof
  },
  editStu(FormName){
    this.$refs[FormName].validate((valid)=>{
      if(valid){
        this.$http.post('/api/tch/stus',{
          params:{
            action:"modify_students",
            newdata:{...this.editStuInfoForm}
          }
        }).then(({data:res})=>{
          if(res.ret) return this.$message.error(res.msg)
          this.$message.success(res.msg)
          this.editDialogVisible = false
          this.getStuList()
        }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
      }
      else{
        this.$message.error('提交数据不合法!')
        return false
      }
      
    })
        
  },
  delStu(id){
    this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$http.delete('/api/tch/stus',{
        params:{
          action:"del_students",
          id,
        }
      }).then(({data:res})=>{
        if(res.ret) return this.$message.error(res.msg)
        this.$message.success(res.msg)    
        this.getStuList() 
      }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
      
    }).catch(() => {
      this.$message.info('取消删除')          
    });
  },
  handleSizeChange(newSize){
      this.pageSize=newSize
      this.getStuList()
    },
  handleCurrentChange(newPage){
      this.pageNum=newPage
      this.getStuList()
    }
  },
  
}
</script>

<style lang="less" scoped> 

.box-card {
    width: 100%;
    .input-with-select .el-input-group__append{
      background-color: #fff;
    }
    .el-table{
      margin-top: 10px;
    }
  }
</style>