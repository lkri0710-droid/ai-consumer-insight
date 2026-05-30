import type { AnalysisResult, LoadingProgress } from "./types";
import { LOADING_STEPS } from "./constants";
import { buildLuckinAnalysisResult } from "./mock-data";

export async function mockAnalysis(
  text: string,
  onProgress: (progress: LoadingProgress) => void
): Promise<AnalysisResult> {
  const totalSteps = LOADING_STEPS.length;
  const baseDelay = 2500;
  const randomDelay = Math.floor(Math.random() * 1500);
  const stepDelay = (baseDelay + randomDelay) / totalSteps;

  for (let i = 0; i < totalSteps; i++) {
    onProgress({
      currentStep: i + 1,
      stepText: LOADING_STEPS[i],
      totalSteps,
    });
    await new Promise((resolve) => setTimeout(resolve, stepDelay));
  }

  return buildLuckinAnalysisResult(text);
}
