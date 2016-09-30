var express = require('express');
var router = express.Router();
var driRoute = require('../controller/createRoute');

/* GET createRoute page. */
router.get("/", function(req, res) { // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
      if (!req.session.user) { //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login"); //未登录则重定向到 /login 路径
    }
     res.render("createRoute", {driverroute:{}, title: 'ShareCar' }); //已登录则渲染home页面
     console.log("render createRoute");
})
// }).post(function(req, res) {
//     var DriverRoute = global.dbHandel.getModel('driverRoute');
//     var deptdate = req.body.deptdate;
//     var depttime = req.body.depttime;
//     var timetol = req.body.timetol;
//     var postcode = req.body.postcode;
//     var areatol = req.body.areatol;
//     var uname = req.session.user;
//     User.findOne({ name: uname }, function(err, doc) { //通过此model以用户名的条件 查询数据库中的匹配信息
//         if (err) { //错误就返回给原post处（login.html) 状态码为500的错误
//             res.send(500);
//             console.log(err);
//         } else { //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
//             req.session.user = doc;
//             res.send(200);
//             //  res.redirect("/home");
//         }
//     });
.post('/',driRoute.createRoute());
/*
.post('/',function(req, res)
{
	res.redirect("/home");
});
*/
// router.get('/getAllRoutes',driRoute.getAllRoutes());
module.exports = router;