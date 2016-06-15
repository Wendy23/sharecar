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
            Route.find({}, function(err, doc) {
                //req.session.user = doc;
                //console.log(doc);
                res.render("driverRoutes", { driverroutes: doc });
            });
        }
    }
}

exports.routeList = function(db) {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            // var collection = db.get('events');
            // collection.find({
            //     "eventOwner": req.session.userId
            // }, function(err, doc) {
            //     res.render("myEvents", {
            //         myEvents: doc
            //     });
            // });
            Route.find({ name: req.session.user }, function(err, doc) {
                // req.session.user = doc;
                //console.log(doc);
                res.send({ routeList: doc });
            });
        }
    }
}

exports.driveroute = function(db) {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            //var Route = global.dbHandel.getModel('driverroute');
            console.log("enter getDriverRoute controller");
            // Route.statics.getModel(req.session.user, function(userId, callback) {
            //     this.model('driverroute').find({ name: userId }, callback);
            // })
            //Route.find({ name: req.session.user }, function(err, doc) {
            Route.find({ _id: req.query.routeId }, function(err, doc) {
                //console.log(doc);
                res.json(doc);
            });
        }
    }
}

exports.updateRoute = function(){
    return function(req,res){
    console.log(req.body);
    var Route = global.dbHandel.getModel('driverroute');
    var condition = {};
    condition[req.body.field] = req.body.value;
 
    console.log(condition, req.query.routeId);

    Route.update({_id: req.query.routeId}, condition, {} ,function(err, raw){
        console.log("update message" + err + raw);
    });
    }
}
