<template>
  <div id="app">
    <div class="header-frame clearfix">
      <div class="nav">
        <div class="logo">
          <a class="titleIcon" href="javascript: alert('回到首页了')" />
        </div>
        <div class="list">
          <ul>
            <li>
              <span><a href="javascript: alert('宠物展示页面')">宠物展示</a></span>
            </li>
            <li>
              <span><a href="javascript: alert('关于我们页面')">关于我们</a></span>
            </li>
            <li v-show="isLogin">
              <span><a href="javascript: alert('订单中心页面')">订单中心</a></span>
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
                  <p class="user-name">陈朝鸿</p>
                  <p class="user-account">13428711862</p>
                </div>
              </a>
              <ul class="dropdown-nav">
                <li><a href="">我的主页</a></li>
                <li><a href="">账号管理</a></li>
                <li><a href="">福利中心</a></li>
              </ul>
              <ul class="dropdown-nav sign-out">
                <li><a @click="isLogin = false">退出登录</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <el-button type="primary" @click="login">登 录</el-button>
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
  import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      isLogin: false,
      loginShow: false,
      userShowMore: false,
      user: {
        phoneNumber: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      if (this.user.phoneNumber === '') {
        this.$message.error('请输入您的账号')
        return ''
      }
      if (this.user.password === '') {
        this.$message.error('请输入您的密码')
        return ''
      }
      const params = {
        phoneNumber: this.user.phoneNumber,
        password: this.user.password
      }
      const res = await axios.post('http://localhost:3000/', {
        params
      })
      if (res.data.code === 200) {
        this.isLogin = true
        this.$message.success(res.data.message)
        this.loginShow = false
      } else {
        this.$message.error(res.data.message)
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .header-frame {
    display: block;
    .nav {
      width: 100%;
      height: 60px;
      background-color: #B3C0D1;
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
            border-bottom: 3px solid #B3C0D1;
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
  .dia_Action {
    /deep/ .el-dialog__body {
      padding: 25px 25px 10px;
      .login_title {
        text-align: center;
        margin-top: 0;
        margin-bottom: 40px;
      }
      .login {
        width: 284px;
        height: 45px;
        margin: 20px auto;
      }
      .loginBtn {
        width: 285px;
        margin: 30px auto;
        .el-button {
          text-align: center;
          width: 285px !important;
        }
      }
      .footerFun {
        width: 285px;
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
