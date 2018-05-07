//拥有对数据操作的权利，可以进行修改
export const mutations = {
  //api
  //修改Register
  m_searchPlayer(state,data){
    state.reptileData = data;
  },
  //1st 2st 4st
  m_one_st(state,data){
    state.one_st = data;
  },
  m_two_st(state,data){
    state.two_st = data;
  },
  m_four_st(state,data){
    state.four_st = data;
  },
  //st
  m_st_list(state,data){
    state.st_list = data;
  },
  //玩家列表
  m_summaryPlayList(state,data){
    state.summaryPlayList = data;
  },
  //20场单场数据
  m_recentDataMatchesItems(state,data){
    state.recentDataMatchesItems = data;
  },
}
