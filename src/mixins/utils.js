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
    }
  }
}
