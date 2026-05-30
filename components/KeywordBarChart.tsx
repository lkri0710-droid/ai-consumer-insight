"use client";

import type { Keyword } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface KeywordBarChartProps {
  data: Keyword[];
}

const SENTIMENT_COLOR = {
  positive: "#22c55e",
  neutral: "#94a3b8",
  negative: "#ef4444",
};

export default function KeywordBarChart({ data }: KeywordBarChartProps) {
  const top10 = [...data]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      <h3 className="text-base font-semibold text-text-primary mb-4">
        高频关键词
      </h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={top10}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis
              type="category"
              dataKey="word"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: "#475569" }}
              width={60}
            />
            <Tooltip
              formatter={(value) => [`${value} 次`, "提及频率"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="frequency" radius={[0, 4, 4, 0]} barSize={20}>
              {top10.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SENTIMENT_COLOR[entry.sentiment]}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        {Object.entries({ 正面: "#22c55e", 中性: "#94a3b8", 负面: "#ef4444" }).map(
          ([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: color, opacity: 0.85 }}
              />
              <span className="text-xs text-text-muted">{label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
