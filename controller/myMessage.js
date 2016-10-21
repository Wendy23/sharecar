exports.myMessage = function () {
    return function (req, res) {
        console.log("get into Message");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Message = global.dbHandel.getModel('driverroute');
            var Comment = global.dbHandel.getModel('comment');
            var name = req.session.user;
            var name1 = name._id;
            Comment.find({riderId: req.session.user._id},
                function (err, comment) {
                    Message.find({'riderid.userid': req.session.user._id},
                        function (err, doc) {
                            Message.find(
                                {
                                    name: name1,
                                    "riderid.passnum": {$exists: true}
                                }).populate('riderid.userid', null).exec(function (err, docs) {
                                        //console.log("sent:" + doc);
                                        console.log("user:" + docs);
                                        console.log("comment:" + comment);
                                        //console.log("info" + docc);
                                        if (docs != null && docs.length > 0) {
                                            // for (var j = 0; j < docc[i]._doc.riderid.length;j++){
                                            //var currentuserinfo = docc[i]._doc.riderid[j];
                                            res.render("myMessage", {
                                                driverroutes: doc,
                                                currentId: name1,
                                                routes: docs,
                                                comment: comment,
                                                //orderinfos: docc
                                            });
                                        }
                                        else if (docs.length == 0) {
                                            res.render("myMessage", {
                                                driverroutes: doc,
                                                currentId: name1,
                                                routes: docs,
                                                comment: comment,
                                                user: {}
                                            });
                                        }

                                    //console.log("docs:" + docs);
                                    //res.render("myMessage", {driverroutes: doc, title: 'ShareCar'});
                                    //res.render("myProfile", { user: JSON.stringify(doc), title: 'ShareCar' });
                                }
                            );
                        })
                })
        }
    }
}


exports.removeRoute = function () {
    return function (req, res) {
        console.log("get into remove riderId");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
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