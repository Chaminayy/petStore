<template>
  <div id="app">
    <div class="header-frame clearfix dark-theme">
      <div class="nav" style="visibility: hidden">
        <div class="logo">
          <a class="titleIcon" @click="$goto('/index')"/>
        </div>
        <div class="list">
          <ul>
            <li @click="$goto('/show')">
              <span><a>{{$t('common.aniShow')}}</a></span>
            </li>
            <li @click="$goto('/about')">
              <span><a>{{$t('common.aboutUs')}}</a></span>
            </li>
            <li v-show="gIsLogin" @click="$goto('/order')">
              <span><a>{{$t('common.orderCenter')}}</a></span>
            </li>
          </ul>
        </div>
        <div class="login" v-if="!gIsLogin">
          <ul id="login-menu">
            <li><a @click="handleDialog(1)">{{$t('common.login')}}</a></li>
            <li><el-button @click="handleDialog(2)">{{$t('common.freeRegister')}}</el-button></li>
          </ul>
        </div>
        <div class="workspace" v-else>
          <div class="profile"  @click="userShowMore = !userShowMore">
            <img :src="icon" alt="">
            <i class="el-icon-arrow-down" v-show="!userShowMore"></i>
            <i class="el-icon-arrow-up" v-show="userShowMore"></i>
          </div>
          <transition name="el-zoom-in-top">
            <div class="info-dropdown" v-show="userShowMore">
              <div class="dropdown-content">
                <a class="me" @click="$goto('management')">
                  <div class="user-wrapper">
                    <p class="user-name">{{gUserInfo.userName}}</p>
                    <p class="user-account">{{gUserInfo.userPhone}}</p>
                    <a class="el-icon-arrow-right arrow"></a>
                  </div>
                </a>
                <ul class="dropdown-nav">
                  <li v-for="(item, index) in $t('common.dropdownNav')" :key="index">
                    <a @click="$goto(item.path)">{{item.title}}</a>
                  </li>
                </ul>
                <ul class="dropdown-nav sign-out">
                  <li><a @click="confirm('退出登录，是否确定？', logout)">{{$t('common.outLog')}}</a></li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="content-frame clearfix" @click="userShowMore = false">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <footer class="footer-frame clearfix" @click="userShowMore = false">
      <div class="bottom-layer-left">
        <p class="lh"><a href="javascript:;">{{$t('common.leftMark1')}}</a></p>
        <p class="lh"><a href="javascript:;">{{$t('common.leftMark2')}}</a></p>
        <p class="lh"><a href="javascript:;">{{$t('common.leftMark3')}}</a></p>
        <p class="lh"><a href="javascript:;">{{$t('common.leftMark4')}}</a></p>
        <p class="lh"><a href="javascript: alert('想投诉？臭傻逼');">{{$t('common.leftMark5')}}</a></p>
      </div>
      <div class="bottom-layer-right">
        <span class="lh">{{$t('common.rightMark1')}}</span>
        <span class="lh">{{$t('common.rightMark2')}}</span>
      </div>
    </footer>
    <el-dialog
      class="dia_Action"
      width="20%"
      v-loading="fullscreenLoading"
      :close-on-click-modal="false"
      :visible.sync="loginShow"
      @closed="closeDialog"
      center>
      <div v-show="tag === 1">
        <h2 class="login_title">{{$t('common.login')}}</h2>
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
            <el-button type="primary" @click="loginChecked">{{$t('common.login1')}}</el-button>
          </span>
        </div>
        <div class="footerFun">
          <div class="register">
            <span><a @click="tag = 2">{{$t('common.register3')}}</a></span>
          </div>
          <div class="forget">
            <span><a @click="tag = 3">{{$t('common.forgetPassword')}}</a></span>
          </div>
        </div>
      </div>
      <div v-show="tag === 2">
        <h2 class="login_title">{{$t('common.register')}}</h2>
        <div class="login">
          <el-input
            type="number"
            prefix-icon="el-icon-user"
            v-model="registerInfo.phoneNumber"
            @input="checkPhone"
            placeholder="请输入您的账号"></el-input>
        </div>
        <div class="login">
          <el-input
            prefix-icon="el-icon-user"
            v-model="registerInfo.username"
            placeholder="请输入您的用户名"></el-input>
        </div>
        <div class="login">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registerInfo.password"
            @blur="passwordCheck(null)"
            placeholder="请输入您的密码"
            type="password"></el-input>
        </div>
        <div class="login">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registerInfo.checkPassword"
            @blur="passwordCheck(null)"
            placeholder="请再次输入您的密码"
            type="password"></el-input>
        </div>
        <div class="login">
          <el-input
            prefix-icon="el-icon-message"
            v-model="registerInfo.email"
            placeholder="请再次输入您的邮箱"
          ></el-input>
        </div>
        <div class="code_check">
          <el-input
            prefix-icon="el-icon-bank-card"
            v-model="registerInfo.code"
            placeholder="验证码">
          </el-input>
          <el-button
            type="warning"
            @click="sendMail(null)"
            :disabled="!registerInfo.email.length > 0"
            >{{$t('common.sendBtn')}}</el-button>
        </div>
        <div class="loginBtn">
          <span slot="footer">
            <el-button type="primary" @click="register" :disabled="registerDisabled">{{$t('common.register1')}}</el-button>
          </span>
        </div>
      </div>
      <div v-show="tag === 3">
        <h2 class="login_title">{{$t('common.findPassword')}}</h2>
        <div class="login">
          <el-input
            prefix-icon="el-icon-user"
            v-model="forgetUser.phoneNumber"
            placeholder="请输入您的账号"></el-input>
        </div>
        <div class="login">
          <el-input
            prefix-icon="el-icon-message"
            v-model="forgetUser.email"
            placeholder="请输入您的注册邮箱"></el-input>
        </div>
        <div class="code_check">
          <el-input
            prefix-icon="el-icon-bank-card"
            v-model="forgetUser.code"
            placeholder="验证码">
          </el-input>
          <el-button
            type="warning"
            @click="sendMail('forget')"
            :disabled="!forgetUser.email.length > 0"
          >{{$t('common.sendBtn')}}</el-button>
        </div>
        <div class="loginBtn">
          <span slot="footer">
            <el-button type="primary" @click="tag = 4" :disabled="forgetUser.code === '' || +forgetUser.code !== +codeCheck">{{$t('common.nextStep')}}</el-button>
          </span>
        </div>
      </div>
      <div v-show="tag === 4">
        <h2 class="login_title">{{$t('common.resetPassword')}}</h2>
        <div class="login">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="forgetUser.password"
            placeholder="请输入您的密码"
            type="password"></el-input>
        </div>
        <div class="login">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="forgetUser.newPassword"
            @blur="passwordCheck('forget')"
            placeholder="请再次输入您的新密码"
            type="password"></el-input>
        </div>
        <div class="loginBtn">
          <span slot="footer">
            <el-button type="primary" @click="forgetSure" :disabled="forgetUser.password === '' || forgetUser.newPassword === '' || forgetUser.password !== forgetUser.newPassword">{{$t('common.sure')}}</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import utils from "./mixins/utils";

