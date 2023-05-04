<template>
    <div class="box" style="width:100vw;">
        <el-card shadow="hover">
            <div slot="header" class="clearfix card_head">
                <h1>
                    <a href="/"><img src="https://static.zaixiankaoshi.com/img/c9f5ceb.png" alt=""></a>
                </h1>
            </div>
            <keep-alive include="MyLogin">
                <router-view></router-view>
            </keep-alive>
        </el-card>
    </div>
</template>

<script>
export default {
    name:"LogReg"
}
</script>

<style></style>