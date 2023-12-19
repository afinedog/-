/* 关闭窗口 */
$("#exit").click(function (){ alert("请手动关闭网页") });

/* 游戏规则 */
// 规则说明页面出现函数
function rule_show(num){
    $(num).css("opacity", "1");   $(num).css("z-index", "1");  $(num).css("position", "relative");
}
// 规则说明页面消失函数
function rule_vanish(num) { 
    $(num).css("opacity", '0');  $(num).css("z-index", "-99"); $(num).css("position", "absolute");
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
    // 检查姓名和性别有无填写，若没有则显示提示语句
    if ($("input[type='text']").value == ' ' && $("#sex").value == 'off')
        { $("#tip2").css("opacity",1);    $("#tip2").css("opacity",0);    }
    else
    {
        // 检查复选框是否全部填写
        $("input[type='checkbox']").each(function () { 
            // 若没有全部填写，显示提示语句
            if (this.checked == false)
            {  $("#tip1").css("opacity",1);  return; }
            // 若全部填写，则记录值并进入下一环节
            else
            {  you = {}  }
        })
    }
});

// 学生类
class student
{
    // 构造函数
    student(name,num,life,act,def,life,dad){
        this.name = name;       // 名字
        this.number = num;
        this.life = life;       // 体力
        this.act = act;  this.def = def;  this.life = life; // 攻击、防御、生命值
        this.dad = dad ;    // 干爹名单
    }
    name = '李鼠';  // 默认名字
    number = `${202100091100 + Math.round(100*Math.random())}`;  // 用反引号生成随机数数字
    life = 5;       // 体力
    act = 5; def = 5; life = 5; // 攻击、防御、生命值
    dad = [''] ;    // 干爹名单
}

// 初始化玩家身份
function identity(){
    you.name = $("paper")
}

/* 新手教程 */
$("#guide").click(function () { 
    // 本页面隐身
    $("#third").css("opacity", '0');  $("#third").css("z-index", "-99"); $("#third").css("position", "absolute");
    question();
})



