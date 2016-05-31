exports.driverroutes = function() {
    return function(req, res) {
        console.log("get into my routes router");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Route = global.dbHandel.getModel('driverroute');
            // Route.statics.getModel(req.session.user, function(userId, callback) {
            //     this.model('driverroute').find({ name: userId }, callback);
            // })
            Route.find({name: req.session.user}, function(err, doc) {
                    req.session.user = doc;
                    console.log(doc);
                    res.render("driverRoutes", { driverroutes: doc });
                }


            );
        }
    }
};