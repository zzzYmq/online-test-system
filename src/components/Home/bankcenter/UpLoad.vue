<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item><span><i class="el-icon-map-location" style="margin-right:2px;"></i>上传题库</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="current">Excel录入试题</span></el-breadcrumb-item>
        </el-breadcrumb>
    <el-card>
       
        <div slot="header" class="clearfix">
            <el-alert type="info" close-text="知道了">
                <span slot="title" class="tip">你需要一个这样的格式模板</span>
            </el-alert>
        </div>
        <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">topic</th>
                <th scope="col">selectA</th>
                <th scope="col">selectB</th>
                <th scope="col">selectC</th>
                <th scope="col">selectD</th>
                <th scope="col">anwser</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>单选</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>以下不是python中的关键字</td>
                <td>raise</td>
                <td>with</td>
                <td>import</td>
                <td>final</td>
                <td>D</td>
            </tr>
            <tr>
                <th>多选</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>关于python语言的表述，正确的是</td>
                <td>python是开源的</td>
                <td>python是收费的</td>
                <td>python是闭源的</td>
                <td>python是免费的</td>
                <td>AD</td>
            </tr>
            <tr>
                <th>填空</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>L=range(100)，取第一到第三个元素</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>list(L[:3])</td>
            </tr>
            <tr>
                <th>结束</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        </table>
        <el-upload
        class="upload-demo"
        action="http://127.0.0.1/api/tch/upload"
        accept=".xlsx,.xls,"
        name="myfile"
        :on-success="uploadSuccess"
        :limit="1">
        <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excle文件</div>
        </el-upload>
    </el-card>
    </div>
</template>

<script>
export default {
    props:['tkid'],
    methods:{
        uploadSuccess(){
            setTimeout(()=>{
                this.$message.success("上传成功！")
            },1000)
        },
    }
}
</script>

<style>
    .tip{
        font-weight: 600;
        font-size: 18px;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>