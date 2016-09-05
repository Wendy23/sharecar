 module.exports = {
     routine: {
         name: { type: String, required: true },
         flag: { type: Number, required: true },
         departure:{ type: String, required: true },
         arrive:{ type: String, required: true },
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
          tues: {
              weekday:{ type: String },
              dayhour: { type: Number },
              daymin: { type: Number },
              daytimetlr: { type: Number },
              /*    dayoccupancy: { type: Number },
               daycost: { type: Number },
               daymintime: { type: Number },
               daymaxtime: { type: Number }*/
          },
          wednes: {
              weekday:{ type: String },
              dayhour: { type: Number },
              daymin: { type: Number },
              daytimetlr: { type: Number },
              /*    dayoccupancy: { type: Number },
               daycost: { type: Number },
               daymintime: { type: Number },
               daymaxtime: { type: Number }*/
          },
          thurs: {
              weekday:{ type: String },
              dayhour: { type: Number },
              daymin: { type: Number },
              daytimetlr: { type: Number },
              /*    dayoccupancy: { type: Number },
               daycost: { type: Number },
               daymintime: { type: Number },
               daymaxtime: { type: Number }*/
          },
          fri: {
              weekday:{ type: String },
              dayhour: { type: Number },
              daymin: { type: Number },
              daytimetlr: { type: Number },
              /*    dayoccupancy: { type: Number },
               daycost: { type: Number },
               daymintime: { type: Number },
               daymaxtime: { type: Number }*/
          },
          satur: {
              weekday:{ type: String },
              dayhour: { type: Number },
              daymin: { type: Number },
              daytimetlr: { type: Number },
              /*    dayoccupancy: { type: Number },
               daycost: { type: Number },
               daymintime: { type: Number },
               daymaxtime: { type: Number }*/
          },
         sund: {
             weekday:{ type: String },
             dayhour: { type: Number },
             daymin: { type: Number },
             daytimetlr: { type: Number },
             /*    dayoccupancy: { type: Number },
              daycost: { type: Number },
              daymintime: { type: Number },
              daymaxtime: { type: Number }*/
         }
     }
 }
