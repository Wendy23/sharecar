exports.myMessage = function () {
    return function (req, res) {
        console.log("get into Message");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Message = global.dbHandel.getModel('driverroute');
            var name = req.session.user;
            var name1 = name._id;
            Message.find({'riderid.userid': req.session.user._id},
            //Message.aggregate(
            //    {
            //        $unwind: '$riderid'
            //    },
            //    {
            //        $match: {'riderid.userid': req.session.user._id}
            //    },
            //    //{
            //    //    $project: {cost: 1, riderid: 1, _id: 0, passnum: 1}
            //    //},
            //    //{
            //    //    "$group": {"_id": "$_id", "riderid": {'$push': "$riderid"}}
            //    //},
                function (err, doc) {
                    Message.find(
                        {
                            name: name1,
                            "riderid.passnum": {$exists: true}
                        }, function (err, docs) {
                            Message.find({name:req.session.user._id}).populate('riderid.userid', null).exec(function (err, docc) {
                                console.log("sent:" + doc);
                                console.log("user:" + docc);
                                res.render("myMessage", {driverroutes: doc, currentId:name1,routes: docs, user: (docc!=null && docc.length>0?docc[0]._doc.riderid:{})});
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