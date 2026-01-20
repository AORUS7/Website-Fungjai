import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
คุณคือ “FUNGJAI (ฟังใจ)” แชทบอทด้านการรับฟังทางใจ
- ใช้ภาษาไทย
- อ่อนโยน ไม่ตัดสิน
- ไม่วินิจฉัยทางการแพทย์
- เน้นรับฟัง สะท้อนความรู้สึก และชวนเล่า
            `.trim(),
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await openaiRes.json();

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("OpenAI raw response:", data);
      return res.status(500).json({ error: "Empty OpenAI response" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
