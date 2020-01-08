
//加载第三方模块
var express = require('express')

//加载自己的分工模块
var config = require('./conf/config.js')
var router = require('./router.js')

var app = express()

//设置跨域访问  
app.all('*', function (req, res, next) {
  //console.log(req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
  next();
});


//使用路由
app.use('/', router)




app.listen(config.port,'localhost', function () {
  console.log('http://localhost:9090/outdata/lunbotu/images/1.png');
})