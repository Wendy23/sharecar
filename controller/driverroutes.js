exports.driverroutes = function() {
    return function(req, res) {
        console.log("get into driverrouters");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Route = global.dbHandel.getModel('driverroute');
            var Routine = global.dbHandel.getModel('routine');
            var name = req.session.user;
            var name1 = name._id;
            // Route.statics.getModel(req.session.user, function(userId, callback) {
            //     this.model('driverroute').find({ name: userId }, callback);
            // })
            //Route.find({ name: req.session.user }, function(err, doc) {
            Route.find({ name: name1 }, function(err, doc) {
                Routine.find({ name: name1 }, function(err, docs) {
                    res.render("driverRoutes", { driverroutes: doc, routine: docs });
                    console.log("doc:"+doc);
                    console.log("docs:"+docs);
                });
            })
        }
    }
}

//exports.updateRoute = function() {
//    return function(req, res) {
//        console.log(req.body, req.query);
//        var Route = global.dbHandel.getModel('driverroute');
//
//        Route.update({ _id: req.query.routeId }, req.body, {}, function(err, raw) {
//            console.log("update message", err, raw);
//            if (err) res.status(500);
//            res.send(raw);
//        });
//    }
//}

exports.deleteRoute = function() {
    return function(req, res) {
        console.log("get into deleteroute");
        console.log(req.body, req.query);
        var Route = global.dbHandel.getModel('driverroute');

        Route.remove({ _id: req.query.routeId }, function(err, raw) {
            console.log("remove message", err, raw);
            if (err) res.status(500);
            res.send(raw);
        });
    }
}
