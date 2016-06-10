var express = require('express');
var router = express.Router();
var updatedriroute = require('../controller/updateroute');
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

router.get('/', updatedriroute.getroute());
//router.put('/updateroute/:id',updatedriroute.updateroute());
// router.get('/updateroute/:id', function(req, res) {
//   console.log(req.params._id);
// });
//router.get('/getrouteid/:_id',updatedriroute.getrouteid());
router.get('/getrouteid/:_id', function(req, res) {
    var Route = global.dbHandel.getModel('driverroute');
    Route.get(req.params._id, function(err, doc) {
    	console.log(req.params._id);
        if (err) {
            res.redirect('/home');
        }
        console.log(doc);
        res.send(doc);
    })
});
router.post('/updateroute', updatedriroute.updateroute());
router.post('/deleteroute', updatedriroute.deleteroute());
router.get('/getroutedate', updatedriroute.getroutedate());
module.exports = router;
