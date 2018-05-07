<template>
  <!--title-->
  <div id="app">
    <!-- 返回顶部 -->
    <Back-top :duration="1000" :right="350"></Back-top>
    <!--banner-->
    <div class="banner">
      <div @mouseleave=" secondBanner = false " class="banner-round">
        <!-- 二级导航 -->
        <div v-show="secondBanner" class="second-banner">
            <Tabs>
              <TabPane label="游戏数据" icon="cube"></TabPane>
              <TabPane label="装备数据" icon="fireball">
                <router-link class="second-banner-p" to=""><p>枪械及配件</p></router-link>
                <router-link class="second-banner-p" to=""><p>装备</p></router-link>
                <router-link class="second-banner-p" to=""><p>服饰</p></router-link>
                <router-link class="second-banner-p" to=""><p>消耗品及弹药</p></router-link>
              </TabPane>
            </Tabs>
        </div>
        <!-- 二级导航 -->
        <!--logo-->
        <h1 class="banner-logo left">
          <span class="logo"></span>
        </h1>
        <!--logo-->
        <!--num-->
        <div class="current-user left">
          PUBG当前在线玩家人数:
          <span class="current-user__count" v-text="g_reptileData.userCount"></span>
        </div>
        <!--num-->
        <!-- menu -->
        <div 
          @mouseenter=" secondBanner = true " 
          :class='{ "menuHover" : true == secondBanner }'
          class="menu right">
          <span
            @mouseenter=" secondBanner = true " ></span>
        </div>
        <!-- menu -->
        <!--search-->
        <div class="search right">
          <input
            v-model="searchName"
            @keyup.enter="execute_searchPlayer"
            @focus=" searchFocus = true "
            @blur=" searchFocus = false "
            :class="{ 'search-input-focus' : searchFocus }"
            class="search-input"
            type="text"
            placeholder="输入绝地求生用户名">
          <li
             @click="execute_searchPlayer"
            :class=" searchFocus ? 'search-backPic-whilt' : 'search-backPic-blue' "
            class="search-logo"></li>
        </div>
        <!--search-->
        <!--语言切换-->
        <div class="language"></div>
        <!--语言切换-->
      </div>
    </div>
    <!--banner-->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      secondBanner:false,//二级导航开关
      //在线玩家
      onlion_player:'',
      //玩家名称
      searchName:'',
      //是否失焦
      searchFocus:false,
    }
  },
  computed: {
    ...mapGetters([
      'g_reptileData'
    ]),
  },
  mounted(){

  },
  methods:{
    ...mapActions([
      'searchPlayer',
    ]),
    //执行 => 搜索 searchPlayer
    execute_searchPlayer:function(){
      this.searchPlayer(this.searchName);
    },
  },
}
</script>

<style>
/*banner*/ 
 .banner {
   text-align: center;
   background-color: #323647;
   width: 100%;
 }
 .banner-round {
   position: relative;
   margin: 0 auto;
   width: 1024px;
   height: 80px;
 }
 .banner-logo {
   margin-top: 21px;
   margin-right: 40px
 }
 .logo {
   display: inline-block;
   background-image: url(../assets/adus_logo@1x.png);
   background-repeat: no-repeat;
   background-size: 213px 38px;
   width: 213px;
   height: 38px;
 }
 .current-user {
  color: #5f6479;
  margin-top: 21px;
  margin-right: 25px;
  line-height: 38px;
  font-size: 14px;
  height: 38px;
 }
 .current-user__count {
   color: #ff9c00;
 }
 #searchResult {
   background-color: rgb(240, 245, 247);
 }
 .search {
   position: relative;
   margin-top: 19px;
   margin-right: 20px;
 }
 .search-input {
   transition: .5s;
   text-indent: 18px;
   background-color: #323647;
   font-size: 14px;
   color: #5f6479;
   border-radius: 50px;
   border: 1px solid #5f6479;
   width: 200px;
   height: 42px;
 }
 .search-input-focus {
   color: #fff;
   width: 278px;
   border-color: #fff;
 }
 .search-backPic-blue {
   background-image: url(../assets/search_icon@01.png);
 }
 .search-backPic-whilt {
   background-image: url(../assets/search_whilt@01.png);
 }
 .search-logo {
   cursor: pointer;
   top: 12px;
   right: 18px;
   position: absolute;
   background-repeat: no-repeat;
   background-size: 20px;
   width: 20px;
   height: 20px;
 }
 ::-webkit-input-placeholder { /* WebKit browsers */ 
   color: #5f6479;
 } 
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
   color: #5f6479;
 } 
  ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
   color: #5f6479;
 } 
  :-ms-input-placeholder { /* Internet Explorer 10+ */ 
   color: #5f6479;
 } 
 /*banner*/ 
 /* second-banner */
 .second-banner {
   overflow: hidden;
   padding: 20px 30px;
   z-index: 1000;
   transition: .5s;
   top: 80px;
   background-color: #2b2f3f;
   position: absolute;
   width: 1024px;
   height: auto;
 }
 .second-banner-80 {
   top: -100px !important;
 }
 .menu {
   height: 80px;
   width: 64px;
 }
 .menuHover {
   background-color: #2b2f3f;
 }
 .menu span {
   display: inline-block;
   margin-top: 25px;
   background-image: url(../assets/menu.png);
   width: 30px;
   height: 30px;
 }
 .second-banner-p {
   transition: color 0.3s ease-in-out;
   float: left;
   line-height: 30px;
   margin-right: 60px;
   color: #5f6479;
   font-size: 14px;
   display: inline-block;
 }
 .second-banner-p:hover {
   color: #fff;
 }
 /* second-banner */
</style>
