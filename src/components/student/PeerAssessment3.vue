<template>
    <div style="width:1100px">
      <el-table
      :data="selectPAData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      :header-row-style="{height:'20px'}"
      :header-cell-style="{padding:'4px'}"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'2px'}">
        <el-table-column
          prop="evaluatedName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="你为Ta打的标签"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="你给Ta的评价">
        </el-table-column>
        <el-table-column fixed="right" prop="operate" label="操作" width="150">
          <template slot-scope="scope">
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
  import router from '../../../router'
import {getCookie} from '../global/cookie'
  export default {
      data() {
          return {
            selectPAData: [],
            pageSize:20,
            currentPage:1,
            totalCount:1,
            loading:false
          }
      },
      methods: {
          handleCurrentChange(val) {
            this.currentPage=val
          },
          getSelectPAData(){
            this.$axios
            .post('/evaluate/meEvaluated', { //获取查询学生互评信息接口
            })
            .then((result)=> {
              if (result.data.code === 1) {
                  this.selectPAData = result.data.datas
              }else{
                  this.selectPAData = []
                  alert("未查询到互评信息")
                  return false;
              }
            })
            .catch((error)=> {
              alert(error)
            })
          },
          handleDelete(index, row) {
            this.$confirm('确定删除此条评价信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                this.$axios
                    .post('/evaluate/deleteEvaluate',{
                        /* evaluatedName: row.evaluatedName,
                        tag: row.tag,
                        content: row.content, */
                        evaluateNo: row.evaluateNo
                    })
                    .then((result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.$message({
                        type: 'success',
                        message: '删除成功!',
                        });
                        this.getSelectPAData();
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
      },
      created:function(){
        this.getSelectPAData()
      }
  }
  </script>