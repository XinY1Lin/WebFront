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


