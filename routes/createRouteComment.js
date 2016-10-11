var express = require('express');
var router = express.Router();
var commentRoute = require('../controller/createRouteComment');


router.get('/',commentRoute.routeComment());
router.post('/',commentRoute.createRouteComment());
module.exports = router;