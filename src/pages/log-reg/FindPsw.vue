<template>
  <div class="box" style="width:100vw;">
        <el-card shadow="hover" style="width:390px">
            <div slot="header" class="clearfix card_head">
                <h3>找回密码</h3>
            </div>
            <el-form ref="FindPswForm"  :rules="LoginRules" :model="FindPswForm" :hide-required-asterisk="true">
                <el-form-item prop="phonenum">
                    <el-input class="el-icon-phone" v-model="FindPswForm.phonenum"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="el-icon-lock" v-model="FindPswForm.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="newpsw">
                    <el-input class="el-icon-lock" v-model="FindPswForm.newpsw" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" class="login_btn" @click="submitForm('FindPswForm')" style="width:350px">修改密码</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            FindPswForm:{
                phonenum:'',
                password:'',
                newpsw:''
            }
        }
    },
}
</script>

<style></style>