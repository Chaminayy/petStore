export default {
  data () {
    return {
      baseURL: 'http://localhost:3000/'
    }
  },
  methods: {
    $goto (path) {
      this.$router.push(path)
    }
  }
}
