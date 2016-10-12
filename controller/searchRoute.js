var moment = require('moment');

exports.driverroutes = function () {
    return function (req, res) {
        console.log("get into allRouters");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var pageNum = parseInt(req.query.pageNum) ? parseInt(req.query.pageNum) : 1;
            var pageSize = parseInt(req.query.pageSize) ? parseInt(req.query.pageSize) : 2;
            var Route = global.dbHandel.getModel('driverroute');
            var Comment = global.dbHandel.getModel('comment');
            console.log(req.query);
            var condition = req.query;
            var routedate = condition.routedate;
            var routehour = condition.routehour;
            var routemin = condition.routemin;
            var from = condition.from;
            var to = condition.to;
            var routedep = condition.pcode;
            var routearr = condition.pcode2;
            //var s1 = moment().format("YYYY-MM-DD HH:mm:ss");
            var currentdate = moment(new Date()).format("YYYY-MM-DD");
            //var s3 = moment("2016/04/01", "YYYY/MM/DD").format("YYYY-MM-DD");
            var query = {};
            if (routedate != null && routedate.length != 0) {
                query['dridate'] = routedate;
            }
            query['createdate'] = {$gte: currentdate};
            /*query['occupancy'] > query['occupied'];*/
            if ((routehour != null && routehour != undefined) || (routemin != null && routemin != undefined)) {
                var time = Number(routehour) * 3600 + Number(routemin) * 60;
                if (time != null && time != "0") {
                    query['mintime'] = {$lte: time};
                    query['maxtime'] = {$gte: time};
                }
            }
            if (routedep != null && routedep != 0) {
                query['pcode'] = routedep;
            }
            if (routearr != null && routearr != 0) {
                query['pcode2'] = routearr;
            }
            console.log(query);
            Comment.aggregate([{$group : {_id : "$driverId", count: { $sum: 1},avgstar: { $avg: "$star" }}}],function(err,rating){
                console.log(rating);
                    Route.count(query, function (err, count) {
                        Route.find(query).$where(function () {
                            return this.occupancy > this.occupied;
                        }).
                        //where('occupancy').gt(where('occupied')).
                        skip((pageNum - 1) * pageSize).limit(pageSize).sort({dridate: -1}).exec(function (err, docs) {
                            res.render("searchRoute", {
                                'comment': rating,
                                'driverroute': docs,
                                'pageNum': pageNum,
                                'routedate': routedate,
                                'routehour': routehour,
                                'routemin': routemin,
                                'from': from,
                                'to': to,
                                'routedep': routedep,
                                'routearr': routearr,
                                'time': time,
                                'pageSize': pageSize,
                                'totalPage': Math.ceil(count / pageSize)
                            })

                        });
                    });

            })


        }
    }
}

exports.updateRoute = function () {
    return function (req, res) {
        console.log("get into update riderId");
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
                        'riderid.$.passnum': passnum,
                        'occupied': passnum
                    }
                }, {}, function (err, raw) {
                    console.log("raw: ", raw);
                    if (raw.nModified == '0') {
                        console.log("modify==0");
                        Route.update({_id: currentId},
                            {
                                $push: {
                                    riderid: {
                                        userid: userid,
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