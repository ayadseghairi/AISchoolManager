import { DEEP_SEEK_DEFAULTS } from "@shared/constants";

interface AIResponse {
  response: string;
  error?: string;
}

export async function getAIResponse(message: string): Promise<AIResponse> {
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    return await response.json();
  } catch (error) {
    console.error("AI chat error:", error);
    return {
      response: "I'm sorry, I encountered an error. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getAIAnalysis(data: any): Promise<AIResponse> {
  try {
    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI analysis");
    }

    return await response.json();
  } catch (error) {
    console.error("AI analysis error:", error);
    return {
      response: "Unable to generate analysis at this time.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
