

//加载自己写的工具模块
var handler = require('./handler.js')



//加载第三方模块
var path = require('path')
var express = require('express')
var router = express.Router()




//静态文件操作
//实现对resource文佳夹下的内容进行静态资源托管
//意思就是请求以resources开头的,我就把请求中resources后面的东西拼接上
//上我后面个参数的路径,还自动设置响应头并返回到客户端
//用户请求的 /resources/css/mini.css的第一段/resources会被这个静态函数当做虚拟路径
router.use('/resources', express.static(path.join(__dirname, 'resources')))


//轮播图接口操作
router.get('/api/getlunbo', handler.getlunbo)
//http://localhost:9090/outdata/lunbotu/images/1.png 这个是给客户端那边的图片请求用的路径
router.use('/outdata/lunbotu/images', express.static(path.join(__dirname, 'outdata/lunbotu/images')))


//NewsList接口操作
router.get('/api/getnewslist', handler.getnewslist)
//http://localhost:9090/outdata/NewsList/images/1.png
router.use('/outdata/NewsList/images', express.static(path.join(__dirname, 'outdata/NewsList/images')))
//NewsInfo接口操作
router.get('/api/getnew/:newid', handler.getNew)
//http://localhost:9090/outdata/NewInfo/images/1.png
router.use('/outdata/NewInfo/images', express.static(path.join(__dirname, 'outdata/NewInfo/images')))

//Comment评论子组件接口操作 /api/getcomments/:artid?pageindex=1 后面的query可以不写在这里进行匹配,后面也可以拿到
//为什么呢?因为前端请求的路径就是 /api/getcomments/:artid?pageindex=1 ,但是:artid必须得写
router.get('/api/getcomments/:artid', handler.getComments)
















//文件对象暴露
module.exports = router



