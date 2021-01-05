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
            <el-button type="warning" @click="$goto('about')">查看更多</el-button>
          </div>
        </div>
        <div class="right">
          <img src="../assets/images/right_img.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="serve">
      <div class="serve_content">
        <div v-for="item in serveData">
          <img :src="item.src">
          <div>
            <h2>{{item.name}}</h2>
            <span>{{item.content}}</span>
          </div>
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
  computed: {
    serveData () {
      return [
        { src: require('../assets/images/serve_1.png'), name: '高级美容师', content: '我们的专业团队提供特殊的美容服务，宠物美容对宠物的健康大有益处。'},
        { src: require('../assets/images/serve_2.png'), name: '贵宾服务', content: '给您的宠物个性化服务，提供宠物用品；猫、狗洁净用品；其他小动物附属用品。'},
        { src: require('../assets/images/serve_3.png'), name: '我们爱每一个宠物', content: '它们不仅仅是宠物更是家人，我们有专业团体，包括兽科技术员，兽医助理等。'}
      ]
    }
  }
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
  .serve {
    width: 100%;
    background: url("../assets/images/serve.jpg") no-repeat;
    .serve_content {
      padding-left: 20px;
      display: flex;
      margin: 0 auto;
      width: 60.9%;
      height: 330px;
      div {
        margin-top: 40px;
        width: 33.333%;
        height: 100%;
        img {
          margin-top: 50px;
          width: 100px;
          height: 100px;
          float: left;
        }
        div {
          width: 200px;
          margin-left: 30px;
          float: left;
          h2 {
            color: #fff;
            font-weight: 400;
          }
          span {
            line-height: 26px;
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
