module.exports = {
    routine: {
        name: {type: String, required: true},
        flag: {type: Number, required: true},
        from: {type: String, required: true},
        departure: {type: String, required: true},
        to: {type: String, required: true},
        arrive: {type: String, required: true},
        cost:{type:Number,default:0},
        occupancy: { type: Number, default:0},
        occupied: {type: Number, default:0},
        comeback:{type:String},
        driverstatus:{type:Number,default:0},
        mon: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        tues: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        wednes: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        thurs: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        fri: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        satur: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        sund: {
            weekday: {type: String},
            dayhour: {type: Number},
            daymin: {type: Number},
            daytimetlr: {type: Number},
            /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
        },
        ridername: [{
            username: {type: String, ref: 'user'},
            passnum: Number, default: 0,
            email: String,default:0,
            gender:String,
            mobile:Number,
            nametitle:String
        }]
    }
}
