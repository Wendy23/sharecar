var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    driverroute: {
        name: { type: String, required: true },
        dridate: { type: String, required: true },
        drihour: { type: Number, min: 0, max: 23 },
        drimin: { type: Number, required: true },
        timetlr: { type: Number, required: true },
        occupancy: { type: Number, required: true },
        cost: { type: Number, required: true },
        mintime: Number,
        maxtime: Number,
        from:{ type: String, required: true },
        pcode: { type: String, required: true },
        pcoderange: { type: Number, required: true },
        to:{ type: String, required: true },
        pcode2: { type: String, required: true },
        pcoderange2: { type: Number, required: true },
        occupied: {type: Number, default:0},
        createdate: {type: Date, required: true},
        riderid: [{
            userid: {type:ObjectId,ref:'user'},
            passnum: Number,default:0}]
    }
};
