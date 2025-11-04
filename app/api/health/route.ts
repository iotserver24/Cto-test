import { NextResponse } from "next/server";
import { getAIModelName, getAIApiUrl } from "@/lib/config";

export const runtime = "nodejs";

export async function GET() {
  try {
    const modelName = getAIModelName();
    const apiUrl = getAIApiUrl();

    return NextResponse.json({
      status: "ok",
      config: {
        modelName,
        apiUrl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Configuration error",
      },
      { status: 500 }
    );
  }
}
