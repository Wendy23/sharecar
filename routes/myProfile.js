var express = require('express');
var router = express.Router();
var myprofile = require('../controller/myProfile');

router.get('/',myprofile.myProfile());
router.post('/createProfile',myprofile.createProfile());
module.exports = router;