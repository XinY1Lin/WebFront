<template>
    <div style="width: 1100px">
      <el-row type="flex" justify="space-between" style="margin-bottom: 5px">
        <!-- <el-col :span="3">
          <el-select
            v-model="deptSelected"
            @change="deptSelect"
            placeholder="请选择学院"
            style="width: 150px"
            size="small"
          > -->
            <!-- <el-option
              v-for="item in deptOptions"
              :key="item.departmentNo"
              :label="item.department"
              :value="item.departmentNo"
            >
            </el-option> -->
  
            <!-- <el-option value="软件学院"></el-option>
            <el-option value="数学学院"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="gradeSelected"
            @change="gradeSelect"
            placeholder="请选择年级"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.grade"
              :label="item.label"
              :value="item.grade"
            >
            </el-option>
          </el-select>
        </el-col> -->
        <el-col :span="8">
          <el-input v-model="search" placeholder="请输入搜索内容" size="small">
            <el-button slot="append" icon="el-icon-search" @click="searchOk"
              >搜索</el-button
            >
          </el-input>
        </el-col>
        <!-- <el-button
          type="primary"
          size="small"
          @click="addStuBtn"
          icon="el-icon-mouse"
          >添加互评</el-button
        >
        <el-button
          type="primary"
          plain
          size="small"
          @click="dialogUploadVisible = true"
          icon="el-icon-folder-add"
          >导入互评</el-button
        > -->
      </el-row>
  
      <div style="background-color: #eff1f2; padding: 5px; border-radius: 2px">
        <el-table
          id="tableId"
          :data="
            tables.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          v-loading="loading"
          border
          stripe
          style="width: 100%"
          :header-row-style="{ height: 0 + 'px' }"
          :header-cell-style="{ padding: 0 + 'px' }"
          :row-style="{ height: '20px' }"
          :cell-style="{ padding: '2px' }"
        >
          <el-table-column type="index" label="序号" width="59">
          </el-table-column>
          <el-table-column prop="evaluateName" label="评价者" width="200">
          </el-table-column>
          <el-table-column prop="evaluatedName" label="被评价者" width="200">
          </el-table-column>
          <el-table-column prop="tag" label="评价标签" width="300">
          </el-table-column>
          <el-table-column prop="content" label="评价内容" width="400">
          </el-table-column>
          
          
          <el-table-column fixed="right" prop="operate" label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                plain
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              > -->
              <el-button
                size="mini"
                plain
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
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
        style="text-align: center"
      >
      </el-pagination>
  
      <el-dialog
        title="学生互评"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="50%"
      >
        <el-form :model="form" :rules="rules"  ref="form">
          
          <el-form-item>
            <el-col :span="10">
              <el-form-item prop="evaluateName" label="评价者" :label-width="formLabelWidth">
                <el-input
                  v-model="form.evaluateName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="evaluatedName" label="被评价者" :label-width="formLabelWidth">
                <el-input v-model="form.evaluatedName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="10">
              <el-form-item label="标签" :label-width="formLabelWidth">
                <el-input
                  v-model="form.tag"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input
                  v-model="form.content"
                  autocomplete="off"
                ></el-input>
          </el-form-item>
          </el-col></el-form-item>
          <el-form-item>
            <el-col :span="10">
              <el-form-item label="学院" :label-width="formLabelWidth">
                <el-select v-model="form.department" placeholder="请选择">
                  <!-- <el-option
                    v-for="item in deptOptions"
                    :key="item.departmentNo"
                    :label="item.department"
                    :value="item.departmentNo"
                  > -->
                  <!-- </el-option> -->
                  <el-option value="软件学院"></el-option>
                  <el-option value="数学学院"></el-option>
                  
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
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
          </el-col></el-form-item>
          
          
        
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
  
      <el-dialog
        title="上传文件"
        :visible.sync="dialogUploadVisible"
        :close-on-click-modal="false"
      >
        <el-upload
          class="upload-demo"
          ref="upload"
          multiple="false"
          accept=".xls,.xlsx"
          action="stuAdmin/upload"
          with-credentials="true"
          :on-success="handleAvatarSuccess"
          :file-list="fileList"
          :on-change="changeMe"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">上传表格文件</div>
        </el-upload>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { getCookie } from '../global/cookie';
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  export default {
    data() {
      return {
        deptOptions: [],
        deptSelected: '',
        gradeSelected: '',
        
        search: '',
  
        tableData: [], //目前前端所拥有的所有社会实践信息
  
        pageSize: 17,
        currentPage: 1,
        totalCount: 1,
  
        dialogFormVisible: false,
        form: {
            evaluateName: '',
            evaluatedName: '',
          tag: '',
          content: '',
          grade:'',
          department:'',
        },
        rules:{
          evaluateName: [{
        required: true,
        message: "评价者不能为空",
        trigger: "blur"
        }],
        evaluatedName: [{
        required: true,
        message: "被评价者不能为空",
        trigger: "blur"
        }],

        },
        formLabelWidth: '80px',
        visible2: 'none',
        visible1: 'inline',
        isDisabled: false,
        editIndex: 0,
  
        dialogUploadVisible: false,
        fileList: [],
      };
    },
    computed: {
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
      tables() {
        const search = this.search;
        if (search) {
          return this.tableData.filter((data) => {
            return Object.keys(data).some((key) => {
              return String(data[key]).toLowerCase().indexOf(search) > -1;
            });
          });
        }
        return this.tableData;
      },
    },
    methods: {
      submitUpload() {
        console.log('submit');
        this.$refs.upload.submit();
      },
      changeMe(file, fileList) {
        this.fileList = fileList;
      },
      handleAvatarSuccess(response, file, fileList) {
        let success = response.datas.success;
        let total = response.datas.totalNum;
        let failed = response.datas.failed;
        alert(
          '导入成功，共添加' +
            total +
            '条，成功' +
            success +
            '条，失败' +
            failed +
            '条'
        );
      },
  
      
      getTableData() {
        
        this.$axios
          .post('/evaluate/listEvaluation', {
          })
          
          .then((result) => {
            console.log(result);
            if (result.data.code === 1) {
              //返回第一页数据，和
              this.totalCount = result.data.datas.length;
              this.tableData = result.data.datas.evaluate;
            } else {
              alert(result.data.msg);
              return false;
            }
          })
          .catch((error) => {
            alert(error);
          });
      },
  
      getAllClass() {
        this.$axios
          .post('/stuAdmin/getAllClass', {})
          .then((result) => {
            if (result.data.code === 1) {
              //返回第一页数据，和
              this.classOptions = result.data.datas;
            } else {
              return false;
            }
          })
          .catch((error) => {
            alert(error);
          });
      },
  
      addStuBtn() {
        this.form.evaluateName= '';
        this.form.evaluatedName = '';
        this.form.grade = '';
        this.form.department = '';
        this.form.tag = '';
        this.form.content = '';
        
        this.dialogFormVisible = true;
        this.visible2 = 'none';
        this.visible1 = 'inline';
        this.isDisabled = false;
      },
  
      addStudentData() {
        this.$axios
          .post('/achievement/add', this.form)
          .then((result) => {
            console.log(result);
            if (result.data.code === 1) {
              //返回第一页数据，和
              this.$message({
                type: 'success',
                message: '添加成功!',
              });
              this.getTableData();
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
  
      
      handleDelete(index, row) {
        this.$confirm('确定删除此条互评记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        // console.log(row.studentNo)
          .then(() => {
            this.$axios
              .post('/evaluate/admDeleteEvaluate', {
                evaluateNo:row.evaluateNo,
              })
              .then((result) => {
                console.log(result);
                if (result.data.code === 1) {
                  this.getTableData();
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                  });
                  this.getTableData();
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
          })
          .catch(() => {});
      },
  
      handleCurrentChange(val) {
        this.currentPage = val;
      },
    },
    watch: {
      deptSelected: function () {
        this.$nextTick(function () {
          this.getTableData();
        });
      },
    },
    created() {
      // this.getAllClass();
      // this.gradeSelected = this.gradeOptions[2].grade;
      // this.getDptName();
      this.getTableData();
    },
  };
  </script>