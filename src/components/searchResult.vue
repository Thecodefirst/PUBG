<template>
  <div id="searchResult">
    <!-- 加载中 -->
    <!-- 加载中 -->
    <!-- banner -->
    <ad-Banner></ad-Banner>
    <!-- banner -->
    <!--header-->
    <div class="header">
      <div class="header-layout">
        <div class="header-pic">
          <span class="header-pic-image">
            <img class="imgCom" src="../assets/headerPic.jpg" alt="">
          </span>
        </div>
        <p class="header-username" v-text="g_reptileData.username"></p>
        <div class="collect">
          <div
            @click="collectBtn" 
            :class=" checkCollect ? 'collect-button-span' : '' "
            class="collect-button">
            <span
              :class=" checkCollect ? 'collect-btn-imageY' : 'collect-btn-imageN' "
              class="collect-btn-image"></span>
            收藏
          </div>
        </div>
        <!--tab切换-->
        <div class="tabList">
          <li
            @click="tabListBtn(item.server)"
            v-for="(item,index) in g_reptileData.servers" 
            :key='index'
            :class="{'tab-activity':item.server==g_st_list.server.toUpperCase()}">
            <p><span class="tab-server left" v-text="item.server"></span><span class="right" v-text="item.time"></span></p>
            <p><span class="left" v-text="item.games"></span></p>
            <p><span class="left" v-text="item.pre"></span></p>
          </li>
        </div>
        <!--tab切换-->
      </div>
    </div>
    <!--header-->
    <!-- matches -->
    <div class="matches">
      <div class="matches-sports">
        <div class="select-sports left">
          <Select @on-change="seasonTab" v-model="sportsSelect" style="width:160px">
            <Option v-for="(item,index) in sportsList" :value="item.value" :key="index">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="checkedFPP left">
          <Checkbox @on-change="viewTab" size="large" true-value="fpp" false-value="tpp" v-model="checkedFPP">FPP</Checkbox>
        </div>
        <div class="tips right">
          <li class="tips-image"></li>
          根据您的排名和游戏的表现评出综合等级。（最少10场游戏）
        </div>
      </div>
      <div v-show="!g_one_st.ranks.rating == '0'" class="combat-data">
        <div class="combat-data-top">
          <div class="combat-data-model single-row">
            <i class="sp__man"></i>
            <span class="combat-model-name">单排</span>
            <span class='combat-model-num'>{{ g_one_st.stats.matches_cnt }}场</span>
          </div>
          <ul>
            <!--   -->
            <li 
            :class="{
              'gradeS':-1 < (g_one_st.grade+'').indexOf('S'),
              'gradeA':-1 < (g_one_st.grade+'').indexOf('A'),
              'gradeB':-1 < (g_one_st.grade+'').indexOf('B'),
              'gradeC':-1 < (g_one_st.grade+'').indexOf('C'),
              'gradeD':-1 < (g_one_st.grade+'').indexOf('D'),
            }"
            class="grade" 
            v-text="g_one_st.grade">
            </li>
            <li class="score" v-text="g_one_st.stats.rating"></li>
            <li class="ranking">第{{ g_one_st.ranks.rating  }}名</li>
            <li class="fgx">|</li>
            <li class="ranking ranking-per">排名前{{ (g_one_st.ranks.rating/g_one_st.max_ranks.rating*100).toFixed(2) }}%</li>
            <li class="progress">
              <Progress :stroke-width="4" :percent="one_percent" hide-info></Progress>
            </li>
            <li class="combat-li-com">
              <p class="combat-image-com image-ten"></p>
              <span v-text="g_one_st.stats.topten_matches_cnt"></span>
            </li>
            <li class="combat-li-com">
              <p class="combat-image-com image-win"></p>
              <span v-text="g_one_st.stats.win_matches_cnt"></span>
            </li>
          </ul>
        </div>
        <ul class="combat-table">
          <li>
            <span>K/D</span>
            <span class="kdRed" v-text="(g_one_st.stats.kills_sum/g_one_st.stats.matches_cnt).toFixed(2)"></span>
          </li>
          <li>
            <span>场均伤害</span>
            <span v-text="Math.round(g_one_st.stats.damage_dealt_avg)"></span>
          </li>
          <li>
            <span>胜率</span>
            <span v-text="(g_one_st.stats.win_matches_cnt/g_one_st.stats.matches_cnt*100).toFixed(2)"></span>
          </li>
          <li>
            <span>Top 10%</span>
            <span v-text="(g_one_st.stats.topten_matches_cnt/g_one_st.stats.matches_cnt*100).toFixed(2)"></span>
          </li>
          <li>
            <span>最远距离击杀</span>
            <span>{{ g_one_st.stats.longest_kill_max }}m</span>
          </li>
        </ul>
        <ul class="combat-table">
          <li>
            <span>KDA</span>
            <span class="kdaColor" v-text="((g_one_st.stats.kills_sum + g_one_st.stats.assists_sum)/g_one_st.stats.deaths_sum).toFixed(2)"></span>
          </li>
          <li>
            <span>爆头</span>
            <span v-if="isNaN(g_one_st.stats.headshot_kills_sum/g_one_st.stats.kills_sum)">0%</span>
            <span v-else>{{ (g_one_st.stats.headshot_kills_sum/g_one_st.stats.kills_sum*100).toFixed(2) }}%</span>
          </li>
          <li>
            <span>平均排名</span>
            <span v-text="Math.round(g_one_st.stats.rank_avg)"></span>
          </li>
          <li>
            <span>平均生存时间</span>
            <span v-text="Math.round(g_one_st.stats.time_survived_avg/60)"></span>
          </li>
          <li>
            <span>最多击杀</span>
            <span v-text="g_one_st.stats.kills_max"></span>
          </li>
        </ul>
      </div>
      <div v-show="!g_two_st.ranks.rating == '0'" class="combat-data">
        <div class="combat-data-top">
          <div class="combat-data-model double-row">
            <i class="sp__man"></i>
            <i class="sp__man"></i>
            <span class="combat-model-name">双排</span>
            <span class='combat-model-num'>{{ g_two_st.stats.matches_cnt }}场</span>
          </div>
          <ul>
            <li 
            :class="{
              'gradeS':-1 < (g_two_st.grade+'').indexOf('S'),
              'gradeA':-1 < (g_two_st.grade+'').indexOf('A'),
              'gradeB':-1 < (g_two_st.grade+'').indexOf('B'),
              'gradeC':-1 < (g_two_st.grade+'').indexOf('C'),
              'gradeD':-1 < (g_two_st.grade+'').indexOf('D'),
            }"
            class="grade" 
            v-text="g_two_st.grade">
            </li>
            <li class="score" v-text="g_two_st.stats.rating"></li>
            <li class="ranking">第{{ g_two_st.ranks.rating }}名</li>
            <li class="fgx">|</li>
            <li class="ranking ranking-per">排名前{{ (g_two_st.ranks.rating/g_two_st.max_ranks.rating*100).toFixed(2) }}%</li>
            <li class="progress">
              <Progress :stroke-width="4" :percent="two_percent" hide-info></Progress>
            </li>
            <li class="combat-li-com">
              <p class="combat-image-com image-ten"></p>
              <span v-text="g_two_st.stats.topten_matches_cnt"></span>
            </li>
            <li class="combat-li-com">
              <p class="combat-image-com image-win"></p>
              <span v-text="g_two_st.stats.win_matches_cnt"></span>
            </li>
          </ul>
        </div>
        <ul class="combat-table">
          <li>
            <span>K/D</span>
            <span class="kdRed" v-text="(g_two_st.stats.kills_sum/g_two_st.stats.matches_cnt).toFixed(2)"></span>
          </li>
          <li>
            <span>场均伤害</span>
            <span v-text="Math.round(g_two_st.stats.damage_dealt_avg)"></span>
          </li>
          <li>
            <span>胜率</span>
            <span v-text="(g_two_st.stats.win_matches_cnt/g_two_st.stats.matches_cnt*100).toFixed(2)"></span>
          </li>
          <li>
            <span>Top 10%</span>
            <span v-text="(g_two_st.stats.topten_matches_cnt/g_two_st.stats.matches_cnt).toFixed(2)"></span>
          </li>
          <li>
            <span>最远距离击杀</span>
            <span>{{ g_two_st.stats.longest_kill_max }}m</span>
          </li>
        </ul>
        <ul class="combat-table">
          <li>
            <span>KDA</span>
            <span class="kdaColor" v-text="((g_two_st.stats.kills_sum + g_two_st.stats.assists_sum)/g_two_st.stats.deaths_sum).toFixed(2)"></span>
          </li>
          <li>
            <span>爆头</span>
            <span v-if="isNaN(g_two_st.stats.headshot_kills_sum/g_two_st.stats.kills_sum)">0%</span>
            <span v-else>{{ (g_two_st.stats.headshot_kills_sum/g_two_st.stats.kills_sum*100).toFixed(2) }}%</span>
          </li>
          <li>
            <span>平均排名</span>
            <span v-text="Math.round(g_two_st.stats.rank_avg)"></span>
          </li>
          <li>
            <span>平均生存时间</span>
            <span v-text="Math.round(g_two_st.stats.time_survived_avg/60)"></span>
          </li>
          <li>
            <span>最多击杀</span>
            <span v-text="g_two_st.stats.kills_max"></span>
          </li>
        </ul>
      </div>
      <div v-show="!g_four_st.ranks.rating == '0'" class="combat-data">
        <div class="combat-data-top"> 
          <div class="combat-data-model four-row">
            <i class="sp__man"></i>
            <i class="sp__man"></i>
            <i class="sp__man"></i>
            <i class="sp__man"></i>
            <span class="combat-model-name">四排</span>
            <span class='combat-model-num'>{{ g_four_st.stats.matches_cnt }}场</span>
          </div>
          <ul>
            <li 
            :class="{
              'gradeS':-1 < (g_four_st.grade+'').indexOf('S'),
              'gradeA':-1 < (g_four_st.grade+'').indexOf('A'),
              'gradeB':-1 < (g_four_st.grade+'').indexOf('B'),
              'gradeC':-1 < (g_four_st.grade+'').indexOf('C'),
              'gradeD':-1 < (g_four_st.grade+'').indexOf('D'),
            }"
            class="grade" v-text="g_four_st.grade">
            </li>
            <li class="score" v-text="g_four_st.stats.rating"></li>
            <li class="ranking">第{{ g_four_st.ranks.rating  }}名</li>
            <li class="fgx">|</li>
            <li class="ranking ranking-per">排名前{{ (g_four_st.ranks.rating/g_four_st.max_ranks.rating*100).toFixed(2) }}%</li>
            <li class="progress">
              <Progress :stroke-width="4" :percent="four_percent" hide-info></Progress>
            </li>
            <li class="combat-li-com">
              <p class="combat-image-com image-ten"></p>
              <span v-text="g_four_st.stats.topten_matches_cnt"></span>
            </li>
            <li class="combat-li-com">
              <p class="combat-image-com image-win"></p>
              <span v-text="g_four_st.stats.win_matches_cnt"></span>
            </li>
          </ul>
        </div>
        <ul class="combat-table">
          <li>
            <span>K/D</span>
            <span class="kdRed" v-text="(g_four_st.stats.kills_sum/g_four_st.stats.matches_cnt).toFixed(2)"></span>
          </li>
          <li>
            <span>场均伤害</span>
            <span v-text="Math.round(g_four_st.stats.damage_dealt_avg)"></span>
          </li>
          <li>
            <span>胜率</span>
            <span v-text="(g_four_st.stats.win_matches_cnt/g_four_st.stats.matches_cnt*100).toFixed(2)"></span>
          </li>
          <li>
            <span>Top 10%</span>
            <span v-text="(g_four_st.stats.topten_matches_cnt/g_four_st.stats.matches_cnt*100).toFixed(2)"></span>
          </li>
          <li>
            <span>最远距离击杀</span>
            <span>{{ g_four_st.stats.longest_kill_max }}m</span>
          </li>
        </ul>
        <ul class="combat-table">
          <li>
            <span>KDA</span>
            <span class="kdaColor" v-text="((g_four_st.stats.kills_sum + g_four_st.stats.assists_sum)/g_four_st.stats.deaths_sum).toFixed(2)"></span>
          </li>
          <li>
            <span>爆头</span>
            <span v-if="isNaN(g_four_st.stats.headshot_kills_sum/g_four_st.stats.kills_sum)">0%</span>
            <span v-else>{{ (g_four_st.stats.headshot_kills_sum/g_four_st.stats.kills_sum*100).toFixed(2) }}%</span>
          </li>
          <li>
            <span>平均排名</span>
            <span v-text="Math.round(g_four_st.stats.rank_avg)"></span>
          </li>
          <li>
            <span>平均生存时间</span>
            <span v-text="Math.round(g_four_st.stats.time_survived_avg/60)"></span>
          </li>
          <li>
            <span>最多击杀</span>
            <span v-text="g_four_st.stats.kills_max"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- matches -->
    <!-- racetype -->
    <div class="racetype">
      <div class="clearfloat">
        <ul class="racetype-list right">
          <li
            v-for="(item,index) in racetypeList" 
            :key="index">
              <span 
                :class="{'racetype-activity':index==g_racetypeIndex}"
                @click="recentMatchsST({queueSize:item.queueSize,mode:item.mode,index:index,after:''})"
                v-text="item.name"></span>
          </li>
        </ul>
      </div>
      <div class="statistics left">
        <div class="statistics-video">
          <video id="my-video" autoplay="autoplay" loop="loop" class="video-js" controls preload="auto" width="340" height="auto" data-setup="{}">
            <source src="../../static/pubg_4k.mp4" type='video/mp4'>
          </video>
        </div>
        <div class="statistics-com-radius">
          <div class="statistics-com-top">
            <span class="statistics-com-round"></span>
            最近20场游戏综合战绩查询
          </div>
          <div class="Echarts-back">
            <div id="main" style="width: 250px;height: 150px;"></div>
          </div>
        </div>
        <div class="statistics-com-radius">
          <div class="statistics-com-top">
            <span class="statistics-com-round"></span>
            最近20场游戏统计
          </div>
          <div class="statistics-stats">
            <ul>
              <li>
                <p>K/D</p>
                <p v-text="g_reptileData.gameStatistics[0]"></p>
              </li>
              <li class="statistics-li-border">
                <p>伤害</p>
                <p v-text="Math.round(g_reptileData.gameStatistics[1])"></p>
              </li>
              <li>
                <p>生存时间</p>
                <p v-text="formatTimeMS(Math.round(g_reptileData.gameStatistics[2]))"></p>
              </li>
            </ul>
          </div>
        </div>
        <div class="statistics-com-radius" @mouseout="mouseoutPlayer">
          <div class="statistics-com-top">
            <span class="statistics-com-round"></span>
            组队玩家
          </div>
          <div class="statistics-player">
            <ul>
              <li class="statistics-backColor">
                <span>用户名</span>
                <span>场</span>
              </li>
              <li 
                @mouseover="moveSummaryPlay(index)"
                :class="{'searchSummaryTab-activity':index==searchSummaryTab}" 
                v-for="(item,index) in g_summaryPlayList" 
                :key="index">
                <span @click="searchSummaryPlay(item.user.nickname)" v-text="item.user.nickname"></span>
                <span v-text="item.stats.matches_count"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="options right">
        <p class="refresh">最终生存者决出后，数据就会自动完成更新</p>
        <div class="options-list" v-for="(item,index) in g_recentDataMatchesItems" :key="index">
          <div class="options-list-top clearfloat">
            <ul>
              <li class="double-player left" :class="['one-st-event', { 'two-st-event': 2 == item.queue_size , 'three-st-event': 4 == item.queue_size , 'mode-event': item.queue_size == null }]"></li>
              <li class="com-text left">
                <span class="event" v-if="item.queue_size == null">Event</span>
                <span class="st-event" v-else :class="['one-st-event', { 'two-st-event': 2 == item.queue_size , 'three-st-event': 4 == item.queue_size , 'mode-event': item.queue_size == null }]">
                  <i v-for="item in item.queue_size" :key="item" class="sp__man_match"></i>
                </span>
              </li>
              <!-- <li v-if="item.team.stats.rank == '1'" class="icon-com left">
                <p class="combat-image-com image-win"></p>
              </li>
              <li v-else-if="item.team.stats.rank < '11'" class="icon-com left">
                <p class="combat-image-com image-ten"></p>
              </li> -->
              <li class="com-text right" v-text="moment(item.started_at).format('YYYY-MM-DD h:mm:ss a')"></li>
              <li class="com-text marginRight35 right">生存时间<span class="margin5" v-text="Math.round(item.participant.stats.combat.time_survived/60)"></span>Min</li>
            </ul>
          </div>
          <ul class="synthetic-data clearfloat">
            <li class="addlineHeight">
              <span :class="['base-st-font', { 'topten-st-font': item.team.stats.rank < 10 && item.team.stats.rank > 1, 'one-st-font': 1 == item.team.stats.rank }]" class="ranking-num" v-text="item.team.stats.rank"></span>
              <span class="ranking-all">/{{item.total_rank}}</span>
            </li>
            <li>
              <div class="ranking-change">
                <span v-text="Math.round(item.participant.stats.rating_delta)"></span>
                <span :class="{ 'arrowsTop': 0 < item.participant.stats.rating_delta, 'arrowsDown': 0 > item.participant.stats.rating_delta}"></span>
              </div>
              <p></p>
              <p>排名变动</p>
            </li>
            <li>
              <p v-text="item.participant.stats.combat.kda.kills"></p>
              <p>击杀</p>
            </li>
            <li>
              <p v-text="item.participant.stats.combat.damage.damage_dealt"></p>
              <p>伤害</p>
            </li>
            <li>
              <p>{{ ((item.participant.stats.combat.distance_traveled.walk_distance + item.participant.stats.combat.distance_traveled.ride_distance)/1000).toFixed(2) }}Km</p>
              <p>移动距离</p>
            </li>
            <li v-if=" GameOptions[index] == undefined">
              <i-button :loading=" index == GameOptionsLoading" @click="CheckTeammate(item.match_id,JSON.stringify(index))" shape="circle">查看队友</i-button>
            </li>
            <li class="synthetic-data-last" v-else>
              <div v-if="itemGame.stats.rank == item.team.stats.rank" v-for="(itemGame,index) in GameOptions[index].teams" :key="index">
                <p @click="searchSummaryPlay(itemPartcipants.user.nickname)" v-for="(itemPartcipants,index) in itemGame.participants" :key="index" v-text="itemPartcipants.user.nickname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div @click="lookMoreMatches" class="lookMore">
          <span>查看更多</span>
        </div>
      </div>
    </div>
    <!-- racetype -->
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'searchResult',
  data () {
    return {
      //20场-单场数据
      recentDataMatchesItems:[],
      //玩家ID
      userId:'',
      
      playerName:'',
      // echarts
      charts: '',
      opinion:['单排','双排','四排'],
      opinionData:[],
      //apex、abiding   daybreak
      searchText:'',//搜索值
      summary:'',
      matchesItem:'',
      collectText:'收藏',//是否收藏文字
      checkCollect:false,//是否收藏
      
      collectImg:false,//鼠标移入收藏
      tabIndex:'AS',//选项卡切换
      searchSummaryTab:'',//组队玩家列表效果
      sports:'2018-05',//选择赛季
      sportsList:[
        {
          label:'第5赛季',
          value:'2018-05',
        },
        {
          label:'第4赛季',
          value:'2018-04',
        },
        {
          label:'第3赛季',
          value:'2018-03',
        },
        {
          label:'第2赛季',
          value:'2018-02',
        },
        {
          label:'第1赛季',
          value:'2018-01',
        },
        {
          label:'季前赛6',
          value:'2017-pre6',
        },
        {
          label:'季前赛5',
          value:'2017-pre5',
        },
      ],//赛季列表
      checkedFPP:false,//是否选择FPP模式
      racetypeList:[
        {
          name:'全部',
          queueSize:'',
          mode:'',
        },
        {
          name:'单排',
          queueSize:'1',
          mode:'tpp',
        },
        {
          name:'双排',
          queueSize:'2',
          mode:'tpp',
        },
        {
          name:'四排',
          queueSize:'4',
          mode:'tpp',
        },
        {
          name:'单排FPP',
          queueSize:'1',
          mode:'fpp',
        },
        {
          name:'双排FPP',
          queueSize:'2',
          mode:'fpp',
        },
        {
          name:'四排FPP',
          queueSize:'4',
          mode:'fpp',
        },
      ],
      racetypeIndex:0,
      queueSize:'',
      mode:'',
      index:'',
      after:'',

      GameOptions:{},
      GameOptionsLoading:'adus',//查看队友loading
    }
  },
  computed: {
    ...mapGetters([
      'g_url',
      'g_st_list',
      'g_reptileData',
      'g_one_st',
      'g_two_st',
      'g_four_st',
      'g_summaryPlayList',
      'g_recentDataMatchesItems',
      'g_racetypeIndex',
    ]),
    one_percent:function(){
      return (this.g_one_st.ranks.rating/this.g_one_st.max_ranks.rating).toFixed(2)*100;
    },
    two_percent:function(){
      return (this.g_two_st.ranks.rating/this.g_two_st.max_ranks.rating).toFixed(2)*100;
    },
    four_percent:function(){
      return (this.g_four_st.ranks.rating/this.g_four_st.max_ranks.rating).toFixed(2)*100;
    },
    sportsSelect: {
      get () {
        return this.$store.state.sports;
      },
      set (val) {
        this.$store.state.sports = val;
      }
    }
    
  },
  watch:{
    //Echarts数据监听
    g_reptileData:function(newValue){
      this.opinionData = newValue.gameSynthesizeEcharts;
      this.drawPie('main');
    },
  },
  mounted () {
    var self = this;
    //初始化Echarts
    //
    // self.$nextTick(function() {
    //   //初始化Echarts options 
    //   
    // })
    //video视频初始化音量
    document.getElementById("my-video").volume = 0;
    //1st 2st 4st统计
    this.searchPlayer(sessionStorage.getItem('username'));  
  },
  methods: {
    ...mapActions([
      'searchPlayer',
      'st',
      'summaryData',
      'recentMatchs',
      'recentMatchsST',
      'viewTab',
      'lookMoreMatches',
      'tabListBtn',
      'seasonTab'
    ]),
    //查看队友
    CheckTeammate:function(matchId,index){
      var self = this;
      self.GameOptionsLoading = index;
      axios.get(self.g_url+'CheckTeammate', {
      params: { matchId:matchId}
      }).then(function (response) {
        self.$set(self.GameOptions,index,JSON.parse(response.data.result.body));
        self.GameOptionsLoading = 'adus';
      })
    },
    //评分等级函数
    grade:function(val,valName){
　　  var s = val.indexOf(valName);
　　  return(s);
    },
    //查询队友 执行 => searchPlayer
    searchSummaryPlay:function(playerName){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.GameOptions = {};
      this.searchPlayer(playerName);
    },
    /*JS效果函数*/
    //组队玩家列表鼠标移出效果
    mouseoutPlayer:function(){
      this.searchSummaryTab = 'adus';
    },
    //组队玩家列表鼠标经过文字效果
    moveSummaryPlay:function(index){
      this.searchSummaryTab = index;
    },
     //收藏
    collectBtn:function(){
      this.checkCollect =! this.checkCollect;
    },
    //全部、单排、双排、四排....切换效果
    // racetypeClick:function(index){
    //   this.racetypeIndex = index;
    // },
    /*JS效果函数*/
    //Echarts 配置
    drawPie(id){
      var self = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          data:this.opinion
        },
        series: [
          {
            name:'排位场数',
            type:'pie',
            radius:['50%','70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:self.g_reptileData.gameSynthesizeEcharts
          }
        ],
        color:['rgb(255,147,74)','rgb(102,183,229)','rgb(141,190,120)'],
      })
    }
  },
  components:{

  }
}
</script>

