// 清除浏览器缓存的内容
$(document).ready(function(){
    localStorage.clear()
});

/* 游戏规则 */
// 规则说明页面出现函数
function rule_show(num){
    $(num).css({"opacity": "1", "z-index" : "1", "position": "relative"});
    // 不知道为啥，jquery不能设置pointer-events的数值
    // 处理id输入
    if (num.substring(0,1) == "#")
        document.getElementById(num.substring(1,num.length)).style.pointerEvents = "auto";
    // 处理class输入（此时应该操纵数组）
    else if(num.substring(0,1) == ".")
        {   
            var nums = document.getElementsByClassName(num.substring(1,num.length));
            for (var i=0; i<nums.length; i++)
                nums[i].style.pointerEvents = "auto";
        }
}
// 规则说明页面消失函数
function rule_vanish(num) { 
    $(num).css({"opacity" : "0", "z-index": "-99", "position": "absolute"});
    // 不知道为啥，jquery不能设置pointer-events的数值
    // 处理id输入
    if (num.substring(0,1) == "#")
        document.getElementById(num.substring(1,num.length)).style.pointerEvents = "none";
    // 处理class输入（此时应该操纵数组）
    else if(num.substring(0,1) == ".")
        {   
            var nums = document.getElementsByClassName(num.substring(1,num.length));
            for (var i=0; i<nums.length; i++)
                nums[i].style.pointerEvents = "none";
        }
}

// 点击规则按钮
$("#rule").click(function () { 
    // 主页面隐身
    rule_vanish(".start-page"); rule_vanish(".rule-intro"); 
    // 规则说明页面出现
    rule_show("#first");
});
// #first页面变换
$("#first").click(function () {
    // 本页面隐身
    rule_vanish("#first");
    // 下个页面出现
    rule_show("#second");
})
// #second页面变换
$("#second").click(function () {
    // 本页面隐身
    rule_vanish("#second");
    // 下个页面出现
    rule_show("#third");
})
// #third页面变换
$("#third").click(function () {
    // 本页面隐身
    rule_vanish("#third");
    // 主页面出现
    rule_show(".start-page");
})




/* 查看荣誉 */
// 点击查看荣誉按钮
$("#honor").click(function (){ 
    // 主页面隐身
    rule_vanish(".start-page"); rule_vanish(".rule-intro");
    rule_show("#honor-intro")
 });
// 单击每个荣誉的按钮，查看荣誉的获得方法
// 单击荣誉界面



/* 开始游戏 */
// 点击开始按钮
$("#game-start").click(function () { 
    // 主页面消失
    rule_vanish(".start-page"); rule_vanish(".rule-intro"); 
    // 沙鼠证出现
    rule_show("#paper");
});
// 两个性别都被选中时，立即弹出一个小彩蛋
$("input[type='radio']").each(function(){$(this).click(function(){
    if($("input[type='radio']")[0].checked == true && $("input[type='radio']")[1].checked == true)
        $("#oye").css("opacity",1);
})})
// 单击提交时
$("#submit").click(function () { 
    // 检测是否输入存档
    check_save();
    // 检查姓名和性别有无填写，若没有则显示提示语句并退出函数
    if ($("input[type='text']")[0].value == '' || ($("input[type='radio']")[0].checked == false && $("input[type='radio']")[1].checked == false))
        { $("#tip2").css("opacity",1);    $("#tip1").css("opacity",0);  return;  }
    else
    {
        $("#tip2").css("opacity",0);
        // 检查复选框是否全部填写
        $("input[type='checkbox']").each(function () { 
            // 若没有全部填写，显示提示语句并退出函数
            if (this.checked == false)
            {  $("#tip1").css("opacity",1);  return; }
            // 若全部填写，则记录值并进入下一环节
            else
            {   
                // 若没有存档，询问是否开启作弊模式
                choice("是否开启作弊模式，将等级直接提升到满级？").done(function(choice_res){ 
                    if(choice_res == true)
                    {
                        identity_cheating();
                        power = [you.level, you.att,you.def,you.life,you.power,you.day];
                        inform("你选择了作弊模式").done(function(){
                            // 跳转页面，输入要传递的值
                            go_to("./src/选择人物/选择舍友.html", ["power","you"]);
                        })
                    }
                    else
                    {
                        // 初始化身份
                        identity();
                        // 根据专业分配荣誉
                        // honor_check_major();
                        // 存值
                        power = [you.level, you.att,you.def,you.life,you.power,you.day];
                        inform("你选择了普通模式").done(function(){ 
                            // 跳转页面，输入要传递的值
                            go_to("./src/选择人物/选择舍友.html", ["power","you"]);
                         })
                    }
                 })
                
            }
        })
    }
});
// 检测存档函数（一个input就解决了……）
function check_save(){    
    var files = $('#save_load').prop('files');//获取到文件列表
    if(files.length == 0){
        return;
    }
    else
    {
        const reader = new FileReader();       //新建一个FileReader
        reader.readAsText(files[0], "UTF-8"); //读取文件 
        // 文件读取成功后的回调函数，
        reader.onload = function(content){
            // 获取文件内容，转化为字符串
            const fileString = content.target.result;
            // 将字符串转换为JSON
            const data = JSON.parse(fileString);
            // JSON可以直接赋值为对象（存储多个对象的JSON是对象数组格式）
            you = data[0];
            roommate = data[1];
            power = data[2];
            inform("成功加载存档，即将跳转页面").done(function(){
                go_to("./src/寝室/寝室.html", ["you","power","roommate"]);
            })
        }
    }
}
// 初始化玩家身份（非作弊模式）
function identity(){
    you = new Student(
        //姓名
        $("input[type='text']")[0].value,
        // 性别
        ($("input[type='radio']")[0].checked == true) ? "男" : '' + ($("input[type='radio']")[1].checked == true)? "女" : '',
        // 专业
        $("select")[0].value
        );
}
// 初始化玩家身份（作弊模式）
function identity_cheating(){
    you = new Student(
        // 姓名
        $("input[type='text']")[0].value,
        // 性别
        ($("input[type='radio']")[0].checked == true) ? "男" : '' + ($("input[type='radio']")[1].checked == true)? "女" : '',
        // 专业
        $("select")[0].value
        );
    // 如果满级是7，就升级六次
    for(var i = 1; i < you.full_level; i++)
        you.level_up();
}





/* 练习模式 */
$("#guide").click(function () { 
    
})