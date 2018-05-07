//仅单向的获取数据，不做任何修改
export const getters = {
  g_url:state => {
    return state.url;
  },
  g_st_list:state => {
    return state.st_list;
  },
  g_reptileData:state => {
    return state.reptileData;
  },
  g_one_st:state => {
    return state.one_st;
  },
  g_two_st:state => {
    return state.two_st;
  },
  g_four_st:state => {
    return state.four_st;
  },
  g_summaryPlayList:state => {
    return state.summaryPlayList;
  },
  g_recentDataMatchesItems:state => {
    return state.recentDataMatchesItems;
  },
  g_racetypeIndex:state => {
    return state.racetypeIndex;
  },
};



