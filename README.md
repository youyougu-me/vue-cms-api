## 这个是vue-cms1.0版的接口,两个配和才能启动项目
## 项目的启动方式见前端README.md文件


## 服务器(ip及端口设置)
 1. 需要修改的是app.js中监听的服务器及端口
 2. 还需要修改数据库中后端返回给前端,让前端请求的资源数据.这个路径的请求地址应该为后端地址.
app.listen(config.port,'192.168.0.100', function () {
  console.log('http://192.168.0.100:9090/outdata/lunbotu/images/1.png');
})
 3. 数据库配置中的地址 为 服务器内部本机地址即可,127.0.0.1


## 分页查询返回数据总条数 https://www.jianshu.com/p/1a72fb8500a4
