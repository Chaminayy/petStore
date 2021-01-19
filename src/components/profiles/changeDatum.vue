<template>
  <div class="change-datum clearfix">
    <div class="change-datum_frame clearfix">
      <h3 class="title">
        <a :class="{ active: tag === 1 }" @click="tag = 1">基本信息</a>
        <a :class="{ active: tag === 2 }" @click="tag = 2">更改密码</a>
      </h3>
      <el-form
        v-if="tag === 1"
        v-loading="fullscreenLoading"
        label-position="top"
        label-width="80px"
        :model="profiles">
        <el-form-item class="logo">
          <img src="https://modao.cc/images/avatar.png" alt="">
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
          <el-input v-model="profiles.city" placeholder="请输入你所在的城市"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍" class="textarea">
          <el-input type="textarea" v-model="profiles.mark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保 存</el-button>
          <el-button>取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import utils from "../../mixins/utils";
export default {
  name: "changeDatum",
  mixins: [utils],
  data () {
    return {
      tag: 1,
      fullscreenLoading: false,
      profiles: {
        username: '',
        mark: '',
        birthday: '',
        email: '',
        occupation: '',
        city: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFO']),
    async save () {
      this.fullscreenLoading = true
      let params = {
        ...this.profiles
      }
      let phoneNumber = this.profiles['phone_number']
      delete params['phone_number']
      params.phoneNumber = phoneNumber
      console.log(params)
      const res = await this.$http.post('profiles/saveDatum', { params })
      if (res.data.code === 200) {
        this.$message.success(res.data.message)
        this.fullscreenLoading = false
        console.log(res.data.user)
        this.gUserInfo = res.data.user
      } else {
        this.$message.error(res.data.message)
        this.fullscreenLoading = false
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
    gUserInfo: {
      get () {
        return this.userInfo
      },
      set(val) {
        this.SETUSERINFO(val)
      }
    }
  },
  async mounted() {
    // console.log(res)
    // if (res.data.code === 200) {
    //   this.profiles = this.profilesFilter(res.data.profiles)
    //   this.fullscreenLoading = false
    // } else {
    //   this.$message.error(res.data.message)
    //   this.fullscreenLoading = false
    // }
    this.getUserInfo(true)
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
        }
      }
      .el-form-item {
        width: 300px;
        margin-bottom: 10px;
        .el-form-item__label {
          padding: 0;
        }
        .el-date-editor {
          width: 300px;
        }
      }
      .el-form-item:last-child {
        margin-top: 30px;
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
