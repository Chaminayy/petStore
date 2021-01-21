import Vue from 'vue';
import Router from 'vue-router';

const originPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}

Vue.use(Router);
const routes = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../components/views/index'),
  },
  {
    path: '/show',
    name: 'show',
    component: () => import('../components/views/show'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/views/about')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../components/views/order')
  },
  {
    path: '/management',
    name: 'management',
    component: () => import('../components/profiles/management')
  },
  {
    path: '/changeDatum',
    name: 'changeDatum',
    component: () => import('../components/profiles/changeDatum')
  }
]

export default new Router({
  mode: 'history',
  routes
});
