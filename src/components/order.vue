<template>
  <div class="order clearfix">
    <div class="order_frame">
      {{gIsLogin}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'order',
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
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  height: 100%;
  .order_frame {
    margin: 0 auto;
    max-width: 1200px;
    min-width: 768px;
    height: 100%;
    background: #ffffff;
  }
}
</style>
