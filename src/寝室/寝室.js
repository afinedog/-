/* CSS布局 */
// 右侧按钮
$(".flex-right").css({"height":`${window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
$(".flex-right div").css({"height":`${1/6*window.innerHeight}`,"width":`${1/6*window.innerWidth}`})
// 上侧数值栏
$(".flex-up").css({"height":`${1/12*window.innerHeight}`,"width":`${2/3*window.innerWidth}`})
$(".flex-up div").css({"height":`${1/12*window.innerHeight}`,"width":`${1/8*window.innerWidth}`})
$("#skill-edit").css({"height":`${1/12*window.innerHeight}`,"width":`${1/9*window.innerWidth}`})
// 下侧对话框
$("#dialog").css({"height":`${1/4*window.innerHeight}`,"width":`${4/5*window.innerWidth}`})
// 宿舍背景图
$("#background").css({"height":`${3/4*window.innerHeight}`,"width":`${window.innerWidth}`})
// 左侧人像
$("#background").css({"height":`${2/3*window.innerHeight}`,"width":`${3/5*window.innerWidth}`})
// 下侧战斗栏
$(".flex-down").css({"height":`${1/4*window.innerHeight}`,"width":`${5/6*window.innerWidth}`})
$(".flex-down div").css({"height":`${1/4*window.innerHeight}`,"width":`${1/4*window.innerWidth}`})


/* 从 localStorage 中取值 */
get_var(["you","roommate","power"]);
// 坑爹的localStorage不能传递方法，只能手动再造一个对象
// 学生类
you = new Student(you.name,you.sex,you.major, you.number,
    you.level,you.full_level,
    you.life,you.full_life,
    you.att,you.def,you.hp,you.speed,
    you.day,you.dad,you.honor,you.full_level)
// 室友类
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
        roommate.fresh = false;
    }
    );
    // 舍友开始交互
}
else
{
    inform("欢迎回到宿舍，看看你的舍友在干什么吧").done(function(){
        // 舍友图片从左端滑入
        roommate.slide_in();
    })
}
// 点击会发生震颤动画，并播放语录
$("#roommate").click(function(){
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

/* 技能选择 */
// 技能选择框出现、填入技能
$("#skill-edit").click(function(){
    // 高于底部对话框，低于通知、选择、信息
    show("#skill-set",3);
    for(let i = 0; i< you.skill_carry.length; i++)
        $(".skill-carry")[i].textContent = you.skill_carry[i].name;
    for(let i = 0; i < you.skill_gotten.length; i++)
        $(".skill")[i].textContent = you.skill_gotten[i].name;
})
// 点击技能后，边框变绿（这段代码有点费解，但是比较简洁……emm，我本来可以分别对.skill和.skill-carry写一个函数的，但感觉比较费空间）
function select(selector){
    $(selector).click(function(){
        // 记录当前被点击的元素
        focus_this = $(this);
        // 遍历 ".skill" 的所有元素
        $(selector).each(function(index){
            // 若序号为i的技能已被选中，且i不等于被正在被点击的技能的序号，则撤销序号为i的技能的被选中状态（边框变回透明）
            if( focus_this.css("border-color") == "rgb(0, 128, 0)" || index != $(this).index())
                $(this).css("border-color","lightgrey");
        })
        // 当前被点击的元素边框变绿
        $(this).css("border-color","green");
    })
}
select(".skill"), select(".skill-carry");

// 我也不想搞全局变量，可是这样比较方便
var page = 1;
// 翻页功能
$("#left").click(function(){
    // 若不是第一页
    // if( you.skill_name.indexOf(  $(".skill")[0].textContent  ) != 0)
    if(page != 1)
    {   
        // 往左翻一页
        page -= 1;
        for(var i = 0; i < 8; i++)
            $(".skill")[i].textContent = you.skill_gotten[i + 8*(page-1)].name;
    }
    else if(page == 1)
        inform("已经是第一页了");
})
$("#right").click(function(){
    // 最后一页的最后一个技能的0~7内的序号
    var num =  you.skill_gotten.length % 8;
    // num序号下的技能名字
    // var last_name = $(".skill")[num].textContent
    // 若不是最后一页
    // if(you.skill_name.indexOf(last_name) != you.skill_name.length-1 )
    if(page != Math.ceil(you.skill_gotten.length / 8) )
    {
        //往右翻一页
        page += 1;
        for(var i = 0; i < 8; i++)
            $(".skill")[i].textContent = you.skill_gotten[i+8].name;
    }
    else if(page == Math.ceil(you.skill_gotten.length / 8))
        inform("已经是最后一页了");
})
// 查看按钮
$("#look").click(function(){ 
    // 携带技能的名字和说明
    var skill_carry_name,  skill_carry_state;
    // 可选技能的名字和说明
    var skill_select_name, skill_select_state;
    
    $(".skill-carry").each(function(){ 
        if($(this).css("border-color") == "rgb(0, 128, 0)")
        {
            // 技能名字直接引用就行了
            skill_carry_name = $(this).text();
            // 技能描述首先需要找到索引
            var index = you.get_skill_carry_index(skill_carry_name);
            // 若该技能不是已有技能
            if(index == -1)
                skill_carry_state = "这个技能不存在"
            // 若是已有技能
            else
                // 然后取对象的技能描述索引值
                skill_carry_state = you.skill_carry[index].state;
        }
     });
    
     $(".skill").each(function(){ 
        if($(this).css("border-color") == "rgb(0, 128, 0)")
        {
            // 技能名字直接引用就行了
            skill_select_name = $(this).text();
            // 技能描述首先需要找到索引
            var index = you.get_skill_index(skill_select_name);
            // 若该技能不是已有技能
            if(index == -1)
                skill_select_state = "这个技能不存在"
            // 若是已有技能
            else
                // 然后取对象的技能描述索引值
                skill_select_state = you.skill_gotten[index].state;
        }
    })
    // 打印到信息栏中
    Inform(`<b>已携带的技能名称</b>：${skill_carry_name} <br> <b>已携带的技能描述</b>：${skill_carry_state} <br> <b>未携带的技能名称</b>：<br> ${skill_select_name} <br> <b>未携带的技能描述</b> ${skill_select_state}`); 
});

// 设置按钮
$("#set").click(function(){
    var carry_name, index_carry, select_name, index_select;
    var error = false;
    $(".skill").each(function(){ 
        if($(this).css("border-color") == "rgb(0, 128, 0)")
        {
            select_name = $(this).text();
            // console.log("被选中的未携带技能名是" + select_name);

            // 找到（被选中的未携带技能）的（在总技能中的索引）
            index_select = you.get_skill_index(select_name);
            // 检查该技能是否已获得
            if(index_select == -1)
            {
                inform("禁止携带不存在的技能");
                error = true;
            }   
            // console.log("index_select：" + index_select)
        }
    })
    if(error == true)
        return;
    $(".skill-carry").each(function(){ 
        if($(this).css("border-color") == "rgb(0, 128, 0)")
        {
            // 找到（被选中的已携带技能）的（在已携带技能中的索引）
            carry_name = $(this).text();
            // console.log("被选中的已携带技能名是" + carry_name);

            // 检查该技能是否重复
            if(you.skill_carry.includes( you.get_skill(select_name) ))
            {
                inform("禁止携带两个一样的技能");
                return;
            }
            // 初始技能为空时
            else
            {   
                index_carry = you.get_skill_carry_index(carry_name);
                if(index_carry == -1)
                    index_carry = $(this).index(".skill-carry");
            }
            // console.log("index_carry：" + index_carry);

            // 将（该索引下的已携带技能）重新赋值为（该索引下的未携带技能）即可
            you.skill_carry[index_carry] = you.skill_total[index_select];
            // console.log(you.skill_carry)
        }
    })
    // console.log(`现在的已携带技能 ${index_carry} 是`); console.log(you.skill_carry[index_carry]);
    // 重新填入已选技能
    for(let i = 0; i< you.skill_carry.length; i++)
        $(".skill-carry")[i].textContent = you.skill_carry[i].name;
});

// 关闭技能栏
$("#close").click(function(){
    vanish("#skill-set");
 })

/* 训练 */
$("#train").click(function(){
    if(you.life != 0)
        choice("你将面对本专业老师的习题考验。若能证明自己，学校将会为你升级。确定消耗1体力进行考验吗？").done(function(choice_res){ 
            if(choice_res == true)
            {
                you.life -= 1;
                go_to("../选择人物/选择老师.html",["you","roommate","power"]);
            }
            else
                return;
        })
     else
        inform("你的体力不足，今天先休息吧")
});

/* 切磋 */

$("#compete").click(function(){
    if(you.life != 0)
    choice("进行切磋会消耗1体力，确定要进行切磋吗？").done(function(choice_res){
        if(choice_res == true)
            choice("在其它学校，你将面对更加强大的敌人，体力消耗改为2。要进行校外切磋吗？").done(function(choice_res){ 
                if(choice_res == true)
                {
                    if(you.life >= 2)
                    {
                        you.life -= 2;
                        go_to("../对战敌人/校外地图.html",["you","roommate","power"]);
                    }
                        
                    else
                        inform("你的体力不足，今天先休息吧");
                }
                    
                else
                {
                    if(you.life >= 1)
                    {
                        you.life -= 1;
                        inform("将为你随机匹配当前等级的敌人").done(function(){
                            // 随机匹配敌人                 
                        })
                    }
                        
                    else
                        inform("你的体力不足，今天先休息吧");
                }
            })
        else
            return;
        })
})

/* 跳过这一天 */
$("#skip").click(function(){
    choice("你确定要休息吗？这将直接跳到明天。").done(function (choice_res) { 
        if(choice_res == true)
            {
                you.life = you.full_life;
                you.day += 1;
                inform("你度过了这一天，离月考还有" + `${30-you.day}` + "天");
            }
        else
            return;
     })
  })
/* 退出到主页面 */
$("#start").click(function(){
    choice("退出将清空所有数据，请确认你已经保存。确定要退出吗？").done(function(choice_res){
        if (choice_res == true)
        {
            localStorage.clear();
            window.location.assign("../../开始界面.html");
        }
        else
            return;
    });
    return;
})