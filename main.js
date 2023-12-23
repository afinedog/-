// 学生类
class Student
{
    // 构造函数
    constructor(    // 参数列表
                name = 'bug',
                sex = 'bug',
                major = 'bug',
                num = `${202100091100 + Math.round(100*Math.random())}`,  // 用反引号生成随机数数字
                level = 1,
                life = 5,       // 体力
                att = 1, def = 1, hp = 5,speed = 1, // 攻击、防御、生命值
                day = 0,
                dad = [],     // 干爹名单)
                honor = []    // 已获得的荣誉
            )
    // 作弊模式专用
    {
        this.name = name;       // 名字
        this.sex = sex;         // 性别
        this.major = major;     // 专业
        this.number = num;      // 学号
        this.level = level;     // 等级
        this.life = life;       // 体力
        this.att = att;  this.def = def;  this.hp = hp; this.speed = speed; // 攻击、防御、生命值、速度
        this.day = day;     // 经过天数
        this.dad = dad ;    // 干爹名单
        this.honor = honor;

        switch(this.major){
            // 每个专业的满级设置
            case "数学专业" :   this.full_level = 7;
            case "物理专业" :   this.full_level = 7;
            case "计算机专业" : this.full_level = 7;
            case "电气电子" : this.full_level = 7;
            case "土木专业" : this.full_level = 8;
            case "文史哲法" : this.full_level = 7;
            case "生化环材地" : this.full_level = 8;
            case "金融专业" : this.full_level = 7;
            case "医学专业" : this.full_level = 8;
            default : this.full_level = 7; // 默认是数学专业
        }
    }
    /* 属性 */
    name; sex; major; level; number; life; att; day; dad; honor; full_level;

    /* 方法 */
    // 升级，在训练或作弊模式下调用
    level_up(){
        if(this.level < this.full_level)
        {
            var gain;
            // 标准增长：[1,1,3,2,3]    最高增长：[2,2,5,2,5]
            // 不仅仅要和专业有关，还要和技能有配合。
            switch(this.major){
                // 数学学生需要有强大的体力、心态、可支配时间，但是实操是短板，故攻击和防御比较低
                case "数学专业": gain = [1,1,5,2,3];
                // 物理专业同理
                case "物理专业": gain = [1,1,5,2,3];
                // 计算机专业需要有强大的实操水平和可支配时间，但长期996，身体不太行。所以体力和速度都是短板
                case "计算机专业": gain = [2,1,1,1,2];
                // 电气电子这种比较平平的专业，取较为标准的数值。在这里体现的思想是，生命要足够多，攻击力要足够小，才能更有玩法。不然战斗结束的太快了
                case "电气电子": gain = [1,1,3,2,3];
                // 著名牛马，纯纯的数值怪，各项都是增长最快的
                case "土木专业": gain = [2,2,5,2,5];
                // 攻击力和速度顶尖，但其它都不太行
                case "文史哲法": gain = [1,1,3,2,2];
                // 医学牲肯定要在体力和生命上下功夫啦
                case "医学专业": gain = [1,1,5,1,3];
                // 也是著名牲口。但相比于医学牲可以操纵自己生命值的做法，生化环材的体力更有意思
                case "生化环材地": gain = [1,1,5,1,5];
                // 精英人士把握了话语权，总是能更快地看到产业的风口。速度会快得多。
                case "金融专业": gain = [1,1,2,2,3];
            }
            this.level += 1; this.att += gain[0]; this.def += gain[1]; this.hp += gain[2]; this.speed += gain[3]; this.life += gain[4];
            inform(`你提升了1级，获得的增益有：<br> 攻击力 ${gain[0]} <br> 防御力 ${gain[2]} <br> 速度 ${gain[3]} <br> 体力 ${gain[4]}`);
        }
        else
            inform("已提升至满级");
    }
}

// 舍友类
class Roommate{
    // 构造函数
    constructor(name,words,inter,figure,figure_src,fresh){
        this.name = name;
        this.words = words;
        this.inter = inter;
        this.figure = figure;
        this.figure_src = figure_src;
        this.fresh = fresh;
    };
    
    /* 属性 */
    name;
    figure; figure_src;
    words;  // 进入宿舍时说的话
    inter;  // 互动时说的话
    fresh;  // 是否是第一次进入宿舍

