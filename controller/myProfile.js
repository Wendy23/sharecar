exports.createProfile = function() {
    return function(req, res) {
    	console.log("get into createprofile");
        var Route = global.dbHandel.getModel('user');
        var name = req.session.user;
        var nametitle = req.body.nametitle;
        var gender = req.body.gender;
        var email = req.body.email;
        var mobile = req.body.mobile;
        console.log(req.body);
        Route.create({ // 创建一组route对象置入model
            name: name,
            nametitle: nametitle,
            gender: gender,
            email: email,
            mobile: mobile
        }, function(err,doc) {
            if (err) {
                res.send(500);
                console.log(err);
            } else {
                req.session.user = doc;
                res.send(200);
                // res.render('myProfile', { title: 'ShareCar' });
            }
        });
    };
};

