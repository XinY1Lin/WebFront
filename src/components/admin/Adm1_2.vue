<template>
  <div style="width:1100px">
  <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:5px">
    <el-select
          v-model="deptSelected"
          @change="deptSelect"
          placeholder="请选择学院"
          style="width: 150px"
          size="small"
        >

          <el-option value="软件学院"></el-option>
          <el-option value="数学学院"></el-option>
        </el-select>
  <el-col :span="15">
    <el-input v-model="search" placeholder="请输入搜索内容"  size="small">
        <el-button slot="append" icon="el-icon-search" @click="searchOk">搜索</el-button>
    </el-input>
  </el-col>
     <el-button type="primary" size="small" @click="addTeaBtn" icon="el-icon-user">添加教师</el-button>
     <el-button type="primary" plain size="small" @click="dialogUploadVisible = true" icon="el-icon-folder-add">导入教师</el-button>
  </el-row>

  <div style="background-color:#eff1f2;padding:5px;border-radius: 2px;">
  <el-table
    :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    v-loading="loading"
    border
    stripe
    style="width: 100%"
    :header-row-style="{height:0+'px'}"
    :header-cell-style="{padding:0+'px'}"
    :row-style="{height:'20px'}"
    :cell-style="{padding:'2px'}">
    <el-table-column type="index" label="序号" width="59">
    </el-table-column>
    <el-table-column prop="teacherNo" label="工号" width="110">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="150">
    </el-table-column>
    <el-table-column prop="gender" label="性别" width="50">
    </el-table-column>
    <el-table-column prop="birth" label="出生日期" width="150">
    </el-table-column>
    <el-table-column prop="department" label="学院" width="180">
    </el-table-column>
    <el-table-column prop="title" label="职称" width="100">
    </el-table-column>
    <el-table-column prop="idCard" label="身份证号" width="200">
    </el-table-column>
    <el-table-column prop="political" label="政治面貌" width="120">
    </el-table-column>
    <el-table-column prop="degree" label="学历" width="100">
    </el-table-column>
    <el-table-column prop="telephone" label="电话号码" width="120">
    </el-table-column>
    <el-table-column prop="direction" label="研究方向" width="120">
    </el-table-column>

    <el-table-column prop="teaCourse" label="讲授课程" width="120">
    </el-table-column>
    <el-table-column prop="book" label="论文著作" width="120">
    </el-table-column>
    <el-table-column fixed="right" prop="operate" label="操作" width="150">
      <template slot-scope="scope">
          <el-button size="mini" plain type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" plain type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>

  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="pageSize"
  :total="totalCount"
  :current-page="currentPage"
  @current-change="handleCurrentChange"
  style="text-align:center">
  </el-pagination>

  <el-dialog title="基本信息" :visible.sync="dialogFormVisible" :close-on-click-modal=false width="60%">
  <el-form :model="form" :rules="rules"  ref="form">
    <el-form-item>
      <el-col :span="8">
        <el-form-item prop="teacherNo" label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.teacherNo" autocomplete="off" :disabled="isDisabled" maxlength="9" show-word-limit></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="name" label="姓名" :label-width="formLabelWidth" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
        <el-form-item label="出生日期" :label-width="formLabelWidth" >
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 200px">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="idCard" label="身份证号" :label-width="formLabelWidth" >
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="telephone" label="电话号码" :label-width="formLabelWidth" >
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="form.degree" placeholder="请选择">
            <el-option value="本科"></el-option>
            <el-option value="硕士"></el-option>
            <el-option value="博士"></el-option>
            <el-option value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="政治面貌" :label-width="formLabelWidth">
          <el-select v-model="form.political" placeholder="请选择">
            <el-option value="群众"></el-option>
            <el-option value="共青团员"></el-option>
            <el-option value="入党积极分子"></el-option>
            <el-option value="共产党员"></el-option>
            <el-option value="其他党派"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="职称" :label-width="formLabelWidth">
          <el-select v-model="form.title" placeholder="请选择">
            <el-option label="助教" value="助教"></el-option>
            <el-option label="讲师" value="讲师"></el-option>
            <el-option label="副教授" value="副教授"></el-option>
            <el-option label="教授" value="教授"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="10">
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="form.department" placeholder="请选择">
           
           <el-option value="软件学院"></el-option>
           <el-option value="数学学院"></el-option>
           
         </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label="研究方向" :label-width="formLabelWidth">
          <el-input v-model="form.direction" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="10">
        <el-form-item label="讲授课程" :label-width="formLabelWidth">
          <el-input v-model="form.teaCourse" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label="论文著作" :label-width="formLabelWidth">
          <el-input v-model="form.book" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTeacherData" :style="{display: this.visible1}">提交</el-button>
    <el-button type="primary" @click="editOk" :style="{display: this.visible2}">修改</el-button>
  </div>
</el-dialog>

<el-dialog title="上传文件" :visible.sync="dialogUploadVisible" :close-on-click-modal=false>
  <el-upload
  class="upload-demo"
  ref="upload"
  multiple="false"
  accept=".xls,.xlsx"
  action="http://localhost:8080/teaAdmin/upload"
  with-credentials="true" 
  :on-success="handleAvatarSuccess"
  :file-list="fileList"
  :on-change="changeMe"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">上传表格文件</div>
</el-upload>
</el-dialog>
</div>
</template>

