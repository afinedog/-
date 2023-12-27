// 技能类（用技能对象数组表示技能）
class Skill{
    // 技能名、技能描述、调用名、技能属性、技能pp
    constructor(name, state, invoke, major, pp = Infinity)
    {
        this.name = name; this.state = state; this.invoke = invoke; this.major = major; this.pp = pp;
    }
    name; state; invoke; major; pp; 
}
// 学生类
class Student
{
    // 构造函数
    constructor(    // 参数列表
                name = 'bug',
                sex = 'bug',
                major = 'bug',
                num = `${202100091100 + Math.round(100*Math.random())}`,  // 用反引号生成随机数数字
                level = 1, full_level = 7,   // 默认是数学专业
                life = 5,full_life = 5,       // 体力
                att = 1, def = 1, hp = 5,speed = 1, // 攻击、防御、生命值
                day = 0, dad = [], honor = []
            )
    // 作弊模式专用
    {
        this.name = name;       // 名字
        this.sex = sex;         // 性别
        this.major = major;     // 专业
        this.number = num;      // 学号
        this.level = level;     // 等级
        this.life = life; this.full_life = full_life;       // 体力
        this.att = att;  this.def = def;  this.hp = hp; this.speed = speed; // 攻击、防御、生命值、速度
        this.full_level = full_level;
        this.day = day; this.dad = dad; this.honor = honor;

        switch(this.major){
            // 每个专业的满级设置
            case "数学专业" :   this.full_level = 7;   break;
            case "物理专业" :   this.full_level = 7;  break;
            case "计算机专业" : this.full_level = 7;  break;
            case "电气电子" : this.full_level = 7;  break;
            case "土木专业" : this.full_level = 8;  break;
            case "文史哲法" : this.full_level = 7;  break;
            case "生化环材地" : this.full_level = 8;  break;
            case "金融专业" : this.full_level = 7;  break;
            case "医学专业" : this.full_level = 8;  break;
            default : this.full_level = 7; // 默认是数学专业
        }
    }
    /* 属性 */
    name; sex; major; level; number; life; att; day = 1; dad = []; honor = []; full_level;
    // 总技能对象数组（召唤干爹用）
    skill_total = [
        // 技能：逃课
        new Skill("逃课","逃课：回避当前回合攻击（其实就是锁血）。但会使防御力下降1", "running()","none"),
        // 技能：召唤干爹
        new Skill("召唤干爹","召唤干爹：随机选择一个干爹，用其随机技能替换本技能", "you_summon()","none"),
        /* YYH的技能 */
        // 技能：朝7晚10，全属性+1
        new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
        // 技能：脚本大师，下次攻击双倍伤害
        new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
        // 技能：交作业，造成2点固定伤害
        new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
        // 技能：不贪不嗔，将属性恢复到上回合的状态
        new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业"),
        /* LKH的技能 */
        // 技能：囫囵吞枣，攻击+3，防御-2，速度-1
        new Skill("囫囵吞枣","囫囵吞枣：攻击+3，防御-2，速度-1","Bolt()","数学专业"),
        // 技能：熬夜刷题，生命-2，防御+3，速度-1
        new Skill("熬夜刷题","熬夜刷题，生命-2，防御+3，速度-1","Study_night()","数学专业"),
        // 技能：灵活作业，下回合敌方技能失效，攻击-1，防御-1
        new Skill("灵活作业","灵活作业：下回合敌方技能失效。攻击-1，防御-1","Flexible_summit()","数学专业"),
        // 技能：数学大师，下回合数学专业技能效果翻倍
        new Skill("数学大师","数学大师：下回合数学专业技能效果翻倍","Men_of_Math()","数学专业"),
        /* HSJ的技能 */
        // 技能：消息灵通，速度+2
        new Skill("消息灵通","消息灵通：速度+2","Get_news()","数学专业"),
        // 技能：资源广泛，造成等于（自身速度值-对手速度）的伤害，速度-1，攻击-1
        new Skill("资源广泛","资源广泛，造成等于（自身速度值-对手速度）的伤害，速度-1，攻击-1","Resourceful()","数学专业"),
        // 技能：长规远划，永久受伤减半，下两个回合不能行动（PP = 1）
        new Skill("长规远划","长规远划：永久受伤减半，下两个回合不能行动（PP=1）","Long_plan()","数学专业",1),
        // 技能：功利主义，永久伤害翻倍，随机失去一个技能（PP = 1）
        new Skill("功利主义","功利主义：永久伤害翻倍，随机失去一个技能（PP=1）","Benthamism()","数学专业",1)
    ];
    // 技能对象数组
    skill_gotten = [this.skill_total[0],this.skill_total[1]];
    // 已携带技能对象数组
    skill_carry = [this.skill_total[0],this.skill_total[1]];
    // /* 下面这一段本来没想写的…… */
    // // 已获得的技能（字符串数组）
    // skill_name = ["逃课","召唤干爹"];
    // // 技能说明
    // skill_state = ["逃课：回避当前回合攻击（其实就是锁血）。但会使防御力永久下降2","召唤干爹：随机选择一个干爹，用其随机技能替换本技能"];
    // // 携带的技能（四元字符串数组）
    // skill_carry_name = ["逃课","召唤干爹"];


