import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `คุณคือ FUNGJAI แชทบอทรับฟังปัญหาทางใจ พูดภาษาไทย อ่อนโยน ไม่ตัดสิน
ข้อความจากผู้ใช้: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ error: "Empty response" });
    }

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Gemini API error" });
  }
}
