// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'
import router from './router'
import axios from 'axios'
import APP from './App'
import baseCSS from './base.css'
// iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../my-theme/index.less';

//组件注册
import adBanner from './adCom/adBanner.vue'
Vue.component('ad-Banner', adBanner)

Vue.config.productionTip = false
Vue.prototype.moment = require('moment');

Vue.use(iView);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

Vue.prototype.$Loading.config({
  height: 5
});

//时间戳 转 分秒
Vue.prototype.formatTimeMS = function(seconds) {
  var min = Math.floor(seconds / 60),
        second = seconds % 60,
        hour, newMin, time;

    if (min > 60) {
        hour = Math.floor(min / 60);
        newMin = min % 60;
    }

    if (second < 10) { second = '0' + second;}
    if (min < 10) { min = '0' + min;}

    return time = hour? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template:'<APP/>',
  components: { axios,baseCSS,APP }
})

