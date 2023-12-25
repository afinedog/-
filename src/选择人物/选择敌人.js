// 取值
you = JSON.parse(localStorage.getItem("you"));
power = JSON.parse(localStorage.getItem("power"));
roommate = JSON.parse(localStorage.getItem("roommate"));
// 选择敌人
$("div.img-container").click(function(){
    // 敌人名字
    var enemy_name = $(this).find("img").attr("alt");
    // 根据不同的敌人，选择不同的战斗类进行实例化
    switch(enemy_name){
        case "YYH":
            choice(`你确定要挑战 ${enemy_name}吗？`).done(function(choice_res){
                if(choice_res == true)
                    {
                        enemy = new YYH();
                        go_to("../对战敌人/切磋.html",["you","power","enemy"])
                    }
                else
                    return;
            })
            break;
        case "LKH":
            choice(`你确定要挑战 ${enemy_name}吗？`).done(function(choice_res){
                if(choice_res == true)
                    {
                        enemy = new LKH();
                        go_to("../对战敌人/切磋.html",["you","power","enemy"])
                    }
                else
                    return;
            })
            break;
        case "HSJ":
            choice(`你确定要挑战 ${enemy_name}吗？`).done(function(choice_res){
                if(choice_res == true)
                    {
                        enemy = new HSJ();
                        go_to("../对战敌人/切磋.html",["you","power","enemy"])
                    }
                else
                    return;
            })
            break;
        case "YYZ":
            choice(`你确定要挑战 ${enemy_name}吗？`).done(function(choice_res){
                if(choice_res == true)
                    {
                        enemy = new YYZ();
                        go_to("../对战敌人/切磋.html",["you","power","enemy"])
                    }
                else
                    return;
            })
            break;
        case "LJL":
            choice(`你确定要挑战 ${enemy_name}吗？`).done(function(choice_res){
                if(choice_res == true)
                    {
                        enemy = new LJL();
                        go_to("../对战敌人/切磋.html",["you","power","enemy"])
                    }
                else
                    return;
            })
            break;
        case "李鼠":
            choice(`你确定要挑战 ${enemy_name}吗？`).done(function(choice_res){
                if(choice_res == true)
                    {
                        enemy = new LiShu();
                        go_to("../对战敌人/切磋.html",["you","power","enemy"])
                    }
                else
                    return;
            })
            break;
    }
})