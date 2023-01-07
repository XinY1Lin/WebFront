<template>
    <div id="register" class="register_div">
      
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="70px">
        <el-form-item prop="user" label="用户名" placeholder="请输入用户名">
          <el-input v-model="userForm.user"></el-input>
        </el-form-item>
        <!-- 注册时输入邮箱 -->
        <!-- <el-form-item prop="email" label="邮箱">
            <el-input v-model="emailForm.user"></el-input>
        </el-form-item> -->
  
        <el-form-item label="设置密码" prop="pass" placeholder="请输入密码">
          <el-input
            type="password"
            v-model="userForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
       
  
        <el-form-item prop="email" label="邮箱">
        <el-input
          v-model="userForm.email"
          autocomplete="off">
        </el-input>
      </el-form-item>
  
      </el-form>
  
      <div>
        <el-button
          type="primary"
          @click="submitForm('userForm')"
          style="width: 140px; margin-bottom: 20px"
          class="registersure_span"
          >确认注册</el-button
        >
      </div>
  
      
    </div>
  </template>
  
  <style scoped>
  
  
  .register_div {
    border: 1px;
    border-radius: 5%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin: 300px 0 0 0;
    width: 350px;
    padding: 20px;
    text-align: center;
  }
  .registersure_span {
    margin: 10px 0 20px 0;
  }
  </style>
  
  <script>
  import md5 from 'js-md5';
  
  export default {
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请输入邮箱"));
            } else {
              if(value != ""){
                if(!this.emailReg.test(value)){
                  callback(new Error("请输入正确的邮箱"));
                  return
                }
              }callback();
            }
          };
          
      // var validateTel = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('手机号不能为空'));
      //   } else {
      //     callback();
      //   }
      // };
      // 邮箱判断是否为空
      // var validateEmail = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('邮箱不能为空'));
      //   } else {
      //     callback();
      //   }
      // };
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else {
          callback();
        }
      };
      
      return {
        userForm: {
          user: '',
          email: '',
          pass: '',
          
        },
        codeBtnWord: '获取验证码',
        waitTime: 61,
        rules: {
          user: [{ validator: validateUser, trigger: 'blur' }],
          email: [{required: false},{ validator: validateEmail, trigger: "blur" }],
          
          // tel: [{ validator: validateTel, trigger: 'blur' }],
          // 邮箱规则
          // email: [{ validator: validateEmail, trigger: 'blur'}],
          // vcode: [{ validator: validateVcode, trigger: 'blur' }],
          pass: [{ validator: validatePass, trigger: 'blur' }],
          
        },
      };
    },
    computed: {
      emailNumberStyle(){
                  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                  if(!reg.test(this.userForm.email)){
                      return false
        }
        return true;
      },
      // 用于校验手机号码格式是否正确
      // phoneNumberStyle() {
      //   let reg = /^1[3456789]\d{9}$/;
      //   if (!reg.test(this.userForm.tel)) {
      //     return false;
      //   }
      //   return true;
      // },
      getCodeBtnDisable: {
        get() {
          if (this.waitTime == 61) {
            if (this.emailNumberStyle) {
              return false;
            }
          }
          return true;
        },
        set() {},
      },
    },
    
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query;
          if (query) {
            this.redirect = query.redirect;
            // this.otherQuery = this.getOtherQuery(query);
          }
        },
        immediate: true,
      },
    },
    methods: {
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
          // if (valid) {
          //   this.userForm.pass = this.userForm.pass;
          //   this.userForm.checkPass = this.userForm.checkPass;
            // 提交邮箱
            // this.userForm.email = md5(this.userForm.email)
            this.$axios
              .post('/auth/register', this.userForm)
              .then((result) => {
                if (result.data.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '注册用户成功',
                  });
                  this.userForm = {
                    user: '',
                    email: '',
                    pass: '',
                  }
                //   this.$router.back(-1);
                } else {
                  this.$message({
                    type: 'error',
                    message: result.data.msg,
                  });
                }
              })
              .catch((error) => {
                alert(error);
              });
          // } else {
          //   this.$message({
          //     type: 'error',
          //     message: '请检查输入！',
          //   });
          // }
        // });
      },
  
     
    },
  };
  </script>