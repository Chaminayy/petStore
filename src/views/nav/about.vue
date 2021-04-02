<template>
  <div class="indexFrame">
    <div class="top_image"></div>
    <div class="product">
      <div class="product_content">
        <div class="product_title">
          <h2>联系我们</h2>
          <img src="../../assets/images/product_title.jpg" alt="">
        </div>
        <div class="about_content">
          <div class="info">
            <h2><i class="el-icon-phone-outline" style="margin-right: 15px"></i>联系电话： 13428711862</h2>
            <h2><i class="el-icon-message" style="margin-right: 15px"></i>联系邮箱： 99679479@qq.com</h2>
            <h2><i class="el-icon-location-outline" style="margin-right: 15px"></i>联系地址： 广东省深圳市福田区COCOPARK</h2>
          </div>
          <div class="order">
            <el-form label-width="80px" label-position="left" ref="ruleForm" :model="contactInfo" :rules="rules">
              <el-form-item label="姓名"  prop="userName">
                <el-input v-model.trim="contactInfo.userName"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="phoneNumber">
                <el-input v-model.trim="contactInfo.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="contactInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="预约时间" prop="orderTime">
                <el-date-picker
                  v-model="contactInfo.orderTime"
                  style="width: 100%"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="意见反馈" prop="remark">
                <el-input v-model="contactInfo.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'about',
  data() {
    return {
      contactInfo: {
        phoneNumber: '',
        userName: '',
        email: '',
        orderTime: '',
        remark: '',
      },
      rules: {
        phoneNumber: [
          { required: true, message: '请输入您的手机号',trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        userName: [
          { required: true, message: '请输入您的名字',trigger: 'blur' },
        ],
        orderTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      userInfo: 'userInfo'
    }),
    gIsLogin () {
      return this.isLogin
    },
    gUserInfo () {
      return this.userInfo
    },
  },
  methods: {
    async subscribe () {
      const params = {
        ...this.contactInfo,
        userId: window.localStorage.getItem('userPhone'),
        state: 1
      };
      const res = await this.$http.put('profiles/subscribe', { params });
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        this.resetForm('ruleForm');
        return '';
      }
      this.$message.error(res.data.msg);
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subscribe()
        } else {
          this.$message.warning('请填写完整信息')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
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
      .about_content {
        position: relative;
        top: 40px;
        margin-left: 100px;
        .info {
          padding: 0 300px 0 300px;
          margin: 40px 0 40px 0;
        }
        .order {
          padding: 0 400px 0 300px;
        }
      }
    }
  }
}
</style>
