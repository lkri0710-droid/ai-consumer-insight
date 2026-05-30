import type { UserPersona } from "@/lib/types";

interface UserPersonaCardProps {
  personas: UserPersona[];
}

const colorPalette = [
  { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-500" },
  { bg: "bg-green-50", text: "text-green-700", bar: "bg-green-500" },
  { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500" },
  { bg: "bg-purple-50", text: "text-purple-700", bar: "bg-purple-500" },
];

export default function UserPersonaCard({ personas }: UserPersonaCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="text-base font-semibold text-text-primary mb-4">用户画像</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {personas.map((persona, i) => {
          const colors = colorPalette[i % colorPalette.length];
          return (
            <div
              key={persona.id}
              className={`${colors.bg} rounded-xl p-4 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${colors.text}`}>
                  {persona.name}
                </span>
                <span className={`text-lg font-bold ${colors.text}`}>
                  {persona.percentage}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/60 rounded-full mb-3 overflow-hidden">
                <div
                  className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
                  style={{ width: `${persona.percentage}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3 flex-1">
                {persona.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {persona.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] rounded-md bg-white/70 text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
