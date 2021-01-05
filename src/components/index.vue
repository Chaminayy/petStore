<template>
  <div class="indexFrame clearfix">
    <div class="top_video">
      <video src="../assets/images/8.mp4" autoplay="true" muted="muted" loop="true"></video>
    </div>
    <div class="about clearfix">
      <div class="about_content">
        <div class="left">
          <div class="left_content">
            <h1>关于我们</h1>
            <span>
            现在我们有多年培养萌宠经验，我们爱宠物的每一部分我们的工作！我们为您的宠物提供一个非常热情友好的环境。我们的专业团队确保您的宠物总是最高水平的护理，因为我们对所有的宠物就像自己的一家人一样。目前以专业宠物店市场为主销售渠道，正逐步开发其他渠道。近年来稳步增长的销售业绩，或许可以预示未来XX的成长趋势。
            </span>
            <el-button type="warning" @click="$goto('about')">点我查看</el-button>
          </div>
        </div>
        <div class="right">
          <img src="../assets/images/right_img.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import path from '../mixins/path';

export default {
  name: 'index',
  mixins: [path],
}
</script>

<style lang="less" scoped>
.indexFrame {
  .top_video {
    width: 100%;
    height: 670px;
    overflow: hidden;
    video {
      width: 100%;
    }
  }
  .about {
    background: #ffffff;
    position: relative;
    width: 100%;
    .about_content {
      margin: 0 auto;
      width: 60.9%;
      height: 520px;
      .left {
        float: left;
        width: 50%;
        .left_content {
          margin-top: 120px;
          h1 {
            margin-bottom: 50px;
            font-weight: 400;
          }
          span {
            color: rgb(102, 102, 102);
            font-size: 14px;
          }
          /deep/ .el-button {
            margin-top: 50px;
            display: block;
          }
        }
      }
      .right {
        float: right;
        width: 50%;
        img {
          margin-top: 100px;
        }
      }
    }
  }
}
</style>
