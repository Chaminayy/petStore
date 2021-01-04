<template>
  <div id="app">
    <div class="header-frame clearfix">
      <div class="nav">
        <div class="logo">
          <a class="titleIcon" @click="$goto('/index')"/>
        </div>
        <div class="list">
          <ul>
            <li @click="$goto('/show')">
              <span><a>宠物展示</a></span>
            </li>
            <li @click="$goto('/about')">
              <span><a>关于我们</a></span>
            </li>
            <li v-show="isLogin" @click="$goto('/order')">
              <span><a>订单中心</a></span>
            </li>
          </ul>
        </div>
        <div class="login" v-if="!isLogin">
          <ul id="login-menu">
            <li><a @click="loginShow = true">登录</a></li>
            <li><el-button @click="loginShow = true">免费注册</el-button></li>
          </ul>
        </div>
        <div class="workspace" v-else @click="userShowMore = !userShowMore">
          <div class="profile">
            <img src="./assets/images/profile.png">
            <i class="el-icon-arrow-down" v-show="!userShowMore"></i>
            <i class="el-icon-arrow-up" v-show="userShowMore"></i>
          </div>
          <div class="info-dropdown" v-show="userShowMore">
            <div class="dropdown-content">
              <a class="me" href="javascript: alert('我的主页')">
                <div class="user-wrapper">
                  <p class="user-name">{{userInfo.userName}}</p>
                  <p class="user-account">{{userInfo.userPhone}}</p>
                </div>
              </a>
              <ul class="dropdown-nav">
                <li v-for="(item, index) in dropdownNav" :key="index">
                  <a href="javascript:alert('点我干嘛')">{{item}}</a>
                </li>
              </ul>
              <ul class="dropdown-nav sign-out">
                <li><a @click="logout">退出登录</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-frame clearfix">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <footer class="footer-frame clearfix">
      <div class="bottom-layer-left">
        <p class="lh"><a href="javascript:;">关于沃尔马宠物店</a></p>
        <p class="lh"><a href="javascript:;">沃尔马宠物店营销</a></p>
        <p class="lh"><a href="javascript:;">意见反馈</a></p>
        <p class="lh"><a href="javascript:;">帮助中心</a></p>
        <p class="lh"><a href="javascript: alert('想投诉？臭傻逼');">投诉我们</a></p>
      </div>
      <div class="bottom-layer-right">
        <span class="lh">@2020&nbsp;Wal-Horse&nbsp;</span>
        <span class="lh">(粤)-经营性-2020-0202</span>
      </div>
    </footer>
    <el-dialog
      class="dia_Action"
      width="20%"
      :close-on-click-modal="false"
      :visible.sync="loginShow"
      @close="loginShow = false"
      center>
      <h2 class="login_title">登录</h2>
      <div class="login">
        <el-input
          prefix-icon="el-icon-user"
          v-model="user.phoneNumber"
          placeholder="请输入您的账号"></el-input>
      </div>
      <div class="login">
        <el-input
          prefix-icon="el-icon-lock"
          v-model="user.password"
          placeholder="请输入您的密码"
          type="password"></el-input>
      </div>
      <div class="loginBtn">
        <span slot="footer">
          <el-button type="primary" @click="loginChecked">登 录</el-button>
        </span>
      </div>
      <div class="footerFun">
        <div class="register">
          <span><a href="javascript: alert('注册账号')">注册账号</a></span>
        </div>
        <div class="forget">
          <span><a href="javascript: alert('忘记密码')">忘记密码</a></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from './mixins/path';
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  mixins: [path],
  data() {
    return {
      isLogin: false,
      loginShow: false,
      userShowMore: false,
      user: {
        phoneNumber: '',
        password: '',
      },
      userInfo: {},
    };
  },
  methods: {
    ...mapMutations(['SETLOGIN']),
    async loginChecked () {
      if (this.user.phoneNumber === '') {
        this.$message.error('请输入您的账号');
        return '';
      }
      if (this.user.password === '') {
        this.$message.error('请输入您的密码');
        return '';
      }
      const params = {
        phoneNumber: this.user.phoneNumber,
        password: this.user.password,
      };
      this.login(params)
    },
    async login (params, hint = true) {
      console.log(this.Login)
      const res = await this.$http.post('', {
        params,
      });
      if (res.data.code === 200) {
        this.userInfo = res.data.user;
        if (hint === true) {
          this.$message.success(res.data.message);
        }
        this.isLogin = true;
        this.loginShow = false;
        console.log(params)
        this.handleStorage('set', params)
      } else {
        if (hint === true) {
          this.$message.error(res.data.message);
        }
      }
    },
    logout () {
      this.isLogin = false;
      this.userShowMore = false;
      this.$goto('/')
      this.handleStorage('set')
    },
    handleStorage (type, params = { phoneNumber: null, password: null }) {
      if (type === 'set') {
        window.localStorage.setItem('phoneNumber', params.phoneNumber)
        window.localStorage.setItem('password', params.password)
        return '';
      } else {
        return {
          phoneNumber: window.localStorage.getItem('phoneNumber'),
          password: window.localStorage.getItem('password')
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      Login: 'Login'
    }),
    ddLogin: {
      get () {
        return this.Login
      },
      set (val) {
        this.SETLOGIN(val)
      }
    },
    dropdownNav() {
      return ['我的主页', '账号管理', '福利中心'];
    },
  },
  async mounted() {
    if (window.localStorage.getItem('phoneNumber') !== null && window.localStorage.getItem('password') !== null) {
      const params = this.handleStorage('get')
      this.login(params, false)
    }
    console.log(this.ddLogin)
    this.ddLogin = 'shit'
    console.log(this.ddLogin)
  }
};
</script>

