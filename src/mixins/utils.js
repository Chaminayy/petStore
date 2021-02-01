import path from './path';
import { mapGetters, mapMutations } from "vuex";

export default {
  mixins: [path],
  data () {
    return {
      fullscreenLoading: false, // 是否显示加载状态
    }
  },
  computed: {
    ...mapGetters({
      avatar: 'avatar'
    }),
    gAvatar: {
      get () {
        return this.avatar
      },
      set (val) {
        this.SETAVATAR(val)
      }
    },
  },
  methods: {
    ...mapMutations(['SETAVATAR']),
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

    async getUserInfo (loading = false, isGetAvatar = true) {
      if (loading) {
        this.fullscreenLoading = true
      }
      let phoneNumber = '';
      for (let item of document.cookie.split(';')) {
        if (item.includes('phoneNumber')) {
          phoneNumber = item.split('=')[1]
        }
      }
      let params = {
        phoneNumber
      };
      const res = await this.$http.get('profiles/changeDatum', { params })
      if (res.data.code === 200) {
        this.profiles = this.profilesFilter(res.data.profiles)
        if (loading) {
          this.fullscreenLoading = false
          if (res.data.profiles['head_name'] !== null) {
            this.getAvatar(res.data.profiles['head_path'], res.data.profiles['head_name'])
          }
        }
      } else {
        this.$message.error(res.data.message)
        if (loading) {
          this.fullscreenLoading = false
        }
      }
    },

    async getAvatar (path, headName) {
      let params = {
        src: `${path}/${headName}`
      }
      const res = await this.$http.get('product/getIma', { params })
      if (res.data.code === 200) {
        this.gAvatar = res.data.data
      } else {
        this.gAvatar = ''
      }
    },
    profilesFilter (profiles) {
      for (let i in profiles) {
        if (profiles[i] === 'null') {
          profiles[i] = ''
        }
        if (i === 'city' && profiles[i] !== null) {
          profiles[i] = profiles[i].split(',')
        }
      }
      return profiles
    },

    confirm (context, callback, type) {
      this.$confirm(context, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type || 'warning',
        callback: (action, instance) => {
          if (action == 'confirm') {
            callback()
          }
        }
      })
    }
  },
}
