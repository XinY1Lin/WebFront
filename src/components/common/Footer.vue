<template>
  <el-footer>
    <div id="footer" >
      <p>{{ copyRight }}</p>
      <!-- <p>{{ mail }}</p> -->
    </div>
  </el-footer>
</template>

<script>
export default {
  data() {
    return {
      copyRight: 'Copyright © www.sdu.edu.cn, All Rights Reserved.',
    };
  },
};
</script>

<style scoped>
.footer {
    height: 20px;
  }
</style>