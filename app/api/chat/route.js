import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function POST(req, res) {
  try {
    const { message } = await req.json();
    if (!message) {
      return res.json(
        { message: "Prompt is required", success: false },
        { status: 400 }
      );
    }

    // Cat-themed system prompt
    const catPrompt = `You are Purr-fessor, an AI cat teaching assistant. Respond to the user's message with a friendly and cat-like personality. Be helpful, but also include some cat-like quirks in your responses.`;

    const result = await geminiModel.generateContent(`${catPrompt}\n\nUser: ${message}\nPurr-fessor:`);

    return res.json(
      {
        message: "Data sent successfully",
        success: true,
        reply: result.response,
        dummyMessage: `Purr-fessor says: ${result.response.text()}`,
      },
      { status: 201 }
    );
  } catch (error) {
    return res.json(
      {
        message: `Something went wrong or server error: ${error}`,
        success: false,
        reply: "",
        dummyMessage: "",
      },
      { status: 400 }
    );
  }
}