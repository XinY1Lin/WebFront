<template>
  <div style="width:1100px" class="shadow">
  <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:5px">
    <el-col :span="4">
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
    </el-col>
      <el-col :span="4">
        <el-select v-model="gradeSelected"  @change="gradeSelect" placeholder="请选择年级" style="width:150px" size="small">
            <el-option
            v-for="item in gradeOptions"
            :key="item.grade"
            :label="item.label"
            :value="item.grade">
            </el-option>
        </el-select>
    </el-col>
    
  <el-col :span="9" :offset="1">
    <el-input v-model="search" placeholder="请输入搜索内容"  size="small">
        <el-button slot="append" icon="el-icon-search" @click="searchOk">搜索</el-button>
    </el-input>
  </el-col>
  <el-col :span="8" :offset="1">
     <el-button type="primary" size="small" @click="addCrsBtn" icon="el-icon-notebook-1">添加课程</el-button>
     <el-button type="primary" plain size="small" @click="dialogUploadVisible = true" icon="el-icon-folder-add">导入课程</el-button>
     <el-button type="danger" size="small"  :style="{display: this.visible}" @click="openOrClose">{{this.isOpen==true?"结束选课":"开启选课"}}</el-button>
  </el-col>
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
    <el-table-column prop="courseNo" label="课程编号" width="150">
    </el-table-column>
    <el-table-column prop="courseName" label="课程名称" width="180">
    </el-table-column>
    <el-table-column prop="courseType" label="课程类别" width="150">
    </el-table-column>
    <el-table-column prop="department" label="开设学院" width="200">
    </el-table-column>
    
    <el-table-column prop="term" label="开设学年" width="200">
    </el-table-column>
    <el-table-column prop="overallHour" label="学时" width="100">
    </el-table-column>
    <el-table-column prop="credit" label="学分" width="100">
    </el-table-column>
    <el-table-column prop="teacherName" label="任课教师" width="130">
    </el-table-column>
    <el-table-column prop="area,room" label="地点" width="100">
      <template slot-scope="scope"> {{scope.row.area}}{{scope.row.room}} </template>
    </el-table-column>
    <el-table-column prop="day,time" label="时间" width="100">
      <template slot-scope="scope"> {{scope.row.day}}{{scope.row.time}} </template>
    </el-table-column>
    <el-table-column prop="totalStu" label="课堂容量" width="100">
    </el-table-column>
    <el-table-column  fixed="right" prop="operate" label="操作" width="150">
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

  <el-dialog title="课程开设" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="50%">
  <el-form :model="form" :rules="rules"  ref="form">
    <el-form-item>
      <el-col :span="8">
    <el-form-item prop="courseNo" label="课程编号" :label-width="formLabelWidth">
      <el-input v-model="form.courseNo" type="number" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item prop="courseName" label="课程名称" :label-width="formLabelWidth">
      <el-input v-model="form.courseName" autocomplete="off"></el-input>
    </el-form-item></el-col>
    <el-col :span="8"><el-form-item label="课程类别" :label-width="formLabelWidth">
      <el-select v-model="form.courseType" placeholder="请选择">
        <el-option value="专业必修"></el-option>
        <el-option value="专业选修"></el-option>
        <el-option value="通识必修"></el-option>
        <el-option value="通识选修"></el-option>
      </el-select>
    </el-form-item></el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
       <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="form.department" placeholder="请选择">
           
           <el-option value="软件学院"></el-option>
           <el-option value="数学学院"></el-option>
           
         </el-select>
        </el-form-item>
    </el-col>
    <el-col :span="8">
            <el-form-item label="年级" :label-width="formLabelWidth">
        <el-select
          v-model="form.grade"
          @change="gradeSelect"
          placeholder="请选择"
        >
          <el-option
            v-for="item in gradeOptions"
            :key="item.grade"
            :label="item.label"
            :value="item.grade"
          >
          </el-option>
        </el-select></el-form-item>
      
      </el-col>
      <el-col :span="8">
            <el-form-item label="开课学期" :label-width="formLabelWidth">
        <el-select
          v-model="form.term"
          placeholder="请选择"
        >
        <el-option
          v-for="item in termOptions"
          :key="item.term"
          :label="item.label"
          :value="item.label">
        </el-option>
        <!-- <el-option value="2022-2023第二学期"></el-option> -->
        </el-select></el-form-item>
      
      </el-col>
      
      </el-form-item>

      <el-form-item><el-col :span="6">
        <el-form-item label="课程容量" :label-width="formLabelWidth">
          <el-input v-model="form.totalStu"  autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="课程学分" :label-width="formLabelWidth" >
          <el-input v-model="form.credit" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="课程学时" :label-width="formLabelWidth">
          <el-input v-model="form.overallHour" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item  label="任课教师" :label-width="formLabelWidth">
          <el-input v-model="form.teacherName"  autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
      <el-form-item label="上课地点" label-width="80px">
      <el-select v-model="form.area" placeholder="请选择区域" @change="getAreaSelected" style="width:180px">
        <el-option v-for="item in areaOptions" :key="item.area" :label="item.label" :value="item.area"></el-option>
      </el-select>
      <el-select v-model="form.room" placeholder="请选择教室" style="width:180px;margin-left:10px">
        <el-option v-for  = "item in roomOptions[`${form.area}`]" :key="item.room" :label="item.label" :value="item.area"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上课时间" label-width="80px">
      <el-select v-model="form.day" placeholder="请选择日期" style="width:180px">
          <el-option  value="星期一" ></el-option>
          <el-option value="星期二" ></el-option>
          <el-option value="星期三" ></el-option>
          <el-option value="星期四" ></el-option>
          <el-option value="星期五" ></el-option>
      </el-select>
      <el-select v-model="form.time" placeholder="请选择时间" style="width:180px;margin-left:10px">
          <el-option value="第一节（08:00~09:50）" ></el-option>
          <el-option value="第二节（10:10~12:00）" ></el-option>
          <el-option value="第三节（14:00~15:50）" ></el-option>
          <el-option value="第四节（16:10~18:00）" ></el-option>
          <el-option value="第五节（19:00~20:50）" ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCourseData" :style="{display: this.visible1}">提交</el-button>
    <el-button type="primary" @click="editOk" :style="{display: this.visible2}">修改</el-button>
  </div>
