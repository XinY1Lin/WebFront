<template>
  <div style="width: 1100px">
    <el-row type="flex" justify="space-between" style="margin-bottom: 5px">
      <el-col :span="3">
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
      </el-col>
      <el-col :span="12">
        <el-input v-model="search" placeholder="请输入搜索内容" size="small">
          <el-button slot="append" icon="el-icon-search" @click="searchOk"
            >搜索</el-button
          >
        </el-input>
      </el-col>
      <el-button
        type="primary"
        size="small"
        @click="addStuBtn"
        icon="el-icon-user"
        >添加学生</el-button
      >
      <el-button
        type="primary"
        plain
        size="small"
        @click="dialogUploadVisible = true"
        icon="el-icon-folder-add"
        >导入学生</el-button
      >
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
        <el-table-column prop="studentNo" label="学号" width="110">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="60">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50">
        </el-table-column>
        <el-table-column prop="class" label="班级" width="100">
        </el-table-column>
        <el-table-column prop="department" label="学院" width="180">
        </el-table-column>
        <el-table-column prop="identityNum" label="身份证号" width="200">
        </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" width="110">
        </el-table-column>

        <el-table-column
          prop="politicalAppearance"
          label="政治面貌"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="graduateSchool" label="毕业学校" width="200">
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话号码" width="120">
        </el-table-column>
        <el-table-column fixed="right" prop="operate" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
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
      title="个人信息"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="form" :rules="rules"  ref="form">
        
        <el-form-item>
          <el-col :span="10">
            <el-form-item prop="studentNo" label="学号" :label-width="formLabelWidth">
              <el-input
                v-model="form.studentNo"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <!-- <el-col :span="3">
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
          <el-col :span="10">
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="form.gender" placeholder="请选择">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="毕业院校" :label-width="formLabelWidth">
              <el-input
                v-model="form.graduateSchool"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="10">
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.birthDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 200px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="identityNum" label="身份证号" :label-width="formLabelWidth">
              <el-input
                v-model="form.identityNum"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="10">
            <el-form-item label="政治面貌" :label-width="formLabelWidth">
              <el-select
                v-model="form.politicalAppearance"
                placeholder="请选择"
              >
                <el-option value="群众"></el-option>
                <el-option value="共青团员"></el-option>
                <el-option value="入党积极分子"></el-option>
                <el-option value="共产党员"></el-option>
                <el-option value="其他党派"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="phoneNum" label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNum" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="学院" :label-width="formLabelWidth">
              <el-select v-model="form.department" placeholder="请选择">
           
                <el-option value="软件学院"></el-option>
                <el-option value="数学学院"></el-option>
                
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
      </el-form-item>
      <el-form-item>
          <el-col :span="12">
            <el-form-item label="班级" :label-width="formLabelWidth">
              <el-select v-model="form.class" placeholder="请选择">
                <el-option
                  v-for="item in classOptions"
                  :key="item.classNo"
                  :label="item.classNo"
                  :value="item.classNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option value="毕业"></el-option>
                <el-option value="在校"></el-option>
                <el-option value="休学"></el-option>
                <el-option value="退学"></el-option>
              </el-select>
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
      classOptions: [
        {
          classNo: 1,
        },
        {
          classNo: 2,
        },
        {
          classNo: 3,
        },
        {
          classNo: 4,
        },
      ],
      search: '',

      tableData: [], //目前前端所拥有的所有课程信息

      pageSize: 17,
      currentPage: 1,
      totalCount: 1,

      dialogFormVisible: false,
      form: {
        studentNo: '',
        name: '',
        gender: '',
        graduateSchool: '',
        birthDate: '',
        identityNum: '',
        politicalAppearance: '',
        phoneNum: '',
        department: '',
        grade:'',
        class: '',
        status: '',
      },
      rules: {
        studentNo: [{
        required: true,
        message: "学号不能为空",
        trigger: "blur"
        },{
       pattern:/^(20)(1|2)\d{6}$/ ,
        message: "请输入正确的学号", 
        trigger: 'blur' 
    }],
        name: [{
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
        }],
        phoneNum: [{
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
    }],
        identityNum: [{
        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: "请输入正确的身份证号",
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
    load() {
      location.reload()
    },
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

    getDptName() {
      this.$axios
        .get('/dpt/getDptName', {})
        .then((result) => {
          if (result.data.code === 1) {
            console.log(result);
            this.deptOptions = result.data.datas;
            this.deptSelected = result.data.datas[0].departmentNo;
          } else {
            return false;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },

    deptSelect() {
      if (this.gradeSelected == '') {
        return;
      }
    
      this.getTableData();
    },
    gradeSelect() {
      if (this.deptSelected == '') {
        return;
      }
      // console.log(this.deptSelected)
      this.getTableData();
    },
    getTableData1() {
      this.$axios
        .post('/stuBasicInfo/getInfoTable', {
        })
        
        .then((result) => {
          console.log(result);
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.totalCount = result.data.datas.length;
            this.tableData = result.data.datas.stuBasicInfo;
          } else {
            alert(result.data.msg);
            return false;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    getTableData() {
      if (this.deptSelected == '' || this.gradeSelected == '') {
        return;
      }
      
      this.$axios
        .post('/stuBasicInfo/getInfoTable', {
           dpt: this.deptSelected,
           grade: this.gradeSelected,
        })
        
        .then((result) => {
          console.log(result);
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.totalCount = result.data.datas.length;
            this.tableData = result.data.datas.stuBasicInfo;
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
      this.form.studentNo = '';
      this.form.name = '';
      this.form.grade = '';
      this.form.gender = '';
      this.form.graduateSchool = '';
      this.form.birthDate = '';
      this.form.identityNum = '';
      this.form.politicalAppearance = '';
      this.form.phoneNum = '';
      this.form.department = '';
      this.form.class = '';
      this.form.status = '';
      this.dialogFormVisible = true;
      this.visible2 = 'none';
      this.visible1 = 'inline';
      this.isDisabled = false;
    },

    addStudentData() {
      this.$axios
        .post('/stuBasicInfo/add', this.form)
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

    handleEdit(index, row) {
      this.form.studentNo = row.studentNo;
      this.form.name = row.name;
      this.form.gender = row.gender;
      this.form.graduateSchool = row.graduateSchool;
      this.form.birthDate = row.birthDate;
      this.form.identityNum = row.identityNum;
      this.form.politicalAppearance= row.politicalAppearance;
      this.form.phoneNum = row.phoneNum;
      this.form.grade = this.gradeSelected;
      this.form.department = this.deptSelected;
      this.form.class = row.class;
      this.form.status = row.status;
      this.visible1 = 'none';
      this.visible2 = 'inline';
      this.isDisabled = true;
      this.dialogFormVisible = true;
    },
    editOk() {
      this.$axios
        .post('/stuBasicInfo/update', this.form)
        .then((result) => {
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.$message({
              type: 'success',
              message: '修改成功!',
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
      this.$confirm('确定删除' + row.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      // console.log(row.studentNo)
        .then(() => {
          this.$axios
            .post('/stuBasicInfo/delete', {
              studentNo: row.studentNo,
            })
            .then((result) => {
              console.log(result);
              if (result.data.code === 1) {
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
    this.getTableData1()
  },
};
</script>