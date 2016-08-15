exports.createProfile = function() {
    return function(req, res) {
        console.log("get into createprofile");
        var Route = global.dbHandel.getModel('user');
        var name = req.session.user;
        var name1 = name.name;
        var password = name.password;
        var nametitle = req.body.nametitle;
        var gender = req.body.gender;
        var email = req.body.email;
        var mobile = req.body.mobile;
        console.log(req.body);
        Route.findOne({ name: name1 }, function(err, doc) {
            Route.remove({ name: name1, password: password }, function(err, doc) {
                if (err) {
                    res.send(500);
                    console.log("error1");
                    console.log(err);
                } else {
                    console.log("deleted");
                    Route.create({ // 创建一组route对象置入model
                        name: name1,
                        password: password,
                        nametitle: nametitle,
                        gender: gender,
                        email: email,
                        mobile: mobile
                    }, function(err, doc) {
                        if (err) {
                            res.send(500);
                            console.log("error2");
                            console.log(err);
                        } else {
                            console.log("success1");
                            req.session.user = doc;
                            //res.json({ "status": "success" });

                            res.send({"status":"success"});
                            // res.render('myProfile', { title: 'ShareCar' });
                        }
                    });
                }

            });
        });

    };
};