<style scoped>
 /*header*/
 .header {
   text-align: center;
   background-color: #ffa800;
   width: 100%;
   height: 300px;
 }
 .header-layout {
   position: relative;
   margin: 0 auto;
   overflow: hidden;
   width: 1024px;
   height: 300px;
 }
 .header-pic {
   margin: 0 auto;
   margin-top: 30px;
   border-radius: 50%;
   border: 1px solid #fff;
   width: 116px;
   height: 116px;
 }
 .header-pic-image {
   margin: 8px;
   display: inline-block;
   overflow: hidden;
   border-radius: 50%;
   width: 100px;
   height: 100px;
 }
 .header-username {
   margin: 0 auto;
   margin-top: 11px;
   font-weight: 600;
   text-shadow: 0px 0px 20px #333;
   display: inline-block;
   color: #fff;
   font-size: 24px;
 }
 .collect {
   top: 30px;
   right: 30px;
   position: absolute;
 }
 .collect-button {
   transition: .5s;
   cursor: pointer;
   border-radius: 50px;
   border: 1px solid #fff;
   padding: 7px 16px;
   color: #fff;
   font-size: 14px;
   line-height: 16px;
 }
 .collect-button-span {
   color: #323647;
   border-color: #de9200;
   background-color: #de9200;
 }
 .collect-btn-image {
   transition: .5s;
   vertical-align: top;
   display: inline-block;
   background-size: 16px;
   width: 16px;
   height: 16px;
 }
 .collect-btn-imageN {
   background-image: url(../assets/icon_collect_a01@2x.png);
 }
 .collect-btn-imageY {
   background-image: url(../assets/icon_collect_a02@2x.png);
 }
 .tabList {
   bottom: 0;
   position: absolute;
   display: flex;
   align-items: flex-end;
   /* flex-direction:row-reverse; */
   flex-direction:row;
   width: 1024px;
 }
 .tabList li {
   display: flex;
   color: #fff;
   flex-direction: column;
   justify-content:space-around;
   transition: .2s;
   padding: 20px;
   margin-right: 20px;
   box-sizing: border-box;
   cursor: pointer;
   border-radius: 30px 30px 0 0;
   background-color: #de9200;
   width: 180px;
   height: 80px;
 }
 .tabList li p:last-child span {
   color: #fff;
 }
 .tab-activity {
   font-weight: 600;
   color: #323647 !important;
   background-color: #f0f5f7 !important;
   height: 90px !important;
 }
 .tab-activity p:last-child span {
   color: #323647 !important;
 }
 .tab-server {
   font-size: 18px !important;
 }
 .tabList span {
   display: inline-block;
   font-size: 12px;
 }
 /*header*/
 /* matches */
 .matches {
   text-align: center;
   background-color: #f0f5f7;
   padding-top: 20px;
   padding-bottom: 20px;
   width: 100%;
 }
 /* matches-sports */
 .matches-sports {
   overflow: hidden;
   margin: 0 auto;
   width: 1024px;
 }
 .select-sports {
   padding-right: 20px;
   margin-right: 20px;
   display: inline-block;
   border-right: 1px solid #ddd;
 }
 .checkedFPP {
   margin-top: 6px;
 }
 .tips {
   display: inline;
   font-size: 14px;
   color: #5f6479;
 }
 .tips-image {
   display: inline-block;
   overflow: hidden;
   background-repeat: no-repeat;
   line-height: 999px;
   vertical-align: sub;
   background-image: url(../assets/tip_icon@01.png);
   background-size: 15px;
   width: 15px;
   height: 15px;
 }
 /* matches-sports */
 /* combat-data */
 .combat-data-top {
   /* border-bottom: 1px solid #eee; */
   overflow: hidden;
 }
 .combat-data {
   overflow: hidden;
   background: #fff;
   margin: 20px auto 0;
   border-radius: 6px;
   width: 1024px;
   height: 120px;
 }
 .combat-data-top ul {
   /* border-bottom: 1px solid #eee; */
   overflow: hidden;
 }
 .combat-data-model {
   float: left;
   font-size: 14px;
   color: #fff;
   padding: 10px;
   width: 300px;
   height: 40px;
 }
 .combat-data-model .combat-model-name {
   float: left;
   margin-left: 5px;
 }
 .combat-data-model .combat-model-num {
   float: right;
   margin-right: 40px;
 }
 .sp__man {
   float: left;
   background-image: url(../assets/icon_solo.svg);
   width: 19px;
   height: 20px;
   background-size: 19px 20px;
 }
  .sp__man_match {
   float: left;
   background-image: url(../assets/icon_solo.svg);
   width: 14px;
   height: 15px;
   background-size: 14px 15px;
 }
 .sp__main-leaderboard-more, .sp__man {
   display: inline-block;
   overflow: hidden;
   background-repeat: no-repeat;
   line-height: 999px;
   vertical-align: top;
 }
 .single-row {
   background-image: url(../assets/orange_icon@1x.png);
 }
 .double-row {
   background-image: url(../assets/blue_icon@1x.png);
 }
 .four-row {
   background-image: url(../assets/green_icon@1x.png);
 }
 .grade {
   margin: 8px 10px 8px 20px;
   line-height: 24px;
   float: left;
   color:#fff;
   border-radius: 5px;
   width: 24px;
   height: 24px;
 }
 .gradeS {
   background-color: #ff5148;
 }
 .gradeA {
   background-color: #ff934a;
 }
 .gradeB {
   background-color: #ffba00;
 }
 .gradeC {
   background-color: #68ceab;
 }
 .gradeD {
   background-color: #61c2ff;
 }
 .score {
   float:left;
   margin-right: 20px;
   line-height: 40px;
   color: #333;
   font-size: 24px;
 }
 .ranking {
   float:left;
   line-height: 40px;
   color: #999;
   font-size: 12px;
   width: 80px;
 }
 .fgx {
   float:left;
   font-weight: 600;
   line-height:40px;
   margin: 0 13px;
   color: #999;
 }
 .ranking-per {
   color: #ff9249;
 }
 .progress {
   float: left;
   margin: 9px 0 0 20px;
   width: 220px;
 }
 .combat-li-com {
   float: right;
   font-size: 14px;
   margin: 10px;
   color: #333;
   display: block;
 }
 .combat-li-com span {
   font-weight: 600;
 }
  .combat-image-com {
    display: inline-block;
    background-repeat: no-repeat;
    line-height: 999px;
    vertical-align: top;
    background-size: 20px;
    width: 20px;
    height: 20px;
 }
 .image-win {
   background-image: url(../assets/win_icon@1x.png);
 }
 .image-ten {
   background-image: url(../assets/top10_icon@1x.png);
 }
