exports.driverroutes = function() {
    return function(req, res) {
        console.log("get into driverrouters");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Route = global.dbHandel.getModel('driverroute');
            // Route.statics.getModel(req.session.user, function(userId, callback) {
            //     this.model('driverroute').find({ name: userId }, callback);
            // })
            //Route.find({ name: req.session.user }, function(err, doc) {
            Route.find({ name: req.session.user }, function(err, doc) {
                //req.session.user = doc;
                //console.log(doc);
                res.render("driverRoutes", { driverroutes: doc });
            });
        }
    }
}

exports.queryRoutine = function() {
    console.log("get into routine");
    return function(req, res) {
        console.log("get into routine");
        var Routine = global.dbHandel.getModel('routine');
        var name = req.session.user;
        Routine.find({ name: name }, function(err, doc) {
            //req.session.user = doc;
            console.log(doc);
            res.render("driverRoutes", { routine: JSON.stringify(doc) });
        });

    }
};

exports.updateRoute = function() {
    return function(req, res) {
        console.log(req.body, req.query);
        var Route = global.dbHandel.getModel('driverroute');

        Route.update({ _id: req.query.routeId }, req.body, {}, function(err, raw) {
            console.log("update message", err, raw);
            if (err) res.status(500);
            res.send(raw);
        });
    }
}

exports.deleteRoute = function() {
    return function(req, res) {
        console.log(req.body, req.query);
        var Route = global.dbHandel.getModel('driverroute');

        Route.remove({ _id: req.query.routeId }, function(err, raw) {
            console.log("remove message", err, raw);
            if (err) res.status(500);
            res.send(raw);
        });
    }
}
