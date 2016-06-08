/*findbyid method*/
exports.findById = function(db) {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            //http://localhost:3000/updateroute/getroute?routeId=5758518d200fb91423a2c7fb
            console.log("enter getroute controller");
            //Route.findOne({ _id: req.query.routeId }, function(err, doc) {
            Route.findById('57586b1ff9c5b75c1d130c46', function(err, doc) {
                doc.dridate = '06/17/2015';
                doc.save(function(err) {
                    if (err) throw err;
                    console.log('success');
                })
            });
        }
    }
}

exports.getroute = function() {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            console.log("render updateRoute");
            res.render('updateRoute', { title: 'ShareCar' });
        }
    }
}

/*findByIdAndUpdate method*/
exports.updateroute = function(db) {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            //http://localhost:3000/updateroute/getroute?routeId=5758518d200fb91423a2c7fb
            console.log("enter updateroute controller");
            //Route.update(conditions, update, options, callback);
            // Route.findAndModify({ _id: req.query.routeId }, function(err, doc) {
            // Route.findByIdAndUpdate('57587caa394a494818f3741c', { drihour: '22' }, function(err, doc) {
            //         if (err) throw err;
            //     })
            var conditions = { _id: req.query.routeId };
            console.log(req.query.routeId);
            var update = { $set: { pcode: req.body.PostalCode, dridate: req.body.DriverDeptDate, drihour: req.body.DriverDeptHour } };
            var options = { upsert: true };
            Route.update(conditions, update, options, function(err) {
                if (err) {
                    console.log(error);
                } else {
                    console.log('update ok!');
                }
            })
        }
    }
}

exports.deleteroute = function() {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        console.log("user deleteroute controller");
        // userModel.findOne({_id:req.session.userId},function(err,doc){
        //  console.log(doc);
        // });
        // userModel.getUserProfileInfo(req.session.userId).then(function(data){
        //  console.log(data);

        Route.findByIdAndRemove('57587c4cea217ea817559cf7', function(err) {
            if (err) throw err;
        })
    }
}
/*test*/
exports.getroutedate = function() {
    return function(req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        // _id as '574de95cdc830b24e3df1720', use URL http://localhost:3000/updateRoute/getroutedate?routeid=57587caa394a494818f3741c
        Route.findOne({ _id: req.query.routeid }, function(err, doc) {
            console.log(doc);
            console.log(doc.dridate);
            res.json(doc.dridate);
        })

        // if you wish to use .find() rather than .findOne(), you may follow this:
        //  Route.find({ _id : req.query.routeid }, function(err, doc) {
        //      console.log(doc[0].drideptdate);
        //      console.log(doc[0]["drideptdate"]);
        //      res.json(doc[0].drideptdate);
        //  });
    }
}
