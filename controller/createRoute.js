exports.createRoute = function() {
    return function(req, res) {
        console.log("db is up");
        var routeModel = require('../database/driverRoute');

        var newRoute = new routeModel({
            DriverDeptDate: req.body.DriverDeptDate,
            DriverDeptTime: req.body.DriverDeptTime,
            TimeTolerance: req.body.TimeTolerance,
            PostalCode: req.body.PostalCode,
            AreaTolerance: req.body.AreaTolerance,
            // driver:req.session.user
        });
        newRoute.save();
        console.log("SAVE");
        res.send(200);
    }
}
// exports.getAllRoutes = function() {
//     return function(req, res) {
//         console.log("get in to getAllEventTypes controller");
//     }
// }
