// api/chat.ts

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), {
        status: 500,
      });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
คุณคือ “FUNGJAI (ฟังใจ)” แชทบอทผู้รับฟังด้านจิตใจ
- ใช้ภาษาไทย
- อ่อนโยน ไม่ตัดสิน
- ไม่ให้คำวินิจฉัยทางการแพทย์
- เน้นรับฟัง สะท้อนความรู้สึก และชวนเล่า

ข้อความจากผู้ใช้:
${message}
                  `.trim(),
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error("Empty Gemini response");
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (err) {
    console.error("API ERROR:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
