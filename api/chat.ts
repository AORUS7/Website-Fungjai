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

    const hfKey = process.env.HF_API_KEY;
    if (!hfKey) {
      return res.status(500).json({ error: "Missing HF_API_KEY" });
    }

    const prompt = `
คุณคือ “FUNGJAI (ฟังใจ)” แชทบอทด้านการรับฟังทางใจ
- ใช้ภาษาไทย
- อ่อนโยน ไม่ตัดสิน
- ไม่วินิจฉัยทางการแพทย์
- เน้นรับฟัง สะท้อนความรู้สึก และชวนเล่า

ผู้ใช้พูดว่า:
${message}

FUNGJAI ตอบอย่างอ่อนโยน:
`.trim();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();

    // 🔍 LOG เพื่อเช็คให้ชัวร์
    console.log("HF RAW:", JSON.stringify(data));

    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text.trim()
        : null;

    if (!reply) {
      return res.status(500).json({
        error: "Empty response from Hugging Face",
        raw: data,
      });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("HF API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
