<template>
  <div class="paper-page">
      <div class="container">
        <el-breadcrumb>
            <el-breadcrumb-item><span>首页</span></el-breadcrumb-item>
            <el-breadcrumb-item><span>{{TKinfo.name}}</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="current">在线练习</span></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="detail-top bg">
            <el-row>
                <el-col :span="1" :offset="1">
                    <img src="https://resource.zaixiankaoshi.com/pc/paper/paper_detail.png" alt="">
                </el-col>
                <el-col :span="3">
                    <h5 class="title">{{TKinfo.name}}</h5>
                </el-col>
                <el-col :span="2" :offset="17">
                    <el-button type="warning" plain>收藏</el-button>
                </el-col>
            </el-row>
        </div>
        <el-card class="box-card lianxi-way">
            <div slot="header" class="clearfix">
                <h6 class="title">专项练习</h6>
            </div>
            <el-menu  class="el-menu-demo" mode="horizontal">
                <el-menu-item  index="1"  v-for="(item,index) in lianxiList" :key="index" @click="goText(item.title)">
                    <img :src="item.img">
                    <div>
                        <h6 class="title">{{item.title}}</h6>
                        <p>{{item.detial}}</p>
                    </div>
                </el-menu-item>
                </el-menu>
        </el-card>
        <div class="search bg">
            <el-input clearable placeholder="请输入您要搜索的试题" v-model="topic">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-card class="box-card tiku-pre">
            <div slot="header" class="clearfix">
                <h6 class="title">题库预览</h6>
            </div>
            <ul id="timu-items">
                <router-link v-for="item in question" :key="item.id" :to="{
                    path:'/preview',
                    query:{
                        id:item.id
                    }
                }">
                    <li>
                        <span>{{item.type}}</span>
                        <p>{{item.topic}}</p>
                    </li>
                </router-link>
            </ul>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="pageNum"
            @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
      </div>
      <el-dialog :visible.sync="choiceDialogVisible" width="30%">
        <template #title>
            <h6 class="title">题型练习，请选择题型</h6>
        </template>
        <el-row>
            <el-col :span="8" v-for="item in Tixing" :key="item.type">
                <el-button type="text" @click="goText('题型练习',item.type)">
                    <span class="type">{{item.type}}</span>{{item.total}}道
                </el-button>
            </el-col>
        </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:"MyPaper",
    props:['bankid'],
    created(){
        this.getTkInfo()
    },
    data() {
        return {
            total:0,
            pageNum:1,
            pageSize:5,
            lianxiList:[
                {title:"顺序练习",detial:'',img:'https://resource.zaixiankaoshi.com/pc/paper/shunxu_icon.png'},
                {title:"模拟考试",detial:"随机抽题仿真练习",img:'	https://resource.zaixiankaoshi.com/pc/paper/moni_icon.png'},
                {title:"随机练习",detial:"试题顺序打乱练习",img:'https://resource.zaixiankaoshi.com/pc/paper/suiji_icon.png'},
                {title:"题型练习",detial:"按题型分类练习",img:'https://resource.zaixiankaoshi.com/pc/paper/tixing_icon.png'},
            ],
            TKinfo:{},
            question:[],
            topic:'',
            choiceDialogVisible:false,
            Tixing:[]
        }
    },
    methods:{
        getTkInfo(){
            this.$http.get('/api/bank/inbank/',{
                params:{
                    choice:'preview',
                    bankid:this.bankid,
                    pageSize:5,
                    pageNum:this.pageNum
                }
            }).then(({data:res})=>{
                this.TKinfo=res.info
                this.lianxiList[0].detial=this.TKinfo.QNum+'道'
                this.question=res.question
                this.total=this.TKinfo.QNum
            })
        },
        handleCurrentChange(newPage){
            this.pageNum=newPage
            this.getTkInfo()
        },
        goText(title,type=''){
            let path=`/online/?tkid=${this.bankid}&tkname=${this.TKinfo.name}&text=${title}`
            if(title!=='题型练习'&& !this.choiceDialogVisible) this.$router.push(path)
            else if(title==='题型练习'&&this.choiceDialogVisible) this.$router.push(`${path}&type=${type}`)
            else{
                this.choiceDialogVisible=true
                this.$http.get('/api/bank/inbank/',{
                    params:{
                        choice:'typeSum',
                        bankid:this.bankid,
                    }
                }).then(({data:res})=>{
                    this.Tixing=res.data
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
.bg{
    background: white;
}
.title{
    font-weight:600;
    margin-top: 10px;
}
 .paper-page{
    display: flex;
    height: 100vh;
    justify-content: center;
    .container{
        width: 1200px;
        .el-breadcrumb{
            margin:20px 0;
        }
        .detail-top{
            height: 100px;
            line-height: 100px;
            img{
                margin-left: -20px;
                height: 60px;
            }
            h5{
                padding-top: 20px;
            }
        }
        .lianxi-way {
            margin: 20px 0;
            width: 100%;
           
            .el-menu{
                border: 0;
                .el-menu-item{
                width: 25%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                padding: 0 20px;
                align-items: center;
                &:hover{
                    background: #f2f8ff;
                }
                img{
                    width: 40px;
                }
               div{
                    margin-left: -50px;
                h6{
                    color: black;
                    margin-top: 15px;
                }
                p{
                    height: 30px;
                    line-height: 30px;
                }
               }
            }
            }
          
        }
        .search{
            padding:20px;
            margin-bottom: 20px;
        }
        #timu-items {
            padding: 0;
            li{
                height: 56px;
                display: flex;
                align-items: center;
                padding: 15px 0;
                border-bottom:1px solid #eee ;
                &:hover{
                    cursor: pointer;
                    p{
                        color:#198DFF
                    }
                }
                span{
                    color: white;
                    font-size: 12px;
                    background: #198DFF;
                    padding: 2px 4px;
                }
                p{
                    margin: 0 0 0 10px;
                }
            }
        }
        .el-pagination{
            display: flex;
            justify-content: center;
        }
           
    }
    /deep/ .el-dialog .el-dialog__body{
        padding: 20px;
        .type{
            font-size: 16px;
            margin-right: 5px;
        }
    }
 }
</style>