<template>
   <el-card class="box-card mistake-pre">
            <div slot="header" class="clearfix">
                <h6 class="title">错题预览</h6>
            </div>
            <ul id="timu-items">
                <router-link :to="{
                    path:'/preview',
                    query:{
                        info:{
                            type:'简答题',topic:'1+1'
                        }
                    }
                }">
                    <li>
                        <span>单选题</span>
                        <p>？？？</p>
                    </li>
                </router-link>
            </ul>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </el-card>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.title{
    font-weight:600;
    margin-top: 10px;
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
</style>