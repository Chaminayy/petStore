<template>
  <div class="change-datum clearfix">
    <div class="change-datum_frame clearfix">
      <h3 class="title">
        <a :class="{ active: tag === 1 }" @click="tag = 1">基本信息</a>
        <a :class="{ active: tag === 2 }" @click="tag = 2">更改密码</a>
      </h3>
      <el-form
        class="profiles"
        v-show="tag === 1"
        v-loading="fullscreenLoading"
        label-position="top"
        label-width="80px"
        :model="profiles">
        <el-form-item class="logo">
          <label for="file" style="cursor: pointer">
            <el-tooltip class="item" effect="dark" content="更换头像" placement="right">
              <img :src="icon">
            </el-tooltip>
            <input type="file" hidden id="file" accept="image/*" @change="test($event)"/>
          </label>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="profiles.username" placeholder="请输入你的姓名"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="profiles.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="profiles.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="profiles.occupation" placeholder="请输入你的职业"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader :options="$t('province')" v-model="profiles.city" :props="{label: 'value'}"></el-cascader>
        </el-form-item>
        <el-form-item label="个人介绍" class="textarea">
          <el-input type="textarea" v-model="profiles.mark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保 存</el-button>
          <el-button @click="getUserInfo">取 消</el-button>
        </el-form-item>
      </el-form>
      <el-form
        class="change"
        v-show="tag === 2"
        v-loading="fullscreenLoading"
        label-position="top"
        label-width="80px"
        :rules="rules"
        ref="change"
        :model="change">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input type="password" v-model="change.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="change.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="newPasswordCheck">
          <el-input type="password" v-model="change.newPasswordCheck"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="profiles.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="authCode" prop="authCode">
          <el-input v-model="change.authCode" @change="authCodeCheck"></el-input>
          <el-button type="warning" @click="sendMail">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveChangeCheck('change')" :disabled="getIsSaveChange">保 存</el-button>
          <el-button type="primary" @click="resetForm('change')">重 置</el-button>
          <el-button @click="tag = 1">返 回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import axios from 'axios'
import utils from "../../mixins/utils";
export default {
  name: "changeDatum",
  mixins: [utils],
  data () {
    // 改密码时的验证
    let validatePass = (rule, value, callback) => {
      this.change.isSaveChange.password = true
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.change.newPasswordCheck !== '') {
          this.$refs.change.validateField('newPasswordCheck');
        }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      this.change.isSaveChange.password = true
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.change.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.change.isSaveChange.password = false
        callback();
      }
    }
    return {
      tag: 1,
      profiles: { // 更改资料的数据
        username: '',
        mark: '',
        birthday: '',
        email: '',
        occupation: '',
        city: []
      },
      change: { // 改密码的数据
        oldPassword: '',
        newPassword: '',
        newPasswordCheck: '',
        authCode: '',
        isSaveChange: { // 判断保存是否可以点时的密码判断
          password: true
        },
      },
      rules: { // 改密码的 form 表单的规则
        oldPassword: [
          { required: true, message: '请输入你的原始密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        newPasswordCheck: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      codeCheck: '', // 后端返回的验证码
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFO', 'SETAVATAR']),
    async test (event) {
      let formData = new FormData()
      formData.append('icon', event.target.files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const res = await this.$http.post(`profiles/avatar?phoneNumber=${this.profiles['phone_number']}`, formData, config)
      if (res.data.code === 200) {
        this.getAvatar(res.data.path, res.data.headName)
        this.$message.success(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 发送邮箱
    async sendMail (type = null) {
      this.fullscreenLoading = true
      let path = ''
      let params = {}
      path = 'api/forgetSendMail'
      params = {
        phoneNumber: this.profiles['phone_number'],
        email: this.profiles.email
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
    // 判断验证码的时候正确的提示框
    authCodeCheck () {
      if (+this.change.authCode !== +this.codeCheck) {
        this.$message.warning('请输入正确的验证码')
      }
    },
    // 判断是否可以更改密码之一
    saveChangeCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveChange()
        } else {
          return false;
        }
      });
    },
    // 保存更改密码的 action
    async saveChange () {
      this.fullscreenLoading = true
      let params = {
        phoneNumber: this.profiles['phone_number'],
        password: this.change.oldPassword,
        newPassword: this.change.newPassword
      }
      const res = await this.$http.post('profiles/changePassword', { params })
      if (res.data.code === 200) {
        this.$message.success(res.data.message)
        this.tag = 1
        this.fullscreenLoading = false
      } else {
        this.$message.error(res.data.message)
        this.fullscreenLoading = false
      }
    },
    // 清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 更改资料的 action
    async save () {
      this.fullscreenLoading = true;
      let params = {
        ...this.profiles
      };
      let phoneNumber = this.profiles['phone_number']
      delete params['phone_number']
      params.phoneNumber = phoneNumber
      const res = await this.$http.post('profiles/saveDatum', { params })
      if (res.data.code === 200) {
        this.$message.success(res.data.message)
        this.fullscreenLoading = false
        this.gUserInfo = res.data.user
      } else {
        this.$message.error(res.data.message)
        this.fullscreenLoading = false
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      avatar: 'avatar'
    }),
    getIsSaveChange () {
      return !(+this.change.authCode === this.codeCheck) || this.change.isSaveChange.password
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
      return this.gAvatar === '' ? require('../../assets/images/profile.png') : this.bufferToUrl(this.gAvatar.data)
    }
  },
  async mounted() {
    setTimeout(() => {
      this.getUserInfo(true)
    }, 0)
  }
}
</script>

<style lang="less" scoped>
.change-datum {
  height: 100%;
  .change-datum_frame {
    position: relative;
    width: 1024px;
    margin: 30px auto;
    padding: 32px 48px;
    font-size: 0.75rem;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 0 2px 7px 0 rgba(39,54,78,0.08);
    .title {
      font-size: 1rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid #f2f2f2;
      margin: 1.5rem 0 1rem;
      font-weight: 500;
      color: #415058;
      a {
        color: #415058;
      }
      a:first-child {
        padding-right: 30px;
        border-right: 1px solid #ccc;
      }
      a:last-child {
        margin-left: 30px;
      }
      .active {
        color: orange;
      }
    }
    /deep/ .el-form {
      .logo {
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        img:hover {
          opacity: 0.5;
        }
      }
      .el-form-item {
        width: 300px;
        margin-bottom: 10px;
        .el-form-item__label {
          padding: 0;
        }
        .el-cascader, .el-date-editor {
          width: 300px;
        }
        .el-button {
          margin-top: 10px;
        }
      }
      .authCode {
        .el-form-item__content {
          display: flex;
          .el-input, .el-button {
            display: flex;
            margin-top: 0;
          }
          .el-button {
            width: 112px;
            margin-left: 10px;
          }
        }
      }
      .textarea {
        width: 700px;
        .el-textarea {
          min-height: 55px
        }
      }
    }
  }
}
</style>
