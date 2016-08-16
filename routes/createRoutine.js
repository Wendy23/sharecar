var express = require('express');
var router = express.Router();
var driRoutine = require('../controller/createRoutine');

router.get('/',driRoutine.queryRoutine());
router.post('/',driRoutine.createRoutine());

module.exports = router;