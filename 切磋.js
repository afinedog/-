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
// 下侧战斗栏
$(".flex-down").css({"height":`${1/4*window.innerHeight}`,"width":`${5/6*window.innerWidth}`})
$(".flex-down div").css({"height":`${1/4*window.innerHeight}`,"width":`${1/4*window.innerWidth}`})

/* 从 localStorage 中取值 */
you = JSON.parse(localStorage.getItem("you"));
power = JSON.parse(localStorage.getItem("power"));
// 坑爹的localStorage不能传递方法，只能手动再造一个对象
roommate = JSON.parse(localStorage.getItem("roommate"));
enemy = JSON.parse(localStorage.getItem("enemy"));
// 根据专业不同，敌人继承不同对象
if(enemy.bool_boss == false)
{
    switch(enemy.major){
        case "数学专业": enemy = new Math_Fighter();
        case "物理专业": enemy = new Math_Fighter();
        case "计算机专业": enemy = new Math_Fighter();
        case "电气电子": enemy = new Math_Fighter();
        case "土木专业": enemy = new Math_Fighter();
        case "医学专业": enemy = new Medicine_Fighter();
        case "文史哲法": enemy = new Math_Fighter();
        case "生化环材地": enemy = new Math_Fighter();
        case "金融专业": enemy = new Math_Fighter();
    }
}
else
{
    // 通过BOSS名字继承BOSS对象（这个操作在大项目里很危险，但在小项目里，真的很爽啊！）
    enemy = eval(`new ${enemy.name}()`);
}

/* 创建对战对象 */
// 回合数
var round_num = 1;
// 初始化敌人
enemy = new Fighter("李鼠");

/* 查看自己和敌人的信息 */
$("#you_information")
$("#enemy_information").click(function(){ 
    Inform(`敌人：${enemy.name}：<br> 专业：${enemy.major}<br> 技能1：${enemy} <br> 技能2：${enemy} <br> 技能3：${enemy} <br> 技能4：${enemy} <br>`)
 })

/* 技能切换 */
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


inform(`战斗开始，你的对手是 ${enemy.major} 的 ${enemy.name}`);
report(`现在是第 ${round} 回合`);

/* 回合制战斗操作（最难的异步部分来了） */
var deferred = $.Deferred();
/* 点击攻击 */
$("#attack").click(function(){
    deferred.done(function(){ 
        var hurt = you_fighter.att - enemy.def;
        enemy.hp -= hurt;
        report(`red`,`${you.name} 攻击了 ${enemy.name}。${enemy.name} 受到 ${hurt} 点伤害`)
    })
 })
/* 点击防御 */
$("#attack").click(function(){
    var temp_def = you.def;
    you.def = you.def*2;
    // def对象被解决，可以执行回调（敌人的攻击攻击）
    deferred.resolve();
    you.def = temp_def;
    return deferred.promise()
 })
//
deferred.done(){
    // 敌人执行操作逻辑
    enemy.fight();
    //
}