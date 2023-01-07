<template>
  <div style="width:1151px">
      <el-table
      :data="selectCrsData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      :header-row-style="{height:'20px'}"
      :header-cell-style="{padding:'4px'}"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'2px'}">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="courseNo" label="课程编号" width="100">
      </el-table-column>
      <el-table-column prop="courseType" label="课程类型" width="100">
      </el-table-column>
      <el-table-column prop="courseName" label="课程名" width="100">
      </el-table-column>
      <el-table-column prop="credit" label="学分" width="60">
      </el-table-column>
      <el-table-column prop="overallHour" label="学时" width="60">
      </el-table-column>
      <el-table-column prop="area,room" label="地点" width="200">
        <template slot-scope="scope"> {{scope.row.area}}{{scope.row.room}} </template>
      </el-table-column>
      <el-table-column prop="day,time" label="时间" width="200">
        <template slot-scope="scope"> {{scope.row.day}}{{scope.row.time}} </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="任课教师" width="100">
      </el-table-column>
      <el-table-column prop="selected,total" label="已选" width="80">
        <template slot-scope="scope"> {{scope.row.selectedStu}}<span>/</span>{{scope.row.totalStu}} </template>
      </el-table-column>
      <el-table-column prop="grade" label="选项" width="200">
          <template slot-scope="scope">
            <el-button size="mini" plain type="primary"
              @click="handleAdd(scope.$index, scope.row)">选课</el-button>
            <el-button size="mini" plain type="danger"
              @click="handleDelete(scope.$index, scope.row)">退课</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="totalCount"
    :current-page="currentPage"
    @current-change="handleCurrentChange"
    style="text-align:center">
    </el-pagination>
    </div>
  </template>
  
  <script>
  import {getCookie} from '../global/cookie'
  import marked from 'marked'

  export default {
      data(){
          return{
            selectCrsData: [],
            pageSize:20,
            currentPage:1,
            totalCount:1,
            loading:false
          }
      },
      methods: {
        handleAdd(index,row){
          this.$axios
          .post('/stu/selectCourse', {
            courseNo: row.courseNo,
            time: row.time,
            day: row.day, 
            term: row.term     
          })
          .then((result)=> {
            if(result.data.code === 1){
              row.selected++
              alert("选课成功")
              this.getSelectCrsData();
            }else{
              alert(result.data.msg)
            }
          })
          .catch((error)=> {
              alert(error)
          })
        },
        handleDelete(index,row){
          this.$axios
          .post('/stu/deleteSelect', { 
            courseNo: row.courseNo 
          })
          .then((result)=> {
            if(result.data.code === 1){
              row.selected--
              alert("退课成功")
              this.getSelectCrsData();
            }else{
              alert(result.data.msg)
            }
          })
          .catch((error)=> {
              alert(error)
          })
        },
        handleCurrentChange(val) {
          this.currentPage=val
        },
        getSelectCrsData(){
          this.$axios
          .post('/stu/listCourse', { //获取查询学生学期成绩接口
            
          })
          .then((result)=> {
            console.log(result)
              if (result.data.code === 1) {
                  this.selectCrsData = result.data.datas.course
                  this.totalCount = result.data.datas.length
              }else{
                  this.selectCrsData = []
                  alert("选课通道未开放")
                  return false;
              }
          })
          .catch((error)=> {
              alert(error)
          })
        }
      },
      created:function(){
        this.getSelectCrsData()
      }
  }
  </script>