<template>
   <div class="paper">
      <div class="question-box">
        <el-row style="margin-bottom:40px">
            <el-col :span="3">
                <span>{{info.type}}</span>
            </el-col>
            <el-col :span="10">
                <p>{{info.topic}}</p>
            </el-col>
        </el-row>
        <el-form label-width="70px">
            <template v-if="info.type==='单选题'||info.type==='判断题'">
                <el-form-item>
                    <el-radio-group>
                        <el-radio :label="option(index)+'  '+item" v-for="item,index in info.option" :key="index"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </template>
            <template v-else-if="info.type==='多选题'||info.type==='不定项选择题'">
                <el-form-item>
                <el-radio-group>
                    <el-radio :label="option(index)+'  '+item" v-for="item,index in info.option" :key="index"></el-radio>
                </el-radio-group>
            </el-form-item>
            </template>
           <template v-else-if="info.type==='填空题'||info.type==='简答题'">
                <el-form-item>
                    <el-input  v-if="info.type==='填空题'"></el-input>
                    <el-input type="textarea" v-else></el-input>
                </el-form-item>
           </template>
        </el-form>
      </div>
  </div>
</template>

<script>

export default {
    props:['info'],
    methods:{
        option(i){
            return String.fromCharCode(i+'A'.charCodeAt())
        }
    }
}
</script>

<style lang="less" scoped>
    .paper{
      width: 890px;
      padding: 20px;
      background: white;
      .question-box{
          padding: 15px 0;
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