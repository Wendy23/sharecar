exports.myRoutineMessage = function () {
    return function (req, res) {
        console.log("get into Routine Message");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Message = global.dbHandel.getModel('routine');
            //var User = global.dbHandel.getModel('user');
            var name = req.session.user;
            var name1 = name.name;
            Message.find({'ridername.username': name1}, function (err, doc) { //doc message sent part
                Message.find(
                    {
                        name: req.session.user._id,
                        //"rideranme.passnum": {$exists: true}
                        "occupied": {$gt: 0}
                    }, function (err, docs) {
                        Message.find({name: req.session.user._id}).exec(function (err, docc) {
                            //console.log("sent:" + doc);
                            //console.log("received:" + docs);
                            console.log("passenger info:" + docc);
                            if (docc != null && docc.length > 0) {
                                for (var i = 0; i < docc.length; i++) {
                                    if (docc[i]._doc.ridername != "") {
                                        //console.log("zhide" + docc[i]);
                                        res.render("myRoutineMessage", {
                                            routine: doc,
                                            currentname: name1,
                                            routines: docs,
                                            user: (docc != null && docc.length > 0 ? docc[i].ridername : {})
                                        });
                                        //return res.render("myRoutineMessage", {title: 'ShareCar'});
                                    }
                                    //else if(docc[i]._doc.ridername == ""){
                                    //    res.render("myRoutineMessage", {
                                    //        routine: doc,
                                    //        currentname: name1,
                                    //        routines: docs,
                                    //        user: (docc != null && docc.length > 0 ? docc[i].ridername : {})
                                    //    });
                                    //}
                                }
                            }
                            else if(docc.length == 0){
                                res.render("myRoutineMessage", {
                                    routine: doc,
                                    currentname: name1,
                                    routines: docs,
                                    user: {}
                                });
                            }
                        })
                    }
                );
            })
        }
    }
}

exports.removeRoutine = function () {
    return function (req, res) {
        console.log("get into remove routine message");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            console.log(req.body, req.query);
            var Route = global.dbHandel.getModel('routine');
            var username = req.session.user.name;
            var currentId = req.body.routineId;
            var passnum = req.body.passenger;
            Route.update(
                {
                    "_id": currentId,
                    "ridername.username": username
                },
                {
                    "$inc": {
                        'ridername.$.passnum': -passnum,
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
                                "ridername": {passnum: 0}
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

