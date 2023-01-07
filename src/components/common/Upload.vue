<template>
  <div>
    <!-- 缩略图显示-->
    <div class="img-show" v-if="imgUrl">
      <img :src="imgUrl" class="avatar">
      <span class="actions">
        <!-- 放大 -->
        <span class="item">
          <i class="el-icon-zoom-in" @click="enlarge()"></i>
        </span>
        <!-- 删除 -->
        <span class="item">
          <i class="el-icon-delete" @click="del()"></i>
        </span>
      </span>
    </div>
    <!-- 图片上传 -->
    <el-upload 
    v-else
    action="#"
    class="uploader-avatar" 
    list-type="picture"
    :auto-upload="false" 
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-change="imgPreview"
    :on-success="handleAvatarSuccess">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 图片显示对话框 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: '',
            dialogVisible: false,
            dialogUrl: ''
        }
    },
    methods: {
        //图片缩略图
        imgPreview: function(file){
                //生成临时缩略图
                this.imgUrl =  URL.createObjectURL(file.raw);
        },
        enlarge: function(){
            this.dialogVisible = true;
            this.dialogUrl = this.imgUrl;
        },
        del: function(){
            this.imgUrl =  '';
            this.dialogUrl = '';
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        handleAvatarSuccess(res,file){
          this.imageUrl=URL.createObjectURL(file.raw);
          this.$axios
          .post('/upload/addPhoto',this.formData)
          .then((result)=>{
            console.log(result);
            if(result.data.code === 1){
              this.$message({
                type:'success',
                message:'上传成功！',
              })
            } else {
              this.$message({
                type:'error',
                message:result.data.msg,
              })
            }
          })
          .catch((error) => {
            alert(error);
          })
        },
        Upload(file){
          const formData=new FormData();
          formData.append('file',file.raw);
          const loading = this.$loading({
            lock: true,
            text: '图片上传中, 请稍后...',
            spinner: 'el-icon-loading',
          });
          this.$axios
          .post('/upload/addPhoto',this.formData)
          .then((result)=>{
            loading.close();
            console.log(result);
            if(result.data.code === 1){
              this.$message({
                type:'success',
                message:'上传成功！',
              })
            } else {
              this.$message({
                type:'error',
                message:result.data.msg,
              })
            }
          })
          .catch((error) => {
            alert(error);
          })
        }
    }
}
</script>

<style scoped>

.uploader-avatar>>>.el-upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    overflow: hidden;
}
.img-show{
    position: relative;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    overflow: hidden;
}
.uploader-avatar>>>.el-upload:hover {
    border-color: #409EFF;
}
.uploader-avatar>>>i {
    font-size: 28px;
    color: #8c939d;
}
.avatar{
    width: 148px;
    height: 148px;
    display: block;
}

.actions{
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 148px;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
}
.actions:hover{
    opacity: 1;
}
.actions:hover span{
    display: inline-block;
}
.actions span{ 
    display: none;
    margin: 0 16px;
    cursor: pointer;
}

</style>
