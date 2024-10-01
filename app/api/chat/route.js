import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function POST(req, res) {
  try {
    const { message } = await req.json();
    if (!message)
      Response.json(
        { message: "Prompt is required", success: false },
        { status: 400 }
      );
    const result = await geminiModel.generateContent(message);

    return Response.json(
      {
        message: "Data Send Successfully",
        success: true,
        reply: result.response,
        dummyMessage: `Purr-fessor says: ${result.response.text()}`,
      },
      { status: 201 }
    );
  } catch (error) {
    // console.log("Error Type: ", error);
    return Response.json(
      {
        message: `Something Went Wrong or Server Error ${error}`,
        success: false,
        reply: "",
        dummyMessage: "",
      },
      { status: 400 }
    );
  }
}