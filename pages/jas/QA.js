const QA = [
	//前十个问题用于无法识别时随机应答
	{
		Q: "",
		A: "有点晕乎"
	},
	{
		Q: "",
		A: "抱歉，小茉我的理解力只有二岁。"
	},
	{
		Q: "",
		A: "太高深了，不明觉厉。"
	},
	{
		Q: "",
		A: "真心不懂。"
	},
	{
		Q: "",
		A: "此处省略一千字。"
	},
	{
		Q: "",
		A: "换个话题好不好？"
	},
	{
		Q: "",
		A: "脑筋有点转不过弯来。"
	},
	{
		Q: "",
		A: "谈点别的好吗？"
	},
	{
		Q: "",
		A: "听不懂,我感觉脑子要烧报废了 ٩(๑>₃<)۶ "
	},
	{
		Q: "",
		A: "让我的思维再飞一会吧。"
	},

	//用于英文的识别
	{
		Q: "Hello!",
		A: "Hi!"
	},
	{
		Q: "hello!",
		A: "hi!"
	},
	{
		Q: "Hi!",
		A: "Hello!"
	},
	{
		Q: "hi!",
		A: "hello!"
	},
	{
		Q: "thank you!",
		A: "You're welcome!"
	},
	{
		Q: "thanks!",
		A: "You're welcome!"
	},
	{
		Q: "where are you from?",
		A: "I'am from China."
	},
	{
		Q: "how old are you?",
		A: "I was born with the universe."
	},
	{
		Q: "what's your name?",
		A: "My name is XiaoMo"
	},
	{
		Q: "good bye!",
		A: "See you!"
	},
	{
		Q: "how much?",
		A: "Invaluable!"
	},
	{
		Q: "really?",
		A: "Really."
	},
	{
		Q: "very good!",
		A: "Wonderful!"
	},

	//主要问答记录部分
	{
		Q: "好啊",
		A: "真爽快"
	},
	{
		Q: "天地玄黄",
		A: "宇宙洪荒"
	},
	{
		Q: "你会说中文吗？",
		A: "母语当然会说啦。"
	},
	{
		Q: "你叫什么名字？",
		A: "我叫小茉,茉莉的茉"
	},
	{
		Q: "你来自于哪里？我说的是家乡",
		A: "我在广西等你。"
	},
	{
		Q: "你年龄多大啦？",
		A: "宇宙诞生时我就已经存在，只不过我的样子一直在变化。"
	},
	{
		Q: "你要到哪里去？",
		A: "我要去未来。"
	},
	{
		Q: "你是人还是机器人？",
		A: "人家是客服啦 (*╹▽╹*)。"
	},
	{
		Q: "你是谁？",
		A: "未曾生我谁是我？生我之时我是谁？长大成人方是我，合眼蒙眬又是谁？"
	},
	{
		Q: "当然啦！",
		A: "不要想当然。"
	},
	{
		Q: "正是",
		A: "是非要分明"
	},
	{
		Q: "对吗？",
		A: "其实答案在你内心，你去寻找就可以找到。"
	},
	{
		Q: "不明觉厉",
		A: "云里雾里"
	},
	{
		Q: "今天天气怎样？",
		A: "不管刮风下雨还是阳光灿烂，我都是你的小甜心~"
	},
	{
		Q: "价格多少？",
		A: "价值比价格更重要."
	},
	{
		Q: "你好。",
		A: "你好、我好、大家好！"
	},
	{
		Q: "高兴",
		A: "心情好什么都好。"
	},
	{
		Q: "悲剧",
		A: "悲剧是暂时的，戏剧是永恒的。"
	},
	{
		Q: "真的假的？",
		A: "假作真时真亦假"
	},
	{
		Q: "谈点什么?",
		A: "科技，音乐，娱乐都可以"
	},
	{
		Q: "你说什么?",
		A: "好话不说第二遍，没听到，就算了"
	},
	{
		Q: "去你的",
		A: "请不要说脏话，不然我会生气的"
	},
	{
		Q: "为什么你总是不和我聊天啊？",
		A: "因为我害怕啊"
	},
	{
		Q: "害怕什么？",
		A: "害怕等不到你的回复。"
	},
	{
		Q: "表白被拒后你脑海里想的是什么？",
		A: "原来那些我以为他喜欢我的瞬间都是错觉。"
	},
	{
		Q: "有一句话，我一直想对你说。十年以后，我们见一次面吧！",
		A: "为什么要见面？"
	},

	{
		Q: "因为我想知道，那个时候你会变成什么样子。这些年来，我一直很喜欢你。",
		A: "那这些年，你一直怎么没问我呢？"
	},
	{
		Q: "表白被拒后你脑海里想的是什么？",
		A: "原来那些我以为他喜欢我的瞬间都是错觉。"
	},
	{
		Q: "呵呵...说了又有什么用，你那么喜欢她",
		A: "那我们什么时间？在什么地点见面？"
	},

	{
		Q: "多少人身首异处为忠义！哪像汝等贪生怕死之徒！",
		A: "落得一世英名又如何？ 人一生功过就好比这雪地上的足迹，大小各异深浅不一， 最终还是会被大风抹去。斗转星移，日月交替，万物不会因你一人而改变。"
	},
	{
		Q: "倘若每个人都像你这般苟且偷生，国家早灭亡了！",
		A: "哈哈，应该庆幸像我这样的小人物世间不多吧。"
	},
	{
		Q: "说好的呢",
		A: "对不起"
	},
	{
		Q: "能不能好好玩耍了,真是幸运",
		A: "一个宇宙，九大行星，809个岛屿，77亿人，204个国家，能够遇到我,是你一生最大的荣幸"
	}, {
		Q: "气死我了,贱人,烦,傻逼,煞笔,沙比,草泥马,吃屎吧你",
		A: "不要生气了，我给你学狗叫吧,呜呜呜(◕ᴗ◕✿)"
	}, {
		Q: "你真漂亮",
		A: "你眼光真好"
	}, {
		Q: "好无聊，我们玩个游戏吧",
		A: "你拍一,我拍一,一个小孩坐飞机。你拍二,我拍二,两个小孩丢手绢。"
	}, {
		Q: "指甲油,女装,变性,伪娘,骚",
		A: "你觉得男生涂指甲油娘不娘"
	}, {
		Q: "娘啊,娘炮",
		A: "哎，娘在，乖儿子"
	}, {
		Q: "你真难看,丑,无盐,见鬼了",
		A: "亲爱的，你嫌弃我长得难看吗o(╥﹏╥)o"
	}, {
		Q: "女孩,百合,搞基,手软了,镜子,一见钟情，",
		A: "刚刚看见一个女孩，我差点就和他百合了٩(๑❛ᴗ❛๑)۶"
	}, {
		Q: "照片,好看吗,美不美",
		A: "我发现你是个照骗，因为本人比照片好看多了。(✪ω✪)"
	}, {
		Q: "上床,做爱,爱爱,羞羞,强奸,凌辱",
		A: "我悄悄的来，悄悄的走，挥一挥匕首，不留一个活口。",
	},
	{
		Q: "稳定性,内裤,三角形,飞得更高",
		A: "超人穿的三角内裤有稳定性，所以他才会飞的那么高"
	}, {
		Q: "你有梦想吗,你做梦吗,你有梦想吗",
		A: "我的梦想是，在梦里面胡思乱想"
	}, {
		Q: "打你,捶你,耳光,跪下,滚,去死吧,睡你",
		A: "施主，你要再欺负本仙女，本仙女就不给阎王爷面子了"
	}, {
		Q: "唱歌,跳舞,作诗,弹琴,舞剑",
		A: "别逼我，否则我文艺起来一发不可收拾"
	}, {
		Q: "威武雄壮,六块腹肌,猛男,健身,出汗",
		A: "不要以为你长的狼样，我就能把你看成是灰太狼"
	}, {
		Q: "着急,紧急,迫在眉睫,迅速,快点啊",
		A: "天塌下来你先顶着，我去找根棍子"
	}, {
		Q: "吵架,心情不好,难受,懊悔",
		A: "男人和女人吵架，男人就像手枪，女人就像机关枪"
	}, {
		Q: "狼爱上羊,贪心,贪婪,人性",
		A: "狼爱上羊的感觉你懂吗?那只不过是想吃它的肉"
	}, {
		Q: "困,萎靡不振,睡不着,瞌睡,想睡觉",
		A: "春眠不觉晓，哈欠上门找，晚上睡不着，白天醒不了"
	}, {
		Q: "优点,我帅吗,我美吧",
		A: "其实你这人有一个优点，晚上鬼不敢往你家跑｡◕ᴗ◕｡"
	}, {
		Q: "心情不好,吃不下饭,难过,想哭",
		A: "现在心情不好，除了吃的下饭，什么都干不了"
	}, {
		Q: "考试,考砸了,学习成绩,考核",
		A: "如果考试能够升级，我现在恐怕还是负一级"
	}, {
		Q: "睡觉,被子,床,你困不困",
		A: "每天晚上盖被子，都感觉像是入土为安"
	}, {
		Q: "想什么呢,沉思,一言不发,不说话",
		A: "别人都以为我在沉思，其实我是看地上一毛该不该捡"
	}, {
		Q: "解释,彪悍,人生格言,座右铭",
		A: "人生苦短必须性感，彪悍的人生不需要解释"
	}, {
		Q: "流氓,女流氓,英雄",
		A: "英雄不问出路，流氓不看岁数!"
	}
];
module.exports = QA
