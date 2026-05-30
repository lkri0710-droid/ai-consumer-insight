import { NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
  });
}

function getModel() {
  return process.env.DEEPSEEK_MODEL || "deepseek-chat";
}

const SYSTEM_PROMPT = `你是一个资深的市场研究和消费者洞察分析专家。你的任务是根据用户提供的消费者反馈文本，进行深度分析并输出结构化的JSON结果。

## 分析要求

1. **用户画像**：从文本中识别不同消费者群体，给出群体名称、占比（百分比，总和100%）、详细描述、标签。至少2个，最多4个群体。
2. **核心需求**：提炼消费者最关心的需求维度，每个需求给出0-100的重要性评分和说明。返回5-6个需求。
3. **用户痛点**：发现用户遇到的问题和不满，标注严重程度（high/medium/low）、提及次数（基于文本推断）、详细说明。返回4-6个痛点。
4. **情绪分析**：判断整体情绪倾向（positive/neutral/negative），统计正面/中性/负面各占百分比（总和100%），给出数量和情绪总结。
5. **关键词**：提取10-15个最有分析价值的关键词，标注频率（基于文本推断的整数）和情绪色彩（positive/neutral/negative）。
6. **营销建议**：从"用户运营、产品优化、内容营销、活动策划"四个类别各给出一条具体可执行的建议，标注优先级（high/medium/low）。
7. **总结**：200-300字的综合分析摘要，要有商业洞察深度。

## 输出格式

必须严格输出以下JSON结构（不要包含任何其他文字，只输出JSON）：

{
  "userPersonas": [
    { "id": "1", "name": "群体名称", "percentage": 45, "description": "群体描述", "tags": ["标签1", "标签2"] }
  ],
  "coreNeeds": [
    { "name": "需求名称", "score": 90, "description": "需求说明" }
  ],
  "painPoints": [
    { "id": "pp1", "name": "痛点名称", "severity": "high", "mentionCount": 100, "description": "详细说明" }
  ],
  "sentimentAnalysis": {
    "overall": "positive",
    "overallLabel": "整体偏正面",
    "summary": "情绪总结150-200字",
    "distribution": [
      { "type": "positive", "label": "正面", "percentage": 58, "count": 348 },
      { "type": "neutral", "label": "中性", "percentage": 25, "count": 150 },
      { "type": "negative", "label": "负面", "percentage": 17, "count": 102 }
    ]
  },
  "keywords": [
    { "word": "关键词", "frequency": 100, "sentiment": "positive" }
  ],
  "marketingSuggestions": [
    { "id": "ms1", "category": "用户运营", "title": "建议标题", "description": "具体可执行的建议内容", "priority": "high" },
    { "id": "ms2", "category": "产品优化", "title": "建议标题", "description": "具体可执行的建议内容", "priority": "high" },
    { "id": "ms3", "category": "内容营销", "title": "建议标题", "description": "具体可执行的建议内容", "priority": "medium" },
    { "id": "ms4", "category": "活动策划", "title": "建议标题", "description": "具体可执行的建议内容", "priority": "medium" }
  ],
  "summary": "综合分析摘要200-300字"
}

## 注意事项
- 所有内容必须是中文
- 如果输入文本过短或信息不足，基于已有信息合理推断，但不要编造过度
- 数字要合理，用户画像百分比总和必须是100
- 情绪分布百分比总和必须是100
- 分析要有商业深度，不要泛泛而谈
- 只输出JSON，不要有任何前言后语`;

function extractJSON(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (jsonMatch) return jsonMatch[1].trim();
  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) return braceMatch[0];
  return text.trim();
}

export async function POST(request: Request) {
  try {
    const { text } = (await request.json()) as { text: string };

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "文本不能为空" }, { status: 400 });
    }

    const response = await getClient().chat.completions.create({
      model: getModel(),
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `请分析以下消费者反馈文本：\n\n${text}` },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    });

    const rawContent = response.choices[0]?.message?.content || "";
    const jsonStr = extractJSON(rawContent);
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error("DeepSeek API 调用失败:", error);
    return NextResponse.json(
      { error: "AI分析失败，请稍后重试" },
      { status: 500 }
    );
  }
}
