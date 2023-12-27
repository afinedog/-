
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
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 作战逻辑
    fight(){
        // 开局先强化两回合，没毛病，始终保持自身的高属性
        if(this.att < 5 || this.def < 5)
            this.Seven_to_ten();
        // 双倍伤害可不能浪费
        else if(this.bool_double_att == true)
            this.attack(you_fighter);
        // 对面攻击过高我就当乌龟
        else if(you_fighter.att > 6 && this.def > 5)
            this.running();
        // 攻击不掉血，或者你进行了防御，那我就打固伤
        else if(you_hurt[round_num-1] == 0 || you_fighter.bool_def == true)
            this.Summit(you_fighter)
        // 掉血过多我就回血
        else if(enemy_hurt[round_num-1] > 5)
            this.Neither_greedy();
        // 血线低时，做最后一搏，给对手致命一击
        else if(this.hp < 20)
            this.Script_master();
        // 一般情况下，50%概率防守，50%概率进攻
        else
            (Math.random() > 0.5) ? this.defend() : this.attack();
    }
}
// 朝7晚10
Fighter.prototype.Seven_to_ten = function(){
    this.att += 1; this.def += 1; this.hp += 1; this.speed += 1;
    report("green",`${this.name} 使用了朝7晚10，自身全属性+1`)
}
// 脚本大师
Fighter.prototype.Script_master = function(){
    this.bool_double_att = true;
    report("green",`${this.name} 使用了脚本大师，下次攻击将会造成双倍伤害`)
}
// 交作业
Fighter.prototype.Summit = function(enemy){
    enemy.hp -= 2;
    report("green",`${this.name} 使用了交作业，${enemy.name} 受到2点固定伤害`)
}
// 不贪不嗔
Fighter.prototype.Neither_greedy = function(){
    if(round_num < 2)
        return;
    // 若是BOSS调用技能
    if(this.name = "杨应豪")
    { 
        this.level = enemy_log[enemy_log.length-2][0];
        this.att = enemy_log[enemy_log.length-2][1];
        this.def = enemy_log[enemy_log.length-2][2];
        this.speed = enemy_log[enemy_log.length-2][3];
        this.hp  = enemy_log[enemy_log.length-2][4];
    }
    // 若是你调用技能
    else
    {
        this.level = you_log[you_log.length-2][0];
        this.att = you_log[you_log.length-2][1];
        this.def = you_log[you_log.length-2][2];
        this.speed = you_log[you_log.length-2][3];
        this.hp  = you_log[you_log.length-2][4];   
    }
    report("green",`${this.name} 使用了不贪不嗔，自身的属性回到了之前的状态`)
}

