import type { MarketingSuggestion } from "@/lib/types";

interface MarketingSuggestionsProps {
  suggestions: MarketingSuggestion[];
}

const categoryConfig: Record<
  string,
  { icon: string; bg: string; text: string }
> = {
  用户运营: { icon: "👥", bg: "bg-blue-50", text: "text-blue-700" },
  产品优化: { icon: "🔧", bg: "bg-green-50", text: "text-green-700" },
  内容营销: { icon: "📝", bg: "bg-purple-50", text: "text-purple-700" },
  活动策划: { icon: "🎯", bg: "bg-amber-50", text: "text-amber-700" },
};

const priorityLabel: Record<string, string> = {
  high: "高优先级",
  medium: "中优先级",
  low: "低优先级",
};

export default function MarketingSuggestions({
  suggestions,
}: MarketingSuggestionsProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="text-base font-semibold text-text-primary mb-4">
        AI营销建议
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((s) => {
          const config = categoryConfig[s.category] ?? categoryConfig["用户运营"];
          return (
            <div
              key={s.id}
              className="border border-border rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{config.icon}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-md ${config.bg} ${config.text}`}
                >
                  {s.category}
                </span>
                <span className="text-xs text-text-muted ml-auto">
                  {priorityLabel[s.priority]}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1.5">
                {s.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {s.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
