exports.routine = function () {
    return function (req, res) {
        console.log("get into routine");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Routine = global.dbHandel.getModel('routine');
            console.log(req.query);
            Routine.find({}, function (err, doc) {
                console.log(doc);
                res.render("searchRoutine", {routine: doc});

            })
        }
    }
}