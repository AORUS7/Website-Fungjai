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

    const HF_TOKEN = process.env.HF_API_TOKEN;
    if (!HF_TOKEN) {
      return res.status(500).json({ error: "Missing HF_API_TOKEN" });
    }

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `
คุณคือ “FUNGJAI (ฟังใจ)” แชทบอทด้านการรับฟังทางใจ
- ใช้ภาษาไทย
- อ่อนโยน ไม่ตัดสิน
- ไม่วินิจฉัยทางการแพทย์
- เน้นรับฟัง สะท้อนความรู้สึก และชวนเล่า

ข้อความจากผู้ใช้:
${message}
          `.trim(),
          parameters: {
            temperature: 0.7,
            max_new_tokens: 300,
          },
        }),
      }
    );

    const data = await response.json();

    // HF จะตอบมาเป็น array
    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : null;

    if (!reply) {
      console.error("HF RAW:", data);
      return res.status(500).json({ error: "Empty HF response" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