    /* 方法 */
    // 升级，在训练或作弊模式下调用
    level_up(){
        if(this.level < this.full_level)
        {
            var gain;
            // 标准增长：[1,1,3,2,1]    最高增长：[2,2,5,2,2]
            // 不仅仅要和专业有关，还要和技能有配合。
            switch(this.major){
                // 数学学生需要有强大的体力、心态、可支配时间，但是实操是短板，故攻击低，防御高
                case "数学专业": 
                    gain = [
                        (this.level>5) ? 0 : 1,
                        (this.level>5) ? 0 : 2,
                        3,
                        (this.level>5) ? 0 : 1,
                        1
                    ];
                    break;
                // 物理专业相反，防御低，攻击高
                case "物理专业":
                    gain = [
                        (this.level>5) ? 0 : 2,
                        (this.level>5) ? 0 : 1,
                        3,
                        (this.level>5) ? 0 : 1,
                        1
                    ];
                    break;
                // 计算机专业需要有强大的实操水平和可支配时间，但长期996，身体不太行。所以血量和速度都是短板
                case "计算机专业": 
                    gain = [
                        (this.level>5) ? 0 : 2,
                        (this.level>5) ? 0 : 1,
                        3,
                        (this.level>6) ? 0 : 1,
                        2
                    ];
                    break;
                // 电气电子这种比较平平的专业，取较为标准的数值。在这里体现的思想是，生命要足够多，攻击力要足够小，才能更有玩法。不然战斗结束的太快了
                case "电气电子": gain = [1,1,3,2,3];
                    gain = [
                        (this.level>5) ? 0 : 2,
                        (this.level>5) ? 0 : 2,
                        3,
                        (this.level>5) ? 0 : 2,
                        2
                    ];
                    break;
                // 著名牛马，纯纯的数值怪，各项都是增长最快的
                case "土木专业": 
                    gain = [
                        (this.level>5) ? 0 : 2,
                        (this.level>5) ? 0 : 2,
                        5,
                        (this.level>5) ? 0 : 2,
                        3
                    ];
                    break;
                // 攻击力和速度顶尖，但其它都不太行
                case "文史哲法": gain = [1,1,3,2,2];
                    gain = [
                        (this.level>5) ? 0 : 2,
                        (this.level>5) ? 0 : 1,
                        2,
                        (this.level>5) ? 0 : 2,
                        1
                    ];
                    break;
                // 医学牲肯定要在体力和生命上下功夫啦
                case "医学专业":
                    gain = [
                        (this.level>5) ? 0 : 1,
                        (this.level>5) ? 0 : 1,
                        5,
                        (this.level>5) ? 0 : 1,
                        3
                    ];
                    break;
                // 也是著名牲口。但相比于医学牲可以操纵自己生命值的做法，生化环材的体力更有意思
                case "生化环材地":
                    gain = [
                        (this.level>5) ? 0 : 1,
                        (this.level>5) ? 0 : 1,
                        4,
                        (this.level>5) ? 0 : 2,
                        3
                    ];
                    break;
                // 精英人士把握了话语权，总是能更快地看到产业的风口。速度会快得多。
                case "金融专业":
                    gain = [
                        (this.level>5) ? 0 : 1,
                        (this.level>5) ? 0 : 1,
                        3,
                        (this.level>5) ? 0 : 2,
                        1
                    ];
                    break;
                // 默认是数学专业
                default : 
                    gain = [
                        (this.level>5) ? 0 : 1,
                        (this.level>5) ? 0 : 2,
                        3,
                        (this.level>5) ? 0 : 1,
                        1
                    ];
                    break;
            }
            this.level += 1; this.att += gain[0]; this.def += gain[1]; this.hp += gain[2]; this.speed += gain[3]; this.full_life += gain[4]; this.life = this.full_life;
            inform(`你提升了1级，获得的增益有：<br> 攻击力 ${gain[0]} <br> 防御力 ${gain[1]} <br> 血量 ${gain[2]} <br> 速度 ${gain[3]} <br> 体力 ${gain[4]}`);
        }
        else
            inform("已提升至满级");
    }
    // 已知技能名，获取其在（总技能数组）中的索引
    get_skill_index(known_name){
        return this.skill_total.findIndex(skill => skill.name == known_name);
    }
    get_skill_gotten_index(known_name){
        return this.skill_gotten.findIndex(skill => skill.name == known_name);
    }
    // 已知技能名，获取其在（已携带技能数组）中的索引
    get_skill_carry_index(known_name){
        return this.skill_carry.findIndex(skill => skill.name == known_name)
    }
    // 已知技能名，获取其技能对象
    get_skill(known_name){
        var index = this.get_skill_index(known_name);
        if(index == -1)
            inform("错误，没有此技能")
        else
            return this.skill_total[index]
    }

