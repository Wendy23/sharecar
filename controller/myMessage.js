exports.myMessage = function () {
    return function (req, res) {
        console.log("get into Message");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Message = global.dbHandel.getModel('driverroute');
            var Message2 = global.dbHandel.getModel('driverroute');
            var name = req.session.user;
            var name1 = name._id;
            Message.aggregate(
                {
                    $unwind: '$riderid'
                },
                {
                    $match: {'riderid.userid': req.session.user._id}
                },
                //{
                //    $project: {cost: 1, riderid: 1, _id: 0, passnum: 1}
                //},
                //{
                //    "$group": {"_id": "$_id", "riderid": {'$push': "$riderid"}}
                //},
                function (err, doc) {
                    Message2.find(
                        {
                            name: name1,
                            "riderid.passnum": {$exists: true}
                        }, function (err, docs) {
                            Message2.find().populate('user').exec(function (err, docc) {
                                res.render("myMessage", {driverroutes: doc, routes: docs, user: docc});
                                console.log("user:" + docc);
                            })

                            //console.log("docs:" + docs);
                            //res.render("myMessage", {driverroutes: doc, title: 'ShareCar'});
                            //res.render("myProfile", { user: JSON.stringify(doc), title: 'ShareCar' });
                        }
                    );
                })
        }
    }
}


exports.removeRoute = function () {
    return function (req, res) {
        console.log("get into remove riderId");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            console.log(req.body, req.query);
            var Route = global.dbHandel.getModel('driverroute');
            var userid = req.session.user._id;
            var currentId = req.body.routeId;
            var passnum = req.body.passenger;
            Route.update(
                {
                    "_id": currentId,
                    "riderid.userid": userid
                },
                {
                    "$inc": {
                        'riderid.$.passnum': -passnum,
                        'occupied': -passnum
                    }
                },
                {}, function (err, raw) {
                    console.log("raw: ", raw);
                    Route.update(
                        {
                            '_id': currentId
                        },
                        {
                            $pull: {
                                "riderid": {passnum: 0}
                            }
                        }, {}, function (err, raw) {
                        }
                    )
                    if (err) res.status(500);
                    res.send(raw);
                })
        }
    }
}