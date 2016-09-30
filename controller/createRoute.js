var moment = require('moment');
exports.createRoute = function () {
    return function (req, res) {
        var Route = global.dbHandel.getModel('driverroute');
        var name = req.session.user;
        var drideptdate = req.body.drideptdate;
        var dridepthour = req.body.dridepthour;
        var drideptmin = req.body.drideptmin;
        var timetol = req.body.timetol;
        var occu = req.body.occu;
        var cost = req.body.cost;
        var mintime = req.body.mintime;
        var maxtime = req.body.maxtime;
        var postcode = req.body.postcode;
        var deptpcoderange = req.body.deptpcoderange;
        var postcode2 = req.body.postcode2;
        var arripcoderange = req.body.arripcoderange;
        //var createdate = new Date(drideptdate);
        var createdate = moment(drideptdate, "MM-DD-YYYY").format("YYYY-MM-DD");
        var editId = req.body.abc;
        var result = editId.indexOf("createRoute") > -1;
        console.log(req.body);
        if (result) {
            Route.create({ // 创建一组route对象置入model
                name: name,
                dridate: drideptdate,
                drihour: dridepthour,
                drimin: drideptmin,
                timetlr: timetol,
                pcode: postcode,
                pcoderange: deptpcoderange,
                pcode2: postcode2,
                pcoderange2: arripcoderange,
                occupancy: occu,
                cost: cost,
                mintime: mintime,
                maxtime: maxtime,
                createdate: createdate
            }, function (err) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    // req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });

        } else {
            console.log("daozheli");
            Route.update({_id: editId}, {dridate: drideptdate}, function (err, doc) {
                res.send(200);
            })
        }
    };
};
// exports.getAllRoutes = function() {
//     return function(req, res) {
//         console.log("get in to getAllEventTypes controller");
//     }
// }

exports.fillRoute = function () {
    return function (req, res) {
        console.log("get into update Route Controller");
        var Route = global.dbHandel.getModel('driverroute');
        var editId = req.query.currentEditingRouteId;
        // var routeId= req.query.currentEditingRouteId;
        //var doc = db.find({_id:});
        // res.render("createRoute",doc);

        Route.findOne({"_id": editId}, function (err, doc) {
            console.log("get into database");
            res.render("createRoute", {driverroute: doc, title: 'ShareCar'});
            console.log("doc:" + doc);
        })

        //res.send(req.query.currentEditingRouteId); user: JSON.stringify(doc)
    }
}