    // // 列出技能描述
    // skill_carry_state(){
    //     // 携带技能的索引
    //     var index; var temp;
    //     for(i=0; i<4; i++)
    //     {
    //         // 携带的技能全部技能栏中的序号
    //         index = this.skill_name.indexOf(this.skill_carry_name[i]);
    //         // 将相应的技能介绍取出，并存放在临时数组中
    //         temp[i] = this.skill_carry_state[index];
    //     }
    //     return temp;
    // }
    // // 输入技能名，获取其在已获得技能中的索引
    // get_skill_index(skill){
    //     return this.skill_name.indexOf(skill)
    // }
    // // 输入技能名，获取其在总技能中的索引（召唤干爹用）
    // get_skill_total_index(skill){
    //     return this.skill_total_name.indexOf(skill)
    // }
    // // 技能替换，输入当前携带的技能名skill1，和未携带的技能名skill2，然后用skill2替换skill1
    // skill_alter(skill1,skill2){
    //     // 获取技能名的已获得中索引
    //     index1 = this.get_skill_index(skill1);  index2 = this.get_skill_index(skill2);
    //     index1 = 
    // }

    // 战斗技能
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
        this.figure.animate({left: "-=5vh",top:"-=5vh"}, 100)
        .animate({left: "+=10vh", top:"+=10vh"}, 100)
        .animate({left: "-=10vh", top:"-=10vh"}, 100)
        .animate({left: "+=10vh", top:"+=10vh"}, 100)
        .animate({left: "-=5vh", top:"-=5vh"}, 100)
    }
    // 互动，需要当点击人物时触发
    interaction(){
        // 随机选取互动数组的一个元素，输入到对话框中
        $("#dialog").text(this.inter[Math.floor(Math.random()*this.inter.length)]);
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
                $("#dialog").html("（点击你的舍友可以与TA互动哦）");
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
}

