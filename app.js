// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');

// 加载路由控制
var routes = require('./routes/index');
var users = require('./routes/users');
var createRoute = require('./routes/createRoute');
var createRoutine = require('./routes/createRoutine');
var driverRoutes = require('./routes/driverRoutes');
var searchRoute = require('./routes/searchRoute');
var searchRoutine = require('./routes/searchRoutine');
var myProfile = require('./routes/myProfile');
var myMessage = require('./routes/myMessage');

global.dbHandel = require('./database/dbHandel');
//global.db = mongoose.connect("mongodb://localhost:27017/nodedb");
mongoose.connect('mongodb://localhost:27017/nodedb');

mongoose.connection.on('error',function(err){
  console.log(err);
});

// 创建项目实例
var app = express();
app.use(session({ 
  secret: 'secret',
  cookie:{ 
    maxAge: 1000*60*30
  }, resave: true, saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","html");
app.set('view engine', 'html');

// 定义icon图标
app.use(favicon(__dirname + '/public/images/favicon.jpg'));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){ 
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";
  if(err){ 
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();
});

// 匹配路径和路由
app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/users', users); // 即为为路径 /users 设置路由
app.use('/login',routes); // 即为为路径 /login 设置路由
app.use('/register',routes); // 即为为路径 /register 设置路由
app.use('/home',routes); // 即为为路径 /home 设置路由
app.use('/logout',routes); // 即为为路径 /logout 设置路由
app.use('/createRoute',createRoute); // 即为为路径 /createRoute 设置路由
app.use('/createRoutine',createRoutine); // 即为为路径 /createRoute 设置路由
app.use('/driverRoutes',driverRoutes); // 即为为路径 /driverRoutes 设置路由
app.use('/searchRoute',searchRoute); // 即为为路径 /searchRoute 设置路由
app.use('/searchRoutine',searchRoutine); // 即为为路径 /searchRoute 设置路由
app.use('/myProfile',myProfile); // 即为为路径 /profile 设置路由
app.use('/myMessage',myMessage);// 即为为路径 /message 设置路由


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//mongoose.connect('mongodb://localhost:27017/nodedb');

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;