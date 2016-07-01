var express = require('express');
var router = express.Router();
var driRoutine = require('../controller/createRoutine');

/* GET createRoute page. */
//router.get("/", function(req, res) { // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
//      if (!req.session.user) { //到达/home路径首先判断是否已经登录
//        req.session.error = "请先登录"
//        res.redirect("/login"); //未登录则重定向到 /login 路径
//    }
//     res.render("createRoutine", {title: 'ShareCar'}); //已登录则渲染home页面
//     console.log("render createRoutine");
//})
router.get('/',driRoutine.queryRoutine());
router.post('/',driRoutine.createRoutine());

module.exports = router;