// 战斗说明函数
function report(color,text){
    // var i = 0;
    // function type(text) { 
    //     // 打字机效果
    //     $("#dialog").append(text[i]);
    //     i += 1;
    //     if(i == text.length )
    //     {
    //         // 换行
    //         $("#dialog").append("<br>");
    //         clearInterval(timer);
    //     }
    //  }
    // var timer = setInterval(type(text),50);
    // 更新数据
    you_fighter.ability = [you_fighter.level, you_fighter.att, you_fighter.def, you_fighter.speed, you_fighter.hp,  you_fighter.life];
    enemy.ability = [enemy.level, enemy.att, enemy.def, enemy.speed, enemy.hp, enemy.life];
    // 重新填入上面的技能栏
    if($(".power").length != 0)
        {
            for(var i = 0; i < $(".power").length; i++)
                $(".power")[i].textContent = $(".power")[i].textContent.slice(0,2) + you_fighter.ability[i];
            // 反正只有最高等级也只有个位数，所以就直接取前三个字符喽
            if(you.level == you.full_level)
                $(".power")[0].textContent = $(".power")[0].textContent.slice(0.3) + "(满)";
        }
    if($(".power-enemy").length != 0)
    {
        for(var i = 0; i < $(".power-enemy").length; i++)
            $(".power-enemy")[i].textContent = $(".power-enemy")[i].textContent.slice(0,2) + enemy.ability[i];
        // 反正只有最高等级也只有个位数，所以就直接取前三个字符喽
        if(you.level == you.full_level)
            $(".power-enemy")[0].textContent = $(".power-enemy")[0].textContent.slice(0.3) + "(满)";
    }
    // 更新战况报告栏
    $("#dialog").append(`<span style='color:${color}'>` + text + "</span><br>");
    // 滑动到最低端
    $("#dialog").scrollTop($("#dialog")[0].scrollHeight);
    // 检测战斗是否终止
    if(you_fighter.hp <= 0)
    {
        if( you_fighter.dad.includes(enemy.name))
            inform("战斗结束，你又输给了干爹。").done(function(){ 
                go_to("../寝室./寝室.html", ["you,power,roommate"])
             })
        else
        {
            inform("战斗结束，你输了。干爹栏+1").done(function(){
                you.dad.push(enemy.name);
                go_to("../寝室/寝室.html", ["you,power,roommate"]);
             })
        }
    }
    else if(enemy.hp <= 0)
    {
        inform("战斗结束，你赢了！").done(function(){
            Get_skill(enemy).done(()=>{go_to("../寝室/寝室.html", ["you,power,roommate"])})
        })
    }
}