// LKH
class LKH extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：囫囵吞枣，攻击+3，防御-2，速度-1
            new Skill("囫囵吞枣","囫囵吞枣：攻击+3，防御-2，速度-1","Bolt()","数学专业"),
            // 技能：熬夜刷题，生命-2，防御+3，速度-1
            new Skill("熬夜刷题","熬夜刷题，生命-2，防御+3，速度-1","Study_night()","数学专业"),
            // 技能：灵活作业，下回合敌方技能失效，攻击-1，防御-1
            new Skill("灵活作业","灵活作业：下回合敌方技能失效。攻击-1，防御-1","Flexible_summit()","数学专业"),
            // 技能：数学大师，下回合数学专业技能效果翻倍
            new Skill("数学大师","数学大师：下回合数学专业技能效果翻倍","Men_of_Math()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    fight(){
        // 防御高，攻击低，则强化
        if(att < 7 && def > 5)
            this.Bolt()
    }
}
Fighter.prototype.Bolt = function(){
    (this.speed>0) ? this.speed -= 1 : inform("速度值过低，无法使用技能").done(()=> {return});
    this.att += 3; this.def -= 2; ;
    report("green",`${this.name} 使用了囫囵吞枣，攻击+3，防御-2，速度-1`);
}
Fighter.prototype.Study_night = function(){
    (this.speed>0) ? this.speed -= 1 : inform("速度值过低，无法使用技能").done(()=> {return});
    this.hp -= 2; this.def += 3;
    report("green",`${this.name} 使用了熬夜刷题，生命-2，防御+3，速度-1`);
}
Fighter.prototype.Flexible_summit = function() {
    (this.att>0) ? this.att -= 1 : inform("攻击值过低，无法使用技能").done(()=> {return});
    (this.def>0) ? this.def -= 1 : inform("防御值过低，无法使用技能").done(()=> {return});
    this.bool_invalid = true;
    report("green",`${this.name} 使用了灵活作业，下回合敌方技能失效，攻击-1，防御-1`);
}
Fighter.prototype.Men_of_Math = function(){
    this.double_Math = true;
    report("green",`${this.name} 使用了数学大师，下回合数学专业技能效果翻倍`);
}
// HSJ
class HSJ extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "侯三江","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：消息灵通，速度+2
            new Skill("消息灵通","消息灵通：速度+2","Get_news()","数学专业"),
            // 技能：资源广泛，造成等于（自身速度值-对手速度）的伤害，速度-1，攻击-1
            new Skill("资源广泛","资源广泛，造成等于（自身速度值-对手速度）的伤害，速度-1，攻击-1","Resourceful()","数学专业"),
            // 技能：长规远划，永久受伤减半，下两个回合不能行动（PP = 1）
            new Skill("长规远划","长规远划：防御翻倍，下两个回合不能行动（PP=1）","Long_plan()","数学专业",1),
            // 技能：功利主义，永久伤害翻倍，随机失去一个技能（PP = 1）
            new Skill("功利主义","功利主义：攻击翻倍，随机失去一个技能（PP=1）","Benthamism()","数学专业",1)
        ];
        this.bool_boss = true; this.invoke = "HSJ";
    }
}
Fighter.prototype.GEt_news = function(){
    this.speed += 2;
    report("green",`${this.name} 使用了消息灵通，速度+2`);
}
Fighter.prototype.Resourceful = function(enemy){
    this.attack(enemy, you.speed - enemy.speed)
    report("green",`${this.name} 使用了资源广泛`);
}
Fighter.prototype.Long_plan = function(){
    this.def *= 2;
    this.no_action = 2;
    report("green",`${this.name} 使用了长规远划，防御翻倍，下两个回合不能行动`);
}
Fighter.prototype.GEt_news = function(){
    this.att *= 2;
    var index = Math.floor(Math.random() * this_skill_carry.length);
    var skill_go = this.skill_carry[index];
    this.skill_carry[index] = null;
    // 若是你发动技能，直接删除该技能框
    if(this.name == you_fighter.name)
        $(`#skill${index+1}`).remove()
    report("green",`${this.name} 使用了功利主义，攻击翻倍，失去了技能 ${skill_go.name}`);
}
// HR
class HR extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：以书为乐，后五个回合，每回合随机属性+1。
    // 技能：自知者明，下两回合敌方属性锁定（PP = 2）
    // 技能：封闭自我，下两回合自身属性锁定（PP = 2）
    // 技能：乐善好施，对手随机属性+1，自身随机属性+3;
}
// HX
class HX extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：摸鱼大师，本回合对方技能失效（PP = 10）
    // 技能：真正的沙鼠，若自身生命值低于3，对敌方造成等于自身总属性的伤害
    // 技能：再来一把，双方生命值+5
    // 技能：鬼才，将自身属性值随机互换
}
// 秦ZS
class QZS extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：转专业，将自身专业随机替换为另一个
    // 技能：服装精通，将自身随机属性设为和对方相同
    // 技能：善于适应，
    // 技能：世故精通，
}
// 龙格
class LRC extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：迷惑人，
    // 技能：电气人，下回合伤害反弹给对方（PP = 5）
    // 技能：脱单人，下回合
    // 技能：社会人，
}
// 邹LS
class ZLS extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：殊死一搏，若速度比敌方快，则强迫双方进行攻击，然后速度-2
    // 技能：机器思维，
    // 技能：交换对象，自身专业和敌方交换
    // 技能：机械飞升，锁定自身属性，每回合随机选取一个+1
}
// YYZ
class YYZ extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：独立自主，下回合敌人不能使用技能
    // 技能：组织号召，若某项属性大于10，则造成等于（该属性-对手该属性）的伤害
    // 技能：乐观向上，防御+2，生命+1
    // 技能：好学生，随机使一个属性+2
}
// LJL
class LJL extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：玩命，攻击并全属性+1，但生命-2，
    // 技能：黑社会，对手攻击和防御-1
    // 技能：自爆，双方生命-2
    // 技能：医学生，生命+2
}
// 王八
class WFX extends Enemy{
    constructor()
    {
        // 顺序是：姓名、性别、专业、学号、等级（要填）、最大等级（要填）、体力、最大体力、攻击、防御、生命、速度、后面不填了
        super( new Student(
            "杨应豪","男","数学专业",undefined,7, 7, undefined, undefined,
            3,3,50,2
         ))
        // 携带技能
        this.skill_carry = [
            // 技能：朝7晚10，全属性+1
            new Skill("朝7晚10","朝7晚10：全属性+1","Seven_to_ten()","数学专业"),
            // 技能：脚本大师，下次攻击双倍伤害
            new Skill("脚本大师","脚本大师：下次攻击双倍伤害","Script_master()","计算机专业"),
            // 技能：交作业，造成2点固定伤害
            new Skill("交作业","交作业：造成2点固定伤害","Summit()","none"),
            // 技能：不贪不嗔，将属性恢复到上回合的状态
            new Skill("不贪不嗔","不贪不嗔：将属性恢复到上回合的状态","Neither_greedy()","数学专业")
        ];
        this.bool_boss = true; this.invoke = "YYH";
    }
    // 技能：
}