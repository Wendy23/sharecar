exports.routine = function () {
    return function (req, res) {
        console.log("get into routine");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            var Routine = global.dbHandel.getModel('routine');
            console.log(req.query);
            var departure = req.query.departure;
            var arrive = req.query.arrive;
            var radio = req.query.radio;
            var dayhoursund = req.query.dayhoursund;
            var dayminsund = req.query.dayminsund;
            var dayhourmon = req.query.dayhourmon;
            var query = {};
            if (arrive != null && arrive != undefined && departure != null && departure != undefined) {
                query['arrive'] = arrive;
                query['departure'] = departure;
            }
            Routine.find(query, function (err, doc) {
                if (doc != null && doc.length>0) {
                    if (radio != null && radio != undefined) {
                        if (radio == "1") {
                            var dayhour = req.query.dayhour;
                            var daymin = req.query.daymin;
                            var inputTime = parseInt(dayhour) * 60 + parseInt(daymin);
                            for(var i=0;i<doc.length;i++){
                                var document = doc[i]._doc;
                                doc[i]._doc.sortTop = 0;
                                var weekdayArray = ['mon','tues','wednes','thurs','fri'];
                                for(var k=0;k<weekdayArray.length;k++){
                                    var currentWeekday = document[weekdayArray[k]];
                                    if(currentWeekday.weekday != ""){
                                        var leftTime = parseInt(currentWeekday.dayhour) * 60 + parseInt(currentWeekday.daymin) - parseInt(currentWeekday.daytimetlr);
                                        var rightTime = parseInt(currentWeekday.dayhour) * 60 + parseInt(currentWeekday.daymin) + parseInt(currentWeekday.daytimetlr);
                                        var leftTimeABS = Math.abs(parseInt(leftTime) - parseInt(inputTime));
                                        var rightTimeABS = Math.abs(parseInt(rightTime) - parseInt(inputTime));
                                        doc[i]._doc.sortTop = doc[i]._doc.sortTop + (parseInt(leftTimeABS)<parseInt(rightTimeABS) ? leftTimeABS : rightTimeABS);
                                    }
                                }
                            }
                            for(var i=0;i<doc.length;i++) {
                                if(doc[i]._doc.sortTop==0){
                                    doc[i]._doc.sortTop==9999999999;
                                }
                            }
                            var temp;
                            for(var i=0;i<doc.length;i++) {
                                for(j = 0; j < doc.length; j++){
                                    if(doc[i]._doc.sortTop < doc[j]._doc.sortTop){
                                        temp = doc[i];
                                        doc[i] = doc[j];
                                        doc[j] = temp;
                                    }
                                }
                            }
                            console.log(doc);
                        } else if (radio == "2") {
                            var currhour;
                            var currmin;
                            var inputTime = 0;
                            for(var i=0;i<doc.length;i++){
                                var document = doc[i]._doc;
                                doc[i]._doc.sortTop = 0;
                                var weekdayArray = ['mon','tues','wednes','thurs','fri','satur','sund'];
                                        for(var k=0;k<weekdayArray.length;k++){
                                            if(k==0){
                                                if(req.query.dayhourmon != null && req.query.dayhourmon != undefined) {
                                                    currhour = req.query.dayhourmon;
                                                    currmin = req.query.dayminmon;
                                                    inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                                }
                                            }
                                            if(k==1){
                                        if(req.query.dayhourtues != null && req.query.dayhourtues != undefined) {
                                            currhour = req.query.dayhourtues;
                                            currmin = req.query.daymintues;
                                            inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                        }
                                    }
                                    if(k==2){
                                        if(req.query.dayhourwednes != null && req.query.dayhourwednes != undefined) {
                                            currhour = req.query.dayhourwednes;
                                            currmin = req.query.dayminwednes;
                                            inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                        }
                                    }
                                    if(k==3){
                                        if(req.query.dayhourthurs != null && req.query.dayhourthurs != undefined) {
                                            currhour = req.query.dayhourthurs;
                                            currmin = req.query.dayminthurs;
                                            inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                        }
                                    }
                                    if(k==4){
                                        if(req.query.dayhourfri != null && req.query.dayhourfri != undefined) {
                                            currhour = req.query.dayhourfri;
                                            currmin = req.query.dayminfri;
                                            inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                        }
                                    }
                                    if(k==5){
                                        if(req.query.dayhoursatur != null && req.query.dayhoursatur != undefined) {
                                            currhour = req.query.dayhoursatur;
                                            currmin = req.query.dayminsatur;
                                            inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                        }
                                    }
                                    if(k==6){
                                        if(req.query.dayhoursund != null && req.query.dayhoursund != undefined) {
                                            currhour = req.query.dayhoursund;
                                            currmin = req.query.dayminsund;
                                            inputTime = parseInt(currhour) * 60 + parseInt(currmin);
                                        }
                                    }
                                    var currentWeekday = document[weekdayArray[k]];
                                    if(currentWeekday.weekday != ""){
                                        var leftTime = parseInt(currentWeekday.dayhour) * 60 + parseInt(currentWeekday.daymin) - parseInt(currentWeekday.daytimetlr);
                                        var rightTime = parseInt(currentWeekday.dayhour) * 60 + parseInt(currentWeekday.daymin) + parseInt(currentWeekday.daytimetlr);
                                        var leftTimeABS = Math.abs(parseInt(leftTime) - parseInt(inputTime));
                                        var rightTimeABS = Math.abs(parseInt(rightTime) - parseInt(inputTime));
                                        doc[i]._doc.sortTop = doc[i]._doc.sortTop + (parseInt(leftTimeABS)<parseInt(rightTimeABS) ? leftTimeABS : rightTimeABS);
                                    }
                                }
                            }
                            for(var i=0;i<doc.length;i++) {
                                if(doc[i]._doc.sortTop==0){
                                    doc[i]._doc.sortTop==9999999999;
                                }
                            }
                            var temp;
                            for(var i=0;i<doc.length;i++) {
                                for(j = 0; j < doc.length; j++){
                                    if(doc[i]._doc.sortTop < doc[j]._doc.sortTop){
                                        temp = doc[i];
                                        doc[i] = doc[j];
                                        doc[j] = temp;
                                    }
                                }
                            }
                            console.log(doc);
                        }
                    }
                }
                console.log(doc);
                //var queryDayArrayTemp =[];
                //if(dayhoursund!=null && dayhoursund != undefined){
                //    queryDayArrayTemp.push(dayhoursund);
                //}
                //if(dayhourmon!=null && dayhourmon != undefined){
                //    queryDayArrayTemp.push(dayhourmon);
                //}
                res.render("searchRoutine", {
                    routine: doc,
                    'departure': departure,
                    'arrive': arrive,
                    'dayhour': dayhour,
                    'daymin': daymin,
                    'radio': radio,
                   // 'queryDayArray' :queryDayArrayTemp,
                    'dayhoursund': dayhoursund,
                    'dayhourmon': dayhourmon,
                    'dayminsund': dayminsund

                });

            })
        }
    }
}

exports.updateRoutine = function () {
    return function (req, res) {
        console.log("get into update routine ridername");
        if (!req.session.user) { //到达/home路径首先判断是否已经登录
            req.session.error = "请先登录"
            res.redirect("/login"); //未登录则重定向到 /login 路径
        } else {
            console.log(req.body, req.query);
            var Routine = global.dbHandel.getModel('routine');
            var username = req.session.user.name;
            var currentId = req.body.routineId;
            var passnum = req.body.passenger;
            Routine.update(
                {
                    "_id": currentId,
                    "ridername.username": username
                },
                {
                    "$inc": {
                        'ridername.$.passnum': passnum,
                        'occupied': passnum
                    }
                }, {}, function (err, raw) {
                    console.log("raw: ", raw);
                    if (raw.nModified == '0') {
                        console.log("modify==0");
                        Routine.update({_id: currentId},
                            {
                                $push: {
                                    ridername: {
                                        username: username,
                                        passnum: passnum
                                    }
                                },
                                $inc: {
                                    'occupied': passnum
                                }
                            }, {}, function (err, raw) {
                                //if (err) res.status(500);
                                //res.send(raw);
                            }
                        )
                    }
                    if (err) res.status(500);
                    res.send(raw);
                })
        }
    }
}