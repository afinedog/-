/* CSS布局 */
// 右侧按钮
$(".flex-right").css({"height":`${window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
$(".flex-right div").css({"height":`${1/6*window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
// 上侧数值栏
$(".flex-up").css({"height":`${1/12*window.innerHeight}`,"width":`${2/3*window.innerWidth}`})
$(".flex-up div").css({"height":`${1/12*window.innerHeight}`,"width":`${1/8*window.innerWidth}`})
// 下侧对话框
$("#dialog").css({"height":`${1/4*window.innerHeight}`,"width":`${4/5*window.innerWidth}`})
// 宿舍背景图
$("#background").css({"height":`${3/4*window.innerHeight}`,"width":`${window.innerWidth}`})
// 左侧人像
$("#background").css({"height":`${2/3*window.innerHeight}`,"width":`${3/5*window.innerWidth}`})
// 下侧战斗栏
$(".flex-down").css({"height":`${1/4*window.innerHeight}`,"width":`${5/6*window.innerWidth}`})
$(".flex-down div").css({"height":`${1/4*window.innerHeight}`,"width":`${1/4*window.innerWidth}`})

// 能力值数组(6维)，分别是：等级、攻击、防御、生命、体力、天数
// var power = [you.level, you.att,you.def,you.life,you.power,you.day];
/* 从 localStorage 中取值 */
you = JSON.parse(localStorage.getItem("you"));
power = JSON.parse(localStorage.getItem("power"));
// 坑爹的localStorage不能传递方法，只能手动再造一个对象
roommate = JSON.parse(localStorage.getItem("roommate"));
roommate = new Roommate(roommate.name,roommate.words, roommate.inter, roommate.figure,roommate.figure_src,roommate.fresh);

/* 第一次进入时的交互 */
// 绑定roommate对象和舍友人像图片
roommate.figure = $("#roommate");
roommate.figure.attr("src", roommate.figure_src);
// 判断是否是第一次进入
if (roommate.fresh == true)
{   
    inform("你们已经成为舍友啦，快来打个招呼吧").done(function(){
        roommate.slide_in();
        roommate.hello();
        fresh = false;
    }
    );
    // 舍友开始交互
}
else
{
    // 舍友图片从左端滑入
    roommate.slide_in();
}
// 点击会发生震颤动画，并播放语录
roommate.figure.click(function(){
    roommate.interaction();
})

/* 存档 */
// 存档函数（通过a标签浏览器下载json文件到本地）
function handleDownload (content,name){
    // 下载保存json文件
    var eleLink = document.createElement("a");
    // 设置a标签下载的文件的扩展名
    eleLink.download = name + '.json';
    // 设置a标签不在浏览器中显示
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    // 输入的content参数转为JSON文件中的对象
    var data = JSON.stringify(content, undefined, 4);
    // 将JSOn文件转换为Blob地址
    var blob = new Blob([data], { type: "text/json" });
    // 将Blob地址设为a标签的下载路径
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击a标签事件
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除a标签
    document.body.removeChild(eleLink);
}
// 点击存档按钮
$("#save").click(function(){
    inform("存档成功，你的进度已经存到浏览器默认下载目录中。开发者建议您将其放在游戏本地的“存档”文件夹下（若将其删除，则你的存档也会丢失）").done(function(){
        // 创建一个Date对象，表示当前时间
        var date = new Date();
        // 使用Date对象的方法，获取年月日时分秒等信息
        var year = date.getFullYear(); // 年份，如2021
        var month = date.getMonth() + 1; // 月份，从0开始，所以要加1，如8
        var day = date.getDate(); // 日期，如18
        // 拼接成一个字符串，格式为yyyyMMdd
        var formatted_date = year + "年" + (month < 10 ? "0" + month : month) + "月" + (day < 10 ? "0" + day : day) + "号";
        // 存档
        handleDownload([you,roommate,power], `${formatted_date}的存档`)
    })
})

/* 查看个人信息 */

$("#check").click(function(){ 
    Inform(`<b>${you.name}</b> <br> 学号：${you.number} <br> 性别： ${you.sex} <br> 专业：${you.major} <br> 干爹名单：${you.dad}`);
 })

/* 训练 */

$("#train").click(function(){
    choice("你将面对本专业老师的习题考验。若能证明自己，学校将会为你升级。确定消耗1体力进行考验吗？").done(function(choice_res){ 
        if(choice_res == true)
            go_to("./选择老师.html",["you","roommate","power"]);
        else
            return;
     })
});

/* 切磋 */

$("#compete").click(function(){
    choice("进行切磋会消耗1体力，确定要进行切磋吗？").done(function(choice_res){
        if(choice_res == true)
            choice("在其它学校，你将面对更加强大的敌人，同时消耗双倍的体力。要进行校外切磋吗？").done(function(choice_res){ 
                if(choice_res == true)
                    go_to("./校外地图.html",["you","roommate","power"]);
                else
                    inform("将为你在校内随机匹配敌人").done(function(){
                        // 随机匹配敌人                 
                    })
            })
        else
            return;
     })
})

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
