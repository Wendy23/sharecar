/**
 * Created by Yiwen on 9/29/2016.
 */
var express = require('express');
var router = express.Router();
var driRoute = require('../controller/createRoute');

/* GET createRoute page. */
router.get("/",driRoute.fillRoute());
module.exports = router;