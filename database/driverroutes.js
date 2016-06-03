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
        //drimin: { type: [Number] },
        //drimin: { option: [Number] },
        pcode: { type: String, required: true }

    }
};
