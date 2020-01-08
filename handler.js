//载入第三方模块
var path = require('path')
var querystring = require('querystring')
var mysql = require('mysql')
var express = require('express')

//加载分工模块
var config = require('./conf/db.js')

//不同数据库有不同sql语句 ,都在这个对象里面,需要在这个大对象中 点 出来
var $sql = require('./dao/userSql.js')



//数据库操作
var pool = mysql.createPool(config.mysql)


//轮播图数据接口处理函数
module.exports.getlunbo = function (req, res) {
  //此函数要返回的是图路径而不是文件,因为img要的是路径
  //做法:先实现直接访问图片,然后把路径存数据库
  //直接访问图片的实现在路由中的静态资源已经实现http://localhost:9090/outdata/lunbotu/images/1.png
  pool.getConnection(function (err, connection) {
    //轮播图数据库语句
    var $sql1 = $sql.user1
    // connection.query()是异步的
    connection.query($sql1.querySome, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        //因为这个查询是异步的,所以查到数据后的操作应该在这里执行
        //返回的是个数组,里面装的直接就是对象了
        res.json({
          status: 0,
          message: result
        })
      }
      connection.release()
    })
  })
}

//NewsList数据接口处理函数
module.exports.getnewslist = function (req, res) {
  pool.getConnection(function (err, connection) {
    //轮播图数据库语句
    var $sql2 = $sql.user2
    // connection.query()是异步的
    connection.query($sql2.queryAll, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        res.json({
          status: 0,
          message: result
        })
      }
      connection.release()
    })
  })
}
////NewsInfo接口处理函数
module.exports.getNew = function (req, res) {
  var id = req.params.newid
  pool.getConnection(function (err, connection) {
    // var $sql3 = $sql.user3
    connection.query('select * from 2newinfo where id =' + id, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        res.json({
          status: 0,
          message: result
        })
      }
      connection.release()
    })
  })
}

//Comment子组件评论数据接口处理
// http://localhost:9090/api/getcomments/2?pageindex=1
//对于数据库,每个资讯id都都应该有自己的100条数据(自己的表),然后分4页,每页25条==加载更多可以加载3次
//每个id一个表,一个pageindex 查询此表25条 1-25 26-50 51-75 76-100
module.exports.getComments = function (req, res) {
  // /api/getcomments/:artid?pageindex=1
  //可以正常拿到两个
  var pageindex = req.query.pageindex//数字量
  var artid = req.params.artid
  // SELECT COUNT(*) FROM table_name
  // SELECT * FROM 3artid1 WHERE `id` >= 3 AND `id` <= 5
  //查询表名
  var table = '3artid' + artid
  //先查询总条数
  pool.getConnection(function (err, connection) {
    connection.query('SELECT COUNT(id) as total FROM ' + table, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        var commenttotal = result[0].total
        //再查询需要的评论
        // select * from 3artid1 limit 2,1;
        // 越过多少(jupm)行 数多少(5)行 每次查5行
        var jupm = commenttotal - pageindex * 5
        var $sqlidea = 'select * from ' + table + ' limit ' + jupm + ',' + '5'
        if (jupm < 0) {
          jupm = 0
          var litle = commenttotal - (pageindex - 1) * 5
          $sqlidea = 'select * from ' + table + ' limit ' + jupm + ',' + litle
        }
        // console.log(table);
        // console.log($sqlidea);
        // console.log(jupm);
        // console.log(litle);
        connection.query($sqlidea, function (err, result) {
          if (err) {
            res.send(err)
          } else {
            res.json({
              status: 0,
              message: result
            })
          }
        })
      }
      connection.release()
    })
  })
}









//封装一个获取用户提交post数据的方法
//因为这个方法里用到了外部的数据,所以需要传进来
function postBodyData(req, callback) {
  var array = []
  req.on('data', function (chunk) {
    array.push(chunk)
  })
  req.on('end', function () {
    var postBody = Buffer.concat(array)
    postBody = postBody.toString('utf8')
    //这个是解析查询字符串的'name=zhang&&age=18'
    // postBody = querystring.parse(postBody)
    //而后面个是解析JSON字符串的
    postBody = JSON.parse(postBody)
    callback(postBody)
  })
}

