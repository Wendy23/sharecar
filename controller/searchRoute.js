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
        console.log(req.body);
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var routeModel = global.dbHandel.getModel('driverroute');
            var routedate = req.body.routedate;
            var routehour = req.body.routehour;
            var routemin = req.body.routemin;
            var routedep = req.body.routedeparture;
            var routearr = req.body.routedestination;
            var time = Number(routehour) * 3600 + Number(routemin) * 60;
            routeModel.find({ dridate: routedate }, function(err, docs) {
                //routeModel.find(dridate:routedate).toArray(function(err, doc) {
                console.log("docs" + docs);
                console.log("time" + time);
                docs.forEach(function(err, doc) {
                    doc.find({ mintime: { $lte: time } }, function(err, docs) {
                        if (err) {
                            res.send(500);
                            console.log(err);
                        } else if (!doc) {
                            res.send(404);
                        } else {
                            console.log(doc);
                            res.send(200);
                        }
                    })
                })

            });
        }
    }
}
