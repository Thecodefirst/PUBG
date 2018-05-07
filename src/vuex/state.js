//相当于数据库
export const state = {
  url:'http://www.adus.club/',
  // url:'http://192.168.51.47:3000/',
  p_map:{
    userCounts:'',
    username:'',
    servers:'',
    server:'',
    userId:'',
  },

   //st 对象
  st_list:{
    userId:'',
    season:'2018-05',
    server:'as',
    mode:'tpp',
  },

  summaryPlayList:'',//组队玩家

  reptileData:{
    //服务器Tab
    servers:[
      {
        server:'',
        time:'',
        games:'',
        pre:'',
      },
    ],
    userCount:'',//在线玩家
    username:'',//玩家名称
    userId:'',//玩家ID
    gameStatistics:['0','0','0'],//最近20场游戏统计
    opinionData:'',//最近20场游戏综合战绩查询
  },
  
  //searchPlayer爬虫数据
  one_st:{
    stats:{
      assists_sum:0,   //次助攻和
      damage_dealt_avg:0,  //平均伤害
      deaths_sum:0,  //死亡人数总和
      headshot_kills_sum:0,  //爆头击杀总和
      kills_max:0,  //最大击杀
      kills_sum:0,   //杀死总和
      longest_kill_max:0,  //最远距离击杀
      matches_cnt:0,  //比赛场次
      rank_avg:0,  //平均排名
      rating:0,  //等级评定
      time_survived_avg:0,  //平均生存时长
      topten_matches_cnt:0,  //前十场次
      win_matches_cnt:0,  //吃鸡场次
    },
    ranks:{
      rating:0,
    },
    max_ranks:{
      rating:0,
    }
  },//单排
  two_st:{
    stats:{
      assists_sum:0,   //次助攻和
      damage_dealt_avg:0,  //平均伤害
      deaths_sum:0,  //死亡人数总和
      headshot_kills_sum:0,  //爆头击杀总和
      kills_max:0,  //最大击杀
      kills_sum:0,   //杀死总和
      longest_kill_max:0,  //最远距离击杀
      matches_cnt:0,  //比赛场次
      rank_avg:0,  //平均排名
      rating:0,  //等级评定
      time_survived_avg:0,  //平均生存时长
      topten_matches_cnt:0,  //前十场次
      win_matches_cnt:0,  //吃鸡场次
    },
    ranks:{
      rating:0,
    },
    max_ranks:{
      rating:0,
    }
  },//双排
  four_st:{
    stats:{
      assists_sum:0,   //次助攻和
      damage_dealt_avg:0,  //平均伤害
      deaths_sum:0,  //死亡人数总和
      headshot_kills_sum:0,  //爆头击杀总和
      kills_max:0,  //最大击杀
      kills_sum:0,   //杀死总和
      longest_kill_max:0,  //最远距离击杀
      matches_cnt:0,  //比赛场次
      rank_avg:0,  //平均排名
      rating:0,  //等级评定
      time_survived_avg:0,  //平均生存时长
      topten_matches_cnt:0,  //前十场次
      win_matches_cnt:0,  //吃鸡场次
    },
    ranks:{
      rating:0,
    },
    max_ranks:{
      rating:0,
    }
  },//四排

  //初始化20场数据
  recentDataMatchesItems:'',
  racetypeIndex:0,

  queueSize:'',
  mode:'',
  sports:'2018-05',//赛季
}
