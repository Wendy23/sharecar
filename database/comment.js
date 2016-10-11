var mongoose = require('mongoose');
var moment = require('moment');
module.exports = {
    comment: {
        routeId: { type: String },
        driverId: { type: String },
        riderId: { type: String },
        star: { type: Number },
        text: { type: String },
        dridate: { type: String },
        from: { type: String },
        to: { type: String },
        createdate: { type: Date }
    }
};