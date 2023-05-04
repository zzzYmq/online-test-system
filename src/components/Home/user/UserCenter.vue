<template>
  <el-card class="container">
    <div class="top-banner"></div>
    <el-card class="photo">
      <img src='../../../assets/photo.jpg' alt="">
    </el-card>
    <el-upload
      class="upload-demo"
      action="http://localhost/api/user/account/"
      multiple
      name="img">
      <el-button size="small" type="primary">上传头像</el-button>
    </el-upload>
    <el-tabs class="action-tabs" v-model="activeName" type="card">
      <el-tab-pane label="账户信息" name="first">
        <div class="tips">
          <h4>账号信息</h4>
        </div>
        <el-form :model="editInfoForm" :rules="editInfoFormRules" ref="editInfoForm" label-width="100px" style="width:40%">
          <el-form-item label="昵称" prop="username">
            <el-input placeholder="请输入两个字以上的昵称" v-model.trim="editInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item label="自我介绍" prop="introduction">
            <el-input type="textarea" v-model.trim="editInfoForm.introduction"></el-input>
          </el-form-item> 
          <el-button type="primary" @click="editInfo">保存</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form :model="editPswForm" :rules="editPswFormRules" ref="editPswForm" label-width="100px" style="width:40%">
          <el-form-item label="原密码" prop="oldpsw">
            <el-input v-model.trim="editPswForm.oldpsw"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpsw">
            <el-input v-model.trim="editPswForm.newpsw"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmpsw">
            <el-input v-model.trim="editPswForm.confirmpsw"></el-input>
          </el-form-item> 
          <el-button type="primary" @click="editPsw('editPswForm')">修改</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改绑定手机" name="third">
        <div class="tips">
          <h4>修改绑定手机</h4>
          <p>修改绑定手机后，原先账号下的题库/考试数据，将同步到新手机上，下次登录必须使用新手机号登录</p>
          <p>当前手机号码：{{userinfo.phonenum}}</p>
        </div>
        <el-form :model="editPhoneForm" :rules="editPhoneFormRules" ref="editPhoneForm" label-width="100px" style="width:30%;">
          <el-form-item label="验证码" prop="captcha" class="captcha_input">
            <el-input v-model.trim="editPhoneForm.captcha"></el-input>
            <el-button type="text">获取验证码</el-button>
          </el-form-item>
          <el-button type="primary">修改</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账号注销" name="fourth">
        <div class="tips">
          <h4>账号注销</h4>
          <p>账号注销后，账号下所有题库/考试数据都全部删除，账号也无法登录，请谨慎操作</p>
        </div>
        <el-form :model="logoutForm"  ref="logoutForm" label-width="100px" style="width:30%;">
          <el-form-item label="登录密码"  prop="password" required>
            <el-input placeholder="请输入登录密码" v-model.trim="logoutForm.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="logoutUser">注销</el-button>
        </el-form>
        
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'UserCenter',
  created(){
    this.editInfoForm.username=this.userinfo.username
    this.editInfoForm.introduction=this.userinfo.introduction
  },
  data() {
    return {
      activeName:'first',
      editInfoForm:{
        username:'',
        introduction:''
      },
      editInfoFormRules:{
        username:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max:10,message: '请输入两个字以上的昵称', trigger: 'blur' }
      ]
      },
      editPswForm:{
        oldpsw:'',newpsw:'',confirmpsw:''
      },
      editPswFormRules:{
        oldpsw:[
        { required: true, message: '请输入题目', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        newpsw:[
          { required: true, message: '请输入题目', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        confirmpsw:[
          { required: true, message: '请输入题目', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到20个字符', trigger: 'blur' }
        ],
      },
      editPhoneForm:{
        captcha:''
      },
      editPhoneFormRules:{
        captcha:[
          {required: true, message: '请输入验证码', trigger: 'blur'},
          { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      },
      logoutForm:{
        password:''
      }
    }
  },
  computed:{
    ...mapState(['userinfo'])
  },
  methods: {
    editInfo(){
      this.$http.post('/api/user/account/',{
        params:{
          choice:"info",
          ...this.editInfoForm
        }
      })
      .then(({data:res})=>{
        if(res.code!==200) return this.$message.error('个人信息修改失败！')
        this.$message.success(res.msg)
        window.localStorage.setItem('userinfo',JSON.stringify(res.userinfo))
      })
    },
    editPsw(FormName){
      this.$refs[FormName].validate(valid=>{
        if(valid){
          if(this.editPswForm.newpsw!==this.editPswForm.confirmpsw) return this.$message.error("确认新密码不一致！")
          this.$http.post('/api/user/account/',{
            params:{
              choice:"password",
              oldpsw:this.editPswForm.oldpsw,
              newpsw:this.editPswForm.newpsw,
            }
          }).then(({data:res})=>{
            if(!res.ret) return this.$message.error(res.msg)
            this.$message.success(res.msg)
            this.$router.push('/')
          })
        }
      })
    },
    logoutUser(){
      this.$http.post('/api/user/account/',{
        params:{
          choice:"check",
          ...this.logoutForm,
        }
      }).then(({data:res})=>{
        if(!res.ret) return this.$message.error(res.errmsg)
        this.$confirm('此操作将永久注销账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/user/account/',{
            params:{
              choice:"cancel",
            }
          }).then(({data:res})=>{
            this.$message.success(res.msg)
            this.$store.dispatch('exit',false)
            this.$router.push('/')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });          
        });
      })
    }
  },
}
</script>

<style scoped lang="less">
  .container{
    padding: 0;
    height: 100vh;
    /deep/ .el-card__body{
      padding: 0;
    }
    .top-banner{
      background-image: url("https://resource.zaixiankaoshi.com/pc/user-banner.png");
      height: 200px;
    }
    .photo{
      position: relative;
      top: -100px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      img{
        position: absolute;
        top: -27px;
        left: -19px;
        background: white;
        width: 120%;
        height: 120%;
      }
    }
    /deep/ .el-upload{
      position: relative;
      top: -180px;
      left: 230px;
      background: pink;
    }
    .action-tabs{
      position: relative;
      top: -80px;
      .tips{
        margin-left: 20px;
        h4{
          font-size: 16px;
          font-weight: 600;
        }
        p{
          font-size: 14px;
          color:#999;
          margin: 10px 0;
        }
      }
      .captcha_input /deep/ .el-form-item__content{
        display: flex;
        justify-content: center;
        .el-button{
         transform: translateX(10px);
        }
      }
      .el-button{
        transform: translateX(230px);
      }
    }
  }
</style>