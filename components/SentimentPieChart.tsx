"use client";

import type { SentimentItem } from "@/lib/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SentimentPieChartProps {
  data: SentimentItem[];
}

const COLORS = {
  positive: "#22c55e",
  neutral: "#94a3b8",
  negative: "#ef4444",
};

export default function SentimentPieChart({ data }: SentimentPieChartProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 h-full">
      <h3 className="text-base font-semibold text-text-primary mb-2">情绪分布</h3>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full lg:w-3/5 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={100}
                paddingAngle={3}
                dataKey="percentage"
                nameKey="label"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.type}
                    fill={COLORS[entry.type]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "13px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-sm text-text-secondary">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex lg:flex-col gap-3 w-full lg:w-2/5">
          {data.map((item) => (
            <div
              key={item.type}
              className="flex-1 flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: `${COLORS[item.type]}08` }}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[item.type] }}
              />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {item.label} {item.percentage}%
                </p>
                <p className="text-xs text-text-muted">{item.count} 条</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
