<template>
  <el-container>
    <div class="block">
        <el-carousel trigger="click" arrow="never">
          <el-carousel-item v-for="(item,index) in info" :key="index">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
    </div>
    <el-menu router class="el-menu-demo" mode="horizontal">
      <el-menu-item :index="'/'+item.path"  v-for="(item,index) in navList" :key="index">
        <img :src="item.img">
        <div>
          <h5>{{item.title}}</h5>
          <p>{{item.detial}}</p>
        </div>
      </el-menu-item>
    </el-menu>
    <div class="test-container">
      <h2 class="test-title">
        <img src="https://static.zaixiankaoshi.com/img/bbfdcd8.png" alt="">
        在线刷题 多种练习方式
        <img src="https://static.zaixiankaoshi.com/img/a9914d8.png" alt="">
      </h2>
      <div class="test-item-box">
      <div v-for="(item,index) in testList" :key="index">
        <img :src="item.img">
        <p>{{item.text}}</p>
      </div>
    </div>
    </div>
  </el-container>
</template>

<script>
export default {
    name:'WelCome',
    data(){
      return{
        info:["欢迎来到在线题库测试系统","永久免费，在线刷题平台","上传题库","多种考试题库","提交答案，自动判分"],
        navList:[
          {
            img:"https://resource.zaixiankaoshi.com/pc/class/sctk_sctk.png",title:'上传题库',detial:'快速上传自己的题库',path:"upload"
          },
          {
            img:"https://resource.zaixiankaoshi.com/pc/class/sctk_fqks.png",title:'发起考试',detial:'编辑试卷,发布考试',path:"exam"
          },
          {
            img:"https://resource.zaixiankaoshi.com/pc/class/sctk_ssst.png",title:'搜索试题',detial:'快速搜索试题、答案解析',path:'tks'
          },
          {
            img:"https://resource.zaixiankaoshi.com/pc/class/sctk_wxxcx.png",title:'在线测试',detial:'在线刷题,多种练习方式',path:'currenttest'
          }
        ],
        testList:[
          {img:'https://static.zaixiankaoshi.com/img/2023e9b.png',text:'顺序练习'},
          {img:'https://static.zaixiankaoshi.com/img/58be7d7.png',text:'随机练习'},
          {img:'https://static.zaixiankaoshi.com/img/acad695.png',text:'背题模式'},
          {img:'https://static.zaixiankaoshi.com/img/560b9cb.png',text:'全真练习'},
          {img:'https://static.zaixiankaoshi.com/img/21d8471.png',text:'随机抽题 模拟考试'},
          {img:'https://static.zaixiankaoshi.com/img/70c1a01.png',text:'章节练习'},
          {img:'https://static.zaixiankaoshi.com/img/b115ca7.png',text:'题型练习'},
          {img:'https://static.zaixiankaoshi.com/img/6eba971.png',text:'错题/收藏练习'}
        ]
      }
    },
   
}
</script>

<style lang="less" scoped>
  .el-container{
    margin-top: 80px;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    .block{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-carousel{
      width: 100%;
      height: 400px;
      background: #2c72ff;
    }
  }
  .el-carousel__item {
    height: 100%;
    background: #2c72ff;
    h3 {
      line-height: 550px;
      color: white;
      font-size: 28px;
      opacity: 0.75;
      margin: 0;
      text-align: center;
    }
}
  .el-menu{
    background: #f2f8ff;
    width: 1485px;
    padding: 0 160px;
    .el-menu-item{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0;
      padding: 10px 20px;
      width: 290px;
      height: 100%;
      h5{
        margin-top: 10px;
      }
      p{
        height: 30px;
        line-height: 30px;
      }
    }
  }

  .test-container{
    background: white;
    .test-title{
    text-align: center;
    margin: 20px 0;
    color: #1a8cff;
    font-weight: 600;
   }
   .test-item-box{
    
    padding: 10px 160px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items:center;
      width: 230px;
      height: 230px;
      margin: 20px 10px;
      box-shadow: 5px 5px 24px 0 rgb(26 140 255/20%);
      transition: all .4s;
      &:hover{
        box-shadow: 10px 10px 24px 10px rgb(26 140 255/20%);
        transform: translateY(-10px);
      }
      p{
        margin-top: 10px;
      }
    }
  }

  }
   
 
  }
  
</style>