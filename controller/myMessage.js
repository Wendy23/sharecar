exports.myMessage = function () {
    return function (req, res) {
        console.log("get into Message");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Message = global.dbHandel.getModel('driverroute');
            var name = req.session.user;
            var name1 = name._id;
            Message.find({ riderId: name1 }, function(err, doc) {
                //req.session.user = doc;
                console.log(doc);
                res.render("myMessage", {driverroutes: doc,title: 'ShareCar'});
                //res.render("myProfile", { user: JSON.stringify(doc), title: 'ShareCar' });
            });
        }
    }
}