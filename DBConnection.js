var mongo = require('mongodb');
var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodedb');
var db = mongoose.connection;

module.exports=db;