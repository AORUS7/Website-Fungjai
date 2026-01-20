import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages is required and must be an array",
      });
    }

    const hfRes = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages,
          temperature: 0.7,
          max_tokens: 512,
        }),
      }
    );

    const data = await hfRes.json();

    if (!hfRes.ok) {
      console.error("HF ERROR:", data);
      return res.status(500).json(data);
    }

    return res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
}
