var express = require('express');
var router = express.Router();
var myprofile = require('../controller/myProfile');

/* GET createRoute page. */
router.get('/',myprofile.queryProfile());
router.post('/createProfile',myprofile.createProfile());
router.post('/updatePassword',myprofile.updatePassword());
module.exports = router;