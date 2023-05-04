<template>
  <div>
    <el-breadcrumb>
        <el-breadcrumb-item><span><i class="el-icon-map-location" style="margin-right:2px;"></i>发起考试</span></el-breadcrumb-item>
        <el-breadcrumb-item><span class="current">新增考试</span></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-steps :active="step" finish-status="success" align-center style="margin-bottom:15px;">
            <el-step title="创建考试"></el-step>
            <el-step title="试题设置"></el-step>
            <el-step title="考试设置"></el-step>
        </el-steps>
        <el-form 
        :model="examForm1" 
        ref="examForm1" 
        label-position="right" 
        label-width="80px"
        v-show="!step">
            <el-form-item label="试卷名称" prop="name" required :show-message="false" style="width:500px;">
                <el-input v-model="examForm1.name" ></el-input>
            </el-form-item>
            <el-form-item label="考试说明" prop="shuoming" style="width:500px;">
                <el-input type="textarea" v-model="examForm1.shuoming" placeholder="请输入考试说明"></el-input>
            </el-form-item>
            <el-form-item label="考试登录" prop="type" :show-message="false">
                <el-radio-group :value="'指定考生'">
                    <el-radio label="指定考生" size="medium"></el-radio>
                </el-radio-group>
                <div><el-button @click="inputDialogVisible=true">录入考生</el-button></div>
            </el-form-item>
            <el-form-item label="考试时间" required class="time">
                <el-date-picker
                    v-model="examForm1.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    prop="time">
                </el-date-picker>
                <el-switch
                    v-model="examForm1.autoSub"
                    active-text="到结束时间,自动交卷"
                    v-show="examForm1.time.length">
                </el-switch>
            </el-form-item>
            <el-form-item label="考试时长" required> 
                <el-input-number v-model="examForm1.long" controls-position="right" :min="5"></el-input-number>
            </el-form-item>
            <el-form-item label="及格分数" required> 
                <el-input-number v-model="examForm1.passcore" controls-position="right" :min="0" :max="90"></el-input-number>
            </el-form-item>
        </el-form>

        <el-form 
        :model="examForm2" 
        ref="examForm2" 
        label-position="left" 
        label-width="80px"
        v-if="step===1">
            <el-form-item label="组卷方式" required>
                <el-radio-group v-model="method">
                    <el-radio label="随机选题"></el-radio>
                    <el-radio label="顺序选题"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择题库" required>
                <el-row>
                    <el-col :span="2">
                        <el-button plain type="primary" size="small" @click="choiceTK">选择题库</el-button>
                    </el-col>
                    <el-col :span="2">
                        <span v-show="TK.length">已选择{{selected.length}}个题库</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-tag
                        v-for="(tag,index) in selected"
                        :key="index"
                        closable
                        type="info"
                        size="small"
                        @close="delTK(index)"
                        style="margin-right:3px;color:#333">
                        {{tag}}
                    </el-tag>
                </el-row>
            </el-form-item>
            <el-form-item label="设置数量" required v-show="selected.length">
                <table 
                class="table table-bordered"
                v-for="(item1,i1) in arr"
                :key="i1">
                    <thead>
                        <tr class="header">
                            <th colspan="4">
                            <div>
                                <i class="color">|</i>{{item1.type}} <p>已经抽取：<span class="color">{{getTotalNum(item1.list)}}</span> 题，总计分值：<span class="color">{{getTotalfenzhi(item1.list)}}</span>分</p>
                            </div>
                            </th>
                        </tr>
                        <tr>
                            <th>题库名称</th>
                            <th>抽取题数</th>
                            <th>每题分值</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item2,i2) in item1.list" :key="i2">
                            <td>{{item2.name}}</td>
                            <td>
                                <template v-if="!examForm2.method">
                                    <el-input-number v-model="item2.selectAmount" controls-position="right" size="mini" :min="0"></el-input-number>&nbsp;/{{item2.total}}
                                </template>
                                <template v-if="examForm2.method===1">
                                    第<el-input-number v-model="item2.start" controls-position="right" size="mini" :min="0" :max="item2.total"></el-input-number>-<el-input-number v-model="item2.end" controls-position="right" size="mini" :min="0"></el-input-number>&nbsp;/{{item2.total}}
                                </template>
                            </td>
                            <td>
                                <el-input-number v-model="item2.fenzhi" controls-position="right" size="mini" :min="0" :max="50" :step="0.5"></el-input-number>
                            </td>
                            <td>
                                <el-button type="text">清空</el-button>
                            </td>
                        </tr>
                        <tr class="header" v-if="i1===arr.length-1">
                            <th colspan="4">
                                试卷总共<span class="color">{{allNum}}</span>题，总分<span class="color">{{allFenzhi}}</span>分。
                            </th>
                        </tr>
                    </tbody>
                </table>
            </el-form-item>
        </el-form>

        <el-form
        :model="examForm3" 
        ref="examForm3" 
        label-position="right" 
        label-width="130px"
        v-show="step===2">
            <template>
                <h6>考试配置</h6>
                <el-divider></el-divider>
                <el-form-item label="答题后显示答案：">
                    <el-radio-group v-model="isShowAns">
                        <el-radio label="不显示"  size="medium"></el-radio>
                        <el-radio label="显示" size="medium"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="乱序模式：">
                    <el-checkbox-group v-model="luanxu">
                        <el-checkbox label="选项乱序"></el-checkbox>
                        <el-checkbox label="试题乱序"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </template>
            <template>
                <h6>成绩显示</h6>
                <el-divider></el-divider>
                <el-form-item label="显示分数" required>
                    <el-switch v-model="examForm3.isShowPoint"></el-switch> 考生交卷后是否显示得分
                </el-form-item>
            </template>
        </el-form>
        <div>
            <el-button style="margin-top: 12px;" @click="step--" v-show="step">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next" :disabled="step===2">下一步</el-button>
            <el-button  type="primary" v-show="step===2">发布考试</el-button>
        </div>
         <!-- 录入考生的对话框 -->
        <el-dialog
            title="考生录入"
            :visible.sync="inputDialogVisible"
            @close="closeForm('inputTakersForm','inputDialogVisible')"
            width="30%">
            <!-- 对话框内容主题区 -->
            <!-- model表单数据对象 -->
            <el-divider></el-divider>
            <div>如果考生不在录入名单内，不允许考试</div>
            <el-select value="姓名+手机号" size="small">
                <el-option value="姓名+手机号"></el-option>
            </el-select>
            <el-form :model="inputTakersForm" :rules="inputTakersFormRules" ref="inputTakersForm">
                <el-form-item prop="totalInfo">
                    <el-input type="textarea" resize="none" v-model.trim="inputTakersForm.totalInfo"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮操作区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeForm('inputTakersForm','inputDialogVisible')">取消</el-button>
                <el-button type="primary" @click="inputTakers('inputTakersForm')">录入</el-button>
            </span>
        </el-dialog>
        <!-- 选择题库对话框 -->
        <el-dialog
        v-loading="loading"
            title="选择题库"
            :visible.sync="choiceDialogVisible"
            width="30%">
            <!-- 对话框内容主题区 -->
            <!-- model表单数据对象 -->
            <ul class="item-box">
            <li class="item" v-for="item in TK" :key="item.id">
                <el-row>
                    <el-col :span="3" :offset="1">
                        <img src="https://static.zaixiankaoshi.com/img/6848373.png" alt="">
                    </el-col>
                    <el-col :span="14">
                        <div>{{item.bankname}}</div>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary"  @click="selectedTK(item)">选择</el-button>
                    </el-col>
                </el-row>
            </li>
        </ul>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>


