<template>
  <div style="width:1101px">
    <div style="margin-bottom: 10px">
    <label>学期：</label>
    <el-select v-model="termSelected" placeholder="请选择学期" @change="getTermSelected">
      <el-option
        v-for="item in termOptions"
        :key="item.term"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>
    </div>
    <el-table
      :data="termTableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column label="你的学期课表">
      <el-table-column
        prop="time"
        label=""
        width="100">
      </el-table-column>
      <el-table-column
        prop="Mon"
        label="星期一"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Tues"
        label="星期二"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Wed"
        label="星期三"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Thur"
        label="星期四"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Fri"
        label="星期五"
        width="200">
      </el-table-column>
      </el-table-column>
    </el-table>
    </div>
  </template>
  
  <script>
  import {getCookie} from '../global/cookie'
  // import termOptions from '../global/termOptions.js'
  import termTable from '../global/termTable.js'
    export default {
      data() {
        return {
          termTableData:termTable,
          // options: termOptions,
          termSelected: ''
        }
      },
      computed:{
        termOptions(){
          let myData = new Date()
          var year1 = myData.getFullYear()
          let month1 = myData.getMonth()
          var options = []
          if(month1==0|| month1==1 ){
            options[0] = {
              term:(year1-1)+"2",
              label:(year1-1)+'-'+year1+'第一学期',
              value:(year1-1)+'-'+year1+'第一学期',
            },
            options[1]={
              term:(year1-1)+"1",
              label:(year1-1)+'-'+year1+'第二学期',
              value:(year1-1)+'-'+year1+'第二学期',
            }
          }else if(month1>=2&&month1<=7){
            options[0] = {
              term:(year1+1)+"1",
              label:(year1-1)+'-'+year1+'第二学期',
              value:(year1-1)+'-'+year1+'第二学期'
            },
            options[1]={
              term:(year1+1)+"2",
              label:year1+'-'+(year1+1)+'第一学期',
              value:year1+'-'+(year1+1)+'第一学期',
            }
          }else{
            options[0] = {
              term:(year1)+"1",
              label:year1+'-'+(year1+1)+'第一学期',
              value:year1+'-'+(year1+1)+'第一学期',
            },
            options[1]={
              term:(year1)+"2",
              label:year1+'-'+(year1+1)+'第二学期',
              value:year1+'-'+(year1+1)+'第二学期',
            }
          }
          
          return options
        }
      },
      methods:{
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 2||rowIndex === 5) {
            return 'warning-row';
          }
          return '';
        },
        getTermSelected(){
          this.$axios
          .post('/stu/getTermTable', { //获取查询学期课表接口
              term: this.termSelected
          })
          .then((result)=> {
            console.log(result)
              if (result.data.code === 1) {
                for(var i =0; i < 7; i++){
                  if(i==2||i==5) continue;
                  this.termTableData[i].Mon = ""
                  this.termTableData[i].Tues = ""
                  this.termTableData[i].Wed = ""
                  this.termTableData[i].Thur = ""
                  this.termTableData[i].Fri = ""
                }
                var time,week,courseName,area,room
                for(var i = 0; i < result.data.datas.length; i++){
                  if(result.data.datas[i].time=="第一节（08:00~09:50）")time=0
                  if(result.data.datas[i].time=="第二节（10:10~12:00）")time=1
                  if(result.data.datas[i].time=="第三节（14:00~15:50）")time=3
                  if(result.data.datas[i].time=="第四节（16:10~18:00）")time=4
                  if(result.data.datas[i].time=="第五节（19:00~20:50）")time=6
                  week = result.data.datas[i].day
                  courseName = result.data.datas[i].courseName
                  area = result.data.datas[i].area
                room = result.data.datas[i].room

                  switch (week) {
                    case "星期一":
                      this.termTableData[time].Mon = courseName+'\n'+area+room
                      break
                    case "星期二":
                      this.termTableData[time].Tues = courseName+'\n'+area+room
                      break
                    case "星期三":
                      this.termTableData[time].Wed = courseName+'\n'+area+room
                      break
                    case "星期四":
                      this.termTableData[time].Thur = courseName+'\n'+area+room
                      break
                    case "星期五":
                      this.termTableData[time].Fri = courseName+'\n'+area+room
                      break  
                  }
                }
              }else if(result.data.code === 0){
                this.$router.replace({ path: '/' });
              }
              else{
                  console.log("查询失败");
                  return false;
              }
          })
          .catch((error)=> {
              alert(error)
          })
        }
      }
    }
  </script>
  <style>
  .el-table .warning-row {
      background: #f5f7fa;
    }
  </style>