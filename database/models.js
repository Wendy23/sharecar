var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    user: {
        _id:{type:ObjectId,ref:'driverroute'},
        name: { type: String, required: true },
        password: { type: String },
        nametitle: { type: String, default:"name" },
        gender: { type: String, default:"gender" },
        mobile: { type: String, default:0 },
        email: { type: String,default:0 }
    }
};