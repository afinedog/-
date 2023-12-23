// 取值
power = JSON.parse(localStorage.getItem("power"));
you = JSON.parse(localStorage.getItem("you"));
// 开始通知
inform("成功创建身份！欢迎成为沙鼠的一员。学校为你分配了寝室，快来选择你的舍友吧")
// 选择舍友
$("div.img-container").click(function(){
    if ($(this).find("img").attr("alt") == "唐妞")
        roommate = new Roommate(
            "唐妞",
            // 交互语言
            ["在古代，皇上想宠爱妃子都要送礼物","在现代，你喝了我的奶茶就代表同意和我在一起了？","接受礼物≠我同意", "你送我的礼物跟别人的一样，那我宁愿不要","这个礼物你不送给我，也会送给别的女生"],
            // 开场独白
            ["经济可以依附，人格必须独立","我勒个豆，家人们，谁懂啊，今天遇到个虾头蝻"]
        );
    else if($(this).find("img").attr("alt") == "孙笑川")
        roommate = new Roommate(
            "孙笑川",
            // 交互语言
            ["我和我的猫，还有你妈，都很想念你。<br> 不过……那是骗你的啦~。<br>其实我没有猫，你也没有妈。"],
            // 开场独白
            ["nmsl！", "啥子哦？","你吼辣么大声干什么嘛！", "诶你态度能不能好一点啊！","那你去找物管啊！"]
        );
    else if($(this).find("img").attr("alt") == "蔡徐坤")
        roommate = new Roommate(
            "蔡徐坤",
            // 开场独白
            ["全民制作人们大家好，我是练习时长两年半的个人练习生蔡徐坤","喜欢唱、跳、rap、篮球。","music！","只因你太美！baby","只因你实在是太美！baby","迎面走来的你让我如此蠢蠢欲动","这种感觉我从未有","Cause I got a crush on you who you", "你是，我的，我是，你的，谁","在今后的视频中，我还准备了很多由我自己作词作曲编舞的原创作品。期待的话，就请多多为我投票吧。"],
            // 交互语言
            ["鸡你太美","再多一眼看一眼就会爆炸","再近一点靠近点快被融化","你干嘛~哈哈~哎呦"]
        );
    else if($(this).find("img").attr("alt") == "郭继承")
        roommate = new Roommate(
            "郭继承",
            // 开场独白
            ["你为什么专捡这个事报道，你告诉我你的理由是什么。","你要说这个社会风气有点问题，哪个（国家）都有很肮脏的。美国到处都是枪击，西方的刑事案件到处都有，哪个都有点问题。","我说你为什么非得找这种事，你为什么非得引导我们的年轻人觉得我们不好，觉得老百姓素质低，你告诉我你居心何在？","你给我说清楚，你故意的侮辱我们。我说媒体的责任你知道多大吗？","你多报那种乐善好施的人、见义勇为的人。让老百姓看到光亮，让人民看到希望，让我们的人民，对国家越来越有信心，这是你媒体不可推卸的责任。"],
            //交互语言
            ["我经常说如来，这个词有秘密。如来，如来了吗？如来吗？他真来了吗？如来到底来没来？如来！我问如来他真来了吗？如来你看看来没来！","当然你们受了西方的操作体系，没有精子卵子的结合，那是一定是不会怀孕的。那是你的操作系统，那你要问我的操作系统，我觉得一切皆有可能","我去了以后，我坐在他家的门堂正中。他家的牌位，天 地 君 亲 师。我在那里一坐，他的爷爷奶奶先给我磕头，爹妈给我磕，一家人全磕完了，小孩恭恭敬敬给我磕大头。","多少年轻人加一点班，领导让他加点班，抱怨。你知道吗领导让谁加班不行啊，你以为在中国这个环境里边还缺加班的人吗？"]
        )
    else if($(this).find("img").attr("alt") == "小Y")
        roommate = new Roommate(
            "小丫",
            // 开场独白
            ["你好，我是你的舍友，我叫异次元。","初次见面，让我们……", "原神，启动！","原来，你也玩原神","原神太好玩啦！"],
            // 交互语言
            ["来把奥特曼格斗进化3吧！", "我的原神能跑到144帧耶！","我去！特洛伊木马！太可怕了"]
        );
    else if($(this).find("img").attr("alt") == "小吕")
        roommate = new Roommate(
            "小吕",
            // 开场独白
            [`${you.name}同学，你好你好`, "我叫什么名字？我叫吕克！","来把CS GO吧？","不玩拉倒"],
            // 交互语言
            ["对的对的。诶，不对不对。欸，对的对的","确实确实","trash trash", "这游戏真的挺好玩吧？","帅的一批，兄弟","你TM……行，可以。"]
        );
    roommate.figure_src = `${"./图片/" + $(this).find("img").attr("alt") + "人像.png"}`;
    // 第一次进入宿舍
    roommate.fresh = true;
    // 获得荣誉

    // 跳转到寝室页面
    go_to("./寝室.html",["you","power","roommate"]);
})