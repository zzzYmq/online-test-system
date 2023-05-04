<template>
  <div>
    <el-button type="primary" style="float:right;height:100%;" @click="addDialogVisible=true">添加{{type}}</el-button>
      <el-form label-width="80px" label-position="top">
      <div class="table-responsive">
        <table class="table caption-top">
          <caption>{{type}}列表</caption>
          <tbody>
            <tr  v-for="(item,index) in TMarr" :key="index">
              <el-form-item :label="`${index+1}. ${item.topic}`">
                <template v-if="type==='填空题'">
                  <el-input :placeholder="item.anwser" disabled></el-input>
                </template>
                <template v-else>
                  <el-input type="textarea" :placeholder="item.anwser" disabled style="width:80%"></el-input>
                </template>
                <div class="action">
                  <el-button type="primary" icon="el-icon-edit" size="mini" class="edit" @click="editTmInfo(item)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" class="del" @click="delTm(item.topic)"></el-button>
                </div>
              </el-form-item>
            </tr>
          </tbody>
        </table>
      </div>
    </el-form>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total,sizes,prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNum"
      :page-sizes="[1,3,5]">
    </el-pagination>
    <!-- 添加题目对话框 -->
    <el-dialog
        title="添加填空题"
        :visible.sync="addDialogVisible"
        @close="closeForm('addTmForm')"
        width="40%"
        height="30%">
        <!-- 对话框内容主题区 -->
        <!-- model表单数据对象 -->
        <el-form :model="addTmForm" :rules="addTmFormRules" ref="addTmForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="题目" prop="topic">
            <el-input v-model.trim="addTmForm.topic"></el-input>
          </el-form-item>
          <el-form-item label="答案" prop="anwser">
            <el-input v-model.trim="addTmForm.anwser"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮操作区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTm('addTmForm')">确 定</el-button>
        </span>
      </el-dialog>
     <!-- 修改题目对话框 -->
     <el-dialog
        title="修改填空题"
        :visible.sync="editDialogVisible"
        @close="closeForm('editTmForm')"
        width="45%"
        height="30%">
        <!-- 对话框内容主题区 -->
        <!-- model表单数据对象 -->
        <el-form :model="editTmForm" :rules="editTmFormRules" ref="editTmForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="题目" prop="topic">
            <el-input v-model.lazy.trim="editTmForm.topic"></el-input>
          </el-form-item>
          <el-form-item label="答案" prop="anwser">
            <el-input v-model.lazy.trim="editTmForm.anwser"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮操作区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTm('editTmForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {mixin} from '../../../mixin'
export default {
    props:['id','type'],
    created(){
    this.getTmList()
  },
  data(){
    return {
      TMarr:[],
      pageSize:5,
      pageNum:1,
      total:0,
      addDialogVisible:false,
      addTmForm:{
        topic:'',anwser:'',
      },
      addTmFormRules:{
        topic:[
          { required: true, message: '请输入题目', trigger: 'blur' },
        ],
        anwser:[
          { required: true, message: '请输入正确答案', trigger: 'blur' },
        ],
      },
      editDialogVisible:false,
      editTmForm:{
        topic:'',anwser:'',
      },
      editTmFormRules:{
        topic:[
          { required: true, message: '请输入题目', trigger: 'blur' },
        ],
        anwser:[
          { required: true, message: '请输入正确答案', trigger: 'blur' },
        ],
      },
       // 编辑题目临时变量
       topictemp:''
    }
  },
  methods:{
    getTmList(){
      this.$http.get('/api/bank/inbank/',{
        params:{
          choice:"666",
          bankid:this.id,
          type:this.type,
          pageSize:this.pageSize,
          pageNum:this.pageNum
        }
      }).then(({data:res})=>{
        this.total=res.sum
        this.TMarr=res.data
      })
    },
    addTm(FormName){
      this.$refs[FormName].validate(valid=>{
        if(valid){
          this.$http.post('api/tch/pro',{
            params:{
              action:'add_problems',
              type:3,
              data:{...this.addTmForm}
            }
          }).then(({data:res})=>{
            if(res.ret) return this.$message.error(res.msg)
            this.$message.success(res.msg)
            this.addDialogVisible=false
            this.getTmList()
          }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
        }
      })
    },
    editTmInfo(Tminfo){
      this.editDialogVisible=true
      this.topictemp=Tminfo.topic
      this.editTmForm=Tminfo
    },
    editTm(FormName){
      this.$refs[FormName].validate(valid=>{
        if(valid){
          this.editTmForm.anwser=this.editTmForm.anwser.toUpperCase()
          console.log(this.editTmForm.anwser);
          this.$http.put('api/tch/pro',{
            params:{
              action:'change_problems',
              type:3,
              topic:this.topictemp,
              newdata:{...this.editTmForm}
            }
          }).then(({data:res})=>{
            if(res.ret) return this.$message.error(res.msg)
            this.$message.success(res.msg)
            this.editDialogVisible = false
            this.getTmList()
        }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
        }
      })
    },
    delTm(topic){
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$http.delete('/api/tch/pro',{
        params:{
          action:"delete_problems",
          type:3,
          topic
        }
      }).then(({data:res})=>{
        if(res.ret) return this.$message.error(res.msg)
        this.$message.success(res.msg)    
        this.getTmList() 
      }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
      
    }).catch(() => {
      this.$message.info('取消删除')          
    });
    },
    handleSizeChange(newSize){
      this.pageSize=newSize
      this.getTmList()
    },
    handleCurrentChange(newPage){
      this.pageNum=newPage
      this.getTmList()
    }
  },
  mixins:[mixin]
}
</script>

<style scoped lang="less">
  .el-card{
      margin-top: 10px;
      .el-button{
        margin-bottom: 10px;
      }
      tr{
        border-bottom: 1px solid #eee;
        .el-form-item{
          margin-bottom: 0;
          .el-input{
            width: 85%;
          }
          .action{
            float: right;
          }
        }
      }
    }
</style>