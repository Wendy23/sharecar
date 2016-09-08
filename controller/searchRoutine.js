exports.routine = function () {
    return function (req, res) {
        console.log("get into routine");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Routine = global.dbHandel.getModel('routine');
            console.log(req.query);
            var departure = req.query.departure;
            var arrive = req.query.arrive;
            var query = {};
            if (arrive != null && arrive != undefined && departure != null && departure != undefined) {
                query['arrive'] = arrive;
                query['departure'] = departure;
            }
            Routine.find(query, function (err, doc) {
                console.log(doc);
                res.render("searchRoutine", {routine: doc});

            })
        }
    }
}

exports.updateRoutine = function () {
    return function (req, res) {
        console.log("get into update routine ridername");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            console.log(req.body, req.query);
            var Routine = global.dbHandel.getModel('routine');
            var username = req.session.user.name;
            var currentId = req.body.routineId;
            var passnum = req.body.passenger;
            Routine.update(
                {
                    "_id": currentId,
                    "ridername.username": username
                },
                {
                    "$inc": {
                        'ridername.$.passnum': passnum,
                        'occupied': passnum
                    }
                }, {}, function (err, raw) {
                    console.log("raw: ", raw);
                    if (raw.nModified == '0') {
                        console.log("modify==0");
                        Routine.update({_id: currentId},
                            {
                                $push: {
                                    ridername: {
                                        username: username,
                                        passnum: passnum
                                    }
                                },
                                $inc: {
                                    'occupied': passnum
                                }
                            }, {}, function (err, raw) {
                                //if (err) res.status(500);
                                //res.send(raw);
                            }
                        )
                    }
                    if (err) res.status(500);
                    res.send(raw);
                })
        }
    }
}