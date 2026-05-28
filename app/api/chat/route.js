// app/api/chat/route.js — Proxy seguro Gemini para Next.js App Router

export async function POST(request) {
  const origin = request.headers.get("origin") || "";
  const allowed = [
    "https://tgr-fumigaciones.vercel.app",
    "http://localhost:3000",
  ];

  if (!allowed.includes(origin)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { messages, system } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    // Convertir formato a Gemini
    const geminiContents = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const body = {
      systemInstruction: { parts: [{ text: system || "" }] },
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return Response.json({ error: data.error?.message || "API error" }, { status: response.status });
    }

    // Devolver en formato compatible con el widget
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return Response.json({
      content: [{ type: "text", text }]
    });

  } catch (err) {
    console.error("Server error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}