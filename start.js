
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
$("#sex").click(function(){
    if($("input[type='radio']")[0].value == 'on' && $("input[type='radio']")[1].value == 'on')
        $("#oye").css("opacity",1);
})

// 单击提交时
$("#submit").click(function () { 
    // 检查姓名和性别有无填写，若没有则显示提示语句并退出函数
    if ($("input[type='text']").value == ' ' && $("#sex").value == 'off')
        { $("#tip2").css("opacity",1);    $("#tip1").css("opacity",0);  return;  }
    else
    {
        // 检查复选框是否全部填写
        $("input[type='checkbox']").each(function () { 
            // 若没有全部填写，显示提示语句并退出函数
            if (this.checked == false)
            {  $("#tip1").css("opacity",1);  return; }
            // 若全部填写，则记录值并进入下一环节
            else
            {   
                // 初始化身份
                identity();
                // 根据专业分配荣誉
                honor_check();
                window.location.replace("./dormitory.html");  //跳转到寝室页面
            }
        })
    }
});

// 学生类
class student
{
    // 构造函数
    student(    // 参数列表
                name,
                sex ,
                major,
                num = `${202100091100 + Math.round(100*Math.random())}`,  // 用反引号生成随机数数字
                life = 5,       // 体力
                act = 5, def = 5, hp = 5, // 攻击、防御、生命值
                day = 0,
                dad = [''],     // 干爹名单)
                honor = ['']    // 已获得的荣誉
            )
    // 作弊模式专用
    {
        this.name = name;       // 名字
        this.sex = sex;         // 性别
        this.major = major;     // 专业
        this.number = num;      // 学号
        this.life = life;       // 体力
        this.act = act;  this.def = def;  this.hp = hp; // 攻击、防御、生命值
        this.day = day;     // 经过天数
        this.dad = dad ;    // 干爹名单
        this.honor = honor;
    }

}

// 初始化玩家身份
function identity(){
    // （非作弊模式）
    you = new student(
        $("input[name='姓名']").value,
        $("#sex")[0].value + $("#sex")[1].value,
        $("select")[0].value
        );
    // （作弊模式，给出一张表单，自己填写数值）
}

// 检测荣誉
function honor_check() { 
    switch (you.major) {
        case '数学专业': 
        case '物理专业': 
        case '计算机专业': 
        case '土木专业': 
        case '医学专业': 
        case '电气电子专业':
        case '传统工科': 
        case '生化环材地': 
        case '金融专业': 
        case '文史哲法': 
    }
    
 }

 /* 通知和判断图窗 */
// 普通的消失函数
function vanish(ele){ $(ele).css({"opacity": "0", "z-index":"-1"}); }
function show(ele) { $(ele).css({"opacity": "1", "z-index":"100"}); }
// 提醒函数，只有接受一个选项
function inform(){
    show($("#inform"));
    // 单击后图窗消失
    $("#know").click(function(){
        vanish($("#inform"))
    });
}

// 选择函数，有是或否两个选项（异步函数）

function choice() {
    show("#choice");
    var choice_res;
    var deferred = $.Deferred();
    $('#yes').click(function() {
        vanish($("#choice"));
        choice_res = true;
        deferred.resolve(choice_res);
    });
    $('#no').click(function() {
        vanish($("#choice"));
        choice_res = false;
        deferred.resolve(choice_res);
    });
    return deferred.promise();
  }
  
// 若要使a为调用的值，只需要：
//  choice().done(function(choice_res) { a = choice_res; })

/* 新手教程 */
$("#guide").click(function () { 
    
})



