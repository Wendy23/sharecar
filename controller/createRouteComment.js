exports.routeComment = function () {
    return function (req, res) {
        console.log("get into comment route");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Route = global.dbHandel.getModel('driverroute');
            //var name = req.session.user;
            var originalUrl = req.originalUrl;
            var routeId = originalUrl.split('=')[1];
            Route.find({_id: routeId}, function (err, doc) {
                res.render("createRouteComment", {routeId: routeId, comment: doc[0], title: 'ShareCar'}); //已登录则渲染home页面
                console.log("ddd", doc);
            })
        }
    }
}

var moment = require('moment');
exports.createRouteComment = function () {
    return function (req, res) {
        var Comment = global.dbHandel.getModel('comment');
        var name = req.session.user;
        var riderId = name._id;
        var routeId = req.body.routeId;
        var star = req.body.star;
        var text = req.body.comment;
        var dridate = req.body.dridate;
        var from = req.body.from;
        var to = req.body.to;
        var date = new Date();
        var createdate = date.toLocaleDateString();
        var Route = global.dbHandel.getModel('driverroute');
        Route.find({_id: routeId}, function (err, doc) {
            var driverId = doc[0]._doc.name;
            Comment.create({ // 创建一组route对象置入model
                routeId: routeId,
                driverId: driverId,
                riderId: riderId,
                star: star,
                text: text,
                dridate: dridate,
                from:from,
                to:to,
                createdate: createdate
            }, function (err) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    res.send(200);
                }
            });
        })

    }
}