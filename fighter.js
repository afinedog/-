// 傻子敌人，只会攻击
class fool extends Math_Fighter{
    fight(){
        this.attack();
    }
}


/* BOSS */
// YYH
class YYH extends Math_Fighter{
    // 技能：朝7晚10，全属性+1
    // 技能：脚本大师，下次攻击双倍伤害
    // 技能：作业plus，造成2点固定伤害
    // 技能：不贪不嗔，下次受伤减半
}
// LKH
class LKH extends Math_Fighter{
    // 技能：熬夜大师，攻击+2，防御-1，速度-1
    // 技能：高速学习，生命-2，防御+3，速度-1
    // 技能：灵活作业，下回合回避攻击，防御-1
    // 技能：放空心灵，生命+1
}
// HSJ
class HSJ extends Math_Fighter{
    // 技能：消息灵通，速度+2
    // 技能：资源广泛，造成等于（自身速度值-对手速度）的伤害，速度-1，攻击-1
    // 技能：长规远划，永久受伤减半，下两个回合不能行动（限定技）
    // 技能：功利主义，永久伤害翻倍，随机失去一个技能（限定技）
}
// NI
class NI extends Math_Fighter{
    // 技能：自信心
    // 技能：长规远划plus，
}
// YYZ
class YYZ extends Medicine_Fighter{
    // 技能：独立自主，
    // 技能：组织号召，若某项属性大于10，则造成等于（该属性-对手该属性）的伤害
    // 技能：乐观向上，生命+1
    // 技能：好学生，随机使一个属性+2
}
// LJL
class LJL extends Medicine_Fighter{
    // 技能：玩命，攻击并全属性+1，但生命-1，
    // 技能：社会，对手防御-1
    // 技能：自爆，造成等于自身属性的伤害，生命-2
    // 技能：医学生，生命+2
}