module.exports = {
    driverroute: {
        // name: String,
        // drideptdate: String,
        // dridepthour: Number,
        // drideptmin: Number,
        // TimeTolerance: { type: String, required: true },
        //postcode: String
        // routeId: [{Schema.Types.ObjectId}],
        // AreaTolerance: { type: String, required: true },
        //name: { type: String, required: true }

        name: { type: String, required: true },
        dridate: { type: String, required: true },
        drihour: { type: Number, required: true },
        drimin: { type: Number, required: true },
        timetlr: { type: Number, required: true },
        occupancy: { type: Number, required: true },
        cost: { type: Number, required: true },
        mintime: { type: Number },
        maxtime: { type: Number },
        pcode: { type: String, required: true }
    }
};
