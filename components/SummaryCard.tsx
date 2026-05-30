import type { AnalysisResult } from "@/lib/types";

interface SummaryCardProps {
  summary: string;
  analyzedAt: string;
  inputTextPreview: string;
}

export default function SummaryCard({
  summary,
  analyzedAt,
  inputTextPreview,
}: SummaryCardProps) {
  const timeStr = new Date(analyzedAt).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
        <h3 className="text-base font-semibold text-text-primary">AI分析摘要</h3>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {summary}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-text-muted pt-4 border-t border-border">
        <span>分析时间：{timeStr}</span>
        <span className="hidden sm:block">·</span>
        <span className="truncate max-w-xs">
          输入快照：{inputTextPreview.slice(0, 80)}...
        </span>
      </div>
    </div>
  );
}
