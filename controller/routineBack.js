exports.routineBack = function() {
    return function(req, res) {
        var Routine = global.dbHandel.getModel('routine');
        // var name = "lk";//req.session.user;这个session取不到，看一下
        var name = req.session.user;
        console.log(name);
        var flag = req.body.flag;
        //先删除再新增
        Routine.remove({name: name,comeback:"back"}, function(err, raw){
            console.log("remove message", err, raw);
            //if (err) res.status(500);
            //res.send(raw);
        });
        if (flag == 1) {
            var dayhour = req.body.dayhour;
            var daymin = req.body.daymin;
            var daytimetlr = req.body.daytimetlr;
            var from = req.body.from;
            var departure = req.body.departure;
            var to = req.body.to;
            var arrive = req.body.arrive;
            var occupancy = req.body.occupancy;
            var cost =  req.body.cost;

            console.log(req.body);
            Routine.create({ // 创建一组route对象置入model
                name: name,
                flag: flag,
                from:from,
                departure:departure,
                to:to,
                arrive:arrive,
                occupancy:occupancy,
                cost:cost,
                comeback:"back",
                mon: {
                    weekday: "mon",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
                },
                //sund: {
                //    weekday: "sund",
                //    dayhour: dayhour,
                //    daymin: daymin,
                //    daytimetlr: daytimetlr
                //},
                tues: {
                    weekday: "tues",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
                },
                wednes: {
                    weekday: "wednes",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
                },
                thurs: {
                    weekday: "thurs",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
                },
                fri: {
                    weekday: "fri",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
                }
                //satur: {
                //    weekday: "satur",
                //    dayhour: dayhour,
                //    daymin: daymin,
                //    daytimetlr: daytimetlr
                //}
            }, function (err) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    // req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }else if(flag==2){
            var Monweekday = req.body.mondayhour?"mon":"";
            var Mondayhour = req.body.mondayhour?req.body.mondayhour:0;
            var Mondaymin = req.body.mondaymin?req.body.mondaymin:0;
            var Mondaytimetlr = req.body.mondaytimetlr?req.body.mondaytimetlr:0;

            var Sunweekday = req.body.sunddayhour?"sund":"";//从sun改成了sund
            var Sundayhour = req.body.sunddayhour?req.body.sunddayhour:0;
            var Sundaymin = req.body.sunddaymin?req.body.sunddaymin:0;
            var Sundaytimetlr = req.body.sunddaytimetlr?req.body.sunddaytimetlr:0;

            var Tuesweekday = req.body.tuesdayhour?"tues":"";
            var Tuesdayhour = req.body.tuesdayhour?req.body.tuesdayhour:0;
            var Tuesdaymin = req.body.tuesdaymin?req.body.tuesdaymin:0;
            var Tuesdaytimetlr = req.body.tuesdaytimetlr?req.body.tuesdaytimetlr:0;

            var Wednesweekday = req.body.wednesdayhour?"wednes":"";
            var Wednesdayhour = req.body.wednesdayhour?req.body.wednesdayhour:0;
            var Wednesdaymin = req.body.wednesdaymin?req.body.wednesdaymin:0;
            var Wednesdaytimetlr = req.body.wednesdaytimetlr?req.body.wednesdaytimetlr:0;

            var Thursweekday = req.body.thursdayhour?"thurs":"";
            var Thursdayhour = req.body.thursdayhour?req.body.thursdayhour:0;
            var Thursdaymin = req.body.thursdaymin?req.body.thursdaymin:0;
            var Thursdaytimetlr = req.body.thursdaytimetlr?req.body.thursdaytimetlr:0;

            var Friweekday = req.body.fridayhour?"fri":"";
            var Fridayhour = req.body.fridayhour?req.body.fridayhour:0;
            var Fridaymin = req.body.fridaymin?req.body.fridaymin:0;
            var Fridaytimetlr = req.body.fridaytimetlr?req.body.fridaytimetlr:0;

            var Saturweekday = req.body.saturdayhour?"satur":"";
            var Saturdayhour = req.body.saturdayhour?req.body.saturdayhour:0;
            var Saturdaymin = req.body.saturdaymin?req.body.saturdaymin:0;
            var Saturdaytimetlr = req.body.saturdaytimetlr?req.body.saturdaytimetlr:0;

            var from = req.body.from;
            var departure = req.body.departure;
            var to = req.body.to;
            var arrive = req.body.arrive;
            var occupancy = req.body.occupancy;
            var cost = req.body.cost;

            console.log(req.body);
            Routine.create({ // 创建一组route对象置入model
                name: name,
                flag: flag,
                from:from,
                departure:departure,
                to:to,
                arrive:arrive,
                occupancy:occupancy,
                cost:cost,
                comeback:"back",
                mon: {
                    weekday: Monweekday,
                    dayhour: Mondayhour,
                    daymin: Mondaymin,
                    daytimetlr: Mondaytimetlr
                },
                tues: {
                    weekday: Tuesweekday,
                    dayhour: Tuesdayhour,
                    daymin: Tuesdaymin,
                    daytimetlr: Tuesdaytimetlr
                },
                wednes: {
                    weekday: Wednesweekday,
                    dayhour: Wednesdayhour,
                    daymin: Wednesdaymin,
                    daytimetlr: Wednesdaytimetlr
                },
                thurs: {
                    weekday: Thursweekday,
                    dayhour: Thursdayhour,
                    daymin: Thursdaymin,
                    daytimetlr: Thursdaytimetlr
                },
                fri: {
                    weekday: Friweekday,
                    dayhour: Fridayhour,
                    daymin: Fridaymin,
                    daytimetlr: Fridaytimetlr
                },
                satur: {
                    weekday: Saturweekday,
                    dayhour: Saturdayhour,
                    daymin: Saturdaymin,
                    daytimetlr: Saturdaytimetlr
                },
                sund: {
                    weekday: Sunweekday,
                    dayhour: Sundayhour,
                    daymin: Sundaymin,
                    daytimetlr: Sundaytimetlr
                }
            }, function (err) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    // req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    };
};
// exports.getAllRoutes = function() {
//     return function(req, res) {
//         console.log("get in to getAllEventTypes controller");
//     }
// }
exports.queryRoutine = function() {
    return function(req, res) {
        console.log("get into back routine");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Routine = global.dbHandel.getModel('routine');
            var id = req.session.user._id;//req.session.user;这个session取不到，看一下
            Routine.find({name: id}, function(err, doc) {
                //req.session.user = doc;
                console.log(doc);
                if(doc!=null && doc.length>0) {
                    for(var i=0;i<doc.length;i++){
                        if (doc[i]._doc.comeback == "back") {
                            res.render("routineBack", { routine: JSON.stringify(doc[1]._doc),title: 'ShareCar' });
                        }
                    }
                }
                res.render("routineBack",{routine:"",title: 'ShareCar' });

            });
        }
    }
};
