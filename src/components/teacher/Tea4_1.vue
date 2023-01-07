

<template>
  <div class="home" style="width: 1100px">
  
  <!--gutter表示单个el-card之间的间距  -->
  
  <el-row :gutter="1">
  
    <!-- span 默认el-row为24 用span去平分 -->
  
    <el-col :span="12">
  
      <el-card class="box-card1">
        <v-upload class="upload"></v-upload>
        <div class="name-role">
            <span class="sender"><b>TEACHER - {{dataForm.name}}</b></span>  
          </div>
          <div class="registe-info">
            <span class="registe-info">
             <b> NUMBER - {{dataForm.teacherNo}} </b>
            </span>
          </div>
        <el-divider></el-divider>
        <div class="personal-relation" >
          <div class="relation-item" >电话号码:  <div style="float: right; padding-right:30px;">{{dataForm.telephone}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >出生日期:  <div style="float: right; padding-right:30px;">{{dataForm.birth}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >身份证号:  <div style="float: right; padding-right:30px;">{{dataForm.idCard}}</div></div>      
      </div>
      <div class="personal-relation" >
          <div class="relation-item" >学历:  <div style="float: right; padding-right:30px;">{{dataForm.degree}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >政治面貌:  <div style="float: right; padding-right:30px;">{{dataForm.political}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >职称:  <div style="float: right; padding-right:30px;">{{dataForm.title}}</div></div>      
      </div>
      <div class="personal-relation" >
          <div class="relation-item" >学院:  <div style="float: right; padding-right:30px;">{{dataForm.department}}</div></div>
      </div>
  
      </el-card>
      
    </el-col>
  
    <el-col :span="12">
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
                <span style="float: left"><b>学术资料</b></span>
               
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit"
                    style="float:right"
                    round
                  >
                  
                  </el-button>
                  <!-- <el-button
                    type="primary"
                    icon="el-icon-mouse"
                    style="float:right"
                    size="mini"
                    @click="addStuBtn"
                    round
                  >
                  </el-button> -->
              </div>
              <div class="personal-relation" >
          <div class="relation-item" >研究方向:  <div style="float: right; padding-right:30px;">{{teacher.direction}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >讲授课程:  <div style="float: right; padding-right:30px;">{{teacher.teaCourse}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >论文著作:  <div style="float: right; padding-right:30px;">{{teacher.book}}</div></div>      
      </div>
      <el-dialog
      title="学术资料"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="form">
        
        <el-form-item>
          <el-col :span="24">
            <el-form-item label="研究方向" :label-width="formLabelWidth">
              <el-input
                v-model="form.direction"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      <el-form-item>
          
          <el-col :span="24">
            <el-form-item label="讲授课程" :label-width="formLabelWidth">
              <el-input
                v-model="form.teaCourse"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-form-item label="论文著作" :label-width="formLabelWidth">
              <el-input
                v-model="form.book"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addStudentData"
          :style="{ display: this.visible1 }"
          >提交</el-button
        >
        <el-button
          type="primary"
          @click="editOk"
          :style="{ display: this.visible2 }"
          >修改</el-button
        >
      </div>
    </el-dialog>
   
        
      </el-card>
  
      <el-card class="box-card3">
         <div slot="header" class="clearfix">
                <span style="float: left" icon="el-icon-watch"><b>时钟</b></span></div>
  
                <v-clock style="text-align:center"></v-clock>
  
      </el-card>
  
    </el-col>
  
  
  </el-row>
  
  </div>
  </template>
  
  <style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card1 {
      width: 400px;
      height: 750px;
      border-radius: 30px;
    }
    
  
    .box-card2 {
      width: 350px;
      height: 300px;
      border-radius: 30px;
    }
    .box-card3 {
      width: 350px;
      height:400px;
      border-radius: 30px;
    }
    .el-card{
      margin-bottom:20px; 
  
    }
  
    .name-role {
      font-size: 16px;
      padding: 5px;
     text-align:center;
    }
     .sender{
        text-align:center;
      }
  .registe-info{
    text-align: center;
    padding-top:10px;
  }
  .personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
      width: 100%
  }
  
  .relation-item {
    padding: 12px;
  }

  .upload{
    text-align:center;

  }


 
  
  </style>
  
  
  
  <script>
  
  import upload from '../common/Upload.vue'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import clock from "../common/Clock.vue";
  export default {
    components:{
    'v-upload':upload,
    quillEditor,
    'v-clock':clock ,
  },
    data() {
      return {
        // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        // userinfo: userinfo
        dataForm:{
          teacherNo: '',
          name: '',
          birth: '',
          degree: '',
          idCard: '',
          telephone: '',
          political: '',
          department: '',
          title: '',
        },
        teacher:{
          direction:'',
          teaCourse:'',
          book:'',
        },
        
        form:{
          direction:'',
          teaCourse:'',
          book:'',
        },
        content: null,
        visible2: 'none',
      visible1: 'inline',
        dialogFormVisible: false,
        isDisabled: false,
        editorOption: {}
      }
    },
    computed: {
      
    },
    created() {
      this.load()
    },
    methods: {
      // load() {
      //   const username = this.user.username
      //   if (!username) {
      //     this.$message.error("当前无法获取用户信息！")
      //     return
      //   }
      //   this.request.get("/user/username/" + username).then(res => {
      //     this.form = res.data
      //   })
      // },
      getDataForm() {
  
  console.log('enter2')
  
  this.$axios
  .post('/teaBasicInfo/getInfo',{}
    
).then((result) => {

  if (result.data.code === 1) {
    console.log(result);
    this.dataForm = result.data.datas;
  } else {
      return false;
  }
}).catch((error) => {
  console.log("enter4");
      alert(error);
    });


},


//获取学术资料信息
getStudyForm() {
  
  console.log('enter2')
  
  this.$axios
  .post('/teaBasicInfo/getInfo',{}
    
).then((result) => {

  if (result.data.code === 1) {
    console.log(result);
    this.teacher = result.data.datas;
  } else {
      return false;
  }
}).catch((error) => {
  console.log("enter4");
      alert(error);
    });


},

      
    //   addStuBtn() {
    //   this.form.direction = '';
    //   this.form.book = '';
    //   this.form.course = '';
 
    //   this.dialogFormVisible = true;
    //   this.visible2 = 'none';
    //   this.visible1 = 'inline';
    //   this.isDisabled = false;
    // },
    // addStudyData() {
    //   this.$axios
    //     .post('/', this.form)
    //     .then((result) => {
    //       console.log(result);
    //       if (result.data.code === 1) {
    //         //返回第一页数据，和
    //         this.$message({
    //           type: 'success',
    //           message: '修改成功!',
    //         });
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: result.data.msg,
    //         });
    //       }
    //       this.dialogFormVisible = false;
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    // },
    handleEdit(index) {
      this.form.direction = this.teacher.direction;
      this.form.teaCourse = this.teacher.teaCourse;
      this.form.book = this.teacher.book;
      this.visible1 = 'none';
      this.visible2 = 'inline';
      this.isDisabled = true;
      this.dialogFormVisible = true;
    },
    editOk() {
      this.$axios
        .post('/teaBasicInfo/changePartInfo', this.form)
        .then((result) => {
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.$message({
              type: 'success',
              message: '修改成功!',
            });
            this.getStudyForm();
          } else {
            this.$message({
              type: 'error',
              message: result.data.msg,
            });
          }
          this.dialogFormVisible = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
      handleAvatarSuccess(res) {
        // res就是文件的路径
        this.form.avatarUrl = res
      },
      

        
    },
  //   watch: {
  //   deptSelected: function () {
  //     this.$nextTick(function () {
  //       this.getDataForm();
  //     });
  //   },
  // },
  created() {
    // this.getAllClass();
    // this.gradeSelected = this.gradeOptions[2].grade;
    // this.getDptName();
    this.getDataForm();
    this.getStudyForm();
  },
  }
  </script>


