<template>
  <div class="indexFrame clearfix">
    <div class="top_video">
      <video src="../assets/images/8.mp4" autoplay="true" muted="muted" loop="true"></video>
    </div>
    <div class="about clearfix">
      <div class="about_content">
        <div class="left">
          <div class="left_content">
            <h1>{{$t('common.aboutUs')}}</h1>
            <span>{{$t('index.aboutUsMark')}}</span>
            <el-button type="warning" @click="$goto('about')">{{$t('index.showMore')}}</el-button>
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
        { src: require('../assets/images/serve_1.png'), name: this.$t('index.serveName1'), content: this.$t('index.serveContent1')},
        { src: require('../assets/images/serve_2.png'), name: this.$t('index.serveName2'), content: this.$t('index.serveContent2')},
        { src: require('../assets/images/serve_3.png'), name: this.$t('index.serveName3'), content: this.$t('index.serveContent3')}
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