    /* 方法 */
    // 滑入，进入宿舍时触发的动画
    slide_in(){
        this.figure.animate({left:"2vh"},500)
    }
    // 震颤，被点击时触发的动画
    tremble(){
        // jquery链调用
        this.figure.animate({left: "-=10wh",top:"-=10wh"}, 50)
        .animate({left: "+=20wh", top:"+=20wh"}, 50)
        .animate({left: "-=20wh", top:"-=20wh"}, 50)
        .animate({left: "+=20wh", top:"+=20wh"}, 50)
        .animate({left: "-=10wh", top:"-=10wh"}, 50)
    }
    // 互动，需要当点击人物时触发
    interaction(){
        $("dialog").text(this.inter[Math.floor(Math.random()*this.inter.length)]);
        this.tremble();
    }
    // 打招呼，在选择舍友后，进入寝室时立即触发
    hello(){
        var say_num = 0;
        this.say(say_num,this.words);
    }
    // 说话功能，参数是一个字符串数组。但是每次递归的消耗量是2^n级增长的，文本段数若过大，则不可被接受。（不过也只是做不了Gal而已……）
    say(i,words){
        let index = 0;
        function type(){
            if(index <= words[i].length)
            {
                $("#dialog").html(`<b>${roommate.name}</b>：<br> &nbsp&nbsp` + words[i].substring(0,index));
                index += 1;
            }
            else
                clearInterval(A);
        }
        // 每隔50毫秒打印一个字
        var A = setInterval(type,50);
        // 点击一下对话框后，切换到下一句话
        $("#dialog").click(function(){
            if(i < words.length-1)
            {   
                i += 1;
                index = 0;
                $("#dialog").html("");
                // console.log(`这是第${i}次递归`);
                // 尾递归调用函数
                roommate.say(i,words);
                // console.log(`第${i}次递归被释放`)
                return;
            }
            else
            {
                $("#dialog").html("");
                return;
            }
         })
        // console.log(`退出i=${i}的click函数`)
        return;
    }

}

// 老师类
class Teacher{
    constructor(major,question,answer,selection){
        this.major = major;
        this.question = question;
        this.selection = selection;
        this.answer = answer;
    };
    /* 属性 */
    major;      // 专业，字符串
    question;   // 试题，十个字符串的一维数组
    answer;     // ，十个数字
    selection;  // 选项，arr[10][4]的二维数组
    /* 方法 */
    check(){

    }
}

// 战斗说明函数
function report(color = "black",text){
    $("#dialog").css("font-color",color);
    $("#dialog").append(text + "<br>");
}

// 战斗类，继承自学生类
class Fighter extends Student{
    constructor(name, sex, major, level, number,life, att,def,hp,speed, day, dad, honor,bool_running,bool_summon)
    {
        // 装填为学生类
        super(name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor);
        // 子类属性（战斗素质）
        power
        // 子类属性（是否携带技能）
        this.bool_running = bool_running; this.bool_summon = bool_summon;
    }
    /* 属性 */
    // 父类Student的属性
    name; sex; major; level; number; life; att; day; dad; honor;
    // 子类Fighter的属性
    bool_running; bool_summon;
    /* 方法（技能） */
    // 普通攻击
    attack(){

    }
    // 普通防御
    defend(){
        
    }
    // 逃课，免疫一次攻击，但下次攻击受到双倍伤害
    running()
    {
        if(this.bool_running == true)
        {
            $().click();
            report("aqua",`${you_fighter} 使用了逃课，将会回避下回合对手的攻击。`)
        }
        else 
        {
            ;
        }
    }
    // 召唤干爹，获得等同于随机一个干爹的属性值一回合
    summon(){

    }
}

/* 不同专业的战斗类*/
// 数学
class Math_Fighter extends Fighter{
    constructor(
        // 父类Fighter的属性
        name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,
        bool_running,bool_summon,
        // 子类的属性

    )
    {
        // 父类的构造函数
        super(name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,bool_running,bool_summon);
        // 子类
        
    }
}
// 医学
class Medicine_Fighter extends Fighter{
    constructor(
        // 父类Fighter的属性
        name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,
        bool_running,bool_summon,
        // 子类的属性

    )
    {
        // 父类的构造函数
        super(name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,bool_running,bool_summon);
        // 子类
        
    }
}
// 土木
class Civil_Fighter extends Fighter{
    constructor(
        // 父类Fighter的属性
        name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,
        bool_running,bool_summon,
        // 子类的属性

    )
    {
        // 父类的构造函数
        super(name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,bool_running,bool_summon);
        // 子类
        
    }
}

