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
        pcode: { type: String, required: true },
        pcoderange: { type: Number, required: true },
        pcode2: { type: String, required: true },
        pcoderange2: { type: Number, required: true }
    }
};
