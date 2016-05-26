var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = new Schema({

	DriverDeptDate : Date,
	DriverDeptTime : Date,
	TimeTolerance : Number,
	PostalCode: String,
    AreaTolerance:Number,
    // driver: Schema.Types.ObjectId,
	});

console.log("prepare to model");
routeSchema.methods.createRoute = function(){
	this.model('route').save();
};

var route = mongoose.model('route', routeSchema);

module.exports = route;
// eventSchema.statics.getAllRoutes = function(user_Id, callback){
// 	this.model('route').find({eventOwner:user_Id}, callback);
// }

// routeSchema.methods.createRoute = function(){
// 	this.model('route').save();
// }
// var event = mongoose.model('route',routeSchema);
// module.exports = event;