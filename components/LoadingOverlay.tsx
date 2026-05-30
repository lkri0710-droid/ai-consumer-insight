"use client";

import type { LoadingProgress } from "@/lib/types";

interface LoadingOverlayProps {
  progress: LoadingProgress;
}

export default function LoadingOverlay({ progress }: LoadingOverlayProps) {
  const percent = Math.round(
    (progress.currentStep / progress.totalSteps) * 100
  );

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white rounded-2xl border border-border shadow-sm p-10 max-w-md w-full text-center">
        {/* 脉冲动画的AI图标 */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary-400/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
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
          </div>
        </div>

        {/* 当前步骤文字 */}
        <p className="text-sm font-medium text-text-primary mb-4 min-h-[24px] transition-all">
          {progress.stepText}
        </p>

        {/* 进度条 */}
        <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs text-text-muted">
          AI 正在深度分析您的数据，预计需要 3-5 秒
        </p>
      </div>
    </div>
  );
}
