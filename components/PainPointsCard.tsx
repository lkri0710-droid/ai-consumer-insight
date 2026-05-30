import type { PainPoint } from "@/lib/types";

interface PainPointsCardProps {
  painPoints: PainPoint[];
}

const severityConfig = {
  high: { label: "高", bg: "bg-negative-light", text: "text-negative" },
  medium: { label: "中", bg: "bg-amber-50", text: "text-amber-600" },
  low: { label: "低", bg: "bg-surface-secondary", text: "text-text-muted" },
};

export default function PainPointsCard({ painPoints }: PainPointsCardProps) {
  const sorted = [...painPoints].sort((a, b) => b.mentionCount - a.mentionCount);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 h-full">
      <h3 className="text-base font-semibold text-text-primary mb-4">用户痛点</h3>
      <div className="space-y-3">
        {sorted.map((point) => {
          const sev = severityConfig[point.severity];
          return (
            <div
              key={point.id}
              className="flex gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
            >
              <span
                className={`shrink-0 w-8 h-8 rounded-lg ${sev.bg} ${sev.text} flex items-center justify-center text-xs font-semibold`}
              >
                {sev.label}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-text-primary">
                    {point.name}
                  </span>
                  <span className="text-xs text-text-muted">
                    提及 {point.mentionCount} 次
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
