/* CSS布局 */
// 右侧按钮
$(".flex-right").css({"height":`${window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
$(".flex-right div").css({"height":`${1/6*window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
// 上侧数值栏
$(".flex-up").css({"height":`${1/12*window.innerHeight}`,"width":`${1/2*window.innerWidth}`})
$(".flex-up div").css({"height":`${1/12*window.innerHeight}`,"width":`${1/12*window.innerWidth}`})
// 下侧对话框
$("#dialog").css({"height":`${1/4*window.innerHeight}`,"width":`${4/5*window.innerWidth}`})
// 宿舍背景图
// $("#background").css({"height":`${1/2*window.innerHeight}`,"width":`${4/5*window.innerWidth}`})
// 下侧战斗栏
$(".flex-down").css({"height":`${1/4*window.innerHeight}`,"width":`${5/6*window.innerWidth}`})
$(".flex-down div").css({"height":`${1/4*window.innerHeight}`,"width":`${1/4*window.innerWidth}`})

// 能力值数组(6维)，分别是：等级、攻击、防御、生命、体力、天数
// var power = [you.level, you.att,you.def,you.life,you.power,you.day];
/* 从 localStorage 中取值 */
you = JSON.parse(localStorage.getItem("you"));
power = JSON.parse(localStorage.getItem("power"));

/* 进入时的交互 */
inform("你们已经成为舍友啦，快来打个招呼吧");
// 舍友开始交互

/* 跳过这一天 */
$("#skip").click(function(){
    choice("你确定要跳过这一天吗？").done(function (choice_res) { 
        if(choice_res == true)
            {
                you.day += 1;
                inform("你跳过了这一天，离月考还有" + `${30-you.day}` + "天");
            }
        else
            return;
     })
    
  })
/* 退出到主页面 */
$("#start").click(function(){
    choice("退出将清空所有数据，请确认你已经保存。确定要退出吗？").done(function(choice_res){
        if (choice_res == true)
            window.location.assign("./start.html");
        else
            return;
    });
    return;
})


// 选择舍友
