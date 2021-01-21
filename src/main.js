import Vue from 'vue';
import VueI18n from 'vue-i18n'
import App from './App';
import store from './store'
import echarts from 'echarts';
import less from 'less';
import messages from "./assets/lang";
import Utils from './utils/src/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';


import './styles/index.less';
import './assets/iconfont/iconfont.css';

import router from './router';

Vue.config.productionTip = false;
Vue.use(less);
Vue.use(VueI18n)
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition);

const i18n = new VueI18n({
  locale: 'zh',
  messages
})
Vue.use(Utils, {
  i18n,
  echarts
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n,
  store
});
