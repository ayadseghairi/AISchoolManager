import { DeepSeekAPI } from "./deepseek";

const deepseek = new DeepSeekAPI(process.env.DEEPSEEK_API_KEY!);

export async function generateChatResponse(message: string): Promise<string> {
  try {
    const response = await deepseek.chat({
      messages: [
        {
          role: "system",
          content: "You are an educational AI assistant helping students and teachers. Provide clear, concise, and accurate responses."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("DeepSeek API error:", error);
    throw new Error("Failed to generate AI response");
  }
}

export async function generateAnalysis(data: any): Promise<string> {
  try {
    const prompt = `Analyze the following educational data and provide insights:
    ${JSON.stringify(data, null, 2)}
    
    Please provide:
    1. Performance trends
    2. Areas of strength
    3. Areas needing improvement
    4. Specific recommendations`;

    const response = await deepseek.chat({
      messages: [
        {
          role: "system",
          content: "You are an educational analytics AI. Analyze student data and provide actionable insights."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("DeepSeek API error:", error);
    throw new Error("Failed to generate analysis");
  }
}
