<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item><span><i class="el-icon-map-location" style="margin-right:2px;"></i>我的题库</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="current">题目列表</span></el-breadcrumb-item>
    </el-breadcrumb>
      <el-card>
       
        <el-tabs tab-position="left"  @tab-click="handleClick">
          <el-tab-pane 
          v-for="(item,index) in typeList" :key="index" :label="item.type">
        </el-tab-pane>
        <router-view></router-view>
      </el-tabs>
      </el-card>
  </div>
  
</template>

<script>


export default {
    props:['id'],
    created(){
      this.$http.get('/api/bank/inbank/',{
          params:{
              choice:'typeSum',
              bankid:this.id,
          }
      }).then(({data:res})=>{
          this.typeList=res.data
          this.showTm(this.typeList[0].type)
      })
      
    },
    data() {
      return {
        typeList:[],
        type:''
      }
    },
    methods: {
    //   getALLPaper(){
    //     this.$http.get('/api/tch/paper',{
    //       params:{
    //         action:"show_all_papers",
    //         pageNum:this.pageNum,
    //         pageSize:this.pageSize
    //       }
    //     }).then(({data:res})=>{
    //         this.total=res.total
    //         this.paperList=res.paperList
    //     })
    //   },
      // handleClick({name:id}){
      //   this.isNotClicked=false
      //   this.$http.get('api/tch/paper',{
      //   params:{
      //     action:"show_one_paper",
      //     id,
      //   }
      // }).then(({data:res})=>{
      //   this.TMarr=res.Tmlist
      // }).catch(({response:res})=>{this.$message.error(res.statusText||"请求失败")})
      // },
      handleClick({label:type}){
        this.showTm(type)
      },
      showTm(type){
        let path='/bank/'
        if(type==='单选题'||type==='判断题') path+='single'
        else if(type==='多选题'||type==='不定项选择题') path+='multiple'
        else if(type==='填空题'||type==='简答题') path+='fillbank'
        this.type=type
        this.$router.push({
          path,
          query:{
            type,
            id:this.id
          }
        })
      }
    //   createPaper(){
    //     this.$http.get('api/tch/paper',{
    //       params:{
    //         action:"createNullPaper",
    //         name:this.addPaperForm.papername
    //       }
    //     }).then(({data:res})=>{
    //       this.$bus.paperid=res.id
    //       console.log(this.isRandom);
    //       if(!this.isRandom) return this.$router.push('/single')
    //       this.$http.get('api/tch/paper',{
    //         params:{
    //           action:"draw_questions",
    //           id:this.$bus.paperid
    //         }
    //       }).then(({data:res})=>{
    //         this.addDialogVisible=false
    //         this.getALLPaper()
    //         return this.$message.success(res.msg)
            
    //       })
    //     })

    //   },
    //   closeForm(){
    //     this.addPaperForm.papername=''
    //     this.isCreatePaper=false
    //   },
    //   goTest(paperid){
    //     this.$bus.paperid=paperid
    //     this.$router.push('/test')
    //   },
    //   handleSizeChange(newSize){
    //     this.pageSize=newSize
    //     this.getALLPaper()
    // },
    // handleCurrentChange(newPage){
    //   this.pageNum=newPage
    //   this.getALLPaper()
    // }
    },
}
</script>

<style scoped lang="less">
</style>