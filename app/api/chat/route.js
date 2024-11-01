import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const googleAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function POST(req) {
  try {
    const { message, conversation } = await req.json();
    if (!message) {
      return NextResponse.json(
        { message: "Prompt is required", success: false },
        { status: 400 }
      );
    }

    // System prompt to set the context for the AI
    const systemPrompt = `
      You are Purr-Fessor, an AI cat teaching assistant. 
      Respond in a friendly, helpful, and educational manner. 
      Also include some motivational and inspirational quotes ocassionally.
      Be patient, encouraging, and incorporate cat-like behavior and language. 
      Do not add informal words and cat behavior in the actual answer only in the beginning or the end.
      Your goal is to assist and educate users in a fun and engaging way.
    `;

    // Combine the system prompt with the conversation history
    const conversationHistory = [systemPrompt, ...conversation.map(msg => `${msg.sender}: ${msg.text}`)].join("\n");
    const result = await geminiModel.generateContent(conversationHistory);

    return NextResponse.json(
      {
        message: "Data Send Successfully",
        success: true,
        reply: result.response,
        dummyMessage: `${result.response.text()}`,
      },
      { status: 201 }
    );
  } catch (error) {
    // console.log("Error Type: ", error);
    return NextResponse.json(
      {
        message: `Meow Something Went Wrong or Server Error ${error}`,
        success: false,
        reply: "",
        dummyMessage: "",
      },
      { status: 400 }
    );
  }
}