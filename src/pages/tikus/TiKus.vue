<template>
  <div class="shiti">
    <el-card>
        <el-row slot="header">  
            <el-col :span="5">
                <el-button type="primary" style="border-radius:0;">免费题库</el-button>
            </el-col>
        </el-row>
        <ul class="item-box">
            <li class="item" v-for="item in List" :key="item.id">
                <el-row>
                    <el-col :span="3" :offset="1">
                        <img src="https://static.zaixiankaoshi.com/img/6848373.png" alt="">
                    </el-col>
                    <el-col :span="14">
                        <div>{{item.name}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div><i class="el-icon-star-off"></i>收藏</div>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary"  @click="showTimu(item.id)">查看详情</el-button>
                    </el-col>
                </el-row>
            </li>
        </ul>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total">
            </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
    props:['tkname','author'],
    created(){
        if(!this.author&&!this.tkname)this.getAllTk()
    },
    data() {
        return {
            List:[],
            total:0
        }
    },
    computed:{
        userid(){
            return this.$store.state.userinfo.userid
        }
    },
    watch:{
        author:{
            immediate:true,
            handler(value){
                if(value) this.getTkbyAuthor()
            }
        },
        tkname:{
            immediate:true,
            handler(value){
                if(value) this.getTkbyTkname()
            }
        }
    },
    methods:{
        getAllTk(){
            this.$http.get('/api/bank/mybank/',{
                params:{
                    choice:'all',
                    userid:this.userid,
                    pageSize:5,
                    pageNum:1
                }
            }).then(({data:res})=>{
                this.total=res.sum
                this.List=res.data
            })
        },
        getTkbyTkname(){
            this.$http.get('/api/bank/mybank/',{
                params:{
                    choice:'search',
                    userid:this.userid,
                    keyword:this.tkname,
                    pageSize:5,
                    pageNum:1
                }
            }).then(({data:res})=>{
                this.total=res.sum
                this.List=res.data
            })
        },
        getTkbyAuthor(){
            this.$http.get('/api/bank/mybank/',{
                params:{
                    choice:'author',
                    userid:this.userid,
                    keyword:this.author,
                    pageSize:5,
                    pageNum:1
                }
            }).then(({data:res})=>{
                this.total=res.sum
                this.List=res.data
            })
        },
        showTimu(bankid){
            this.$router.push({
                path:'/tk/detail/',
                query:{
                    bankid
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .shiti{
        margin-top: 10px;
        padding: 0 100px;
        height: 100vh;
        .el-card{
            width: 100%;
            height: 100%;
            .item-box{
                padding: 0;
                border: 1px solid #ccc;
                .item{
                    height: 88px;
                    line-height: 88px;
                    border: 1px dashed #eee;
                    &:hover{
                        border: 1px solid #2c72ff;
                        cursor: pointer;
                    }
                    i{
                        margin-right: 3px;
                    }
                    .el-button{
                        font-size: 16px;
                    }
                }
            }
            .el-pagination{
            display: flex;
            justify-content: center;
        }
        }
    }
</style>