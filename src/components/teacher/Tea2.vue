<template>
  <div style="width:1100px">
    <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:5px">
      <el-col :span="7">
        <label>学期：</label>
        <el-select v-model="termSelected" placeholder="请选择学期" clearable @clear="load" @change="getTermSelected"
          style="width:180px" size="small">
          <el-option v-for="item in termOptions" :key="item.term" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <label>课程：</label>
        <el-select v-model="crsSelected" placeholder="请选择课程" @change="getCrsSelected" style="width:180px" size="small">
          <el-option v-for="item in crsOptions" :key="item.courseNo" :label="item.courseName" :value="item.courseName">
          </el-option>
        </el-select>
      </el-col>
      <el-button type="primary" plain size="small" @click="exportExcel">导出</el-button>
    </el-row>

    <div style="background-color:#eff1f2;padding:5px;border-radius: 2px;">
      <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:5px">
        <el-col :span="20">
          <el-input v-model="search" placeholder="请输入搜索内容" size="mini">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-button-group>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="show = true" round></el-button>
          <el-button size="mini" type="primary" icon="el-icon-check" @click="show = false" round></el-button>
        </el-button-group>
        <el-button size="mini" type="success" @click="postListData" round>提交</el-button>
      </el-row>

      <el-table id="classListTable" :data="tables.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border
        stripe style="width: 100%" :header-row-style="{ height: 0 + 'px' }" :header-cell-style="{ padding: 0 + 'px' }"
        :row-style="{ height: '20px' }" :cell-style="{ padding: '2px' }">
        <el-table-column type="index" label="序号" width="59">
        </el-table-column>
        <el-table-column prop="studentNo" label="学号" width="200">
        </el-table-column>
        <el-table-column prop="class" label="班级" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="300">
        </el-table-column>
        <el-table-column prop="score" label="成绩" width="200">
          <template slot-scope="scope">
            
            <el-input size="mini" type="number" v-show="show" v-model="scope.row.score" ></el-input>
            <span v-show="!show">{{ scope.row.score }}</span>
          
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="170">
          <template slot-scope="scope">
            <el-tag size="mini"
              :type="(scope.row.score == null) ? 'info' : (scope.row.score >= 60) ? 'success' : 'danger'"
              disable-transitions>{{ (scope.row.score == null) ? '未录入' : (scope.row.score >= 60) ? '合格' : '不合格'
}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalCount"
      :current-page="currentPage" @current-change="handleCurrentChange" style="text-align:center">
    </el-pagination>
  </div>
</template>

<script>
import { getCookie } from '../global/cookie'
// import termOptions from '../global/termOptions.js'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      // termOptions:termOptions,
      termSelected: '',
      crsOptions: [],
      crsSelected: '',

      classListTableData: [],
      studentNo: '',
      class: '',
      name: '',
      score: '',
      // tag:'',
      search: '',
      show: false,

      pageSize: 20,
      currentPage: 1,
      totalCount: 1,
      loading: false
    }
  },
  computed: {
    tables() {
      const search = this.search
      if (search) {
        return this.classListTableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.classListTableData
    },
   
    termOptions() {
      let myData = new Date()
      var year1 = myData.getFullYear()
      let month1 = myData.getMonth()
      var options = []
      if (month1 == 0 || month1 == 1) {
        options[0] = {
          term: (year1 - 1) + "2",
          label: (year1 - 1) + '-' + year1 + '第一学期',
          value: (year1 - 1) + '-' + year1 + '第一学期',
        },
          options[1] = {
            term: (year1 - 1) + "1",
            label: (year1 - 1) + '-' + year1 + '第二学期',
            value: (year1 - 1) + '-' + year1 + '第二学期',
          }
      } else if (month1 >= 2 && month1 <= 7) {
        options[0] = {
          term: (year1 + 1) + "1",
          label: (year1 - 1) + '-' + year1 + '第二学期',
          value: (year1 - 1) + '-' + year1 + '第二学期'
        },
          options[1] = {
            term: (year1 + 1) + "2",
            label: year1 + '-' + (year1 + 1) + '第一学期',
            value: year1 + '-' + (year1 + 1) + '第一学期',
          }
      } else {
        options[0] = {
          term: (year1) + "1",
          label: year1 + '-' + (year1 + 1) + '第一学期',
          value: year1 + '-' + (year1 + 1) + '第一学期',
        },
          options[1] = {
            term: (year1) + "2",
            label: year1 + '-' + (year1 + 1) + '第二学期',
            value: year1 + '-' + (year1 + 1) + '第二学期',
          }
      }

      return options
    }
  },
  methods: {
    
    load() {
      location.reload()
    },
    getTermSelected() {
      this.$axios
        .post('/teacher/showCourse', {
          term: this.termSelected
        })
        .then((result) => {
          console.log(result)
          if (result.data.code === 1) {
            this.crsOptions = result.data.datas
            this.crsSelected = ''
          }

        })
        .catch((error) => {
          alert(error)
        })
    },
    getCrsSelected() {
      this.selectOk()
    },
    selectOk() {
      if (this.termSelected === '' || this.crsSelected === '') {
        // alert("请检查查询条件")
        return
      }
      this.$axios
        .post('/teacher/showTeachCourse', { //获取查询学生名单接口
          courseName: this.crsSelected
        })
        .then((result) => {
          if (result.data.code === 1) {
            console.log(result)

            const List = result.data.datas;
            List.forEach((item) => {
              const classItem = {
                studentNo: item.student && item.student.studentNo || '',
                class: item.student && item.student.class || '',
                name: item.student && item.student.name || '',
                score: item.score || '',
                // tag: item.label || '',
              };
              this.classListTableData.push(classItem);
            })
          }
        })
        .catch((error) => {
          alert(error)
        })
    },

    postListData() {
      if (this.show == true) {
        this.$message({
          type: 'info',
          message: '编辑状态不能提交',
        });
        return
      }
      this.$axios
        .post('/teacher/updateStudentScore', {
          courseName: this.crsSelected,
          scoreList: this.classListTableData
        })
      console.log(this.crsSelected)
      console.log(this.classListTableData)

        .then((result) => {

          // console.log('1')
          // console.log(result.data.msg)
          // console.log('2')
          // console.log(result.data.code)

          if (result.data.code === 1) {
            this.$message({
              type: 'success',
              message: '成绩更新成功'
            });
          } else {
            this.$message({
              type: 'error',
              message: result.data.msg,
            });
          }
        })
        .catch((error) => {
          alert(error)
        })
    },

    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../excel/Export2Excel');
        const tHeader = ['学号', '班级', '姓名', '成绩'];
        const filterVal = ['studentNo', 'class', 'name', 'score'];//属性值
        const list = this.classListTableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data,
         'studentlist');
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },

}

</script>