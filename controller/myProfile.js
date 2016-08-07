exports.myprofile = function() {
    return function(req, res) {
        console.log("get into profile");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            res.render('myprofile', { title: 'ShareCar' });

        };
    }
}

exports.createProfile = function() {
    return function(req, res) {
    	console.log("get into createprofile");
        var Route = global.dbHandel.getModel('models');
        var name = req.session.user;
        var nametitle = req.body.nametitle;
        var gender = req.body.gender;
        var email = req.body.email;
        var mobile = req.body.mobile;
        console.log("wwwwwwwwwwwwwwww");
        console.log(req.body);
        Route.create({ // 创建一组route对象置入model
            name: name,
            nametitle: nametitle,
            gender: gender,
            email: email,
            mobile: mobile
        }, function(err) {
            if (err) {
                res.send(500);
                console.log(err);
            } else {
                res.send(200);
            }
        });
    };
};

