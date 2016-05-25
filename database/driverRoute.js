var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = new Schema({

	DriverDeptDate : Date,
	DriverDeptTime : Date,
	TimeTolerance : Number,
	PostalCode: String,
    AreaTolerance:Number,
    // user_Id : Schema.Types.ObjectId,
	})

var Route = mongoose.model('Route', routeSchema);

module.exports = Route;
// eventSchema.statics.getAllRoutes = function(user_Id, callback){
// 	this.model('route').find({eventOwner:user_Id}, callback);
// }

// routeSchema.methods.createRoute = function(){
// 	this.model('route').save();
// }
// var event = mongoose.model('route',routeSchema);
// module.exports = event;