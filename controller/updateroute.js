exports.updatedri = function() {
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
            //Route.find({ name: req.session.user }, function(err, doc) {
            Route.find({}, function(err, doc) {
                //req.session.user = doc;
                console.log(doc);
                res.render("updateRoute", { driverroutes: doc });
            });
        }
    }
}


exports.getroute = function(db) {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            // userModel.findOne({_id:req.session.userId},function(err,doc){
            //  console.log(doc);
            // });
            // userModel.getUserProfileInfo(req.session.userId).then(function(data){
            //  console.log(data);
            console.log("enter getroute controller");
            Route.find({ _id: req.query.routeId }, function(err, doc) {
                //console.log(doc);
                res.send({getroute: doc});
            });
        }
    }
}

exports.updateroute = function() {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        console.log("user profile controller");
        // userModel.findOne({_id:req.session.userId},function(err,doc){
        //  console.log(doc);
        // });
        // userModel.getUserProfileInfo(req.session.userId).then(function(data){
        //  console.log(data);

        Route.find(req.session.routeId, function(err, doc) {
            console.log(doc);
            res.send(doc);
        })
    }
}
