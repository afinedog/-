you = JSON.parse(localStorage.getItem("you"));
power = JSON.parse(localStorage.getItem("power"));
roommate = JSON.parse(localStorage.getItem("roommate"));

// 点击老师
$(".img-container").click(function(){ 
    var major = $(this).find("img").attr("alt");
    choice("你确定要选择这位老师，挑战TA教学的科目吗？").done(function(choice_res){
        if(choice_res == true)
        {   
            switch(major){
                case "数分老师" : teacher = new Teacher(
                    "数学分析",
                    ["实数完备性的六个等价表述形式是哪些？"],["下面哪些是求数列极限的方法？"],["开区间上，f导数有界是f一致连续的什么条件？"],["拉格朗日中值定理的条件为什么不包含闭区间上可导？"],["泰勒展开为什么都写成麦克劳林公式的形式？"]
                    [   
                        // 第一题选项
                        ["佐恩引理，列紧性定理，柯西收敛定理，戴德金分割，皮亚诺公理，选择公理",
                        "确界存在定理，单调有界定理，凝聚定理，Cauchy收敛定理，闭区间套定理，Heine-Borel定理",
                        "实数完备性，实数稠密性，实数完全性，实数无穷性，实数列紧性",
                        "钝角"],
                        // 第二题选项
                        ["勒贝格方法","夹逼定理","比较定理","等价无穷小量"],
                        // 第三题选项
                        ["充要条件","充分条件","必要条件","什么也不是"],
                        // 第四题选项
                        ["闭区间端点上的导数等于该导数的极限","无法在闭区间端点上定义可导","由导数定义即可知，该条件不是必须的","为了实分析的测度知识做铺垫"],
                        //第五题选项
                        ["麦克劳林公式就是泰勒公式的别名","因为只需要考虑收敛域即可","因为麦克劳林公式的形式比较简单","因为麦克劳林公式可以解决实数域上的大多数情况"]
                    ],
                    [1,1,1,1,1,3,0,2,3,1]
                 )
            }
           go_to("./训练.html",["you","power","roommate","teacher"]);
        }
        else
            return;
    })
 })