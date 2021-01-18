<template>
  <div class="management clearfix">
    <div class="management_frame">
      <div class="main_content_box">
        <div class="left_side_of_main">
          <div class="author_inform_box">
            <div class="author_avatar_in_box">
              <img src="https://modao.cc/images/avatar.png" alt="">
            </div>
            <span>{{ userInfo.userName }}</span>
            <p class="author_sign_in_box">TA很神秘，什么都没有留下</p>
            <el-button>编辑资料</el-button>
          </div>
          <div class="author_interest_box">
            <div class="content_interest_box">
              <div class="content_left_box">
                <div class="following_div_box">
                  <span class="number_inner_box">0</span>
                  <span class="content_inner_box">我预约的</span>
                </div>
              </div>
              <div class="content_right_box">
                <div class="following_div_box">
                  <span class="number_inner_box">0</span>
                  <span class="content_inner_box">我收藏的</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_side_of_main">
          <div class="tags_bar_in_right">
            <div class="tags_in_bar" :class="{active: tag === 1}" @click="tag = 1">作品</div>
            <div class="tags_in_bar" :class="{active: tag === 2}" @click="tag = 2">收藏</div>
            <div class="tags_in_bar" :class="{active: tag === 3}" @click="tag = 3">关注</div>
          </div>
          <div class="source_list">
            <div class="blank_page_source_list"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "management",
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
    gUserInfo () {
      return this.userInfo
    }
  },
  data () {
    return {
      tag: 1
    }
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
        margin-left: 20px;
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
          .blank_page_source_list {
            width: 880px;
            height: 676px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>
