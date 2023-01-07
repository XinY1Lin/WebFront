<template>
<div style="width:1050px">
  <div style="margin-bottom: 10px">
        <label>学期：</label>
        <el-select v-model="termSelected" clearable @clear="load"  placeholder="请选择学期" @change="getTermSelected">
        <el-option
        v-for="item in termOptions"
        :key="item.term"
        :label="item.label"
        :value="item.label">
        </el-option>
        </el-select>
    </div>
  <el-table
    :data="taskTableData"
    style="width: 100%"
    stripe>
    <el-table-column  prop="courseNo" label="课程编号" width="200">
    </el-table-column>
    <el-table-column  prop="courseName" label="课程名称" width="200">
    </el-table-column>
    <!-- 设置课程起始时间 -->
    <el-table-column prop="area,room" label="上课地点" width="350">
      <template slot-scope="scope"> {{scope.row.area}}{{scope.row.room}} </template>
    </el-table-column>
    <el-table-column prop="day,time" label="时间" width="350">
      <template slot-scope="scope"> {{scope.row.day}}{{scope.row.time}} </template>
    </el-table-column>
   
    <!-- <el-table-column prop="info" label="详情" width="400">
    </el-table-column> -->
    <!-- <el-table-column prop="docurl" label="下载" width="150">
      <template slot-scope="scope"> 
        <el-link type="primary" :href="scope.row.docurl">下载教学大纲</el-link> 
      </template>
    </el-table-column> -->
  </el-table>
</div>
</template>

<script >

export default {
  data(){
    return{
      taskTableData:[],
      termSelected: '',
      courseNo:'',
      courseName:'',
      day:'',
      time:'',
      area:'',
      room:'',
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
  methods: {
    load(){
      location.reload()
    },
    getTermSelected(){
      if(this.termSelected == ""){
          return
        }
      this.$axios
      .post('/teacher/showTeachManage', {
        term: this.termSelected
      })
      .then((result)=> {
        if (result.data.code == 1) {
          this.taskTableData = result.data.datas
        }
      })
      .catch((error)=> {
        alert(error)
      })
    }
  },
  // created(){
  //   this.getTermSelected()
  // }
}
</script>