 module.exports = {
     routine: {
         name: { type: String, required: true },
         flag: { type: Number, required: true },
         mon: {
             weekday:{ type: String },
             dayhour: { type: Number },
             daymin: { type: Number },
             daytimetlr: { type: Number },
         /*    dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
         },
         // tues: {
         //     dayhour: { type: Number },
         //     daymin: { type: Number },
         //     daytimetlr: { type: Number },
         //     dayoccupancy: { type: Number },
         //     daycost: { type: Number },
         //     daymintime: { type: Number },
         //     daymaxtime: { type: Number }
         // },
         // wedn: {
         //     dayhour: { type: Number },
         //     daymin: { type: Number },
         //     daytimetlr: { type: Number },
         //     dayoccupancy: { type: Number },
         //     daycost: { type: Number },
         //     daymintime: { type: Number },
         //     daymaxtime: { type: Number }
         // },
         // thurs: {
         //     dayhour: { type: Number },
         //     daymin: { type: Number },
         //     daytimetlr: { type: Number },
         //     dayoccupancy: { type: Number },
         //     daycost: { type: Number },
         //     daymintime: { type: Number },
         //     daymaxtime: { type: Number }
         // },
         // fri: {
         //     dayhour: { type: Number },
         //     daymin: { type: Number },
         //     daytimetlr: { type: Number },
         //     dayoccupancy: { type: Number },
         //     daycost: { type: Number },
         //     daymintime: { type: Number },
         //     daymaxtime: { type: Number }
         // },
         // sat: {
         //     dayhour: { type: Number },
         //     daymin: { type: Number },
         //     daytimetlr: { type: Number },
         //     dayoccupancy: { type: Number },
         //     daycost: { type: Number },
         //     daymintime: { type: Number },
         //     daymaxtime: { type: Number }
         // },
         sund: {
             weekday:{ type: String },
             dayhour: { type: Number },
             daymin: { type: Number },
             daytimetlr: { type: Number },
          /*   dayoccupancy: { type: Number },
             daycost: { type: Number },
             daymintime: { type: Number },
             daymaxtime: { type: Number }*/
         }
     }
 }
