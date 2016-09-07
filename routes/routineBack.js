var express = require('express');
var router = express.Router();
var dribackRoutine = require('../controller/routineBack');

router.get('/',dribackRoutine.queryRoutine());
router.post('/',dribackRoutine.routineBack());

module.exports = router;