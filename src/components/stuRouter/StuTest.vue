<template>
    <el-card>
        <div slot="header" class="clearfix" v-if="isSubmit">
            <span>你的最终得分是：<span class="point">{{point}}</span></span>
        </div>
        <el-form ref="testform" :model="testform" label-width="80px" label-position="top" :v-loading="loading">
        <h5>单选题</h5>
        <el-form-item :label="`${index+1}. ${item.topic}( )`" v-for="(item,index) in TMarr[0].timu" :key="`da${index+1}`">
            <el-radio-group v-model="testform.singleChoiceAns[index]">
                <el-radio :label="`A ${item.A}`"></el-radio>
                <el-radio :label="`B ${item.B}`"></el-radio>
                <el-radio :label="`C ${item.C}`"></el-radio>
                <el-radio :label="`D ${item.D}`"></el-radio>
            </el-radio-group>
            <div class="ans-group" v-if="isSubmit">
                <div class="corrcet">正确答案：{{singleChoiceCorrList[index]}}</div> 
                <div v-if="!checkList[index]" class="mistake">错误答案:{{testform.singleChoiceAns[index]||' '}}</div>
            </div>  
        </el-form-item>
        <h5>多选题</h5>
        <el-form-item :label="`${index+1}. ${item.topic}( )`" v-for="(item,index) in TMarr[1].timu" :key="`duo${index+1}`">
            <el-checkbox-group v-model="testform.multipleChoiceAns[index]">
                <el-checkbox :label="`A ${item.A}`" :name="`${index+1}`"></el-checkbox>
                <el-checkbox :label="`B ${item.B}`" :name="`${index+1}`"></el-checkbox>
                <el-checkbox :label="`C ${item.C}`" :name="`${index+1}`"></el-checkbox>
                <el-checkbox :label="`D ${item.D}`" :name="`${index+1}`"></el-checkbox>
            </el-checkbox-group>
            <div class="ans-group" v-if="isSubmit">
                <div class="corrcet">正确答案：{{multipleChoiceCorrList[index]}}</div> 
                <div v-if="!checkList[5+index]" class="mistake">错误答案{{testform.multipleChoiceAns[index]||' '}}</div>
            </div>  
        </el-form-item>
        <h5>填空题</h5>
        <el-form-item :label="`${index+1}. ${item.topic}`" v-for="(item,index) in TMarr[2].timu" :key="`kong${index+1}`">
            <el-input v-model="testform.fillBankAns[index]"></el-input>
            <div class="ans-group" v-if="isSubmit">
                <div class="corrcet">正确答案：{{fillBankCorrList[index]}}</div> 
                <div v-if="!checkList[10+index]" class="mistake">错误答案{{testform.fillBankAns[index]||' '}}</div>
            </div>  
        </el-form-item>
        <el-form-item>
            <el-button type="primary" 
            @click.prevent="onSubmit" 
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="提交试卷中">提交试卷</el-button>
        </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name:'StuTest',
    created(){
        this.$http.get('/api/stu/paper',{
            params:{
                action:"show_paper",
                id:this.$bus.paperid
            }
        }).then(({data:res})=>{
            setTimeout(()=>{
                this.loading=false
            },1000)
            this.TMarr=res.Tmlist
            for(let i=0;i<5;i++){
                this.testform.singleChoiceAns.push('')
                this.testform.multipleChoiceAns.push([])
                this.testform.fillBankAns.push('')
                this.singleChoiceCorrList.push(this.TMarr[0].timu[i].anwser)
                this.multipleChoiceCorrList.push(this.TMarr[1].timu[i].anwser)
                this.fillBankCorrList.push(this.TMarr[2].timu[i].anwser)
            }
            for(let j=0;j<15;j++){
                this.checkList.push(false)
            }
        })
    },
    data() {
        return {
            loading:true,
            id:-1,
            testform:{
            singleChoiceAns:[],
            multipleChoiceAns:[],
            fillBankAns:[]
          },
          TMarr:[[],[],[]],
          singleChoiceCorrList:[],
          multipleChoiceCorrList:[],
          fillBankCorrList:[],
          isSubmit:false,
          checkList:[],
          point:0,
          fullscreenLoading:false,
        }
    },
    methods:{
        onSubmit(){
            this.$confirm('是否已检查并确定将答案提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.testform.singleChoiceAns=this.testform.singleChoiceAns.map(value=>value=value[0])
            this.testform.multipleChoiceAns=this.testform.multipleChoiceAns.map(item=>(item.map(value=>value[0])).sort().join(''))
            this.$http.post('/api/stu/paper',{
                params:{
                    action:"submit_anwser",
                    id:this.$bus.paperid,
                    data:{...this.testform}
                }
            }).then(({data:res})=>{
                this.fullscreenLoading=true
                setTimeout(() => {
                this.fullscreenLoading = false;
                this.isSubmit=true
                this.checkList=res.checklist
                for(let i=0;i<15;i++){
                    if(res.checklist[i]){
                        if(i<10) this.point+=5
                        else this.point+=10
                    }
                }
                }, 2000);
            }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          });          
        });
        },

    }
}
</script>

<style scoped lang="less">
    .el-input{
        width: 80%;
    }
    .ans-group{
        position: absolute;
        top: -40px;right: 0;
        display: flex;
        .corrcet{
            color: #52c41a;
        }
        .mistake{
            color: red;
            margin-left: 10px;
        }
    }
    .point{
        font-size: 20px;
        color: red;
        font-weight: 600px;
    }
</style>