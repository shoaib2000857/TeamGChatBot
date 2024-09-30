// app/api/chat.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Here you would integrate with the Gemini AI API to get the response
    // For now, we'll just echo the message back and add a dummy message
    const reply = `You said: ${message}`;
    const dummyMessage = "This is a dummy message from the bot.";

    res.status(200).json({ reply, dummyMessage });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}