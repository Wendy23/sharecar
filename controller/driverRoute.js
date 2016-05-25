exports.createRoute = function() {
    return function(req, res) {
        console.log("db is up");
        var routeModel = require('../database/driverRoute');

        var route = new routeModel({
            DriverDeptDate: req.body.DriverDeptDate,
            DriverDeptTime: req.body.DriverDeptTime,
            TimeTolerance: req.body.TimeTolerance,
            PostalCode: req.body.PostalCode,
            AreaTolerance: req.body.AreaTolerance
        });
    }
}
// exports.getAllRoutes = function() {
//     return function(req, res) {
//         console.log("get in to getAllEventTypes controller");
//     }
// }
