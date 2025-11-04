import { NextRequest, NextResponse } from "next/server";
import { callAI, createSystemPrompt, AIMessage } from "@/lib/ai-service";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const systemMessage: AIMessage = {
      role: "system",
      content: createSystemPrompt(),
    };

    const allMessages = [systemMessage, ...messages];

    const response = await callAI(allMessages);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