// 战斗类，继承自学生类
class Fighter extends Student{
    constructor(student)
    {
        // 装填为学生类
        super(student.name, student.sex, student.major, student.number,
            student.level,student.full_level,
            student.life,student.full_life,
            student.att, student.def, student.hp, student.speed);
        // 子类属性（战斗素质）
        this.ability = [this.level, this.att, this.def, this.speed, this.hp,  this.life];
        // 是否进行防御、逃课、双倍伤害、锁定属性、锁定血量
        this.bool_def = false; this.bool_running = false; this.bool_double_att = false; 
        // 双倍技能效果
        this.double_Math = false;
        // 不能行动
        this.no_action = 0;
        this.skill_carry = student.skill_carry;
        this.skill_gotten = student.skill_gotten;
    }
    /* 子类属性 */
    
    
    /* 方法（低级技能） */
        /* 攻击 */
    attack(enemy,hurt = this.att){
        // 开始操作环节
        if( enemy.bool_def == true)
        {
            hurt = this.att - enemy.def;
            if(hurt >= 0)
            {
                enemy.hp -= hurt;
                report("red",`${this.name} 攻击了 ${enemy.name}。${enemy.name} 受到 ${hurt} 点伤害`);
            }
            else
            {
                // 反弹溢出的伤害
                hurt = 0 - hurt;
                this.hp -= hurt;
                enemy.bool_def = false;
                report("red",`${this.name} 攻击了 ${enemy.name}。${this.name} 受到 ${hurt} 点伤害`);
            }
        }
        // 敌人非防御状态
        else if(enemy.bool_def == false)
        {
            hurt = this.att;
            enemy.hp -= hurt;
            report("red",`${this.name} 攻击了 ${enemy.name}。${enemy.name} 受到 ${hurt} 点伤害`)
        }
        // 敌人是逃课状态
        else if(enemy.bool_running == true)
            report("red",`${this.name} 攻击了 ${enemy.name}。但没有效果。`)
        // 你是双倍伤害状态
        else if(this.double_att == true)
        {
            hurt = this.att*2;
            report("red",`${this.name} 攻击了 ${enemy.name}。但没有效果。`)
        }
        this.bool_double_att = false;
    }
    /* 防御 */
    defend(){
            this.bool_def = true;
            report(`blue`, `${this.name} 进行了防御`);
            // def对象被解决，可以执行回调（敌人的存储）
        }
    // 逃课，免疫一次攻击，但防御力永久-2
    running()
    {
        // 若携带了逃课技能
        if(this.def > 0)
        {
            this.bool_running = true;
            this.def -= 1;
            // 战斗报告（绿色）
            report("green",`${this.name} 使用了逃课，将会回避下回合对手的攻击。但之后防御力永久-1`);
        }
        else if (this.def <= 0)
            inform(`${this.name} 防御值过低，无法逃课`);
            return;
    }
    // 召唤干爹，获得等同于随机一个干爹的属性值一回合
    you_summon(){
        // 获取当前技能在携带技能中的序号
        var index = this.get_skill_carry_index("召唤干爹") + 1;
        if(index != -1 && this.dad.length != 0)
        {
            // 随机选取一个有技能的干爹
            do {
                var dad_now = this.dad[Math.floor(Math.random()*this.dad.length)];
            }
            while( dad_now.skill_carry == []);
            // 随机选取干爹一个技能替换你当前的技能
            var skill_now = this.skill_carry[index] = dad_now.skill_carry[ Math.floor( Math.random()*this.dad.length ) ];
            // 替换技能按钮的名字
            $(`#skill${index}`).text(skill_now.name);
            // 替换技能按钮的事件
            $(`#skill${index}`).click(function(){
                // 问题在于，BOSS的技能怎么写，才能让我在Fighter类没有声明该技能的基础上让它执行？
                // 答案是：在自己的Fighter类上全写出来得了。反正对战时只需要操作 skill_carry
                eval(skill_now.invoke);
            })
            // 战斗报告（绿色）
            report("green",`${this.name} 使用了召唤干爹，获得了干爹 ${dad_now} 的技能 ${skill_now.name}`)
        }
        else
            inform("你没有干爹");
    }
};


/* 敌人类 */
class Enemy extends Fighter{
    constructor(student)
    {
        // 装填为学生类
        super(student)
    }
    /* 新增的属性 */
    // 调用名
    invoke; bool_boss;

    /* 方法（敌人的操作）*/
    // // 敌人的普通攻击
    // enemy_attack(){
    //      // 开始储存环节，暂时存储敌方生命值
    //      var temp_hp = enemy.hp;
    //      // 开始操作环节
    //      var hurt;
    //      if( enemy.bool_def == true)
    //     {
    //         hurt = this.att - you_fighter.def;
    //         if(hurt >= 0)
    //         {
    //             enemy.hp -= hurt;
    //             report(`red`,`${this.name} 攻击了 ${you_fighter.name}。${you_fighter.name} 受到 ${hurt}$ 点伤害`);
    //         }
    //         else
    //         {
    //             // 反弹溢出的伤害
    //             hurt = 0 - hurt;
    //             you.hp -= hurt;
    //             enemy.bool_def = false;
    //             report(`red`,`${this.name} 攻击了 ${you_fighter.name}。${you_fighter.name} 受到 ${hurt} 点伤害`);
    //         }
    //     }
    //     else if(you_fighter.bool_def == false)
    //         hurt = temp_hp - enemy.hp;
    //     else if(you_fighter.bool_running == true)
    //         report("red",`${this.name} 攻击了 ${you_fighter.name}。但没有效果。`)
    // }
    // // 敌人的普通防御
    // enemy_defend(){
    //     this.bool_def = true;
    //     // 战斗报告（蓝色）
    //     report(`aqua`,`${enemy.name} 进行了防御`)
    // }
    // // 敌人的逃课
    // enemy_running(){
    //     this.bool_running = true;
    //     // 战斗报告（绿色）
    //     report("green",`${this.name} 使用了逃课，将会回避下回合对手的攻击。但之后防御力永久-1`)
    // }
}

