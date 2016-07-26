exports.driverroutes = function() {
    return function(req, res) {
        console.log("get into allRouters");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Route = global.dbHandel.getModel('driverroute');
            // Route.statics.getModel(req.session.user, function(userId, callback) {
            //     this.model('driverroute').find({ name: userId }, callback);
            // })
            //Route.find({ name: req.session.user }, function(err, doc) {
            Route.find(function(err, doc) {
                res.render("searchRoute", { driverroutes: doc });
                console.log("doc:" + doc);
            });
        }
    }
}

exports.searchRoute = function() {
    return function(req, res) {
        console.log("get into searchRoute");
        console.log(req.body, req.query);
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Route = global.dbHandel.getModel('driverroutes');
            var routedate = req.body.routedate; //获取post上来的 data数据中 uname的值
            Route.findOne({ dridate: routedate }, function(err, doc) { //通过此model以用户名的条件 查询数据库中的匹配信息
                if (err) { //错误就返回给原post处（login.html) 状态码为500的错误
                    res.send(500);
                    console.log(err);
                } else if (!doc) { //查询不到用户名匹配信息，则用户名不存在
                    req.session.error = '用户名不存在';
                    res.send(404); //   状态码返回404
                    //  res.redirect("/login");
                } else { //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    req.session.user = doc;
                    //console.log(doc);
                    res.send(200);
                    //  res.redirect("/home");
                }
            });
        }
    }
}
