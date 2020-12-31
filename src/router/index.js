import Vue from 'vue';
import Router from 'vue-router';
import index from '../components/index'
import show from '../components/show'
import about from '../components/about'
import order from '../components/order'

Vue.use(Router);
const routes = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    name: 'index',
    component: index,
  },
  {
    path: '/show',
    name: 'show',
    component: show,
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/order',
    name: 'order',
    component: order
  }
]

export default new Router({
  mode: 'history',
  routes
});