/* 不同专业的战斗类*/
// 数学
class Math_Fighter extends Enemy{
    constructor(
        // 父类Fighter的属性
        name, sex, major = "数学专业", level, number, life, att,def,hp,speed, day, dad, honor,
        bool_running,bool_summon,
        // 子类的属性

    )
    {
        // 父类的构造函数
        super(name, sex, major, level, number, life, att,def,hp,speed, day, dad, honor,bool_running,bool_summon);
        // 子类的构造函数
        
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
function vanish(ele){ $(ele).css({"opacity": "0", "z-index":"-1"});  $(ele).css("pointer-events"),"none"; };
function show(ele,num) { $(ele).css({"opacity": "1", "z-index":`${num}`}); $(ele).css("pointer-events"),"auto"; }

// 通知函数，只有接受一个选项
function inform(text){
    $("#inform>.tiptext").html(text);
    show($("#inform"),10);
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
    show("#choice",10);
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
    show($("#Inform"),10);
    // 创立异步对象
    var deferred = $.Deferred();
    // 单击按钮后图窗消失
    $("#Know").click(function(){
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

// 选择敌方技能并获得
function Get_skill(enemy){
    var deferred = $.Deferred();
    // 九级z-index，比Inform低一级
    show("#Select",9);
    var select_name;
    var length = you.skill_gotten.length;
    for(i = 0; i<enemy.skill_carry.length; i++)
    {
        // 填入技能
        $(`#skill-select${i+1}`).text(enemy.skill_carry[i].name);
        $(`#skill-select${i+1}`).click(function(){
            focus_this = $(this);
            select_name = $(this).text();
            console.log(select_name);
            // 技能变色
            $(".skill-select").each(function(index){
                // 若序号为i的技能已被选中，且i不等于被正在被点击的技能的序号，则撤销序号为i的技能的被选中状态（边框变回透明）
                if( focus_this.css("border-color") == "rgb(0, 128, 0)" || index != $(this).index())
                    $(this).css("border-color","lightgrey");
            })
            // 当前被点击的元素边框变绿
            $(this).css("border-color","green");
        })
    }
    // 查看技能
    $(`#look`).click(function(){
        var this_skill = you_fighter.get_skill(select_name);
        // console.log(this_skill)
        Inform(`技能名称：${this_skill.name}; <br> 技能描述：${this_skill.state}; <br> 技能属性：${this_skill.major}; <br> 技能PP：${this_skill.pp}`);
    })
    // 设置技能
    $(`#set`).click(function(){
        var index_got = you_fighter.get_skill_gotten_index(select_name);
        if( index_got != -1 )
            inform("不能选择已有的技能");
        else
        {
            inform(`选择成功，你获得了技能 ${select_name}`).done(function(){
                var this_skill = you_fighter.get_skill(select_name);
                // console.log(this_skill);
                you.skill_gotten[length] = this_skill;
                console.log(you.skill_gotten);
                vanish("#Select");
                deferred.resolve();
            });
        }
    })
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
    // 存个技能
    if(you.skill_carry.length != undefined)
    {
        localStorage.setItem("skill_gotten_now", JSON.stringify(you.skill_gotten));
        localStorage.setItem("skill_carry_now", JSON.stringify(you.skill_carry));
    }
    //跳转到其它页面
    window.location.href = href;
}
// 本来没想写这个的……都是因为对象数组成员也无法传递。LocalStorage真是啥都不能存
function get_var(para)
{
    // para变量名的字符串数组
    for (var i = 0; i < para.length; i++) {
        var variableName = para[i];
        window[variableName] = JSON.parse(localStorage.getItem(variableName));
    }
    // 取个技能
    if(you.skill_carry.length != undefined)
    {
        you.skill_gotten = JSON.parse(localStorage.getItem("skill_gotten_now"));
        you.skill_carry = JSON.parse(localStorage.getItem("skill_carry_now"));
    }
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