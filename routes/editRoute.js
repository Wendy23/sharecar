/**
 * Created by Yiwen on 9/29/2016.
 */
var express = require('express');
var router = express.Router();
var driRoute = require('../controller/createRoute');

/* GET createRoute page. */
router.get("/",driRoute.fillRoute());
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

/*
 .post('/',function(req, res)
 {
 res.redirect("/home");
 });
 */
// router.get('/getAllRoutes',driRoute.getAllRoutes());
module.exports = router;