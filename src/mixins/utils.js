import path from './path'

export default {
  mixins: [path],
  data () {
    return {
    }
  },
  methods: {
    bufferToUrl (data) {
      let bytes = new Uint8Array(data);
      let storeData = "";
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        storeData += String.fromCharCode(bytes[i]);
      }
      let imgUrl = "data:image/png;base64," + window.btoa(storeData);
      return imgUrl
    },

    async getUserInfo (loading = false) {
      if (loading) {
        this.fullscreenLoading = true
      }
      let phoneNumber = document.cookie.split('=')[1]
      let params = {
        phoneNumber
      }
      const res = await this.$http.get('profiles/changeDatum', { params })
      if (res.data.code === 200) {
        this.profiles = this.profilesFilter(res.data.profiles)
        if (loading) {
          this.fullscreenLoading = false
        }
      } else {
        this.$message.error(res.data.message)
        if (loading) {
          this.fullscreenLoading = false
        }
      }
    },

    profilesFilter (profiles) {
      for (let i in profiles) {
        if (profiles[i] === 'null') {
          profiles[i] = ''
        }
      }
      return profiles
    },
  }
}
