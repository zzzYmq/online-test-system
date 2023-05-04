<template>
    <el-row style="margin-top:50px">
        <el-col :span="16" :offset="4">
            <div class="paper">
                <div class="question-box">
                    <el-row style="margin-bottom:40px">
                        <el-col :span="2">
                            <span>{{info.type}}</span>
                        </el-col>
                        <el-col :span="10">
                            <p>{{info.topic}}</p>
                        </el-col>
                    </el-row>
                    <el-form disabled label-width="70px">
                        <el-form-item v-if="info.type==='单选题'||info.type==='判断题'">
                            <el-radio-group>
                                <el-radio :label="option(index)+'  '+item" v-for="item,index in info.option" :key="index"></el-radio>
                            </el-radio-group>
                            <div class="correct">正确答案：
                                <template v-if="info.type==='单选题'">
                                    {{info.anwser}}
                                </template>
                                <template v-else>
                                    {{info.anwser?'正确':'错误'}}
                                </template>
                            </div> 
                        </el-form-item>
                        <el-form-item v-else-if="info.type==='多选题'||info.type==='不定项选择题'">
                            <el-checkbox-group>
                                <el-checkbox :label="option(index)+'  '+item" v-for="item,index in info.option" :key="index"></el-checkbox>
                            </el-checkbox-group>
                            <div class="correct">正确答案：{{info.anwser}}</div> 
                        </el-form-item>
                        <el-form-item label="参考答案" v-else-if="info.type==='填空题'||info.type==='简答题'">
                            <el-input :value="info.anwser" v-if="info.type==='填空题'"></el-input>
                            <el-input type="textarea" :value="info.anwser" v-else style="max-height:100px"></el-input>
                        </el-form-item>
                    </el-form>
                    <div>{{info.anaysis}}</div>
                </div>
            </div>
        </el-col>
    </el-row>
 </template>
 
 <script>
 
 export default {
     props:['id'],
     created(){
        this.$http.get('/api/bank/inbank',{
            params:{
                choice:'detail',
                id:this.id
            }
        }).then(({data:res})=>{
            this.info=res.data
            console.log(this.info);
        })
     },
     data() {
        return {
            info:{}
        }
     },
     methods:{
        option(i){
            return String.fromCharCode(i+'A'.charCodeAt())
        }
     }
 }
 </script>
 
 <style lang="less" scoped>
    .correct{
        color: #52c41a;
    }
     .paper{
       padding: 20px;
       background: white;
       height: 100vh;
       .question-box{
           padding: 15px 30px;
           height: 56px;
           span{
               color: white;
               font-size: 12px;
               border-radius: 2px;
               background: #198DFF;
               padding:4px 2px;
           }
           p{
               margin: 0 0 0 5px;
               font-size: 16px;
               color: #333;
               font-weight: 600;
           }
           .el-radio,.el-checkbox{
            display: block;
            margin-bottom: 50px;
            &:first-child{
                margin-top: 5px;
            }
           }
 
       }
     
   }
 
 </style>