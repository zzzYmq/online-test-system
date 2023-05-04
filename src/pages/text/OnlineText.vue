<template>
  <div class="paper-page" v-loading="loading">
      <div class="container">
        <el-breadcrumb>
            <el-breadcrumb-item to="/"><span class="home"><i class="el-icon-map-location" style="margin-right:2px;"></i>首页</span></el-breadcrumb-item>
            <el-breadcrumb-item><span>{{tkname}}</span></el-breadcrumb-item>
            <el-breadcrumb-item :to="`/tk/detail/?tkid=${tkid}`"><span class="text">在线练习</span></el-breadcrumb-item>
            <el-breadcrumb-item><span :class="type?'':'current'">{{text}}</span></el-breadcrumb-item>
            <el-breadcrumb-item v-if="type"><span :class="type?'current':''">{{type}}</span></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="paper-answer">
            <Question :info="info"></Question>
            <div class="answer-card">
                <div class="lianxi-cart-tit">
                    <h6>答题卡</h6>
                    <el-button type="text">清空答题记录</el-button>
                </div>
                <el-divider></el-divider>
                <div class="problem">
                    <div  v-for="item in list" :key="item.type">
                        <p class="type">{{item.type}}</p>
                        <ul class="list">
                            <li 
                            v-for="i in item.total"  
                            :key="(item.type+i)" 
                            :class="item.type+'-'+i===activeIndex?'active':''"
                            @click="getQuestion(item.type,i)"
                            >{{i}}</li>
                        </ul>
                    </div>
                </div>
                <div class="practice-ctrl">
                    <span class="right">答对：<span>{{0}}题</span></span>
                    <span class="err">答错：<span>{{0}}题</span></span>
                    <span class="right-err">正确率：{{0}}%</span>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Question from '../../components/showTM/MyQuestion'
export default {
    components:{Question},
    props:['tkid','tkname','text','type'],
    created(){
        let choice=''
        if(this.text==='顺序练习') choice='initse'
        else if(this.text==='题型练习') choice='initype'
        else if(this.text==='随机练习') choice='initra'
         this.$http.get('/api/bank/inbank/',{
            params:{
                choice,
                bankid:this.tkid,
                type:this.type
            }
        }).then(({data:res})=>{
            this.list=res.data
            this.activeIndex=this.list[0].type+'-'+1
            this.getQuestion(this.list[0].type,1)
        })
    },
    data() {
        return {
            loading:true,
            list:[],
            activeIndex:'',
            info:{},
        }
    },
   methods:{
    next(){
        const current=this.activeIndex.split('-')
        const current_type=current[0]
        const current_index=parseInt(current[1])
        let total=-1;
        let index=-1;
        this.list.forEach((item,i)=>{
            if(item.type===current_type) {
                total=item.total
                index=i
            }
        })
        if(current_index===total){
            this.getQuestion(this.list[index+1].type,1)
        }else{
            this.getQuestion(current_type,current_index+1)
        }
    },
    getQuestion(type,number){
        this.activeIndex=type+'-'+number
        this.$http.get('/api/bank/inbank/',{
            params:{
                choice:'choose',
                bankid:this.tkid,
                type,
                number,
            }
        }).then(({data:res})=>{
            this.info=res.data
            this.loading=false
        })
    }
   }
}
</script>

<style lang="less" scoped>
.active{
    background-color: #198DFF;
    color: #fff !important;
}
    .paper-page{
    display: flex;
    height: 100vh;
    justify-content: center;
    .container{
        width: 1200px;
        .el-breadcrumb{
            margin:20px 0;
            .home,.text{
                font-weight: normal;
                &:hover{
                    color:#198DFF
                }
            }
        }

        .paper-answer{
            display: flex;
            justify-content: space-between;
            .answer-card{
                width: 280px;
                height: 430px;
                background: white;
                .lianxi-cart-tit{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 10px;
                    h6{
                        font-size: 16px;
                        color: #333;
                        font-weight: 600;
                        line-height: 48px;
                        margin: 0;
                    }
                }
                .el-divider{
                    margin: 0 0 5px 0;
                }
                .problem{
                    padding: 10px;
                    overflow: auto;
                    height: 300px;
                    .type{
                        font-size: 14px;
                        color: #333;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }
                    .list{
                        display: flex;
                        padding: 0;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        li{
                            width: 19.1%;
                            height: 36px;
                            border: 1px solid #eee;
                            border-radius: 3px;
                            margin: 1px;
                            text-align: center;
                            line-height: 36px;
                            color: #333;
                            font-size: 14px;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                    }
                }
                .practice-ctrl{
                    height: 65px;
                    display: flex;
                    justify-content: space-between;
                    align-content: space-between;
                    flex-wrap: wrap;
                    padding: 10px;
                    &>span{
                        width: 50%;
                        font-size: 14px;
                        color:#333
                    }
                    .right span{
                        color:#52c41a
                    }
                    .err span{
                        color:red
                    }
                }
            }
        }
    }
}
</style>