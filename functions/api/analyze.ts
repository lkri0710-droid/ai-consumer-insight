/**
 * Cloudflare Pages Function for AI Consumer Insight Analysis
 *
 * This function runs on Cloudflare's edge network (Workers runtime).
 * It receives POST requests from the frontend, calls the DeepSeek API,
 * and returns structured analysis results.
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 * - DEEPSEEK_API_KEY: Required
 * - DEEPSEEK_BASE_URL: Optional, defaults to https://api.deepseek.com/v1
 * - DEEPSEEK_MODEL: Optional, defaults to deepseek-chat
 */

import { SYSTEM_PROMPT, extractJSON } from "../../lib/analyze-shared";

interface Env {
  DEEPSEEK_API_KEY: string;
  DEEPSEEK_BASE_URL?: string;
  DEEPSEEK_MODEL?: string;
}

interface ApiResponse {
  success?: boolean;
  data?: unknown;
  error?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // 只接受 POST 请求
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "方法不允许" }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Allow": "POST" },
    });
  }

  try {
    // 解析请求体
    const body = (await context.request.json()) as { text?: string };
    const text = body.text?.trim();

    if (!text || text.length === 0) {
      return new Response(JSON.stringify({ error: "文本不能为空" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 获取环境变量
    const apiKey = context.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error("DEEPSEEK_API_KEY 未配置");
      return new Response(JSON.stringify({ error: "API 密钥未配置" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const baseUrl = context.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
    const model = context.env.DEEPSEEK_MODEL || "deepseek-chat";

    // 调用 DeepSeek API（使用原生 fetch，兼容 Workers 运行时）
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `请分析以下消费者反馈文本：\n\n${text}` },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`DeepSeek API error [${response.status}]:`, errorBody);
      throw new Error(`DeepSeek API 返回错误: ${response.status}`);
    }

    // 解析 DeepSeek 响应
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const rawContent = data.choices?.[0]?.message?.content || "";
    const jsonStr = extractJSON(rawContent);
    const parsed = JSON.parse(jsonStr);

    // 返回成功响应
    const result: ApiResponse = { success: true, data: parsed };
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI analysis failed:", error);
    const result: ApiResponse = { error: "AI分析失败，请稍后重试" };
    return new Response(JSON.stringify(result), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
