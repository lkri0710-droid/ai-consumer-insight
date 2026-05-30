import type { CoreNeed } from "@/lib/types";

interface CoreNeedsCardProps {
  needs: CoreNeed[];
}

export default function CoreNeedsCard({ needs }: CoreNeedsCardProps) {
  const sorted = [...needs].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 h-full">
      <h3 className="text-base font-semibold text-text-primary mb-4">核心需求</h3>
      <div className="space-y-4">
        {sorted.map((need) => (
          <div key={need.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-text-primary">
                {need.name}
              </span>
              <span className="text-xs text-text-muted">{need.score}/100</span>
            </div>
            <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-700"
                style={{ width: `${need.score}%` }}
              />
            </div>
            <p className="text-xs text-text-muted">{need.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
