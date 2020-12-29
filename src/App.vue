<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="nav">
          <a class="titleIcon" href="javascript: alert('回到首页了')">
          </a>
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
    <h1>hahahhha</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .el-header {
    width: 100%;
    height: 90px !important;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  .el-header .nav .titleIcon {
    float: left;
    margin-left: 30px;
    height: 90px;
    width: 95px;
    background-image: url("./assets/images/titleIcon.png");
    background-repeat: no-repeat;
    background-size: 90px
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
