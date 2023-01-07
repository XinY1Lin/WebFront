<template>
    <div class="changePT" style="height:250">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
      <el-form-item label="原密码：" prop="oldPass">
        <el-input v-model="userForm.oldPass" show-password></el-input>
      </el-form-item>
      
       <el-form-item label="新密码：" prop="password">
        <el-input type="password" v-model="userForm.password" show-password></el-input>
      </el-form-item>
      <div class="progress-bar_wrap">
      <password_strength
        v-model="userForm.password"
        style="padding-top: 0px"
      ></password_strength>
    </div>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="userForm.checkPass" show-password></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')" style="width:300px">确认</el-button>
      </el-form-item>
    </el-form>
    </div>
    </template>
    
    <script>
    import {getCookie} from '../global/cookie'
    import md5 from "js-md5"
    import password_strength from '../login/password_strength.vue';
      export default {
        data() {
            var validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
            userForm: {
                oldPass:'',
                password:'',
                checkPass:'',
                password_strength: '',
            },
            
           
            rules: {
                oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }]
            }
          };
        }, components: {
    password_strength: password_strength,
  },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if(this.userForm.oldPass){
                if (valid) {
                    this.$axios
                    .post('/pwd/changePwd', { 
                        // oldPass:md5(this.userForm.oldPass),
                        // password:md5(this.userForm.password),
                        // checkPass:md5(this.userForm.checkPass)
                        oldPass:this.userForm.oldPass,
                        password:this.userForm.password,
                        checkPass:this.userForm.checkPass
                    })
                    .then((result)=> {
                        // console.log(password)
                    if (result.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '密码已修改'
                        });
                    }else{
                        this.$message({
                            type: 'info',
                            message: result.data.msg
                        });
                        return false;
                    }
                    })
                    .catch((error)=> {
                        alert(error)
                    })
                } else {
                    alert('请检查输入');
                    return false;
                }
            }
            })
          }
        }
      }
    </script>