import {mixin} from '../../../mixin';


export default {
    data() {
        var validateInfo=(rule,value,callback)=>{
            const arr=value.split('\n')
            const isLegal=arr.every(item => this.regName.exec(item)&&this.regNum.exec(item))
            if(!isLegal) return callback(new Error('请输入正确的姓名和手机号'))
            callback()
        };
        return {
            examid:-1,
            step:0,
            who:"所有人都可以考试",
            examForm1:{
                name:'',
                shuoming:'',
                time:[],
                autoSub:false,
                long:45,
                passcore:60,
            },
            method:'随机选题',
            examForm2:{
                method:0,
                arr:[],
            },
            choiceDialogVisible:false,
            loading:true,
            isShowAns:'不显示',
            luanxu:[],
            examForm3:{
                isShowPoint:true,
                luanxu:[],
            },
            TK:[],
            selected:[],
            arr:[],
            inputDialogVisible:false,
            inputTakersForm:{
                totalInfo:''
            },
            inputTakersFormRules:{
                totalInfo:[
                    { validator: validateInfo ,trigger:'blur'}
                ]
            },
            TakersInof:[],
        }
    },
    methods:{
        inputTakers(FormName){
            this.$refs[FormName].validate((valid) => {
          if (valid) {
            const arr=this.inputTakersForm.totalInfo.split('\n')
            arr.forEach(item => {
                const obj={
                    name:this.regName.exec(item)[0],
                    phonenum:this.regNum.exec(item)[0]
                }
                this.TakersInof.push(obj)
            });
            this.closeForm(FormName,'inputDialogVisible')
          } else {
            this.$message.error('提交的数据不合法')
            return false;
          }
        });
        },
        next(){
            const n=this.step+1;
            if(n===2) {
                if(!this.TK.length) return this.$message.error('请选择试题来源')
                else if(this.arr.every(item1=>item1.list.every(item2=>!item2.selectAmount))) return this.$message.error('试题数量不能为零')
            }
            this.$refs['examForm'+n].validate((valid) =>{
                if(valid){
                    if(n===1){
                        this.$http.post('/api/exam/change/',{
                            params:{
                                choice:"create",
                                ...this.examForm1
                            }
                        }).then(({data:res})=>{
                            this.examid=res.goal
                        })
                    }
                    return this.step++
                }
                else return this.$message.error('请填写试卷名称')
            })
        },
        choiceTK(){
            this.choiceDialogVisible=true
            this.$http.get('/api/bank/mybank/',{
                params:{
                    choice:"upload",
                }
            }).then(({data:res})=>{
                this.TK=res.data
                this.loading=false
            })
        },
        selectedTK(TkInfo){
            this.selected.push(TkInfo.bankname)
            this.$http.get('/api/exam/change/',{
                params:{
                    choice:"info",
                    bankid:TkInfo.id
                }
            }).then(({data:res})=>{
                let arr=res.data
                arr.map(item=>{item['list']=[{...item.info,start:0,end:0,selectAmount:0,fenzhi:1}]})
                this.arr=arr
            })
        },
        delTK(index){
            this.selected.splice(index,1)
        },
        getTotalNum(list){
            let num=0;
            if(this.examForm2.method===1){
                list.forEach(item=>{
                    let amount=item.end-item.start
                    if(amount>=0&&item.start){
                        num+=amount+1
                        item.selectAmount=num
                    }
                })
            }else{
                list.forEach(item=>{
                    num+=item.selectAmount
                })
            }
            return num
        },
        getTotalfenzhi(list){
            let sum=0;
            list.forEach(item=>{
                sum+=this.getTotalNum([item])*item.fenzhi
            }) 
            return sum
        }
    },
    computed:{
        allNum(){
            return this.getTotalNum(this.arr.map(item=>item.list).flat())
        },
        allFenzhi(){
            return this.getTotalfenzhi(this.arr.map(item=>item.list).flat())
        }
    },
    watch:{
        'examForm1.time':{
            handler(value){
                this.examForm1.time=value?value:[]
            }
        },
        method:{
            immediate:true,
            handler(value){
                if(value==='随机选题') this.examForm2.method=0
                else if(value==='顺序选题') this.examForm2.method=1
                this.arr.forEach(item1=>{
                    item1.list.forEach(item2=>{
                        item2.start=item2.end=item2.selectAmount=0
                        item2.fenzhi=1
                    })
                })
            }
        },
        luanxu:{
            handler(value){
                this.examForm3.luanxu.splice(0,1,{'选项乱序':value.some(item=>item==='选项乱序')})
                this.examForm3.luanxu.splice(1,2,{'试题乱序':value.some(item=>item==='试题乱序')})
                console.log(this.examForm3.luanxu);
            }
        }
    },
    mixins:[mixin]
}
</script>

<style lang="less" scoped>
    .color{
        color: #1A8CFF;
        padding: 0 10px;
    }
    .el-dialog .el-dialog__body{
        padding-top:0 ;
        .el-select{
            width: 100%;
            margin: 10px 0 10px -3px;
        }
        .el-textarea__inner{
            height: 300px;
        }
    }
    .time{
        width: 660px;
        .el-switch{
            float: right;
            margin-top: 10px;
        }
    }
    .header th{
        background: #F5F7FA!important;
        div{
            display: flex;
            i{
                font-weight: 900;
                font-size: 16px;
            }
            p{
                margin: 0 0 0 10px;
                font-weight: normal;
            }
        }
        text-align: start;
    }
    table:nth-child(n+1){
        margin-top: -16px;
    }
    th,td{
        text-align: center;
    }
    h6{
        font-size: 16px;
        font-weight: 600;
        color:#333

    }
</style>