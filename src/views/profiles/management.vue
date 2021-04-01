<template>
  <div class="management clearfix">
    <div class="management_frame">
      <div class="main_content_box">
        <div class="left_side_of_main">
          <div class="author_inform_box">
            <div class="author_avatar_in_box">
              <img :src="icon" alt="">
            </div>
            <span>{{ userInfo.userName }}</span>
            <p class="author_sign_in_box">{{getUserMark}}</p>
            <el-button @click="$goto('/changeDatum')">编辑资料</el-button>
          </div>
          <div class="author_interest_box">
            <div class="content_interest_box">
              <div class="content_left_box">
                <div class="following_div_box">
                  <span class="number_inner_box"><a @click="tag = 2" style="color: #cf9236">{{ profiles.collectLen }}</a></span>
                  <span class="content_inner_box">我收藏的</span>
                </div>
              </div>
              <div class="content_right_box">
                <div class="following_div_box">
                  <span class="number_inner_box"><a @click="tag = 3" style="color: #cf9236">{{ profiles.attentionLen}}</a></span>
                  <span class="content_inner_box">我关注的</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_side_of_main">
          <div class="tags_bar_in_right">
            <div class="tags_in_bar" :class="{active: tag === 1}" @click="tag = 1">预约</div>
            <div class="tags_in_bar" :class="{active: tag === 2}" @click="tag = 2">收藏</div>
            <div class="tags_in_bar" :class="{active: tag === 3}" @click="tag = 3">关注</div>
          </div>
          <div class="source_list" v-show="tag === 2">
            <div class="collection_source_list">
              <div class="template-list-container">
                <a v-for="(item, index) in collectList" :key="index">
                  <div class="templateCover">
                    <el-tooltip class="item" effect="light" content="取消收藏" placement="top">
                      <img :src="item.src" @click="cancelCollect(item.id)">
                    </el-tooltip>
                    <h2>{{ item.name }}</h2>
                    <p>{{ item.remark }}</p>
                  </div>
                </a>
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
import utils from "../../mixins/utils";

export default {
  name: "management",
  mixins: [utils],
  data () {
    return {
      tag: 1,
      fullscreenLoading: false,
      collectList: [],
      profiles: {
      },
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
    gUserInfo () {
      return this.userInfo
    },
    getUserMark () {
      if (this.profiles.mark === '' || this.profiles.mark === null) {
        return 'TA很神秘，什么都没有留下'
      }
      return this.profiles.mark
    },
    icon () {
      return this.gAvatar === '' ? require('../../assets/images/profile.png') : this.bufferToUrl(this.gAvatar.data)
    }
  },
  methods: {
    async cancelCollect (index) {
      const params = {
        id: index,
        state: 1,
        userId: window.localStorage.getItem('userPhone'),
      };
      const res = await this.$http.put('product/collect', { params });
      if (res.data.code === 200) {
        await this.init();
        this.$message.success(res.data.msg);
        return ''
      }
      this.$message.error(res.data.msg);
    },
    initProfiles() {
      this.profiles.collectLen = this.profiles.collect === null || this.profiles.collect === '' ? 0 : this.profiles.collect.split(',').length;
      this.profiles.attentionLen = this.profiles.attention === null || this.profiles.attention === ''  ? 0 : this.profiles.attention.split(',').length;
    },
    async getCollectData () {
      this.collectList = [];
      const res = await this.$http.get('product/getImas');
      if (res.status === 200 && this.profiles.collect !== '') {
        for (let item of this.profiles.collect.split(',')) {
          const params = {
            src: res.data[item - 1].src,
          };
          const arr = {
            id: item,
            remark: res.data[item - 1].mark,
            name: res.data[item - 1].name
          };
          const rest = await this.$http.get('product/getIma', { params });
          if (rest.data.code === 200) {
            arr.src = this.bufferToUrl(rest.data.data.data)
          }
        this.collectList.push(arr)
        }
      }
    },
    async init () {
      await this.getUserInfo(true);
      this.initProfiles();
      await this.getCollectData()
    }
  },
  async mounted() {
    await this.init()
  }
}
</script>

<style lang="less" scoped>
.management {
  height: 100%;
  .management_frame {
    margin: 0 auto;
    max-width: 1200px;
    min-width: 768px;
    height: 100%;
    .main_content_box {
      margin-top: 120px;
      display: flex;
      flex-direction: row;
      -webkit-box-pack: center;
      justify-content: center;
      position: relative;
      z-index: 10;
      .left_side_of_main {
        display: flex;
        flex-direction: column;
        width: 280px;
        .author_inform_box {
          background: rgb(255, 255, 255);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          margin-bottom: 17px;
          .author_avatar_in_box {
            width: 120px;
            height: 120px;
            margin-top: -60px;
            position: relative;
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
              border-radius: 50%;
              border: 4px solid white;
            }
          }
          span {
            margin-top: 39px;
            font-size: 28px;
            font-weight: 500;
            line-height: 40px;
            padding: 0px 20px;
            word-break: break-word;
            text-align: center;
          }
          .author_sign_in_box {
            margin-top: 10px;
            font-size: 12px;
            line-height: 17px;
            color: rgb(125, 139, 148);
            padding: 0px 20px;
            word-break: break-word;
          }
          /deep/ .el-button {
            margin: 30px 0;
            width: 90%;
          }
        }
        .author_interest_box {
          .following_div_box {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            flex-direction: column;
            .number_inner_box {
              font-size: 24px;
              line-height: 28px;
              font-weight: 600;
              color: rgb(65, 80, 88)
            }
            .content_inner_box {
              font-size: 12px;
              line-height: 17px;
              color: rgb(125, 139, 148);
            }
          }
          padding: 24px 46px;
          background: rgb(255, 255, 255);
          border-radius: 8px;
          .content_interest_box {
            display: flex;
            .content_left_box {
              border-right: 1px solid rgb(232, 232, 232);
              align-items: flex-start;
              display: flex;
              flex-direction: column;
              width: 93px;
            }
            .content_right_box {
              align-items: flex-end;
              display: flex;
              flex-direction: column;
              width: 93px;
              text-align: end;
            }
          }
        }
      }
      .right_side_of_main {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        .tags_bar_in_right {
          width: 880px;
          height: 64px;
          background: rgb(255, 255, 255);
          border-radius: 8px;
          display: flex;
          padding: 20px 0px 0px 16px;
          .tags_in_bar {
            width: 134px;
            height: 44px;
            font-size: 18px;
            line-height: 25px;
            font-weight: 500;
            margin-right: 32px;
            text-align: center;
            cursor: pointer;
          }
          .active {
            color: rgb(22, 132, 252);
            border-bottom: 3px solid rgb(22, 132, 252)
          }
        }
        .source_list {
          width: 880px;
          height: auto;
          .collection_source_list {
            .template-list-container {
              padding-bottom: 40px;
              display: grid;
              list-style: none;
              grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
              gap: 40px 32px;
              margin-top: 24px;
              a {
                height: 243px;
                cursor: pointer;
                transform: translate3d(0px, 0px, 0px);
                margin-bottom: 100px;
                .templateCover {
                  height: 100%;
                  position: relative;
                  border-radius: 8px;
                  transition: all 0.15s ease-in-out 0s;
                  img {
                    width: 100%;
                    height: auto;
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
            }
          }
        }
      }
    }
  }
}
</style>
