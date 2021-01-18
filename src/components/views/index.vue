<template>
  <div class="indexFrame clearfix">
    <div class="top_video">
      <video src="../../assets/images/8.mp4" autoplay="true" muted="muted" loop="true"></video>
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
          <img src="../../assets/images/right_img.jpg" alt="">
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
    <div class="product">
      <div class="product_content">
        <div class="product_title">
          <h2>宠物用品</h2>
          <img src="../../assets/images/product_title.jpg" alt="">
        </div>
        <div class="images">
          <div class="images_1" v-for="(item, index) in productData" :k="index">
            <div class="images_2">
              <img :src="item.src" alt="">
              <h2>{{item.name}}</h2>
              <p>{{item.mark}}</p>
            </div>
          </div>
        </div>
        <div class="product_btn">
          <h2>
            <el-button type="warning" @click="$goto('/show')">查看更多</el-button>
          </h2>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="contact_content">
        <div class="content_centre">
          <div class="icon">
            <img src="http://domain.jia10000.cn/uploadfile/image/0/1/69/2018-07/15313028318524.png" alt="">
          </div>
          <div class="icon_centre">
            <h2>我们的服务是独一无二的</h2>
            <p>顶级的美容用品和精湛的修剪技法和染色激发增添美感，从而达到让狗狗和主人身心愉悦的效果，顶级的美容用品和精湛的修剪技法和染色激发增添美感，从而达到让狗狗和主人身心愉悦的效果。</p>
            <el-button type="warning" @click="$goto('about')">查看更多</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../mixins/utils'

export default {
  name: 'index',
  mixins: [utils],
  data () {
    return {
      productData: [],
    }
  },
  computed: {
    serveData () {
      return [
        { src: require('../../assets/images/serve_1.png'), name: this.$t('index.serveName1'), content: this.$t('index.serveContent1')},
        { src: require('../../assets/images/serve_2.png'), name: this.$t('index.serveName2'), content: this.$t('index.serveContent2')},
        { src: require('../../assets/images/serve_3.png'), name: this.$t('index.serveName3'), content: this.$t('index.serveContent3')}
      ]
    },
  },
  methods: {
    async getImages () {
      const res = await this.$http.get('product/getImas')
      this.productData = res.data
      if (res.status === 200) {
        for (let item of res.data) {
          let params = {
            src: item.src
          }
          let rest = await this.$http.get('product/getIma', { params })
          if (rest.data.code === 200) {
            let imgUrl = this.bufferToUrl(rest.data.data.data)
            item.src = imgUrl
          }
        }
      this.productData = res.data
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getImages()
    },0)
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
      width: 1170px;
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
    background: url("../../assets/images/serve.jpg") no-repeat;
    .serve_content {
      padding-left: 20px;
      display: flex;
      margin: 0 auto;
      width: 1170px;
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
  .product {
    background: #ffffff;
    width: 100%;
    .product_content {
      margin: 0 auto;
      width: 1170px;
      height: 690px;
      .images {
        position: relative;
        top: 90px;
        display: flex;
        .images_1 {
          display: flex;
          width: 270px;
          height: 364px;
          border: 1px solid #ccc;
          box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
          box-sizing: border-box;
          margin-right: 30px;
          .images_2 {
            width: 250px;
            height: 100%;
            margin: 0 auto;
            img {
              margin-top: 8px;
              width: 100%;
            }
            h2 {
              font-weight: 400;
            }
          }
        }
        div:last-child {
          margin-right: 0;
        }
      }
      .product_title {
        position: relative;
        top: 40px;
        h2 {
          font-weight: 400;
          font-size: 26px;
          color: rgb(102, 102, 102);
          margin: 0;
          text-align: center;
        }
        img {
          display: block;
          width: 249px;
          height: 16px;
          margin: 10px auto;
        }
      }
      .product_btn {
        position: relative;
        top: 130px;
        h2 {
          text-align: center;
        }
      }
    }
  }
  .contact {
    width: 100%;
    height: 530px;
    background: url("../../assets/images/contact_bg.jpg");
    .contact_content {
      width: 1170px;
      height: 100%;
      margin: 0 auto;
      .content_centre {
        position: relative;
        top: 104px;
        left: 0;
        height: 320px;
        width: 677px;
        background-color: rgba(247, 243, 231, 0.75);
        .icon {
          position: relative;
          top: 100px;
          left: 21px;
          width: 127px;
          height: 127px;
          img {
            width: 127px;
            height: 127px;
          }
        }
        .icon_centre {
          width: 400px;
          position: relative;
          top: -75px;
          left: 170px;
          font-family: 微软雅黑;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          color: rgb(102, 102, 102);
          background-color: transparent;
          line-height: 26px;
          text-decoration: none;
          text-align: left;
          visibility: visible;
          animation-name: bounceIn;
          h2 {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
