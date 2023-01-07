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
  <!-- <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:10px"> -->
  <!-- <el-col :span="7">
    <label>学期：</label>
    <el-select v-model="termSelected" placeholder="请选择学期" @change="getTermSelected" style="width:180px">
    <el-option
      v-for="item in termOptions"
      :key="item.term"
      :label="item.label"
      :value="item.label">
    </el-option>
    </el-select>
  </el-col> -->
  <!-- <el-col :span="7"> -->
    <!-- <label>区域：</label>
    <el-select v-model="areaSelected" placeholder="请选择区域" @change="getAreaSelected" style="width:180px">
    <el-option
      v-for="item in areaOptions"
      :key="item.area"
      :label="item.label"
      :value="item.area">
    </el-option>
    </el-select>
  </el-col>
  <el-col :span="7">
    <label>教室：</label>
    <el-select v-model="roomSelected" placeholder="请选择教室" @change="getRoomSelected" style="width:180px">
    <el-option
      v-for="item in roomOptions[`${form.area}`]"
      :key="item.room"
      :label="item.label"
      :value="item.area">
    </el-option>
    </el-select>
  </el-col> -->
  <!-- <el-col :span="2">
     <el-button type="primary" @click="selectOk">查询</el-button>
  </el-col> -->
  <!-- </el-row> -->
  <el-table
    :data="roomTableData"
    border
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column label="教室课表">
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
// import termOptions from '../global/termOptions.js'
import roomTable from '../global/roomTable.js'
import areaOptions from '../global/areaOptions.js'
import roomOptions from '../global/roomOptions.js'
import qs from 'qs'
  export default {
    data() {
      return {
        roomTableData:roomTable,
        // termOptions:termOptions,
        termSelected: '',
        // areaOptions:areaOptions,
        // areaSelected:'',
        // roomOptions:roomOptions,
        // roomSelected:''
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
      // getAreaSelected(){
      //   this.$axios
      //   .get('/spot/getRoomByArea', { 
      //     area:this.areaSelected
      //   })
      //   .then((result)=> {
      //     this.roomSelected = ""
      //     this.roomOptions = result.data.datas
      //   })
      //   .catch((error)=> {
      //       alert(error)
      //   })
      // },
      
      getTermSelected(){
        // if(this.termSelected==''||this.areaSelected==''||this.roomSelected==''){
        //   alert("请检查查询条件")
        //   return
        // }
        this.$axios
        .post('/stu/getRoomTable', { //获取查询教室课表接口
            term: this.termSelected,
            // area: this.areaSelected,
            // room: this.roomSelected
        })
        .then((result)=> {
            if (result.data.code === 1) {
              for(var i =0; i < 7; i++){
                if(i==2||i==5) continue;
                this.roomTableData[i].Mon = ""
                this.roomTableData[i].Tues = ""
                this.roomTableData[i].Wed = ""
                this.roomTableData[i].Thur = ""
                this.roomTableData[i].Fri = ""
              }
              var time,week,info
              for(var i = 0; i < result.data.datas.length; i++){
                if(result.data.datas[i].time=="第一节（08:00~09:50）")time=0
                if(result.data.datas[i].time=="第二节（10:10~12:00）")time=1
                if(result.data.datas[i].time=="第三节（14:00~15:50）")time=3
                if(result.data.datas[i].time=="第四节（16:10~18:00）")time=4
                if(result.data.datas[i].time=="第五节（19:00~20:50）")time=6
                week = result.data.datas[i].day
                area = result.data.datas[i].area
                room = result.data.datas[i].room
                switch (week) {
                  case "Mon":
                    this.roomTableData[time].Mon = area + room
                    break
                  case "Tues":
                    this.roomTableData[time].Tues = area + room
                    break
                  case "Wed":
                    this.roomTableData[time].Wed = area + room
                    break
                  case "Thur":
                    this.roomTableData[time].Thur = area + room
                    break
                  case "Fri":
                    this.roomTableData[time].Fri = area + room
                    break  
                }
              }
            }else{
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