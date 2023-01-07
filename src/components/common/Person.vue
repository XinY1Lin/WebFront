<!-- <template>
    <div class="person" style="height:250">
     <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :model="userForm" :rules="rules" class="hhh" ref="userForm" >
      
      <el-form-item label="姓名：" prop="stuname"></el-form-item>
      <el-form-item label="出生日期：" prop="birth"></el-form-item>
      <el-form-item label="学号：" prop="name"></el-form-item>
      <el-form-item label="政治面貌：" prop="political"></el-form-item>
      <el-form-item label="学院：" prop="department"></el-form-item>
      <el-form-item label="班级：" prop="class"></el-form-item>
    </el-form>
   </div>
  </template>

<style>
.hhh {
      text-align: right;
      font-size: 18px;
    
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
    position: relative;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
  }
.person{
    margin:0px;
    margin-left:250px;
    background-color:white;
    border: 1px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 400px;
    height: 600px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 30px;
    text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
        stuname:'',
        birth:'',
        name:'',
        department:'',
        classi:'',
        polotical:'',
        status:'',
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    }
  }
}
</script>
   -->

   <template>
    <div class="person">
      <el-card style="width: 600px;margin: 80px 180px;">
        <el-form label-width="80px" size="small">
          <div style="text-align: center; margin: 10px 0">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
            >
              <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <el-form-item label="用户名">
            <el-input v-model="form.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
     
  
        <div style="text-align: center">
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-card>
    </div>
  </template>

<script>
export default {
  name: 'Person',
  data() {
    return {
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const username = this.user.username
      if (!username) {
        this.$message.error("当前无法获取用户信息！")
        return
      }
      this.request.get("/user/username/" + username).then(res => {
        this.form = res.data
      })
    },
    save() {
      this.request.post("/user", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()

          this.$emit('refreshUser')
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAvatarSuccess(res) {
      // res就是文件的路径
      this.form.avatarUrl = res
    }
  }
}
</script>