<style lang="less" scoped>
  .header-frame {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    z-index: 1000;
    .nav {
      width: 100%;
      height: 60px;
      background: #E8E7E3;
      .logo {
        margin-left: 30px;
        float: left;
        width: 130px;
        font-size: 24px;
        color: #fff;
        height: 60px;
        line-height: 60px;
        text-align: center;
        .titleIcon {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: url("./assets/images/titleIcon.png");
          background-size: 60px;
        }
      }
      .list {
        ul {
          li {
            height: 57px;
            line-height: 57px;
            float: left;
            width: 120px;
            text-align: center;
            cursor: pointer;
            span {
              font-size: 16px;
              a {
                color: #415058;
              }
            }
          }
          li:hover {
            border-bottom: 3px solid #B3C0D1;
          }
        }
      }
      .login {
        flex: 1 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        white-space: nowrap;
        #login-menu {
          display: flex;
          align-items: center;
          margin-right: 30px;
          li {
            margin-left: 20px;
            a {
              font-size: 15px;
              color: #415058;
            }
            /deep/ .el-button {
              background: #db5151;
              border: none;
              list-style: none;
              color: #fff;
            }
          }
        }
      }
      .workspace {
        flex: 1 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        white-space: nowrap;
        margin-right: 50px;
        cursor: pointer;
        .profile {
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            margin-right: 5px;
          }
        }
        .profile:hover {
          opacity: 0.5;
        }
      }
      .info-dropdown {
        position: absolute;
        background: black;
        width: 230px;
        top: 60px;
        font-size: 12px;
        .dropdown-content {
          font-size: 14px;
          border-radius: 2px;
          background: #fff;
          .me {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 16px;
            height: 64px;
            background-color: #5b6b73;
            border-radius: 2px 2px 0 0;
            color: #fff;
            cursor: pointer;
            .user-wrapper {
              flex-grow: 1;
              width: 0;
              .user-name {
                font-weight: 500;
                line-height: 1;
                max-width: none;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 150px;
              }
              .user-account {
                font-size: 12px;
                line-height: 1.6;
                color: #c8cdd1;
              }
            }
          }
          .dropdown-nav {
            padding: 6px 0;
            li {
              height: 32px;
              a {
                display: flex;
                padding: 0 16px;
                width: 100%;
                height: 100%;
                align-items: center;
                color: #415058;
              }
              a:hover {
                background-color: #f6f7f8;
                color: #298df8;
              }
            }
          }
          .sign-out {
            border-top: 1px solid #dedee4;
            li {
              height: 32px;
              margin: 0;
              a {
                display: flex;
                padding: 0 16px;
                width: 100%;
                height: 100%;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
  .content-frame {
    position: relative;
    float: inherit;
    width: 100%;
    height: 1000px;
    margin: 0 auto;
    padding: 65px 0 45px;
    max-width: 1200px;
    min-width: 768px;
    .content {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      background: #fff;
    }
  }
  .footer-frame {
    width: 100%;
    min-width: 1250px;
    position: fixed;
    z-index: 302;
    bottom: 0;
    left: 0;
    height: 40px;
    overflow: hidden;
    zoom: 1;
    margin: 0;
    background: #fbfbfb;
    text-align: left;
    line-height: 40px;
    .bottom-layer-left {
      float: left;
      .lh {
        display: inline;
        margin-right: 20px;
        a {
          color: #9195a3;
        }
        a:hover {
          color: #222;
        }
      }
      .lh:first-child {
        margin-left: 24px;
      }
    }
    .bottom-layer-right {
      float: right;
      color: #bbb;
      .lh {
        display: inline;
        margin-right: 20px;
      }
      .lh:last-child {
        margin-right: 25px;
      }
    }
  }
  .dia_Action {
    /deep/ .el-dialog__body {
      padding: 25px 25px 10px;
      .login_title {
        text-align: center;
        margin-top: 0;
        margin-bottom: 40px;
      }
      .login {
        height: 45px;
        margin: 20px auto;
      }
      .loginBtn {
        margin: 30px auto;
        .el-button {
          text-align: center;
          width: 100% !important;
        }
      }
      .footerFun {
        display: flex;
        margin: 0 auto 30px auto;
        justify-content: space-between;
        .register {
          width: 60px;
          height: 20px;
          display: flex;
        }
        .forget {
          width: 60px;
          height: 20px;
          display: flex;
          span {
            margin-left: 4px;
          }
        }
      }
    }
  }
</style>
