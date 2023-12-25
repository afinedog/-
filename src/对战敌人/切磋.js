/* CSS布局 */
// 右侧普通按钮
$(".flex-right").css({"height":`${window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
$(".flex-right div").css({"height":`${1/6*window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
// 右侧技能按钮
$(".flex-right2").css({"height":`${window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
$(".flex-right2 div").css({"height":`${1/6*window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
// 上侧数值栏
$(".flex-up").css({"height":`${1/12*window.innerHeight}`,"width":`${1/2*window.innerWidth}`})
$(".flex-up div").css({"height":`${1/12*window.innerHeight}`,"width":`${1/12*window.innerWidth}`})
// 下侧对话框
$("#dialog").css({"height":`${3/8*window.innerHeight}`,"width":`${4/5*window.innerWidth}`})
// 宿舍背景图
$("#background").css({"height":`${3/4*window.innerHeight}`,"width":`${window.innerWidth}`})
// 左侧人像
$("#background").css({"height":`${2/3*window.innerHeight}`,"width":`${3/5*window.innerWidth}`})

/* 从 localStorage 中取值 */
you = JSON.parse(localStorage.getItem("you"));
power = JSON.parse(localStorage.getItem("power"));
roommate = JSON.parse(localStorage.getItem("roommate"));
enemy = JSON.parse(localStorage.getItem("enemy"));

// 为你实例化一个战斗对象
you_fighter = new Fighter(you);
// 根据专业不同，敌人继承不同对象（这一部分暂时没用）
if(enemy.bool_boss == false)
{
    switch(enemy.major){
        case "数学专业": enemy = new Enemy(); break;
        case "物理专业": enemy = new Enemy(); break;
        case "计算机专业": enemy = new Enemy(); break;
        case "电气电子": enemy = new Enemy(); break;
        case "土木专业": enemy = new Enemy(); break;
        case "医学专业": enemy = new Enemy(); break;
        case "文史哲法": enemy = new Enemy(); break;
        case "生化环材地": enemy = new Enemy(); break;
        case "金融专业": enemy = new Enemy(); break;
    }
}
else if(enemy.bool_boss == true)
{
    // 通过BOSS名字继承BOSS对象（这个操作在大项目里很危险，但在小项目里，确实还行）
    enemy = eval(`new ${enemy.name}()`);
    // 降临动画
    // enemy.arrive();
}

/* 创建对战对象 */
// 回合数
round_num = 1;

/* 查看自己和敌人的信息 */
$("#you_information")
$("#enemy_information").click(function(){ 
    Inform(`敌人：${enemy.name}：<br> 专业：${enemy.major}<br> 技能1：${enemy.skill_carry[0].name} <br> 技能1描述：${enemy.skill_carry[0].state}<br> 技能2：${enemy.skill_carry[1].name} <br> 技能2描述：${enemy.skill_carry[1].state} <br> 技能3：${enemy.skill_carry[2].name} <br> 技能3描述：${enemy.skill_carry[2].state} <br> 技能4：${enemy.skill_carry[3].name} <br> 技能4描述：${enemy.skill_carry[3].state}`)
 })

/* 技能栏初始化 */
for(let i=0; i<you_fighter.skill_carry.length; i++)
    eval(`you_fighter.skill_carry[i].invoke`)

/* 认输逃跑 */
$("#give_up").click(function(){
    choice("确定要认输吗？").done(()=>{
        you_fighter.hp = 0;
        report(`red`,you.name + "认输了");
    })
    
 })

/* 技能栏切换 */
// 切换到技能
$("#skill").click(function(){
    $(".flex-right").animate({position:"relative",left:`33vh`},500);
    $(".flex-right2").animate({position:"relative",left:`31vh`},500);
})
// 切换到战斗
$("#back").click(function(){
    $(".flex-right2").animate({position:"relative",left:`67vh`},500);
    $(".flex-right1").animate({position:"relative",left:`33vh`},500);
})

// 点击动作按钮后，开始结算操作
$(".action").click(()=>{
    var action_name = $(this).text();
    compete(action_name);
})
// 攻击、防御按键
// $("#attack").click(()=>{ you_fighter.attack() });
// $("#defend").click( ()=>{ you_fighter.defend() } );

// 开始战斗
report("black",`战斗开始，你的对手是 ${enemy.major} 的 ${enemy.name}`);
// 你先操作时的结算
function you_first(){
    eval()
    // 敌人执行操作
    // enemy.tremble();
    enemy.fight();
    // 敌人操作完毕，进行结算
    switch (action) {
        // 若你点了攻击
        case "攻击":
            enemy.hp -= (you_fighter.att - enemy.def > 0) ? (you_fighter.att - enemy.def) : 0;
            break;
        // 若你点了防御
        case "防御":
            // 防御的结算由敌人那边进行
            break;
        default:
            break;
    }
    // 若敌人进行了防御，将其
    if(enemy.bool_def == true)
        {
            enemy.def = enemy.def/2;
            enemy.bool_def = false;
        }
}
// 敌人先操作时的结算
function enemy_first(){

}

/* 回合制战斗操作（最难的异步部分来了）
 * 思路如下：
 * deferred_1 之前，双方可能会防御。此时先存储并设置双方信息
 * deferred_1 解决后，deferred_2 之前，双方分别结算对方设置后的伤害
 * deferred_2 解决后，回合结束。递归调用函数，开始下一回合。
 */
function compete(action_name)
{
    // var声明的是函数作用域，let声明的是块级作用域
    // 你的初始操作
    let deferred_you_1 = $.Deferred();
    // 敌人的初始操作
    let deferred_enemy_1 = $.Deferred();
    // // 你的结算操作
    // let deferred_you_2 = $.Deferred();
    // // 敌人的结算操作
    // let deferred_enemy_2 = $.Deferred();
    // console.log(deferred.state())

    deferred.done(function (action) {
        // 若你的速度大于敌方
        if( you.speed > enemy.speed)
        {
            you_first();
        }
        // 若你的速度小于敌方
        else if( you.speed < enemy.speed)
        {
            enemy_first();
        }
        // 速度相等时
        else if (you.speed == enemy.speed)
        {
            //
            if(enemy.bool_boss == true)
                enemy_first()
            else
                you_first();
        }
    })
    round_num += 1;
    // 下一回合开始
    report("black",`现在是第 ${round_num} 回合`);
}