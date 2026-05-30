"use client";

import { useState, useRef, useEffect } from "react";
import { MAX_INPUT_LENGTH, EXAMPLE_TEXTS, PLACEHOLDER_TEXT } from "@/lib/constants";

interface InputSectionProps {
  onSubmit: (text: string) => void;
  isDisabled: boolean;
}

export default function InputSection({ onSubmit, isDisabled }: InputSectionProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = text.length;
  const isEmpty = text.trim().length === 0;

  const handleSubmit = () => {
    if (!isEmpty && !isDisabled) {
      onSubmit(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const fillExample = (exampleText: string) => {
    setText(exampleText);
    textareaRef.current?.focus();
  };

  // 自动撑高textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 320) + "px";
    }
  }, [text]);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-5 pb-3">
        <label className="block text-sm font-medium text-text-primary mb-2">
          请输入用户反馈文本
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER_TEXT}
          disabled={isDisabled}
          maxLength={MAX_INPUT_LENGTH}
          rows={4}
          className="w-full min-h-[120px] resize-y rounded-lg border border-border px-4 py-3 text-sm text-text-primary placeholder:text-text-muted bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-text-muted mr-1">快速填充：</span>
          {EXAMPLE_TEXTS.map((example) => (
            <button
              key={example.label}
              onClick={() => fillExample(example.text)}
              disabled={isDisabled}
              className="px-3 py-1 text-xs rounded-full border border-border text-text-secondary hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {example.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-text-muted mr-auto sm:mr-0">
            {charCount}/{MAX_INPUT_LENGTH}
          </span>
          <button
            onClick={() => setText("")}
            disabled={isDisabled || isEmpty}
            className="px-4 py-2 text-sm text-text-secondary rounded-lg border border-border hover:bg-surface-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            清除
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled || isEmpty}
            className="px-5 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 shadow-sm"
          >
            开始分析
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
