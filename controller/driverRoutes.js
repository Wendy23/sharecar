exports.driverRoutes = function() {
        return function(req, res) {
                console.log("get into driver routes controller");
                if (!req.session.user) { //到达/home路径首先判断是否已经登录
                    req.session.error = "请先登录"
                    res.redirect("/login"); //未登录则重定向到 /login 路径
                } else {
                    var routeModel = global.dbHandel.getModel('driverroute');
                    console.log("di yi bu");
                    var uname = req.session.user;
                    // global.dbHandel.getModel(req.session.user, function(err, doc) {
                    //     console.log(doc);
                    //     res.render("driverRoutes", { driverRoutes: doc });
                    routeModel.find({name: uname}, function(err, driverroutes) {
                            if (err) {
                                return next(err);
                            } else {
                                res.json(driverroutes);
                            }
                        })
                    }
                }
};
