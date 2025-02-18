import { Grade } from "@shared/schema";

type PredictionResult = {
  predictedGrade: number;
  confidence: number;
  recommendations: string[];
};

type PerformanceMetrics = {
  averageGrade: number;
  trend: "improving" | "declining" | "stable";
  strengths: string[];
  areasForImprovement: string[];
};

export async function predictFuturePerformance(
  studentId: number,
  subjectId: number
): Promise<PredictionResult> {
  const response = await fetch(`/api/analytics/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, subjectId }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get predictions");
  }
  
  return await response.json();
}

export async function analyzePerformance(grades: Grade[]): Promise<PerformanceMetrics> {
  const response = await fetch(`/api/analytics/performance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ grades }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to analyze performance");
  }
  
  return await response.json();
}
