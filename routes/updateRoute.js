var express = require('express');
var router = express.Router();
var driverRoutes=require('../controller/updateRoute');
//var driRoute = require('../controller/searchRoute');

/* GET createRoute page. */
// router.get("/", function(req, res) { // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
//       if (!req.session.user) { //到达/home路径首先判断是否已经登录
//         req.session.error = "请先登录"
//         res.redirect("/login"); //未登录则重定向到 /login 路径
//     }
//      res.render("driverRoutes", { title: 'ShareCar' }); //已登录则渲染home页面
//      console.log("render driverRoutes");
// });

router.get('/',driverRoutes.updriroute());
router.get('/getroute',driverRoutes.getroute());
module.exports = router;