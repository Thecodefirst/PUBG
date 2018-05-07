<template>
  <div id="index">
    <!--title-->
    <!--content-->
    <div class="p-index-second">
      <span class="logo left"></span>
      <!--video-->
      <div @click=" searchUserListOFF = false " class="p-index-video">
        <video id="video1" class="video" src="http://videooc.tc.qq.com/vcloud1022.tc.qq.com/1022_a4a7a8041ed64eddb2465d8ea5c9bc45.f0.mp4?vkey=900BBFCC6D89F4CD50C1E71657F0245F2DE373BFA4969F8B5610FB9A1301CEEDDCD8F6421C4FBECB7E87142D53F1AB271A27C4CB534D37BBE9690344A9F9DB3DDBE29B149111C7EDA69CDD95F03AC9F3B9DEAB9BD3FBC771&amp;sha=0" autoplay loop></video>
      </div>
      <!--video-->
      <!--search-->
      <div class="p-index-search">
        <p class="p-search-title">PUBG</p>
        <p class="p-search-title2">Prove yourself with data.用数据证明自己</p>
        <div class="p-search-input">
          <input 
            @focus=" searchUserListOFF = true "
            @keyup.enter="searchBtn"
            v-model="playerName"
            placeholder="Please enter the game name." 
            type="text">
          <div @click="searchBtn" class="p-search-btn">
            <span class="p-search-img">
              <img class="imgCom" src="../assets/icon-pdg-white@2x.png" alt="">
            </span>
          </div>
          <ul v-if="searchUserListOFF" class="searchUserList">
            <li @click="searchUserListBtn(item)" v-for="(item,index) in userList" :key="index" v-text="item"></li>
          </ul>
        </div>
      </div>
      <!--search-->
    </div>
    <!--content-->
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      inputClass:false,
      playerName:'',
      userList:[],
      searchUserListOFF:false,
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  mounted () {
    this.userList = JSON.parse(localStorage.getItem('userList'));
  },
  methods: {
    ...mapActions([

    ]),
    focusInput:function(){
      this.inputClass = true;
    },
    blurInput:function(){
      this.inputClass = false;
    },
    searchUserListBtn:function(val){
      this.searchUserListOFF = false;
      sessionStorage.setItem('username',val);
      this.$router.push({path:'/searchResult'});
    },
    searchBtn:function(){
      if(!this.playerName){ return false; }
      var arrayUserList = [];
      sessionStorage.setItem('username',this.playerName);
      console.log(localStorage.getItem('userList'));
      if(localStorage.getItem('userList')){ 
        arrayUserList = JSON.parse(localStorage.getItem('userList'));
        arrayUserList.push(this.playerName);
      }else{
        arrayUserList.push(this.playerName);
      }
      localStorage.setItem('userList',JSON.stringify(arrayUserList));
      this.userList = arrayUserList;
      this.$router.push({path:'/searchResult'});
    },
  },
  components:{

  }
}
</script>

<style scoped>
  .logo {
    background-image: url(../assets/icon-pubg@2x.png);
    background-repeat: no-repeat;
    background-size: 100%;
    display: inline-block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 2000;
    width: 108px;
    height: 64px;
  }
  .p-index-title {
    background: rgba(0,0,0,.1);
    width: 100%;
  }
  .p-title {
    margin: 0 auto;
    height: 80px;
    color: #fff;
    width: 1200px;
  }
  .p-index-second {
    position: fixed;
    width: 100%;
  }
  #video1 {
    width: 100%;
  }
  .p-index-video {
    position: absolute;
    width: 100%;
  }
  .p-index-search {
    color: #fff;
    position: absolute;
    /*background: rgba(0,0,0,.5);*/
    width: 100%;
    height: 100%;
  }
  .p-search-title {
    margin-top: 270px;
    text-align: center;
    font-size: 100px;
    font-weight: 600;
  }
  .p-search-title2 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: #ff9c00;
  }
  .p-search-input {
    margin: 50px auto 0;
    text-align: center;
    position: relative;
    width: 900px;
    height: 70px;
  }
  .p-search-input input {
    font-size: 30px;
    text-indent:20px;
    display: inline-block;
    background: #fff;
    width: 900px;
    height: 70px;
  }
  /*.focusInput {
    transition: .5s;
    border: 2px solid #ff9c00;
  }*/
  input::-webkit-input-placeholder {
    color: #aab2bd;
    font-weight: 100;
    line-height: 70px;
    font-size: 25px;
  }
  input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #aab2bd;
    font-weight: 100;
    line-height: 70px;
    font-size: 25px;
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #aab2bd;
    font-weight: 100;
    line-height: 70px;
    font-size: 25px;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #aab2bd;
    font-weight: 100;
    line-height: 70px;
    font-size: 25px;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #aab2bd;
    font-weight: 100;
    line-height: 70px;
    font-size: 25px;
  }
  .p-search-img {
    margin-top: 10px;
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .p-search-btn {
    right: 0;
    top: 0;
    display: inline-block;
    position: absolute;
    background: #ff9c00;
    width: 100px;
    height: 70px;
  }
  .searchUserList {
    top: 71px;
    position: absolute;
    width: 900px;
    height: auto;
  }
  .searchUserList li {
    transition: .5s;
    cursor: pointer;
    border-bottom: 1px dashed grey;
    background-color: #fff;
    text-indent: 20px;
    text-align: left;
    color: #333;
    line-height: 50px;
    font-size: 25px;
  }
  .searchUserList li:last-child {
    border: none;
  }
  .searchUserList li:hover {
    background-color: #ff9c00;
  }
</style>