.combat-table {
  display: flex;
  justify-content: space-between;
}
.combat-table li {
  border-top: 1px solid #f0f5f7;
  border-right: 1px solid #f0f5f7;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 40px;
  width: 204px;
  height: 40px;
}
.combat-table span {
  display: inline-block;
  font-size: 14px;
}
.combat-table li span:first-child {
  float: left;
}
.combat-table li span:last-child {
  float: right;
  font-weight: 600;
}
.combat-table li:last-child {
  border-right: none;
}
.kdRed {
  color: #ed3f14;
}
.kdaColor {
  color: #5cadff;
}
 /* combat-data */
 /* matches */
 /* racetype */
 .racetype {
   overflow: hidden;
   margin: 0 auto;
   padding-top: 10px;
   padding-bottom: 10px;
   width: 1024px;
   height: auto;
 }
 .statistics {
   margin-top: 20px;
   width: 340px;
 }
 .options {
   margin-top: 20px;
   width: 664px;
 }
 .racetype-list {
   width: 664px;
 }
 .racetype-list li {
   cursor: pointer;
   color: #999;
   font-size: 14px;
   padding: 0 25px;
   border-right: 1px solid #999;
   float: left;
   line-height: 10px;
   height: 10px;
 }
 .racetype-list li:last-child {
   border-right: none;
 }
 .racetype-activity {
   margin-top: -10px;
   border-radius: 50px;
   display: inline-block;
   color: #fff;
   background-color: #ffa800;
   line-height: 20px;
   padding: 3px 13px;
 }
 .refresh {
   color: #a0abaf;
   text-align: center;
   line-height: 50px;
   border-radius: 5px;
   margin-bottom: 10px;
   background-color: #dae3e6;
   height: 50px;
   width: 664px;
 }
 .options-list {
   background-color: #fff;
   margin-top: 10px;
   border-radius: 5px;
   width: 664px;
   height: 130px;
 }
 .options-list-top {
   padding: 0 20px;
   border-bottom: 1px solid #f0f5f7;
   height: 50px;
 }
 .com-text {
   line-height: 50px;
   color: #aaa;
   font-size: 14px;
 }
 .event {
   color: #333;
   font-weight: 600;
   display: inline-block;
   line-height: 50px;
 }
 .st-event {
   margin-top: 15px;
   padding: 2px;
   border-radius: 5px;
   display: inline-block;
 }
 .one-st-event {
   background-color: #ff934a !important;
 }
 .two-st-event {
   background-color: #66b7e5 !important;
 }
 .three-st-event {
   background-color: #8dbe78 !important;
 }
 .mode-event {
   background-color: #333 !important;
 }
 .base-st-font {
   color: #999 !important;
 }
 .topten-st-font {
   color: #333 !important;
 }
 .one-st-font {
   color: #FF6600 !important;
 }
 .double-player {
   margin-top: 19px;
   margin-right: 10px;
   border-radius: 3px;
   width: 12px;
   height: 12px;
 }
 .icon-com {
   margin-top: 15px;
   margin-left: 20px;
 }
 .marginRight35 {
   margin-right: 35px;
 }
 .synthetic-data {
   font-size: 14px;
   color: #aaa;
   display: flex;
   justify-content: space-around;
   height: 80px;
   width: 100%;
 }
 .synthetic-data li {
   margin-top: 20px;
   height: 40px;
 }
 .synthetic-data li p:first-child {
   font-weight: 600;
   color: #2b2e28;
 }
 .synthetic-data-last::-webkit-scrollbar {
   display: none;
 }
 .synthetic-data-last p {
   cursor: pointer;
   line-height: 16px;
   font-weight: 500 !important;
   color: #aaa !important;
   font-size: 12px;
 }
 .synthetic-data-last p:hover {
   color: #333 !important;
 }
 .synthetic-data-last {
   overflow-y: scroll;
   margin-top: 5px !important;
   height: 70px !important;
 }
 .ranking-num {
   font-size: 36px;
   color: #60ba35;
 }
 .ranking-change span:first-child {
   font-size: 14px;
   /* font-weight: 600; */
   color: #2b2e28;
 }
 .arrowsTop {
   display: inline-block;
   border: 5px solid transparent;
   border-bottom-color: #2b2e28;
   width: 0;
   height: 0;
 }
 .arrowsDown {
   display: inline-block;
   vertical-align: bottom;
   border: 5px solid transparent;
   border-top-color: #2b2e28;
   width: 0;
   height: 0;
 }
 .addlineHeight {
   line-height: 40px;
 }
 .margin5 {
   color: #339999;
   font-weight: 600;
   /* display: inline-block; */
   margin: 0 10px;
 }
 .statistics-com-round {
   margin: 22px 10px 0;
   vertical-align: top;
   background-color: #ffa800;
   display: inline-block;
   border-radius: 50%;
   width: 6px;
   height: 6px;
 }
 .statistics-com-radius {
   overflow: hidden;
   margin-bottom: 20px;
   background-color: #fff;
   border-radius: 5px;
 }
 .statistics-com-top {
   border-bottom: 1px solid #f0f5f7;
   line-height: 50px;
   color: #333;
   font-size: 14px;
   height: 50px;
 }
 .Echarts-back {
   background-color: #fff;
 }
 .statistics-video {
   margin-bottom: 20px;
 }
 .statistics-stats ul {
   display: flex;
   justify-content: space-between;
   padding: 20px 0;
 }
 .statistics-stats ul li {
   text-indent:20px; 
   width: 112px;
 }
 .statistics-li-border {
   border-left: 1px solid #f0f5f7;
   border-right: 1px solid #f0f5f7;
 }
 .statistics-stats ul li p:first-child {
   font-size: 14px;
   color: #999;
 }
 .statistics-stats ul li p:last-child {
   font-size: 24px;
   color: #333;
 }
 .statistics-player li {
   overflow: hidden;
   padding: 0 30px;
 }
 .statistics-player span {
   font-size: 14px;
   color: #999;
   display: inline-block;
   line-height: 40px;
 }
 .statistics-player span:first-child {
   cursor: pointer;
   float: left;
 }
 .statistics-player span:last-child {
   float: right;
 }
 .statistics-backColor {
   background-color: #f7fdff;
 }
 .searchSummaryTab-activity span {
   transition: .3s;
   font-size: 15px;
   color:#ffa800 !important;
 }
 .lookMore {
   transition: .5s;
   cursor: pointer;
   text-align: center;
   color: #a0a0af;
   font-size: 14px;
   line-height: 50px;
   border-radius: 5px;
   background-color: #fff;
   margin-top: 10px;
   width: 664px;
   height: 50px;
 }
 .lookMore:hover {
   background-color: #ffa800;
   color: #fff;
 }
 /* racetype */
 
</style>