</el-dialog>

<el-dialog title="上传文件" :visible.sync="dialogUploadVisible" :close-on-click-modal=false>
  <el-upload
  class="upload-demo"
  ref="upload"
  multiple="false"
  show-file-list="false"
  accept=".xls,.xlsx"
  action="http://localhost:8080/crsAdmin/upload"
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
import areaOptions from '../global/areaOptions.js'
import roomOptions from '../global/roomOptions.js'

  export default {
    data() {
      return {
        deptOptions:[],
        deptSelected: '',
        gradeSelected:'',
        
        areaOptions:areaOptions,
        roomOptions:roomOptions,
        search: '',


        tableData:[],//目前前端所拥有的所有课程信息

        pageSize:17,
        currentPage:1,
        totalCount:1,

        dialogFormVisible: false,
        isOpen:false,
        visible:'inline',
        form: {
          courseNo:'',
          courseName: '',
          department:'',
          courseType: '',
          grade:'',
          term:'',
          overallHour:'',
          credit:'',
          teacherName:'',
          area:'',
          room:'',
          day:'',
          time:'',
          totalStu:'',
        },
        rules:{
        courseNo: [{
        required: true,
        message: "课程编号不能为空",
        trigger: "blur"
        },{
       pattern: /^(20)(1|2)\d{4}$/ ,
        message: "请输入正确的课程编号", 
        trigger: 'blur' 
    }],
        courseName: [{
        required: true,
        message: "课程名称不能为空",
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
      },
      gradeOptions() {
      let myData = new Date();
      let year1 = myData.getFullYear();
      let month1 = myData.getMonth();
      let options = [];
      if (month1 < 8) {
        year1--;
      }
      for (let i = 0; i < 6; i++) {
        options[i] = {
          grade: year1,
          label: year1 + '级',
        };
        year1--;
      }
      return options;
    },
      termOptions(){
        let myData = new Date()
        var year1 = myData.getFullYear()
        let month1 = myData.getMonth()
        var options = []
        if(month1==0|| month1==1 ){
          // options[0] = {
          //   term:(year1-1)+"2",
          //   label:(year1-1)+'-'+year1+'第一学期',
          //   value:(year1-1)+'-'+year1+'第一学期',
          // },
          options[0]={
            term:(year1-1)+"1",
            label:(year1-1)+'-'+year1+'第二学期',
            value:(year1-1)+'-'+year1+'第二学期',
          }
        }else if(month1>=2&&month1<=7){
          // options[0] = {
          //   term:(year1+1)+"1",
          //   label:(year1-1)+'-'+year1+'第二学期',
          //   value:(year1-1)+'-'+year1+'第二学期'
          // },
          options[0]={
            term:(year1+1)+"2",
            label:year1+'-'+(year1+1)+'第一学期',
            value:year1+'-'+(year1+1)+'第一学期',
          }
        }else{
          // options[0] = {
          //   term:(year1)+"1",
          //   label:year1+'-'+(year1+1)+'第一学期',
          //   value:year1+'-'+(year1+1)+'第一学期',
          // },
          options[0]={
            term:(year1)+"2",
            label:year1+'-'+(year1+1)+'第二学期',
            value:year1+'-'+(year1+1)+'第二学期',
          }
        }
        
        return options
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
      gradeSelect() {
      if (this.deptSelected == '') {
        return;
      }
      // console.log(this.deptSelected)
      this.getTableData();
    },

    getTableData1(){
        
        this.$axios
        .post('/course/listCourse', { 
          
        })
        .then((result)=> {
            if (result.data.code === 1) {//返回第一页数据，和
              this.totalCount = result.data.datas.length
              this.tableData = result.data.datas.course
            }else{
              alert(result.data.msg)
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },

      //根据条件请求某一页数据
      getTableData(){
        if(this.deptSelected == "" || this.gradeSelected == ''){
          return
        }
        this.$axios
        .post('/course/listCourse', { 
          dpt:this.deptSelected,
          grade: this.gradeSelected,
        })
        .then((result)=> {
            if (result.data.code === 1) {//返回第一页数据，和
              this.totalCount = result.data.datas.length
              this.tableData = result.data.datas.course
            }else{
              alert(result.data.msg)
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },

      addCrsBtn(){
        this.form.courseNo = ""
        this.form.courseName = ""
        this.form.department = ""
        this.form.grade=""
        this.form.teacherName=""
        this.form.room=""
        this.form.area=""
        this.form.day=""
        this.form.time=""
        this.form.term=""
        this.form.totalStu=""
        this.form.overallHour = ""
        this.form.courseType = ""
        this.form.credit = ""
        this.dialogFormVisible = true 
        this.visible2 = 'none'
        this.visible1 = 'inline'
        this.isDisabled=false
      },

      addCourseData(){
        this.$axios
        .post('/course/addCourse', this.form)
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
          this.form.courseNo = row.courseNo
          this.form.courseName = row.courseName
          this.form.department = this.deptSelected
          this.form.grade=this.gradeSelected
          this.form.term= row.term
          this.form.teacherName=this.teacherName
          this.form.area = row.area
          this.form.room = row.room
          this.form.day = row.day
          this.form.time = row.time
          this.form.totalStu = row.totalStu
          this.form.overallHour = row.overallHour
          this.form.courseType = row.courseType
          this.form.credit = row.credit
          this.visible1 = 'none'
          this.visible2 = 'inline'
          this.isDisabled=true
          this.dialogFormVisible = true
      },

      editOk(){
        this.$axios
        .post('/course/updateCourse', this.form)
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
        this.$confirm('确定删除'+row.courseName+'吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
          .post('/course/deleteCourse', {
            courseNo:row.courseNo
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
      openOrClose(){
        this.$confirm('确定'+(this.isOpen==true?"结束选课":"开启选课")+'吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
          .post('/course/openOrCloseCourse', {})
          .then((result)=> {
            if (result.data.code === 1) {
              this.$message({
                type: 'success',
                // message: result.data.msg
                message: (this.isOpen==true?"结束选课":"开启选课")+'成功'
              });
              this.isOpen = !this.isOpen
            }else{
              return false;
            }
          })
        }).catch(() => {});
      },
      loadButton(){
        this.$axios
        .post('/course/loadButton', {})
        .then((result)=> {
          if (result.data.code === 1) {
            this.isOpen = result.data.datas.isOpen==1? true: false
            // this.visible = result.data.datas.isOpen==1? 'none': 'inline'
          }else{
            return false;
          }
        })
        .catch((error)=> {
            alert(error)
        })
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
      this.loadButton();
    this.getTableData();
    this.getTableData1()
    }
  }
</script>