/* 通知和判断图窗 */
// 普通的消失函数
function vanish(ele){ $(ele).css({"opacity": "0", "z-index":"-1"}); }
function show(ele) { $(ele).css({"opacity": "1", "z-index":"100"}); }

// 通知函数，只有接受一个选项
function inform(text){
    $("#inform>.tiptext").html(text);
    show($("#inform"));
    // 创立异步对象
    var deferred = $.Deferred();
    // 单击按钮后图窗消失
    $("#know").click(function(){
        // 每次点击更新图窗，都会更新人物数值
        power = [you.level, you.att, you.def, you.speed, you.life, you.hp, you.day];
        if($(".power").length != 0)
        {
            for(var i = 0; i < $(".power").length; i++)
                $(".power")[i].textContent = $(".power")[i].textContent.slice(0,2) + power[i];
            // 反正只有最高等级也只有个位数，所以就直接取前三个字符喽
            if(you.level == you.full_level)
                $(".power")[0].textContent = $(".power")[0].textContent.slice(0.3) + "(满)";
        }
        // 图窗消失
        vanish($("#inform"));
        deferred.resolve();
    });
    return deferred.promise();
}
// 以后的操作就必须写成 inform("通知").done(function() { …… })

// 判断函数，有是或否两个选项
function choice(text) {
    $("#choice>.tiptext").html(text);
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

// 信息框
function Inform(text){
    $("#Inform>.tiptext").html(text);
    show($("#Inform"));
    // 创立异步对象
    var deferred = $.Deferred();
    // 单击按钮后图窗消失
    $("#know").click(function(){
        // 每次点击更新图窗，都会更新人物数值
        power = [you.level, you.att, you.def, you.speed, you.life, you.hp, you.day];
        if($(".power").length != 0)
        {
            for(var i = 0; i < $(".power").length; i++)
                $(".power")[i].textContent = $(".power")[i].textContent.slice(0,2) + power[i];
            // 反正只有最高等级也只有个位数，所以就直接取前三个字符喽
            if(you.level == you.full_level)
                $(".power")[0].textContent = $(".power")[0].textContent.slice(0.3) + "(满)";
        }
        // 图窗消失
        vanish($("#Inform"));
        deferred.resolve();
    });
    return deferred.promise();
}

/* 输入网址，跳转页面 */
// href是跳转的网址，para是传递的参数数组
function go_to(href, para)
{
    // 存值
    // para变量名的字符串数组
    for (var i = 0; i < para.length; i++) {
        var variableName = para[i];
        var variableValue = eval(variableName); // 获取变量的值
        localStorage.setItem(variableName, JSON.stringify(variableValue));
    }
    // you = JSON.parse(localStorage.getItem("you"));
    //跳转到寝室页面
    window.location.href = href;
}

/* 新建版本的通知窗口 */
function inform_new(text){
    // 新设置一个div元素
    var $inform = $(`<div></div>`);
    $("body").append($inform);
    // 设置其位置居中
    $inform.css({position:"absolute", top:`${window.innerHeight - 1/2*$(this).css("height")}`, left:`${window.innerWidth - 1/2*$(this).css("width")}`});
    // 设置其覆盖率最高
    $inform.css("z-index","100");
    // 填充内容
    $inform.text(`<b>通知</b> <br> ${text}`)
    // “好的”按钮
    var $yes = $(`<div>好的</div>`);
    $inform.append($yes);
    $yes.css({position:"absolute", bottom:"10%", left:"25%" ,width:"50%", height:"20%",});
    $yes.css("background-color","blue");

    // 异步操作
    var deferred = $.Deferred();
    // 单击按钮后图窗消失
    $yes.click(function(){
        // 每次点击更新图窗，都会更新人物数值
        power = [you.level, you.att, you.def, you.life, you.hp, you.day];
        for(var i = 0; i<$(".power").length; i++)
            $(".power")[i].textContent = $(".power")[i].textContent.slice(0,2) + power[i];
        // 图窗消失
        deferred.resolve();
        remove($inform);
    });
    return deferred.promise();
};