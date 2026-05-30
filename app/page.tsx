"use client";

import { useState, useCallback } from "react";
import type { AppState, LoadingProgress, AnalysisResult } from "@/lib/types";
import { aiAnalysis } from "@/lib/ai-analysis";
import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import EmptyState from "@/components/EmptyState";
import LoadingOverlay from "@/components/LoadingOverlay";
import ErrorState from "@/components/ErrorState";
import AnalysisResultView from "@/components/AnalysisResult";

const initialState: AppState = {
  status: "idle",
  inputText: "",
  result: null,
  error: null,
  progress: null,
};

export default function Home() {
  const [state, setState] = useState<AppState>(initialState);

  const handleSubmit = useCallback(async (text: string) => {
    setState({
      status: "analyzing",
      inputText: text,
      result: null,
      error: null,
      progress: { currentStep: 0, stepText: "", totalSteps: 3 },
    });

    try {
      const result: AnalysisResult = await aiAnalysis(text, (progress: LoadingProgress) => {
        setState((prev) => ({ ...prev, progress }));
      });

      setState({
        status: "completed",
        inputText: text,
        result,
        error: null,
        progress: null,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "分析过程中出现问题，请稍后重试。",
        progress: null,
      }));
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (state.inputText) {
      handleSubmit(state.inputText);
    }
  }, [state.inputText, handleSubmit]);

  const handleReset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <InputSection
          onSubmit={handleSubmit}
          isDisabled={state.status === "analyzing"}
        />

        <section className="mt-8">
          {state.status === "idle" && <EmptyState />}
          {state.status === "analyzing" && (
            <LoadingOverlay progress={state.progress!} />
          )}
          {state.status === "error" && (
            <ErrorState
              message={state.error!}
              onRetry={handleRetry}
              onReset={handleReset}
            />
          )}
          {state.status === "completed" && state.result && (
            <AnalysisResultView
              result={state.result}
              onNewAnalysis={handleReset}
            />
          )}
        </section>
      </main>
    </>
  );
}
