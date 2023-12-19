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
}



/* 通知和判断图窗 */
// 普通的消失函数
function vanish(ele){ $(ele).css({"opacity": "0", "z-index":"-1"}); }
function show(ele) { $(ele).css({"opacity": "1", "z-index":"100"}); }

// 通知函数，只有接受一个选项
function inform(text){
    $("#inform>.tiptext")[0].textContent = text;
    show($("#inform"));
    // 创立异步对象
    var deferred = $.Deferred();
    // 单击后图窗消失
    $("#know").click(function(){
        // 每次点击更新图窗，都会更新人物数值
        power = [you.level, you.att, you.def, you.life, you.hp, you.day];
        for(var i = 0; i<$(".power").length; i++)
            $(".power")[i].textContent = $(".power")[i].textContent.slice(0,2) + power[i];
        vanish($("#inform"));
        deferred.resolve();
    });
    return deferred.promise();
}
// 以后的操作就必须写成 inform("通知").done(function() { …… })

// 判断函数，有是或否两个选项
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