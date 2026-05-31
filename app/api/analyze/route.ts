import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT, extractJSON } from "@/lib/analyze-shared";

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
  });
}

function getModel() {
  return process.env.DEEPSEEK_MODEL || "deepseek-chat";
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
