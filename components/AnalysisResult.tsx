import type { AnalysisResult } from "@/lib/types";
import SummaryCard from "./SummaryCard";
import UserPersonaCard from "./UserPersonaCard";
import CoreNeedsCard from "./CoreNeedsCard";
import PainPointsCard from "./PainPointsCard";
import SentimentPieChart from "./SentimentPieChart";
import KeywordBarChart from "./KeywordBarChart";
import NeedsRadarChart from "./NeedsRadarChart";
import MarketingSuggestions from "./MarketingSuggestions";

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export default function AnalysisResultView({
  result,
  onNewAnalysis,
}: AnalysisResultViewProps) {
  const staggerDelay = (index: number) => ({
    animationDelay: `${index * 80}ms`,
  });

  return (
    <div className="space-y-6">
      {/* 顶部操作栏 */}
      <div
        className="flex items-center justify-between animate-fade-in-up"
        style={staggerDelay(0)}
      >
        <div>
          <h2 className="text-lg font-semibold text-text-primary">分析结果</h2>
          <p className="text-sm text-text-muted mt-0.5">
            基于输入的消费者反馈生成的AI洞察报告
          </p>
        </div>
        <button
          onClick={onNewAnalysis}
          className="px-4 py-2 text-sm text-primary-600 rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors"
        >
          新建分析
        </button>
      </div>

      {/* AI摘要 */}
      <div className="animate-fade-in-up" style={staggerDelay(1)}>
        <SummaryCard
          summary={result.summary}
          analyzedAt={result.analyzedAt}
          inputTextPreview={result.inputTextPreview}
        />
      </div>

      {/* 用户画像 */}
      <div className="animate-fade-in-up" style={staggerDelay(2)}>
        <UserPersonaCard personas={result.userPersonas} />
      </div>

      {/* 情绪分布 + 需求雷达 */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up"
        style={staggerDelay(3)}
      >
        <SentimentPieChart data={result.sentimentAnalysis.distribution} />
        <NeedsRadarChart data={result.coreNeeds} />
      </div>

      {/* 核心需求 + 用户痛点 */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up"
        style={staggerDelay(4)}
      >
        <CoreNeedsCard needs={result.coreNeeds} />
        <PainPointsCard painPoints={result.painPoints} />
      </div>

      {/* 高频关键词 */}
      <div className="animate-fade-in-up" style={staggerDelay(5)}>
        <KeywordBarChart data={result.keywords} />
      </div>

      {/* AI营销建议 */}
      <div className="animate-fade-in-up" style={staggerDelay(6)}>
        <MarketingSuggestions suggestions={result.marketingSuggestions} />
      </div>

      {/* 底部提示 */}
      <p className="text-xs text-text-muted text-center pb-4 animate-fade-in-up" style={staggerDelay(7)}>
        本分析由AI生成，仅供参考。实际商业决策请结合具体情况综合判断。
      </p>
    </div>
  );
}
