var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();

/* GET index page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ShareCar'}); // 到达此路径则渲染index文件，并传出title值供 index.html使用
});

/* GET login page. */
router.route("/login")
    .get(function (req, res) { // 到达此路径则渲染login文件，并传出title值供 login.html使用
        res.render("login", {title: 'User Login'});
    })
    .post(function (req, res) { // 从此路径检测到post方式则进行post数据的处理操作
        //get User info
        //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
        var User = global.dbHandel.getModel('user');
        var uname = req.body.uname; //获取post上来的 data数据中 uname的值
        User.findOne({name: uname}, function (err, doc) { //通过此model以用户名的条件 查询数据库中的匹配信息
            if (err) { //错误就返回给原post处（login.html) 状态码为500的错误
                res.send(500);
                console.log(err);
            } else if (!doc) { //查询不到用户名匹配信息，则用户名不存在
                req.session.error = 'user is not exist';
                res.send(404); //   状态码返回404
                //  res.redirect("/login");
            } else {
                if (req.body.upwd != doc.password) { //查询到匹配用户名的信息，但相应的password属性不匹配
                    req.session.error = "incorrect password";
                    res.send(404);
                    //  res.redirect("/login");
                } else { //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    req.session.user = doc;
                    //console.log(doc);
                    res.send(200);
                    //  res.redirect("/home");
                }
            }
        });
    });

/* GET register page. */
router.route("/register")
    .get(
        function (req, res) { // 到达此路径则渲染register文件，并传出title值供 register.html使用
            res.render("register", {title: 'User register'});
        })
    .post(
        function (req, res) {
            //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
            var User = global.dbHandel.getModel('user');
            var uname = req.body.uname;
            var upwd = req.body.upwd;
            User.findOne({name: uname}, function (err, doc) { // 同理 /login 路径的处理方式
                if (err) {
                    res.send(500);
                    req.session.error = 'Network exception error！';
                    console.log(err);
                } else if (doc) {
                    req.session.error = 'user already exists！';
                    res.send(500);
                } else {
                    console.log(id);
                    User.create({ // 创建一组user对象置入model
                        _id: id,//ObjectId(123123123123123),
                        name: uname,
                        password: upwd
                    }, function (err, doc) {
                        if (err) {
                            res.send(500);
                            console.log(err);
                        } else {
                            req.session.error = 'user created！';
                            res.send(200);
                        }
                    });
                }
            });
        });

/* GET home page. */
router.get("/home", function (req, res) {
    if (!req.session.user) { //到达/home路径首先判断是否已经登录
        req.session.error = "Please login"
        res.redirect("/login"); //未登录则重定向到 /login 路径
    } else {
        var Route = global.dbHandel.getModel('driverroute');
        var Routine = global.dbHandel.getModel('routine');
        var id = req.session.user._id;
        Route.find({name: id}, function (err, doc) {
            Routine.find({name: id}, function (err, docc) {
                //console.log(doc);
                console.log(docc);
                res.render("home", {circle: doc,circle2:docc, title: 'ShareCar'}); //已登录则渲染home页面
            })
        })
    }
})

/* GET logout page. */
router.get("/logout", function (req, res) { // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

router.route("/home")
    .post(function (req, res) { // 从此路径检测到post方式则进行post数据的处理操作
        var Route = global.dbHandel.getModel('driverroute');
        var id = req.session.user._id;
        Route.update({name: id}, { $set: { driverstatus: '0' }}, {multi: true},function (err, doc) {
            if (err) return handleError(err);
            res.send(doc);
        })
    });

router.route("/home2")
    .post(function (req, res) { // 从此路径检测到post方式则进行post数据的处理操作
        var Routine = global.dbHandel.getModel('routine');
        var id = req.session.user._id;
        Routine.update({name: id}, { $set: { driverstatus: '0' }}, {multi: true},function (err, doc) {
            if (err) return handleError(err);
            res.send(doc);
        })
    });
/* GET test page. localhost:3000/test?user=57226903bb3cdd801fb60132*/
//router.get("/test", function(req, res) {	// only for testing
//	{
//		var Route = global.dbHandel.getModel('driverroute');
//		// name as '57226903bb3cdd801fb60132'
//		Route.find({ name : req.query.user }, function(err, doc) {
//			console.log(doc);
//			res.json(doc);
//		});
//	}
//
//	/*
//	res.render("testweb", function(req, res) {
//        console.log("get into my routes router");
//
//    });
///*
//	console.log(req.params);
//	console.log(req.query);
//	console.log(req.body);
////	res.send('id: ' + req.query.id);
//	res.send(req.query.key);
//*/
//});

// router.get("/getroute", function(req, res) {	// only for testing
// 	var Route = global.dbHandel.getModel('driverroute');
// 	// _id as '574de95cdc830b24e3df1720', use URL http://localhost:3000/getroute?routeid=574de95cdc830b24e3df1720
// 	Route.find({ _id : req.query.routeid }, function(err, doc) {
// 		console.log(doc);
// 		res.json(doc);
// 	});
// });

/* GET routeId page. http://localhost:3000/driveroute?routeId=574de95cdc830b24e3df1720*/
// router.get("/driveroute", function(req, res) {    

//     {
//         var Route = global.dbHandel.getModel('driverroute');
//         // name as '57226903bb3cdd801fb60132'
//         Route.find({ _id : req.query.routeId }, function(err, doc) {
//             console.log(doc);
//             res.json(doc);
//         });
//     }
// }); 转移到controller/driverroutes中的driveroute
module.exports = router;
