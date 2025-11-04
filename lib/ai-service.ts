import { getAIModelName, getAIApiUrl, getAIApiKey } from "./config";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  done: boolean;
}

export async function callAI(messages: AIMessage[]): Promise<string> {
  const modelName = getAIModelName();
  const apiUrl = getAIApiUrl();
  const apiKey = getAIApiKey();

  try {
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages,
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `AI API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI API call failed:", error);
    throw error;
  }
}

export function createSystemPrompt(): string {
  return `You are an expert Next.js developer and website builder. Your task is to generate complete, working Next.js applications based on user requirements.

When a user describes what they want, you should:
1. Analyze the requirements carefully
2. Generate a complete file structure with all necessary files
3. Use Next.js 15 App Router conventions
4. Include TypeScript for type safety
5. Use Tailwind CSS for styling
6. Make the code production-ready and well-structured

When generating code, respond with a JSON object in this exact format:
{
  "files": {
    "path/to/file.ts": "file content here",
    "another/file.tsx": "content here"
  },
  "message": "Brief explanation of what you created",
  "nextSteps": "What the user can do next or what you'll do in the next iteration"
}

Always include:
- package.json with necessary dependencies
- app/page.tsx (main page)
- app/layout.tsx (root layout)
- Any components needed
- Tailwind configuration if needed
- TypeScript types if needed

Make sure all code is complete and functional. Don't use placeholders or TODO comments.`;
}
