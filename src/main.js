import Vue from 'vue';
import less from 'less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import App from './App';

import './styles/index.less';
import './assets/iconfont/iconfont.css';


// import router from './router';

Vue.config.productionTip = false;
Vue.use(less);
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