export default {
  name: 'App',
  mixins: [utils],
  data() {
    return {
      tag: 1, // dialog 弹窗当前显示的部分
      // isLogin: false,
      loginShow: false, // 登录注册弹窗显示
      userShowMore: false, // 登录之后的头像部分弹窗显示
      isCheckPhone: false, // 密码检验判断
      isCheckPassword: false,
      visible: false,
      fullscreenLoading: false, // 加载
      codeCheck: '', // 验证码判断
      user: { // 登陆时的用户信息
        phoneNumber: '',
        password: '',
      },
      registerInfo: { // 注册时的用户信息
        phoneNumber: '',
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        code: ''
      },
      forgetUser: { // 注册部分的数据
        phoneNumber: '',
        email: '',
        password: '',
        newPassword: '',
        code: ''
      },
      profiles: {},
    };
  },
  methods: {
    ...mapMutations(['SETLOGIN', 'SETUSERINFO', 'SETAVATAR']),
    // 找回密码最后一步操作
    async forgetSure () {
      if (this.forgetUser.password !== this.forgetUser.newPassword) {
        this.$message.error(this.$t('registerHint1'))
        return ''
      }
      let params = {
        phoneNumber: this.forgetUser.phoneNumber,
        password: this.forgetUser.password,
        newPassword: this.forgetUser.newPassword
      }
      const res = await this.$http.post('api/forget', { params })
      if (res.data.code === 200) {
        this.$message.success(res.data.message)
        this.tag = 1
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 关闭弹窗后初始化
    closeDialog () {
      this.loginShow = false
      this.tag = 1
      this.user.password = ''
      this.user.phoneNumber = ''
      this.codeCheck = ''
      for (let i in this.forgetUser) {
        this.forgetUser[i] = ''
      }
    },
    // 打开弹窗
    handleDialog (num) {
      this.loginShow = true
      this.tag = num
    },
    // 检测账号是否存在
    async checkPhone () {
      if (this.registerInfo.phoneNumber !== '') {
        let params = {
          phoneNumber: this.registerInfo.phoneNumber
        }
        const res = await this.$http.post('api/registerCheck', { params })
        if (res.data.code === 500) {
          this.$message.error(res.data.message)
          this.isCheckPhone = false
          return ''
        }
        this.isCheckPhone = true
      }
    },
    // 检测两次输入的密码是否一致
    passwordCheck (type = null) {
      if (type === null) {
        if (this.registerInfo.password !== this.registerInfo.checkPassword) {
          this.isCheckPassword = false
          this.$message.error(this.$t('common.registerHint1'))
          return ''
        }
        if (this.registerInfo.password === '' && this.registerInfo.checkPassword === '') {
          this.isCheckPhone = false
          return ''
        }
        this.isCheckPassword = true
      } else {
        if (this.forgetUser.newPassword !== this.forgetUser.password) {
          this.$message.error(this.$t('common.registerHint1'))
        }
      }
    },
    // 发送邮箱
    async sendMail (type = null) {
      this.fullscreenLoading = true
      let path = ''
      let params = {}
      if (type === null) {
        path = 'api/sendMail'
        params = {
          email: this.registerInfo.email
        }
      } else {
        path = 'api/forgetSendMail'
        params = {
          phoneNumber: this.forgetUser.phoneNumber,
          email: this.forgetUser.email
        }
      }
      const res = await this.$http.post(path, { params })
      if (res.data.code === 200) {
        this.fullscreenLoading = false
        this.$message.success(res.data.message)
        this.codeCheck = res.data.authCode
      } else {
        this.fullscreenLoading = false
        this.$message.error(res.data.message)
      }
    },
    // 注册账号
    async register () {
      for (let i in this.registerInfo) {
        if(this.registerInfo[i] === '') {
          this.$message.error(this.$t('common.registerHint2'))
          return ''
        }
      }
      let params = {
        ...this.registerInfo
      }
      const res = await this.$http.post('api/register', { params })
      if (res.data.code === 200) {
        this.$message.success(res.data.message)
        this.tag = 1
        for (let i in this.registerInfo) {
          this.registerInfo[i] = ''
        }
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 登录时用户信息的判断
    loginChecked () {
      if (this.user.phoneNumber === '') {
        this.$message.error(this.$t('common.loginHint1'));
        return '';
      }
      if (this.user.password === '') {
        this.$message.error(this.$t('common.loginHint2'));
        return '';
      }
      const params = {
        phoneNumber: this.user.phoneNumber,
        password: this.user.password,
      };
      this.login(params);
    },
    // 登录功能
    async login(params) {
      const res = await this.$http.post('api/login', {
        params,
      });
      if (res.data.code === 200) {
        document.cookie = `phoneNumber = ${res.data.user.userPhone}`
        this.gUserInfo = res.data.user;
        this.$message.success(res.data.message);
        this.gIsLogin = true;
        this.loginShow = false;
        this.handleStorage('set', res.data.user);
        this.getUserInfo(true)
      } else {
        this.$message.error(res.data.message);
      }
    },
    // 退出登录后回到首页
    logout() {
      this.gIsLogin = false;
      this.userShowMore = false;
      this.$goto('/');
      this.handleStorage('set');
    },
    // 处理页面刷新时的token
    handleStorage(type, params = { token: null, userPhone: null }) {
      if (type === 'set') {
        window.localStorage.setItem('token', params.token);
        window.localStorage.setItem('userPhone', params.userPhone);
        return '';
      }
      return {
        token: window.localStorage.getItem('token'),
        userPhone: window.localStorage.getItem('userPhone'),
      };
    },
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      userInfo: 'userInfo',
      avatar: 'avatar'
    }),
    registerDisabled () {
      return !(this.isCheckPhone && this.isCheckPassword)
    },
    // 设置全局登录状态
    gIsLogin: {
      get () {
        return this.isLogin;
      },
      set(val) {
        this.SETLOGIN(val);
      },
    },
    gUserInfo: {
      get () {
        return this.userInfo
      },
      set(val) {
        this.SETUSERINFO(val)
      }
    },
    icon () {
      return this.gAvatar === '' ? require('./assets/images/profile.png') : this.bufferToUrl(this.gAvatar.data)
    }
  },
  // 元素挂载完后判断是否登录
  async created() {
    const userInfoLog = this.handleStorage('get')
    if (userInfoLog.token === 'null' || userInfoLog.token === null) {
      this.loginShow = true;
    } else {
      const params = {
        token: userInfoLog.token,
        phoneNumber: userInfoLog.userPhone,
      }
      const res = await this.$http.post('api/loginCheck'  , { params })
      if (res.data.code === 200) {
        this.gUserInfo = res.data.user;
        this.gIsLogin = true;
        this.loginShow = false;
        setTimeout(() => {
          this.getUserInfo(true)
        },500)
      } else {
        this.$message.error(res.data.message);
      }
    }
  },
  mounted() {
    document.onkeydown = async event => {
      const theEvent = event || window.event;
      const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code === 13) {
        if (this.loginShow === true && this.tag === 1) {
          await this.loginChecked()
        }
      }
    };
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
      background: rgb(56, 40, 41);
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
          display: flex;
          width: 100px;
          height: 60px;
          background: url("./assets/images/logo.png") no-repeat 7px;
          background-size: 93px;
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
                color: #fff;
              }
            }
          }
          li:hover {
            a {
              color: rgb(246, 171, 74);
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
              color: #fff;
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
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        flex: 1 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        white-space: nowrap;
        margin-right: 50px;
        .profile {
          cursor: pointer;
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        .profile:hover {
          opacity: 0.5;
        }
      }
      .info-dropdown {
        position: absolute;
        width: 230px;
        top: 62px;
        font-size: 12px;
        .dropdown-content {
          border-radius: 8px;
          font-size: 14px;
          background: #fff;
          .me {
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            height: 50px;
            background-color: #5b6b73;
            color: #fff;
            cursor: pointer;
            .user-wrapper {
              position: relative;
              flex-grow: 1;
              width: 0;
              .user-name {
                padding-top: 4px;
                font-weight: 500;
                line-height: 1;
                max-width: none;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 150px;
                margin-bottom: 7px;
              }
              .user-account {
                font-size: 12px;
                line-height: 1.6;
                color: #c8cdd1;
              }
              .arrow {
                position: absolute;
                display: block;
                top: 14px;
                right: 10px;
                color: #8d9ea6;
              }
            }
          }
          .me:hover {
            text-decoration: none;
            background-color: #415058;
            opacity: 1;
          }
          .dropdown-nav {
            padding: 6px 0;
            li {
              height: 32px;
              a {
                box-sizing: border-box;
                display: flex;
                padding-left: 16px;
                width: 100%;
                height: 100%;
                align-items: center;
                color: #415058;
              }
              a:hover {
                background-color: #f6f7f8;
                color: #f6ab4a;
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
    margin: 0 auto;
    padding: 60px 0 45px;
    /*max-width: 1200px;*/
    /*min-width: 768px;*/
    .content {
      border-radius: 5px;
      width: 100%;
      height: 100%;
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
      .code_check {
        display: flex;
        /deep/ .el-input {
          margin-right: 20px;
        }
      }
      .loginBtn {
        margin: 30px auto;
        .el-button {
          text-align: center;
          /*width: 285px !important;*/
          width: 100%;
        }
      }
      .footerFun {
        /*width: 285px;*/
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
