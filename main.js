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
                dad = [],     // 干爹名单)
                honor = []    // 已获得的荣誉
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
    name; sex; major; level; number; life; att; day; dad; honor; 
}

// 舍友类
class Roommate{
    // 构造函数
    constructor(words,inter,figure,figure_src,fresh){
        this.words = words;
        this.inter = inter;
        this.figure = figure;
        this.figure_src = figure_src;
        this.fresh = fresh;
    };
    
    /* 属性 */
    figure; figure_src;
    words;  // 进入宿舍时说的话
    inter;  // 互动时说的话
    fresh;  // 是否是第一次进入宿舍

    /* 方法 */
    // 滑入，进入宿舍时触发的动画
    slide_in(){
        this.figure.animate({left:"0px"},500)
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
        var i = 0;
        this.say(i,this.words);
    }
    // 说话功能，参数是一个字符串数组
    say(i,words){
        let index = 0;
        function type(){
            if(index <= words[i].length)
            {
                $("#dialog").html(words[i].substring(0,index));
                index += 1;
            }
            else
                clearInterval(A);
        }
        // 每隔50毫秒打印一个字
        var A = setInterval(type,50);
        // 点击一下对话框后，切换到下一句话
        $("#dialog").click(function(){
            if(i < words.length)
            {   
                i += 1;
                index = 0;
                $("#dialog").html("");
                console.log("递归调用一次");
                // 尾递归调用函数
                roommate.say(i,words);
                
                return;
            }
            else
            {
                $("#dialog").html("");
                return;
            }         
         })
        return;
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
        power = [you.level, you.att, you.def, you.life, you.hp, you.day];
        for(var i = 0; i<$(".power").length; i++)
            $(".power")[i].textContent = $(".power")[i].textContent.slice(0,2) + power[i];
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
function Inform(text){
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