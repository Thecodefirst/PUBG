import axios from 'axios'
import actionRouter from '../router'
import iView from 'iview';
export const actions = {
  //抽离searchPlayer-服务器列表、玩家在线、游戏名、1st 2st 4st综合数据
  searchPlayer({ dispatch,state,commit,getters },data){
    var self = this;
    iView.LoadingBar.start();
    axios.get(state.url+'search', {
    params: { username:data,server:'as'}
    }).then(function (response) {
      iView.LoadingBar.finish();
      var result = response.data.result;
      //保存用户游戏名
      sessionStorage.setItem('username',data);
      //初始化默认赛季
      state.sports = '2018-05';
      //保存条件
      commit('m_st_list',{userId:result.userId,season:'2018-05',server:'as',mode:'tpp'});
      //保存初始化数据 => 后台爬虫
      commit('m_searchPlayer',result);
      //执行 => st 
      var st1 = {userId:result.userId,season:state.st_list.season,server:state.st_list.server,queueSize:'1',mode:state.st_list.mode,};
      var st2 = {userId:result.userId,season:state.st_list.season,server:state.st_list.server,queueSize:'2',mode:state.st_list.mode,};
      var st4 = {userId:result.userId,season:state.st_list.season,server:state.st_list.server,queueSize:'4',mode:state.st_list.mode,};
      dispatch('st',st1);
      dispatch('st',st2);
      dispatch('st',st4);
      //执行 => 玩家列表 summaryData
      dispatch('summaryData','');
      //执行 => 20场数据 recentMatchs
      dispatch('recentMatchs',{userId:result.userId,server:'as',after:''});
    })
  },
   //抽离st - 1st 2st 4st查询
  st:function({ dispatch,state,commit,getters },data){
    var self = this;
    // self.$Loading.start();
    axios.get(state.url+'rankedStates', {
      params: { 
        userId:data.userId,
        season:data.season,
        server:data.server,
        queueSize:data.queueSize,
        mode:data.mode,
      }
    }).then(function (response) {
        let _result = JSON.parse(response.data.result.body);
        switch(data.queueSize)
        {
          case '1':
            if(!(_result.message == "")){
              commit('m_one_st',_result);
            }else{
              state.one_st.ranks.rating = 0;
            }
            break;
          case '2':
            if(!(_result.message == "")){
              commit('m_two_st',_result);
            }else{
              state.two_st.ranks.rating = 0;
            }
            break;
          case '4':
            if(!(_result.message == "")){
              commit('m_four_st',_result);
            }else{
              state.four_st.ranks.rating = 0;
            }
          default:
        }
        iView.LoadingBar.finish();
    });
  },
  //玩家列表 => 数据拉取
  summaryData:function({ dispatch,state,commit,getters },data){
    var self = this;
    iView.LoadingBar.start();
    axios.get(state.url+'summaryPlayed', {
    params: { userId:state.st_list.userId,season:state.st_list.season,server:state.st_list.server}
    }).then(function (response) {
      commit('m_summaryPlayList',JSON.parse(response.data.result.body).users);
      iView.LoadingBar.finish();
    })
  },
  //抽离初始化20场数据
  recentMatchs:function({ dispatch,state,commit,getters },data){
    var self = this;
    iView.LoadingBar.start();
    axios.get(state.url+'matchs', {
    params: { userId:state.st_list.userId,server:state.st_list.server}
    }).then(function (response) {
      commit('m_recentDataMatchesItems',JSON.parse(response.data.result.body).matches.items);
      iView.LoadingBar.finish();
    })
  },
   //抽离 +  全部、单排、双排、四排....切换效果 queueSize,mode,index,after
  recentMatchsST:function({ dispatch,state,commit,getters },data){
    var self = this;
    iView.LoadingBar.start();
    state.racetypeIndex = data.index;
    state.queueSize = data.queueSize;
    state.mode = data.mode;
    axios.get(state.url+'singleFieldData', {
    params: { userId:state.st_list.userId,server:state.st_list.server,queueSize:data.queueSize,mode:data.mode,after:data.after}
    }).then(function (response) {
      if(data.after == ''){
        commit('m_recentDataMatchesItems',JSON.parse(response.data.result.body).matches.items)
      }else{
        commit('m_recentDataMatchesItems',state.recentDataMatchesItems.concat(JSON.parse(response.data.result.body).matches.items));
      }
      iView.LoadingBar.finish();
    })
  },
  //查看更多 => recentMatchsST
  lookMoreMatches:function({ dispatch,state,commit,getters },data){
    var self = this;
    var timer = state.recentDataMatchesItems[state.recentDataMatchesItems.length - 1].started_at;
    let Base64 = require('js-base64').Base64;
    var list = {
      _id:state.st_list.userId,
      started_at: (new Date(timer).getTime())/1000 - 604800,
      season:'',
    }
    return dispatch('recentMatchsST',{queueSize:state.queueSize,mode:state.mode,after:Base64.encode(JSON.stringify(list))});
  },
  //人称视角切换 => 执行st
  viewTab:function({ dispatch,state,commit,getters },data){
    state.st_list.mode = data;
    //执行 => st 
    var st1 = {userId:state.st_list.userId,season:state.st_list.season,server:state.st_list.server,queueSize:'1',mode:state.st_list.mode,};
    var st2 = {userId:state.st_list.userId,season:state.st_list.season,server:state.st_list.server,queueSize:'2',mode:state.st_list.mode,};
    var st4 = {userId:state.st_list.userId,season:state.st_list.season,server:state.st_list.server,queueSize:'4',mode:state.st_list.mode,};
    dispatch('st',st1);
    dispatch('st',st2);
    dispatch('st',st4);
    //执行 => 玩家列表 summaryData
    dispatch('summaryData','');
  },
  //服务器切换+JS渲染 => 执行 st
  tabListBtn:function({ dispatch,state,commit,getters },data){
    // this.tabIndex = server;
    let serverTab = data.toLowerCase();
    state.st_list.server = serverTab;
    //执行 => st 
    var st1 = {userId:state.st_list.userId,season:state.st_list.season,server:serverTab,queueSize:'1',mode:state.st_list.mode,};
    var st2 = {userId:state.st_list.userId,season:state.st_list.season,server:serverTab,queueSize:'2',mode:state.st_list.mode,};
    var st4 = {userId:state.st_list.userId,season:state.st_list.season,server:serverTab,queueSize:'4',mode:state.st_list.mode,};
    dispatch('st',st1);
    dispatch('st',st2);
    dispatch('st',st4);
    //执行 => 玩家列表 summaryData
    dispatch('summaryData','');
    //执行 => 20场数据 recentMatchs
    dispatch('recentMatchs',{userId:state.st_list.userId,server:state.st_list.server});
  },
  //赛季切换 => 执行 st
  seasonTab:function({ dispatch,state,commit,getters },data){
     //执行 => st 
     state.st_list.season = data;
     var st1 = {userId:state.st_list.userId,season:data,server:state.st_list.server,queueSize:'1',mode:state.st_list.mode,};
     var st2 = {userId:state.st_list.userId,season:data,server:state.st_list.server,queueSize:'2',mode:state.st_list.mode,};
     var st4 = {userId:state.st_list.userId,season:data,server:state.st_list.server,queueSize:'4',mode:state.st_list.mode,};
     dispatch('st',st1);
     dispatch('st',st2);
     dispatch('st',st4);
     //执行 => 玩家列表 summaryData
     dispatch('summaryData','');
  },
}