<script>
import {getCookie} from '../global/cookie'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
  export default {
    data() {
      return {
        deptOptions:[],
        deptSelected: '',
        search: '',

        tableData:[],//目前前端所拥有的所有课程信息

        pageSize:17,
        currentPage:1,
        totalCount:1,

        dialogFormVisible: false,
        form: {
          teacherNo: '',
          name: '',
          gender:'',
          birth: '',
          degree: '',
          idCard: '',
          telephone: '',
          political: '',
          department: '',
          title: '',
          direction:'',
          book:'',
          teaCourse:'',
        },
        rules: {
        teacherNo: [{
        required: true,
        message: "学号不能为空",
        trigger: "blur"
        },{
       pattern: /^((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{5}$/ ,
        message: "请输入正确的工号", 
        trigger: 'blur' 
    }],
        name: [{
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
        }],
        telephone: [{
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
    }],
        idCard: [{
        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: "请输入正确的身份证号",
        trigger: "blur"
    }],
      },
        formLabelWidth: '80px',
        visible2:'none',
        visible1:'inline',
        isDisabled:false,

        dialogUploadVisible: false,
        fileList:[]
      }
    },
    computed:{
      tables () {
        const search = this.search
        if (search) {
          return this.tableData.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    methods:{
      
      submitUpload() {
        this.$refs.upload.submit();
      },
      changeMe(file,fileList){
        this.fileList=fileList;
      },
      handleAvatarSuccess(response, file, fileList){
        var success = response.datas.success
        var total = response.datas.totalNum
        var failed = response.datas.failed
        alert("导入成功，共添加"+total+"条，成功"+success+"条，失败"+failed+"条");
      },

      getDptName(){
        this.$axios
        .get('/dpt/getDptName', {})
        .then((result)=> {
            if (result.data.code === 1) {//返回第一页数据，和
              this.deptOptions = result.data.datas
              this.deptSelected = result.data.datas[0].id
            }else{
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },
      deptSelect(){
        if(this.gradeSelected == ""){
          return
        }
        this.getTableData()
      },

      getTableData(){
        if(this.deptSelected == ""){
          return
        }
        this.$axios
        .post('/teaBasicInfo/getInfoTable', { 
          dpt:this.deptSelected
        })
        .then((result)=> {
            if (result.data.code === 1) {//返回第一页数据，和
              this.totalCount = result.data.datas.length
              this.tableData = result.data.datas.teaBasicInfo
            }else{
              alert(result.data.msg)
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },
      getTableData1(){
       
        this.$axios
        .post('/teaBasicInfo/getInfoTable', { 
          
        })
        .then((result)=> {
            if (result.data.code === 1) {//返回第一页数据，和
              this.totalCount = result.data.datas.length
              this.tableData = result.data.datas.teaBasicInfo
            }else{
              alert(result.data.msg)
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },

      addTeaBtn(){
        this.form.teacherNo = ""
        this.form.name = ""
        this.form.gender = ""
        this.form.birth = ""
        this.form.degree = ""
        this.form.idCard = ""
        this.form.telephone = ""
        this.form.political = ""
        this.form.department = ""
        this.form.title = ""
        this.form.direction=""
        this.form.teaCourse=""
        this.form.book=""
        this.dialogFormVisible = true 
        this.visible2 = 'none'
        this.visible1 = 'inline'
        this.isDisabled=false
      },
      //添加教师
      addTeacherData(){
        // if(this.form.workTime[0]==this.form.workTime[1]){
        //   this.form.workTime=this.form.workTime[0]+"至今"
        // }else{
        //   this.form.workTime=this.form.workTime[0]+"至"+this.form.workTime[1]
        // }
        this.$axios
        .post('/teaBasicInfo/add', this.form)
        .then((result)=> {
            if (result.data.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.getTableData();
            }else{
              this.$message({
                type: 'error',
                message: result.data.msg
              });
            }
            this.dialogFormVisible = false
        })
        .catch((error)=> {
            alert(error)
        })
      },

      handleEdit(index,row){
        // var wkt = []
        // let len = row.workTime.length
        // if(len==9){
        //   wkt[0] = row.workTime.substr(0,7)
        //   wkt[1] = wkt[0]
        // }else{
        //   wkt[0] = row.workTime.substr(0,7)
        //   wkt[1] = row.workTime.substr(len-7,len-1)
        // }
          this.form.teacherNo = row.id
          this.form.name = row.name
          this.form.gender = row.sex
          this.form.birth = row.birth
          this.form.degree = row.degree
          this.form.idCard = row.idCard
          this.form.telephone = row.telephone
          this.form.political = row.political
          this.form.department = this.deptSelected
          this.form.title = row.title
          this.form.direction = row.direction
          this.form.teaCourse = row.teaCourse
          this.form.book = row.book
          this.visible1 = 'none'
          this.visible2 = 'inline'
          this.isDisabled=true
          this.dialogFormVisible = true
      },
      editOk(){
        // if(this.form.workTime[0]==this.form.workTime[1]){
        //   this.form.workTime=this.form.workTime[0]+"至今"
        // }else{
        //   this.form.workTime=this.form.workTime[0]+"至"+this.form.workTime[1]
        // }
        this.$axios
        .post('/teaBasicInfo/update', this.form)
        .then((result)=> {
            if (result.data.code == 1) {//返回第一页数据，和
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.getTableData();
            }else{
              this.$message({
                type: 'error',
                message: result.data.msg
              });
            }
            this.dialogFormVisible = false
        })
        .catch((error)=> {
            alert(error)
        })
      },

      handleDelete(index,row){
        this.$confirm('确定删除'+row.name+'吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
          .post('/teaBasicInfo/delete', {
            teacherNo:row.teacherNo
          })
          .then((result)=> {
            if (result.data.code === 1) {
              this.getTableData();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: result.data.msg
              });
            }
          }).catch((error)=> {
            alert(error)
          })
        }).catch(() => {});
      },

      handleCurrentChange(val) {
        this.currentPage = val
      }
    },
    watch: {
      deptSelected: function () {
        this.$nextTick(function () {
          this.getTableData();
        })
      }
    },
    created(){
      this.getTableData();
      this.getTableData1()
    }
  }
</script>