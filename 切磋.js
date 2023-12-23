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

/* 创建对战对象 */
// 初始化敌人
enemy = new Fighter("李鼠");

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
/* 攻击 */
$("#attack").click(function(){ 
    var hurt = you_fighter.att - enemy.def;
    enemy.hp -= hurt;
    report(`red`,`${you.name} 攻击了 ${enemy.name}。${enemy.name} 受到 ${hurt} 点伤害`)
 })


inform(`战斗开始，你的对手是 ${enemy.major} 的 ${enemy.name}`);
