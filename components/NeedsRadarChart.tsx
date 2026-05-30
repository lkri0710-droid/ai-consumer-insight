"use client";

import type { CoreNeed } from "@/lib/types";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface NeedsRadarChartProps {
  data: CoreNeed[];
}

export default function NeedsRadarChart({ data }: NeedsRadarChartProps) {
  const chartData = data.map((need) => ({
    need: need.name,
    score: need.score,
    fullMark: 100,
  }));

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 h-full">
      <h3 className="text-base font-semibold text-text-primary mb-2">需求分析雷达</h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="need"
              tick={{ fontSize: 12, fill: "#475569" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickCount={5}
            />
            <Radar
              name="需求评分"
              dataKey="score"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
