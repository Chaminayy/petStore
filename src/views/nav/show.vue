<template>
  <div class="indexFrame">
    <div class="top_image"></div>
    <div class="product">
      <div class="product_content">
        <div class="product_title">
          <h2>宠物用品</h2>
          <img src="../../assets/images/product_title.jpg" alt="">
        </div>
        <div class="clearfix">
          <div class="images" v-for="(item1, index) in productData" :key="index">
            <div class="images_1" v-for="(item, index1) in item1" :k="index1">
              <div class="images_2">
                <el-tooltip class="item" effect="light" content="收藏" placement="top">
                  <img :src="item.src" alt="" @click="collect(item.id)">
                </el-tooltip>
                <h2>{{item.name}}</h2>
                <p>{{item.mark}}</p>
                <p style="font-weight: bold; color: darkred">{{'￥' + item.price}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import utils from '../../mixins/utils'

export default {
  name: 'show',
  mixins: [utils],
  data() {
    return {
      productData: [],
      productDataList: []
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
    }),
    ddLogin: {
      get() {
        return this.isLogin;
      },
      set(val) {
        this.SETLOGIN(val);
      },
    },
  },
  methods: {
    async collect (index) {
      const userId = window.localStorage.getItem('userPhone');
      if (userId === null || userId === 'null' || userId === '' || userId === undefined) {
        this.$message.error('收藏失败：请先登录或注册账号');
        return ''
      }
      const params = {
        id: this.productDataList[index - 1].id,
        userId: window.localStorage.getItem('userPhone'),
        state: 0
      };
      const res = await this.$http.put('product/collect', { params });
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        return ''
      }
      this.$message.error(res.data.msg);
    },
    async getImages () {
      const res = await this.$http.get('product/getImas');
      this.productDataList = res.data;
      let arrChild = [];
      if (res.status === 200) {
        for (let item of res.data) {
          let params = {
            src: item.src
          };
          const rest = await this.$http.get('product/getIma', { params });
          if (rest.data.code === 200) {
            item.src = this.bufferToUrl(rest.data.data.data);
          }
        }
        for (let i = 0; i < Math.ceil(res.data.length / 4); i ++) {
          arrChild = [];
          for (let j = 0; j < 4; j ++) {
            if (res.data[i * 4 + j] === undefined) {
              break;
            }
            arrChild.push(res.data[i * 4 + j]);
          }
          this.productData.push(arrChild)
        }
      }
    }
  },
  async mounted() {
    await this.getImages()
  }
};
</script>

<style lang="less" scoped>
.indexFrame {
  width: 100%;
  height: 200px;
  .top_image {
    width: 100%;
    height: 530px;
    background-image: url("../../assets/images/contact_bg.jpg");
    background-repeat: no-repeat;
    background-size: auto;
  }
  .product {
    background: #ffffff;
    width: 100%;
    padding-bottom: 110px;
    .product_content {
      margin: 0 auto;
      width: 1170px;
      height: 100%;
      .images {
        position: relative;
        top: 90px;
        display: flex;
        margin-bottom: 30px;
        .images_1 {
          display: flex;
          width: 270px;
          height: 364px;
          border: 1px solid #ccc;
          box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
          box-sizing: border-box;
          margin-right: 30px;
          .images_2 {
            position: relative;
            width: 250px;
            height: 100%;
            margin: 0 auto;
            img {
              margin-top: 8px;
              width: 100%;
              cursor: pointer;
            }
            img:hover {
              opacity: .5;
            }
            h2 {
              /*font-weight: 400;*/
              /*font-family: 微软雅黑;*/
              font-size: 16px;
              font-weight: bold;
              font-style: normal;
              color: rgb(102, 102, 102);
              background-color: transparent;
              line-height: 26px;
              text-decoration: none;
              text-align: left;
              visibility: visible;
              animation-name: bounceIn;
            }
            p {
              /*font-family: 微软雅黑;*/
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
}
</style>
