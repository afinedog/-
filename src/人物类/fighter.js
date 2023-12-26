
// you = JSON.parse(localStorage.getItem("you"));
// /* 随机匹配的敌人 */
// // 数学专业
// mate = new Fighter(you)

/* BOSS */
// 数学专业的傻子敌人，只会攻击
class LiShu extends Enemy{
    constructor()
    {
        super( new Student("李鼠","男","数学专业") );
        // 懒得给傻子敌人设计数值，直接当满级的普通学生
        for(let i = 0; i<this.full_level; i++)
            this.level_up();
        this.invoke = "LiShu";
    }
    /* 属性 */
    bool_boss = true;
    // fight方法是所有智能操作的结合，一般会写的很复杂
    fight(){
        this.attack(you_fighter);
    }
}
// YYH
class YYH extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
    }
    // 技能：朝7晚10，全属性+1
    // 技能：脚本大师，下次攻击双倍伤害
    // 技能：作业plus，造成2点固定伤害
    // 技能：不贪不嗔，将属性恢复到上回合的状态
}
// 朝7晚10
Fighter.prototype.Seven_to_ten = function(){
    this.att += 1; this.def += 1; this.hp += 1; this.speed += 1;
}
// 脚本大师


// LKH
class LKH extends Enemy{
    // 技能：囫囵吞枣，攻击+3，防御-2，速度-1
    // 技能：熬夜刷题，生命-2，防御+3，速度-1
    // 技能：灵活作业，下回合敌方技能失效，攻击-1，防御-1
    // 技能：数学大师，下回合本专业技能2倍伤害
}
// HSJ
class HSJ extends Enemy{
    // 技能：消息灵通，速度+2
    // 技能：资源广泛，造成等于（自身速度值-对手速度）的伤害，速度-1，攻击-1
    // 技能：长规远划，永久受伤减半，下两个回合不能行动（PP = 1）
    // 技能：功利主义，永久伤害翻倍，随机失去一个技能（PP = 1）
}
// HR
class HR extends Enemy{
    // 技能：以书为乐，后五个回合，每回合随机属性+1。
    // 技能：自知者明，下两回合敌方属性锁定（PP = 2）
    // 技能：封闭自我，下两回合自身属性锁定（PP = 2）
    // 技能：乐善好施，对手随机属性+1，自身随机属性+3;
}
// HX
class HX extends Enemy{
    // 技能：摸鱼大师，本回合对方技能失效（PP = 10）
    // 技能：真正的沙鼠，若自身生命值低于3，对敌方造成等于自身总属性的伤害
    // 技能：再来一把，双方生命值+5
    // 技能：鬼才，将自身属性值随机互换
}
// 秦ZS
class QZS extends Enemy{
    // 技能：转专业，将自身专业随机替换为另一个
    // 技能：服装精通，将自身随机属性设为和对方相同
    // 技能：善于适应，
    // 技能：世故精通，
}
// FSK
class FSK extends Enemy{
    // 技能：竞选干部，
    // 技能：
    // 技能：
}
// 老疼
class ZGY extends Enemy{
    // 技能：强身健体，下回合自身生命暂时翻倍
    // 技能：
}
// 龙格
class LRC extends Enemy{
    // 技能：迷惑人，
    // 技能：电气人，下回合伤害反弹给对方（PP = 5）
    // 技能：脱单人，下回合
    // 技能：社会人，
}
// 邹LS
class ZLS extends Enemy{
    // 技能：殊死一搏，若速度比敌方快，则强迫双方进行攻击，然后速度-2
    // 技能：机器思维，
    // 技能：交换对象，自身专业和敌方交换
    // 技能：机械飞升，锁定自身属性，每回合随机选取一个+1
}
// NI
class NI extends Enemy{
    // 技能：自信心
    // 技能：长规远划plus，
}
// YYZ
class YYZ extends Enemy{
    // 技能：独立自主，下回合敌人不能使用技能
    // 技能：组织号召，若某项属性大于10，则造成等于（该属性-对手该属性）的伤害
    // 技能：乐观向上，防御+2，生命+1
    // 技能：好学生，随机使一个属性+2
}
// LJL
class LJL extends Enemy{
    // 技能：玩命，攻击并全属性+1，但生命-2，
    // 技能：黑社会，对手攻击和防御-1
    // 技能：自爆，双方生命-2
    // 技能：医学生，生命+2
}
// 王八
class WFX extends Enemy{
    // 技能：
}