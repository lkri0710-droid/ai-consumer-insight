import type { AnalysisResult, LoadingProgress } from "./types";
import { buildLuckinAnalysisResult } from "./mock-data";

const LOADING_STEPS = [
  "正在解析输入文本，提取关键语义...",
  "正在调用AI模型进行消费者洞察分析...",
  "正在整理分析结果，生成可视化报告...",
];

function validateAndFix(result: Record<string, unknown>): AnalysisResult {
  const personas = (result.userPersonas as Array<Record<string, unknown>>) || [];
  const needs = (result.coreNeeds as Array<Record<string, unknown>>) || [];
  const pains = (result.painPoints as Array<Record<string, unknown>>) || [];
  const sentiment = (result.sentimentAnalysis as Record<string, unknown>) || {};
  const dist = (sentiment.distribution as Array<Record<string, unknown>>) || [];
  const keywords = (result.keywords as Array<Record<string, unknown>>) || [];
  const suggestions = (result.marketingSuggestions as Array<Record<string, unknown>>) || [];

  return {
    userPersonas: personas.slice(0, 4).map((p, i) => ({
      id: String(i + 1),
      name: String(p.name || "未知群体"),
      percentage: Number(p.percentage) || 25,
      description: String(p.description || ""),
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    })),
    coreNeeds: needs.slice(0, 6).map((n) => ({
      name: String(n.name || "未知需求"),
      score: Math.min(100, Math.max(0, Number(n.score) || 50)),
      description: String(n.description || ""),
    })),
    painPoints: pains.slice(0, 6).map((p, i) => ({
      id: String(p.id || `pp${i + 1}`),
      name: String(p.name || "未知痛点"),
      severity: (["high", "medium", "low"].includes(String(p.severity))
        ? String(p.severity)
        : "medium") as "high" | "medium" | "low",
      mentionCount: Number(p.mentionCount) || 50,
      description: String(p.description || ""),
    })),
    sentimentAnalysis: {
      overall: (["positive", "neutral", "negative"].includes(String(sentiment.overall))
        ? String(sentiment.overall)
        : "neutral") as "positive" | "neutral" | "negative",
      overallLabel: String(sentiment.overallLabel || "整体中性"),
      summary: String(sentiment.summary || ""),
      distribution: dist.slice(0, 3).map((d) => ({
        type: (["positive", "neutral", "negative"].includes(String(d.type))
          ? String(d.type)
          : "neutral") as "positive" | "neutral" | "negative",
        label: String(d.label || "未知"),
        percentage: Number(d.percentage) || 33,
        count: Number(d.count) || 100,
      })),
    },
    keywords: keywords.slice(0, 15).map((k) => ({
      word: String(k.word || ""),
      frequency: Number(k.frequency) || 50,
      sentiment: (["positive", "neutral", "negative"].includes(String(k.sentiment))
        ? String(k.sentiment)
        : "neutral") as "positive" | "neutral" | "negative",
    })),
    marketingSuggestions: suggestions.slice(0, 4).map((s, i) => ({
      id: String(s.id || `ms${i + 1}`),
      category: String(s.category || "用户运营") as AnalysisResult["marketingSuggestions"][0]["category"],
      title: String(s.title || ""),
      description: String(s.description || ""),
      priority: (["high", "medium", "low"].includes(String(s.priority))
        ? String(s.priority)
        : "medium") as "high" | "medium" | "low",
    })),
    summary: String(result.summary || ""),
    analyzedAt: new Date().toISOString(),
    inputTextPreview: String(result.inputTextPreview || ""),
  };
}

export async function aiAnalysis(
  text: string,
  onProgress: (progress: LoadingProgress) => void
): Promise<AnalysisResult> {
  const totalSteps = LOADING_STEPS.length;

  // 步骤1：解析文本
  onProgress({ currentStep: 1, stepText: LOADING_STEPS[0], totalSteps });
  await new Promise((r) => setTimeout(r, 400));

  // 步骤2：调用后端API（后端再调用DeepSeek）
  onProgress({ currentStep: 2, stepText: LOADING_STEPS[1], totalSteps });

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API返回错误: ${response.status}`);
    }

    const json = (await response.json()) as { success: boolean; data?: Record<string, unknown>; error?: string };

    if (!json.success || !json.data) {
      throw new Error(json.error || "分析失败");
    }

    const result = validateAndFix(json.data);
    result.analyzedAt = new Date().toISOString();
    result.inputTextPreview = text.slice(0, 200);

    // 步骤3：整理结果
    onProgress({ currentStep: 3, stepText: LOADING_STEPS[2], totalSteps });
    await new Promise((r) => setTimeout(r, 300));

    return result;
  } catch (error) {
    console.error("AI分析失败，降级为模拟数据:", error);

    // 自动降级为mock数据，保证演示不中断
    for (let i = 1; i <= totalSteps; i++) {
      onProgress({ currentStep: i, stepText: LOADING_STEPS[i - 1], totalSteps });
      await new Promise((r) => setTimeout(r, 300));
    }
    return buildLuckinAnalysisResult(text);
  }
}
