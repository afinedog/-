
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
$("input[type='radio']").each(function(){$(this).click(function(){
    if($("input[type='radio']")[0].checked == true && $("input[type='radio']")[1].checked == true)
        $("#oye").css("opacity",1);
})})


// 单击提交时
$("#submit").click(function () { 
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
                // 初始化身份
                identity();
                // 根据专业分配荣誉
                // honor_check_major();
                inform("成功创建身份！欢迎成为沙鼠的一员。学校为你分配了寝室，和你的舍友打个招呼吧。");
                //跳转到寝室页面
                window.location.replace("./dormitory.html");
            }
        })
    }
});

// 学生类
class student
{
    // 构造函数
    constructor(    // 参数列表
                name = 'bug',
                sex = 'bug',
                major = 'bug',
                level = 1,
                num = `${202100091100 + Math.round(100*Math.random())}`,  // 用反引号生成随机数数字
                life = 5,       // 体力
                att = 1, def = 1, hp = 5, // 攻击、防御、生命值
                day = 0,
                dad = [''],     // 干爹名单)
                honor = ['']    // 已获得的荣誉
            )
    // 作弊模式专用
    {
        this.name = name;       // 名字
        this.sex = sex;         // 性别
        this.major = major;     // 专业
        this.level = level;     // 等级
        this.number = num;      // 学号
        this.life = life;       // 体力
        this.att = att;  this.def = def;  this.hp = hp; // 攻击、防御、生命值
        this.day = day;     // 经过天数
        this.dad = dad ;    // 干爹名单
        this.honor = honor;
    }

}

// 初始化玩家身份
function identity(){
    // （非作弊模式）
    you = new student(
        //姓名
        $("input[name='姓名']").value,  
        // 性别
        ($("input[type='radio']")[0].checked == true) ? "男" : '' + ($("input[type='radio']")[1].checked)? "女" : '',
        // 专业
        $("select")[0].value
        );
    // （作弊模式，给出一张表单，自己填写数值）
}

// // 检测荣誉
// function honor_check_major() { 
//     inform("啊！你的选择为你赢得了沙鼠的荣耀，来看一下吧")
//     switch (you.major) {
//         case '数学专业': inform("恭喜你获得荣誉：“大爷”<br> 《》");
//         case '物理专业': inform("恭喜你获得荣誉：“二爷”<br> 《》");
//         case '计算机专业': inform("恭喜你获得荣誉：“程序猿”<br> 《好普通的称号……》");
//         case '土木专业': inform("恭喜你获得荣誉：“土木牛马”<br> 《成为群嘲的对象了！》");
//         case '医学专业': inform("恭喜你获得荣誉：“医学狗”<br> 《组胚背完了吗？》");
//         case '电气电子专业':inform("恭喜你获得荣誉：“”<br> 《》");
//         case '传统工科': inform("恭喜你获得荣誉：“工科狗”<br> 《都是狗，凭什么医学》");
//         case '生化环材地': inform("恭喜你获得荣誉：“天坑之子”<br> 《专业坑不是人坑》");
//         case '金融专业': inform("恭喜你获得荣誉：“两极分化”<br> 《争取成为人上人吧》");
//         case '文史哲法': inform("恭喜你获得荣誉：“官老爷”<br> 《》");
//     }
    
//  }

 /* 通知和判断图窗 */
// 普通的消失函数
function vanish(ele){ $(ele).css({"opacity": "0", "z-index":"-1"}); }
function show(ele) { $(ele).css({"opacity": "1", "z-index":"100"}); }
// 提醒函数，只有接受一个选项
function inform(text){
    $("#inform>.tiptext")[0].textContent = text;
    show($("#inform"));
    // 单击后图窗消失
    $("#know").click(function(){
        // 每次点击更新图窗，都会更新人物数值
        // power = [you.level, you.att,you.def,you.life,you.power,you.day];
        // for(var i = 0; i<$(".power").length; i++)
        //     $(".power")[i].textContent.slice(2,$(".power")[i].textContent.length) = power[i];
        vanish($("#inform"))
    });
}

// 选择函数，有是或否两个选项（异步函数）

function choice(text) {
    $("#choice>.tiptext")[0].textContent = text;
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
//   choice("问题").done(function(choice_res) { a = choice_res; })

/* 新手教程 */
$("#guide").click(function () { 
    
})



