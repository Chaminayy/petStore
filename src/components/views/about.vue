<template>
  <div>
    <div v-if="gIsLogin">
      {{gUserInfo}}
    </div>
    <div v-else>
      <h1>hahhahahah</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'about',
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
};
</script>

<style scoped>

</style>
