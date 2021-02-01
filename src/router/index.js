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
    component: () => import('../views/nav/index'),
  },
  {
    path: '/show',
    name: 'show',
    component: () => import('../views/nav/show'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/nav/about')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/nav/order')
  },
  {
    path: '/management',
    name: 'management',
    component: () => import('../views/profiles/management')
  },
  {
    path: '/changeDatum',
    name: 'changeDatum',
    component: () => import('../views/profiles/changeDatum')
  }
]

export default new Router({
  mode: 'history',
  routes
});
