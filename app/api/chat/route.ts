import { NextRequest, NextResponse } from "next/server";
import { chatWithAI } from "@/lib/anthropic";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY && !process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "AI chatbot not configured. Add GROQ_API_KEY or ANTHROPIC_API_KEY to .env" },
        { status: 503 }
      );
    }

    const response = await chatWithAI(message);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
