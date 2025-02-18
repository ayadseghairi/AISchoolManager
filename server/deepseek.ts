type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
};

type ChatResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

export class DeepSeekAPI {
  private apiKey: string;
  private baseURL = "https://api.deepseek.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(params: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.max_tokens ?? 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`DeepSeek API error: ${error.error || response.statusText}`);
    }

    return await response.json();
  }
}
