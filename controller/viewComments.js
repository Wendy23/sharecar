exports.viewComments = function() {
    return function(req, res) {
        console.log("get into viewComments");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Comment = global.dbHandel.getModel('comment');
            var originalUrl = req.originalUrl;
            var driverId = originalUrl.split('=')[1];
            Comment.find({ driverId: driverId }, function(err, doc) {
                //req.session.user = doc;
                console.log(doc);
                res.render("viewComments", { comment:doc, title: 'ShareCar' });
            });
        }
    }
};