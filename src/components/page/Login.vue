<template>
    <div class="login-wrap">
        <div class="login-from">
            <div class="login-title">5G-OTN管理系统登录页面</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data: function(){
            return {
                url: 'login',
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log("loginForm",this.loginForm);
                        this.$axios.post(this.url,this.loginForm).then((res) => {
                            console.log("res",res);
                            localStorage.setItem('token',res.data.token);
                            localStorage.setItem('expire',res.data.expire);
                            localStorage.setItem('username',this.loginForm.username);
                            this.$router.push('/');
                        })
                        .catch(error=>{
                            console.log("error",error);
                            alert("用户名或密码错误");
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/loginbg.jpg);
        background-size: 100%;
    }
    .login-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .login-from{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
</style>