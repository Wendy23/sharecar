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
        //Route.remove({ name: name1, password: password }, function(err, doc) {});
        Route.update({name:name1},{$set:{nametitle:nametitle,gender:gender,email:email,mobile:mobile}},function(err, doc) {
            if (err) {
                res.send(500);
                console.log(err);
            } else {
                //req.session.user = doc;
                //res.json({ "status": "success" });
                res.send(200);
                // res.render('myProfile', { title: 'ShareCar' });
            }
        });

    };
};

exports.queryProfile = function() {
    return function(req, res) {
        console.log("get into queryprofile");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Profile = global.dbHandel.getModel('user');
            var name = req.session.user;
            var name1 = name.name;
            Profile.find({ name: name1 }, function(err, doc) {
                //req.session.user = doc;
                console.log(doc);
                res.render("myProfile", { user: JSON.stringify(doc), title: 'ShareCar' });
            });
        }
    }
};

exports.updatePassword = function() {
    return function(req, res) {
        console.log("get into update password");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "Please login first"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Profile = global.dbHandel.getModel('user');
            var name = req.session.user;
            var name1 = name.name;
            var oldpassword = req.body.oldpassword;
            var newpassword = req.body.newpassword;
            console.log("data: " + name.password);
            console.log("old: " + oldpassword);
            Profile.update({ name: name1 }, { $set: { password: newpassword } }, function(err, doc) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else if (!doc) {
                    req.session.error = 'meiyou';
                    res.send(404)
                } else {
                    res.send(200);

                }

            })

        }
    };
};
