import service, { setI18n } from '../../common/service'
import messages from "../../assets/lang";
// import Vue from "vue";

export default {
  install (Vue, options) {
    const { i18n, echarts } = options
    if (i18n)
      setI18n(i18n)
    Vue.prototype.$http = service
    Vue.prototype.$echarts = echarts
  }
}
