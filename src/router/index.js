import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['../components/index.vue'], resolve)//搜索页
const searchResult = resolve => require(['../components/searchResult.vue'], resolve)//搜索结果

const Firearms = resolve => require(['../components/Firearms.vue'], resolve)//枪械及配件

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult,
    }
  ]
})
