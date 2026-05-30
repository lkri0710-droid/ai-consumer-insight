import type { AnalysisResult } from "./types";

export function buildLuckinAnalysisResult(
  inputText: string
): AnalysisResult {
  return {
    userPersonas: [
      {
        id: "1",
        name: "都市白领",
        percentage: 45,
        description:
          "25-35岁职场人群，工作节奏快，咖啡作为日常提神和社交工具，看重便利性和品牌调性。主要消费场景为工作日早间和午休时段。",
        tags: ["上班族", "高频消费", "品牌敏感", "外卖用户"],
      },
      {
        id: "2",
        name: "大学生群体",
        percentage: 30,
        description:
          "18-24岁在校学生，受社交平台种草影响大，对价格敏感度高，喜欢尝试新品，拍照分享意愿强。",
        tags: ["价格敏感", "社交驱动", "新品爱好者", "到店消费"],
      },
      {
        id: "3",
        name: "咖啡爱好者",
        percentage: 15,
        description:
          "对咖啡品质有一定要求，关注豆种、烘焙工艺和口感层次，常将瑞幸与独立咖啡馆对比，追求性价比与品质的平衡。",
        tags: ["品质导向", "专业术语", "口感挑剔", "复购用户"],
      },
      {
        id: "4",
        name: "轻度尝试者",
        percentage: 10,
        description:
          "非咖啡日常用户，被联名、新品或周边吸引首次消费，转化潜力大但品牌忠诚度低，是重要的增长人群。",
        tags: ["偶发消费", "联名吸引", "价格驱动", "转化空间大"],
      },
    ],
    coreNeeds: [
      {
        name: "性价比",
        score: 90,
        description: "9.9元活动是核心吸引力，价格优势是选择瑞幸的第一驱动力",
      },
      {
        name: "便利性",
        score: 85,
        description: "门店覆盖密集、外卖配送相对快捷，满足即时消费需求",
      },
      {
        name: "产品品质",
        score: 75,
        description: "对口感有基本要求，希望保持稳定的出品标准",
      },
      {
        name: "新品创新",
        score: 70,
        description: "联名款和新口味驱动尝试性消费，是社交媒体话题来源",
      },
      {
        name: "品牌形象",
        score: 60,
        description: "年轻化、互联网化的品牌形象受认可，但非核心决策因素",
      },
      {
        name: "服务体验",
        score: 55,
        description: "出餐速度、店员态度和售后处理，目前存在改善空间",
      },
    ],
    painPoints: [
      {
        id: "pp1",
        name: "配送超时",
        severity: "high",
        mentionCount: 142,
        description:
          "高峰时段外卖配送延迟明显，导致咖啡温度下降、冰饮融化，影响口感和消费体验",
      },
      {
        id: "pp2",
        name: "价格波动",
        severity: "high",
        mentionCount: 128,
        description:
          "优惠券规则频繁变化，9.9元活动覆盖范围不清晰，用户对价格一致性缺乏信任感",
      },
      {
        id: "pp3",
        name: "新品翻车",
        severity: "medium",
        mentionCount: 87,
        description:
          "部分联名新品（如酱香拿铁）口碑两极分化明显，消费者对创新产品的接受度存在较大分歧",
      },
      {
        id: "pp4",
        name: "门店排队",
        severity: "medium",
        mentionCount: 76,
        description:
          "午间高峰时段门店出餐速度慢，取餐排队时间过长，影响白领用户的午休消费体验",
      },
      {
        id: "pp5",
        name: "出品不一致",
        severity: "low",
        mentionCount: 53,
        description:
          "不同门店制作标准不完全统一，冰量、甜度和温度偶尔出错，品控一致性有待提升",
      },
    ],
    sentimentAnalysis: {
      overall: "positive",
      overallLabel: "整体偏正面",
      summary:
        "消费者对瑞幸的整体情绪偏积极，正面评价占比接近六成。性价比和便利性是用户最认可的优势。负面情绪主要集中在配送时效和价格政策方面，属于运营层面的可优化问题，而非产品根本性缺陷。建议优先解决配送痛点，同时利用新品创新和社交媒体话题维持正向情绪。",
      distribution: [
        { type: "positive", label: "正面", percentage: 58, count: 348 },
        { type: "neutral", label: "中性", percentage: 25, count: 150 },
        { type: "negative", label: "负面", percentage: 17, count: 102 },
      ],
    },
    keywords: [
      { word: "9.9", frequency: 186, sentiment: "positive" },
      { word: "配送", frequency: 142, sentiment: "negative" },
      { word: "好喝", frequency: 135, sentiment: "positive" },
      { word: "优惠券", frequency: 128, sentiment: "neutral" },
      { word: "新品", frequency: 115, sentiment: "neutral" },
      { word: "酱香", frequency: 98, sentiment: "neutral" },
      { word: "方便", frequency: 87, sentiment: "positive" },
      { word: "外卖", frequency: 82, sentiment: "neutral" },
      { word: "冰量", frequency: 65, sentiment: "negative" },
      { word: "生椰", frequency: 58, sentiment: "positive" },
      { word: "排队", frequency: 47, sentiment: "negative" },
      { word: "推荐", frequency: 42, sentiment: "positive" },
    ],
    marketingSuggestions: [
      {
        id: "ms1",
        category: "用户运营",
        title: "基于消费频次的分层运营，提升用户生命周期价值",
        description:
          "将用户分为重度(月消费>8次)、中度(3-8次)和轻度(<3次)三层。重点加强对轻度尝试者的转化(目前占10%)：新用户首单立减+7天会员体验；对白领群体推送工作日定时优惠提醒，锁定通勤场景；对大学生群体推出「组队拼单」社交裂变机制。",
        priority: "high",
      },
      {
        id: "ms2",
        category: "产品优化",
        title: "建立新品上市前的消费者评测机制，降低翻车风险",
        description:
          "参考酱香拿铁的经验，在新品大规模上市前，选取核心用户(咖啡爱好者群体)进行小范围盲测。收集口味、甜度、包装等多维反馈后再迭代上市。同时建立「新品口味投票」机制，让用户参与产品决策，既降低风险又增强参与感。",
        priority: "high",
      },
      {
        id: "ms3",
        category: "内容营销",
        title: "围绕「打工人续命水」人设，打造UGC内容生态",
        description:
          "立足白领群体的情感需求，引导用户生成「打工人咖啡日记」「周一续命仪式」等UGC内容。在小红书和抖音发起话题挑战赛，联动咖啡爱好者做专业测评，形成从专业圈层到大众圈层的两级传播。将爆款内容反哺到产品包装和门店物料。",
        priority: "medium",
      },
      {
        id: "ms4",
        category: "活动策划",
        title: "推出「准时达」承诺活动，将配送痛点转化为品牌信任",
        description:
          "针对配送超时的用户核心痛点，与外卖平台合作推出「超时赔付」承诺——超时X分钟自动发放优惠券。同时将此活动包装为品牌事件：'我们承认配送有问题，但我们在努力解决'。真诚的危机公关往往比完美的表面形象更能赢得用户好感。",
        priority: "medium",
      },
    ],
    summary:
      "综合分析显示，瑞幸咖啡的核心竞争力在于高性价比与高便利性的双轮驱动。白领群体(45%)和大学生群体(30%)构成消费主力。正面评价占比58%，整体品牌形象偏积极。主要风险点在于配送时效和价格政策的不稳定性，但这些问题属于运营优化范畴，不构成结构性威胁。建议下一步优先推进分层用户运营体系和新品评测机制，同时在内容营销上构建'打工人'情感连接，将品牌从'便宜咖啡'升级为'年轻生活方式'的象征。",
    analyzedAt: new Date().toISOString(),
    inputTextPreview: inputText.slice(0, 200),
  };
}
