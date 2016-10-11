var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models");
var driverroutes = require("./driverroutes");
var routine = require("./routine");
var comment = require("./comment");

/*models for user*/
for (var m in models) {
    mongoose.model(m, new Schema(models[m]));
}

module.exports = {
    getModel: function(type) {
        return _getModel(type);
    }
};

var _getModel = function(type) {
    return mongoose.model(type);
};


/*driverRoute for driver route*/

for (var m in driverroutes) {
    mongoose.model(m, new Schema(driverroutes[m]));
}

for (var m in routine) {
    mongoose.model(m, new Schema(routine[m]));
}

for (var m in comment) {
    mongoose.model(m, new Schema(comment[m]));
}

module.exports = {
    getModel: function(type) {
        return _getModel(type);
    }
};

var _getModel = function(type) {
    return mongoose.model(type);
};