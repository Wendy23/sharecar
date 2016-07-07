exports.createRoutine = function() {
    return function(req, res) {
        // console.log("get in to createRoute controller");
        // var routeModel = require('../database/driverRoute');

        // var newRoute = new routeModel({
        //     DriverDeptDate : req.body.DriverDeptDate,
        //     DriverDeptTime : req.body.DriverDeptTime,
        //     // TimeTolerance: req.body.TimeTolerance,
        //     PostalCode : req.body.PostalCode,
        //     // AreaTolerance: req.body.AreaTolerance,
        //     driver:req.session.user
        // });
        // newRoute.save();
        // console.log("SAVE");
        // res.send(200);
        var Routine = global.dbHandel.getModel('routine');
        // var name = "lk";//req.session.user;这个session取不到，看一下
        var name = req.session.user;
        console.log(name);
        var flag = req.body.flag;
        //先删除再新增
        Routine.remove({name: name}, function(err, raw){
            console.log("remove message", err, raw);
            //if (err) res.status(500);
            //res.send(raw);
        });
        if (flag == 1) {
            var dayhour = req.body.dayhour;
            var daymin = req.body.daymin;
            var daytimetlr = req.body.daytimetlr;

            console.log(req.body);
            Routine.create({ // 创建一组route对象置入model
                name: name,
                flag: flag,
                mon: {
                    weekday: "mon",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
                },
                sund: {
                    weekday: "sund",
                    dayhour: dayhour,
                    daymin: daymin,
                    daytimetlr: daytimetlr
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
        }else if(flag==2){
            var Monweekday = req.body.Mondayhour?"mon":"";
            var Mondayhour = req.body.Mondayhour?req.body.Mondayhour:0;
            var Mondaymin = req.body.Mondaymin?req.body.Mondaymin:0;
            var Mondaytimetlr = req.body.Mondaytimetlr?req.body.Mondaytimetlr:0;

            var Sunweekday = req.body.Sundayhour?"sund":"";//从sun改成了sund
            var Sundayhour = req.body.Sundayhour?req.body.Sundayhour:0;
            var Sundaymin = req.body.Sundaymin?req.body.Sundaymin:0;
            var Sundaytimetlr = req.body.Sundaytimetlr?req.body.Sundaytimetlr:0;

            console.log(req.body);
            Routine.create({ // 创建一组route对象置入model
                name: name,
                flag: flag,
                mon: {
                    weekday: Monweekday,
                    dayhour: Mondayhour,
                    daymin: Mondaymin,
                    daytimetlr: Mondaytimetlr
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
        console.log("get into routine");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Routine = global.dbHandel.getModel('routine');
            var name = req.session.user;//req.session.user;这个session取不到，看一下
            Routine.find({name: name}, function(err, doc) {
                //req.session.user = doc;
                console.log(doc);
                res.render("createRoutine", { routine: JSON.stringify(doc),title: 'ShareCar' });
            });
        }
    }
};
