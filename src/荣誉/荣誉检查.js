/* 点亮荣誉 */
function honor_light(honor){
    $("#" + honor).css("background-color","gold");
    // 暂定为：新建一个荣誉对象，切换页面将you等对象都传过去，然后。这样就能实现点亮荣誉了
}

/* 检测荣誉 */

// 专业选择
function honor_check_major() { 
    inform("啊！你的选择为你赢得了沙鼠的荣耀，来看一下吧").done(function(){
        switch (you.major) {
            case '数学专业': inform("恭喜你获得荣誉：“大爷”<br> 《》");
            case '物理专业': inform("恭喜你获得荣誉：“二爷”<br> 《》");
            case '计算机专业': inform("恭喜你获得荣誉：“程序猿”<br> 《好普通的称号……》");
            case '土木专业': inform("恭喜你获得荣誉：“土木牛马”<br> 《成为群嘲的对象了！》");
            case '医学专业': inform("恭喜你获得荣誉：“医学狗”<br> 《组胚背完了吗？》");
            case '电气电子专业':inform("恭喜你获得荣誉：“”<br> 《》");
            case '传统工科': inform("恭喜你获得荣誉：“工科狗”<br> 《都是狗，凭什么医学》");
            case '生化环材地': inform("恭喜你获得荣誉：“天坑之子”<br> 《专业坑不是人坑》");
            case '金融专业': inform("恭喜你获得荣誉：“两极分化”<br> 《争取成为人上人吧》");
            case '文史哲法': inform("恭喜你获得荣誉：“官老爷”<br> 《》");
        }
    })  
}

// 舍友选择