var sql = {}

//轮播图语句
sql.user1 = {
  querySome: 'select img,url from 1lunbotu'
};

//NewsList语句
sql.user2 = {
  queryAll: 'select * from 2Newinfo'
};
//NewInfo语句
sql.user3 = {
  // queryOne: 'select * from 2newinfo where id = ',id没法从handler.js传过来,比较麻烦!
};




//=============暴露出去==============
module.exports = sql