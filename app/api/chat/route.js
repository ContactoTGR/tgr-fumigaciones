// app/api/chat/route.js — Proxy seguro Gemini para Next.js App Router
 
const ALLOWED_ORIGINS = [
  "https://tgr-fumigaciones.vercel.app",
  "http://localhost:3000",
];
 
// Headers CORS reutilizables — se aplican en TODAS las respuestas
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
 
export async function POST(request) {
  const origin = request.headers.get("origin") || "";
 
  // Si origin está vacío = misma origen (localhost fetch sin header Origin) → permitir
  // Si origin está presente pero no está en la lista → bloquear
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return Response.json(
      { error: "Forbidden" },
      { status: 403, headers: corsHeaders(origin) }
    );
  }
 
  try {
    const { messages, system } = await request.json();
 
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "messages required" },
        { status: 450, headers: corsHeaders(origin) }
      );
    }
 
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }
 
    // Convertir formato a Gemini
    const geminiContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
 
    const body = {
      systemInstruction: { parts: [{ text: system || "" }] },
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    };
 
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
 
    const data = await response.json();
 
    if (!response.ok) {
      console.error("Gemini error:", data);
      return Response.json(
        { error: data.error?.message || "API error" },
        { status: response.status, headers: corsHeaders(origin) }
      );
    }
 
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return Response.json(
      { content: [{ type: "text", text }] },
      { headers: corsHeaders(origin) }  // ← CORS en la respuesta exitosa
    );
 
  } catch (err) {
    console.error("Server error:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
 
// Preflight CORS
export async function OPTIONS(request) {
  const origin = request.headers.get("origin") || "";
  return new Response(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}