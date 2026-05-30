// ============ 用户画像 ============
export interface UserPersona {
  id: string;
  name: string;
  percentage: number;
  description: string;
  tags: string[];
}

// ============ 核心需求 ============
export interface CoreNeed {
  name: string;
  score: number; // 0-100
  description: string;
}

// ============ 用户痛点 ============
export interface PainPoint {
  id: string;
  name: string;
  severity: "high" | "medium" | "low";
  mentionCount: number;
  description: string;
}

// ============ 情绪分析 ============
export type SentimentType = "positive" | "neutral" | "negative";

export interface SentimentItem {
  type: SentimentType;
  label: string;
  percentage: number;
  count: number;
}

export interface SentimentAnalysisData {
  overall: SentimentType;
  overallLabel: string;
  summary: string;
  distribution: SentimentItem[];
}

// ============ 关键词 ============
export interface Keyword {
  word: string;
  frequency: number;
  sentiment: SentimentType;
}

// ============ 营销建议 ============
export type SuggestionCategory =
  | "用户运营"
  | "产品优化"
  | "内容营销"
  | "活动策划";

export interface MarketingSuggestion {
  id: string;
  category: SuggestionCategory;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

// ============ 完整分析结果 ============
export interface AnalysisResult {
  userPersonas: UserPersona[];
  coreNeeds: CoreNeed[];
  painPoints: PainPoint[];
  sentimentAnalysis: SentimentAnalysisData;
  keywords: Keyword[];
  marketingSuggestions: MarketingSuggestion[];
  summary: string;
  analyzedAt: string;
  inputTextPreview: string;
}

// ============ 应用状态 ============
export type AnalysisStatus = "idle" | "analyzing" | "completed" | "error";

export interface LoadingProgress {
  currentStep: number;
  stepText: string;
  totalSteps: number;
}

export interface AppState {
  status: AnalysisStatus;
  inputText: string;
  result: AnalysisResult | null;
  error: string | null;
  progress: LoadingProgress | null;
}
