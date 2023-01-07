<template>
    <div class="changeEmail" style="height:200">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item prop="email" label="新邮箱地址：">
                <el-input
                v-model="userForm.email"
                autocomplete="off">
                </el-input>
            </el-form-item>
        
            <el-form-item>
                <el-input v-model="userForm.emailCode" maxlength="6" placeholder="验证码" style="width: 125px"></el-input> 
                <el-button type="primary" round style="margin-left:10px;width:145px" @click="getEmailCode()" :disabled="getCodeBtnDisable">{{codeBtnWord}}</el-button>
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')" style="width:300px">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
    
    <script>
    import {getEmailCode} from "@/axios";
    import {getCookie} from '../global/cookie'
      export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱号不能为空'));
                } else {
                    if(value === ""){
                        if(!this.emailReg.test(value)){
                            callback(new Error("请输入正确的邮箱"))
                            return
                        }
                    }callback();
                }
            };
            var validateEmailCode = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入验证码"));
                } else {
                    callback();
                }
            };
            return {
            userForm: {
                user:'',
                email:'',
                emailCode:''
            },
            rules: {
                email: [{required: false},{ validator: validateEmail, trigger: "blur" }],
                emailCode: [{required: false},{ validator: validateEmailCode, trigger: "blur" }],
            },
            codeBtnWord:'获取验证码',
            waitTime:61,
          };
        },
        computed:{
            // 用于校验邮箱格式是否正确
            emailNumberStyle(){
                let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                if(!reg.test(this.userForm.email)){
                    return false
                }
                return true
            },
            getCodeBtnDisable:{
                get(){
                    if(this.waitTime == 61){
                        if(this.emailNumberStyle){
                            return false
                        }  
                    }
                    return true
                },
                set(){}
            }
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                    .post('/checkEmailCode', {
                        email:this.userForm.email,
                        code:this.userForm.emailCode,
                    })
                    console.log(this.userForm.email)
                    console.log(this.userForm.emailCode)
                    .then((result)=> {
                    if (result.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '邮箱号已更换'
                        });
                    }else{
                        this.$message({
                            type: 'info',
                            message: result.data.msg
                        });
                    }
                    })
                    .catch((error)=> {
                        alert(error)
                    })
                } else {
                    this.$message({
                    type: 'error',
                    message: '请检查输入！',
                    });
                }
            })
          },
        getEmailCode(){
          this.$axios
            .post('/sendEmail', { //获取验证码接口
                id:this.userForm.user,
                email:this.userForm.email
            })
            .then((result) => {
            if (result.data.code === 1) {
                this.$message({
                type: 'success',
                message: '验证码已发送，10分钟内有效！',
                });
            } else {
                this.$message({
                type: 'info',
                message: result.data.msg,
                });
            }
            })
            .catch((error) => {
            alert(error);
            });
            let that = this;
            that.waitTime--;
            this.codeBtnWord = `${that.waitTime}s 后重新获取`;
            let timer = setInterval(function () {
                if (that.waitTime > 1) {
                that.waitTime--;
                that.codeBtnWord = `${that.waitTime}s 后重新获取`;
                } else {
                clearInterval(timer);
                that.codeBtnWord = '获取验证码'
                that.waitTime = 61;
                }
            }, 1000);
          },
        }
      }
    </script>