"use client";
import { useState, useEffect, useRef } from "react";

// ── Logo base64 — reemplaza con tu logo completo ───────────────────
const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

// ── Config ─────────────────────────────────────────────────────────
const WA_NUMBER   = "529936984612";
const BIZ_EMAIL   = "contacto.tgrfumigaciones@gmail.com";
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "";
const GEMINI_KEY  = process.env.NEXT_PUBLIC_GEMINI_KEY  || "";

// ── Folio generator ────────────────────────────────────────────────
function generarFolio(tipo) {
  const prefix = tipo === "residential" ? "RES" : tipo === "commercial" ? "COM" : "IND";
  const now     = new Date();
  const yy      = String(now.getFullYear()).slice(2);
  const mm      = String(now.getMonth() + 1).padStart(2, "0");
  const dd      = String(now.getDate()).padStart(2, "0");
  const rand    = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `TGR-W-${prefix}-${yy}${mm}${dd}-${rand}`;
}

// ── Score / categoría ──────────────────────────────────────────────
function calcScore(lead) {
  let s = 0;
  if (lead.infestationLevel?.includes("Alta"))   s += 40;
  else if (lead.infestationLevel?.includes("Media")) s += 25;
  else s += 10;
  if (lead.propertySize?.includes("500+"))  s += 35;
  else if (lead.propertySize?.includes("300")) s += 20;
  else if (lead.propertySize?.includes("150")) s += 10;
  else s += 5;
  if (lead.frequency?.includes("Mensual"))   s += 30;
  else if (lead.frequency?.includes("Bimestral")) s += 20;
  else if (lead.frequency?.includes("Trimestral")) s += 15;
  else if (lead.frequency?.includes("Única")) s += 10;
  if (lead.contact?.email)  s += 10;
  if (lead.contact?.phone)  s += 10;
  if (lead.petsChildren === "Sí") s += 5;
  if (lead.compliance)    s += 10;
  return s;
}

function categorize(score) {
  if (score >= 120) return "🔥 Lead Premium";
  if (score >= 81)  return "⚡ Lead Caliente";
  if (score >= 41)  return "🌊 Lead Medio";
  return "🌱 Lead Frío";
}

// ══════════════════════════════════════════════════════════════════
// Flujo guiado — pasos por tipo de cliente
// ══════════════════════════════════════════════════════════════════
const GUIDED_STEPS_RES = [
  "pest", "infestation", "propertySize", "petsChildren",
  "affectedAreas", "frequency", "location", "contact"
];
const GUIDED_STEPS_COM = [
  "pest", "infestation", "businessType", "propertySize",
  "compliance", "schedule", "frequency", "location", "contact"
];

// ── Opciones de botones ────────────────────────────────────────────
const PEST_OPTS = [
  "🪳 Cucarachas","🐭 Roedores","🦟 Mosquitos / Zancudos","🐜 Hormigas",
  "🦂 Alacranes / Escorpiones","🐝 Avispas / Abejas","🦗 Chapulines",
  "🦠 Fumigación preventiva","🐦 Control de aves","🌿 Otro"
];
const INFESTATION_OPTS = [
  "Alta — presencia masiva","Media — se ven con frecuencia","Baja — algunos avistamientos"
];
const SIZE_OPTS_RES = [
  "Pequeño — hasta 100 m²","Mediano — 100–300 m²","Grande — 300–500 m²","Muy grande — 500+ m²"
];
const SIZE_OPTS_COM = [
  "Pequeño — hasta 150 m²","Mediano — 150–300 m²","Grande — 300–500 m²","Enorme — 500+ m²"
];
const FREQ_OPTS = [
  "Única vez","Mensual","Bimestral","Trimestral","Semestral"
];
const BUSINESS_OPTS = [
  "Restaurante / Food service","Hotel / Hospedaje","Almacén / Bodega",
  "Oficinas","Planta de producción","Hospital / Clínica","Otro giro"
];
const AFFECTED_AREAS_OPTS = [
  "Cocina","Baños","Recámaras","Sala / Comedor","Jardín / Terraza",
  "Cochera","Sótano / Bodega","Toda la casa"
];
const COMPLIANCE_OPTS = [
  "COFEPRIS","NOM-256-SSA1","HACCP / BPM","Sin requerimiento específico"
];

// ══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════════
export default function TGRWidget() {
  // ── UI state ──────────────────────────────────────────────────
  const [open,    setOpen]    = useState(false);
  const [mode,    setMode]    = useState("idle"); // idle | chat | guided | done | wa_fallback
  const [msgs,    setMsgs]    = useState([]);
  const [input,   setInput]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const [sending, setSending] = useState(false);

  // ── Guided state ──────────────────────────────────────────────
  const [guidedStep,  setGuidedStep]  = useState(0);
  const [clientType,  setClientType]  = useState(""); // residential | commercial | industrial
  const [lead,        setLead]        = useState({});
  const [multiSel,    setMultiSel]    = useState([]); // para affectedAreas

  // ── Results ───────────────────────────────────────────────────
  const [folio,        setFolio]        = useState("");
  const [precotizacion, setPrecotizacion] = useState("");
  const [submitted,    setSubmitted]    = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, mode, guidedStep]);

  // ══════════════════════════════════════════════════════════════
  // CHAT (Gemini) helpers
  // ══════════════════════════════════════════════════════════════
  function pushMsg(role, text) {
    setMsgs(m => [...m, { role, text }]);
  }

  async function callGemini(history, systemPrompt) {
    if (!GEMINI_KEY) return null;
    try {
      const contents = history.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      }));
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
          })
        }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch { return null; }
  }

  // System prompt para el chat libre
  const SYSTEM_PROMPT = `Eres el asistente virtual de TGR Fumigaciones, empresa de control de plagas en Tabasco, México (Villahermosa y municipios).
Responde siempre en español, de forma amigable y profesional.
Tu objetivo: entender la necesidad del cliente (tipo de plaga, tipo de inmueble, urgencia) y recopilar nombre, teléfono, municipio y colonia.
Cuando tengas suficiente info (mínimo: plaga, tipo inmueble, nombre, teléfono), devuelve EXACTAMENTE este bloque JSON al final del mensaje:
<<<LEAD_JSON
{
  "clientType": "residential|commercial|industrial",
  "pestType": "...",
  "infestationLevel": "...",
  "propertySize": "...",
  "businessType": "...",
  "frequency": "...",
  "contact": {"name":"...","phone":"...","email":"..."},
  "location": {"city":"...","colony":"..."}
}
LEAD_JSON>>>
Si el cliente pide precio, da un rango referencial y aclara que un técnico confirmará.
Máximo 3-4 oraciones por respuesta.`;

  // ── Envío de mensaje en modo chat ────────────────────────────
  async function sendChat() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    const history = [...msgs, { role: "user", text }];
    pushMsg("user", text);
    setTyping(true);

    const reply = await callGemini(history, SYSTEM_PROMPT);
    setTyping(false);

    if (!reply) {
      // Gemini falló — mostrar fallback
      setMode("wa_fallback");
      setSending(false);
      return;
    }

    // Detectar JSON de lead
    const jsonMatch = reply.match(/<<<LEAD_JSON([\s\S]*?)LEAD_JSON>>>/);
    const cleanReply = reply.replace(/<<<LEAD_JSON[\s\S]*?LEAD_JSON>>>/g, "").trim();
    pushMsg("assistant", cleanReply || "Gracias por la información.");

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1].trim());
        const newLead = { ...parsed };
        const score   = calcScore(newLead);
        const cat     = categorize(score);
        const f       = generarFolio(parsed.clientType || "residential");
        setFolio(f);
        setLead(newLead);
        setClientType(parsed.clientType || "residential");

        // Pedir precotización a Gemini
        const precot = await getPrecotizacion(newLead);
        setPrecotizacion(precot || "");

        await postToSheets({ ...newLead, folio: f, score, category: cat, precotizacion: precot || "", chatHistory: history.map(m => `[${m.role}]: ${m.text}`).join("\n") });
        setSubmitted(true);
        setMode("done");
      } catch { /* ignorar error de parse */ }
    }
    setSending(false);
  }

  // ── Precotización via Gemini ─────────────────────────────────
  async function getPrecotizacion(leadData) {
    if (!GEMINI_KEY) return null;
    const prompt = `Eres un asesor de TGR Fumigaciones. Genera una precotización breve y profesional (3-5 líneas) en pesos mexicanos para:
- Tipo de cliente: ${leadData.clientType}
- Plaga: ${leadData.pestType}
- Nivel de infestación: ${leadData.infestationLevel || "No especificado"}
- Tamaño del inmueble: ${leadData.propertySize || "No especificado"}
- Frecuencia: ${leadData.frequency || "No especificada"}
- Giro: ${leadData.businessType || ""}
Incluye rango de precio (no precio exacto), garantía y nota de que el precio se confirma con visita. Sé conciso.`;
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.6, maxOutputTokens: 300 }
          })
        }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch { return null; }
  }

  // ── Webhook Google Sheets ───────────────────────────────────
  async function postToSheets(payload) {
    if (!WEBHOOK_URL) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch { /* silencioso */ }
  }

  // ══════════════════════════════════════════════════════════════
  // FLUJO GUIADO helpers
  // ══════════════════════════════════════════════════════════════
  const steps = clientType === "residential" ? GUIDED_STEPS_RES : GUIDED_STEPS_COM;
  const currentStep = steps[guidedStep] || "";

  function advanceGuided(update = {}) {
    const newLead = { ...lead, ...update, clientType };
    setLead(newLead);
    if (guidedStep + 1 >= steps.length) {
      finishGuided(newLead);
    } else {
      setGuidedStep(g => g + 1);
    }
  }

  async function finishGuided(finalLead) {
    const score = calcScore(finalLead);
    const cat   = categorize(score);
    const f     = generarFolio(finalLead.clientType || "residential");
    setFolio(f);

    // Construir historial de chat guiado
    const history = [
      { role: "user", text: `Tipo: ${finalLead.clientType}, Plaga: ${finalLead.pestType}, Infestación: ${finalLead.infestationLevel}, Tamaño: ${finalLead.propertySize}` }
    ];

    setTyping(true);
    const precot = await getPrecotizacion(finalLead);
    setTyping(false);
    setPrecotizacion(precot || "");

    await postToSheets({
      ...finalLead,
      folio: f,
      score,
      category: cat,
      precotizacion: precot || "",
      chatHistory: history.map(m => `[${m.role}]: ${m.text}`).join("\n")
    });
    setSubmitted(true);
    setMode("done");
  }

  // ── WA URL helpers ───────────────────────────────────────────
  function waUrl(extra = "") {
    const base = encodeURIComponent(
      `Hola TGR Fumigaciones 🪲\n${extra}\nSolicito más información sobre control de plagas.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${base}`;
  }

  function waUrlFromLead() {
    const txt = [
      `Hola TGR Fumigaciones 🪲`,
      folio ? `📋 Folio: ${folio}` : "",
      lead.pestType ? `🦟 Plaga: ${lead.pestType}` : "",
      lead.infestationLevel ? `📊 Nivel: ${lead.infestationLevel}` : "",
      lead.contact?.name  ? `👤 ${lead.contact.name}` : "",
      lead.location?.city ? `📍 ${lead.location.city}${lead.location?.colony ? ", " + lead.location.colony : ""}` : "",
      precotizacion        ? `\n💰 Precotización:\n${precotizacion}` : "",
      `\nMe gustaría confirmar mi solicitud.`
    ].filter(Boolean).join("\n");
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt)}`;
  }

  // ══════════════════════════════════════════════════════════════
  // RENDER helpers
  // ══════════════════════════════════════════════════════════════

  // Pantalla inicial — selección de modo
  function renderIdle() {
    return (
      <div className="tgr-idle">
        <div className="tgr-welcome">
          <div className="tgr-logo-wrap">
            <img src={LOGO} alt="TGR" className="tgr-logo-sm" onError={e => e.target.style.display="none"} />
          </div>
          <h2 className="tgr-title">TGR Fumigaciones</h2>
          <p className="tgr-subtitle">Control integral de plagas · Tabasco, México</p>
        </div>

        <p className="tgr-prompt-txt">¿Cómo podemos ayudarte hoy?</p>

        <div className="tgr-type-grid">
          {[
            { id:"residential", icon:"🏠", label:"Residencial",  sub:"Casas y departamentos" },
            { id:"commercial",  icon:"🏢", label:"Comercial",    sub:"Negocios y oficinas" },
            { id:"industrial",  icon:"🏭", label:"Industrial",   sub:"Plantas y almacenes" },
          ].map(t => (
            <button key={t.id} className="tgr-type-btn" onClick={() => {
              setClientType(t.id);
              setMode("guided");
              setGuidedStep(0);
              setLead({ clientType: t.id });
            }}>
              <span className="tgr-type-icon">{t.icon}</span>
              <span className="tgr-type-label">{t.label}</span>
              <span className="tgr-type-sub">{t.sub}</span>
            </button>
          ))}
        </div>

        <div className="tgr-divider"><span>o</span></div>

        <button className="tgr-chat-btn" onClick={() => {
          setMode("chat");
          pushMsg("assistant", "¡Hola! 👋 Soy el asistente de TGR Fumigaciones. Cuéntame, ¿qué plaga te está dando problemas?");
        }}>
          💬 Hablar con asistente IA
        </button>
      </div>
    );
  }

  // Paso del flujo guiado
  function renderGuidedStep() {
    const stepConfig = getStepConfig(currentStep);
    if (!stepConfig) return null;

    return (
      <div className="tgr-guided">
        {/* Barra de progreso */}
        <div className="tgr-progress-bar">
          <div className="tgr-progress-fill" style={{ width: `${((guidedStep) / steps.length) * 100}%` }} />
        </div>
        <p className="tgr-step-count">{guidedStep + 1} / {steps.length}</p>

        <h3 className="tgr-step-q">{stepConfig.question}</h3>
        {stepConfig.hint && <p className="tgr-step-hint">{stepConfig.hint}</p>}

        {/* Botones de opción */}
        {stepConfig.options && (
          <div className={`tgr-opts ${stepConfig.multi ? "tgr-opts-multi" : ""}`}>
            {stepConfig.options.map(opt => (
              <button
                key={opt}
                className={`tgr-opt-btn ${multiSel.includes(opt) ? "tgr-opt-sel" : ""}`}
                onClick={() => {
                  if (stepConfig.multi) {
                    setMultiSel(s => s.includes(opt) ? s.filter(x => x !== opt) : [...s, opt]);
                  } else {
                    setMultiSel([]);
                    advanceGuided({ [stepConfig.field]: opt });
                  }
                }}
              >
                {opt}
              </button>
            ))}
            {stepConfig.multi && (
              <button
                className="tgr-next-btn"
                disabled={multiSel.length === 0}
                onClick={() => {
                  advanceGuided({ [stepConfig.field]: multiSel.join(", ") });
                  setMultiSel([]);
                }}
              >
                Continuar →
              </button>
            )}
          </div>
        )}

        {/* Campos de texto */}
        {stepConfig.fields && (
          <div className="tgr-field-group">
            {stepConfig.fields.map(f => (
              <div key={f.key} className="tgr-field">
                <label className="tgr-label">{f.label}</label>
                <input
                  ref={f.key === "name" ? inputRef : undefined}
                  className="tgr-input"
                  type={f.type || "text"}
                  placeholder={f.placeholder}
                  value={lead[f.parent] ? (lead[f.parent][f.key] || "") : (lead[f.key] || "")}
                  onChange={e => {
                    if (f.parent) {
                      setLead(l => ({ ...l, [f.parent]: { ...(l[f.parent] || {}), [f.key]: e.target.value } }));
                    } else {
                      setLead(l => ({ ...l, [f.key]: e.target.value }));
                    }
                  }}
                />
              </div>
            ))}
            <button
              className="tgr-next-btn"
              onClick={() => {
                const update = {};
                stepConfig.fields.forEach(f => {
                  if (f.parent) {
                    update[f.parent] = { ...(lead[f.parent] || {}), [f.key]: (lead[f.parent]?.[f.key] || "") };
                  } else {
                    update[f.key] = lead[f.key] || "";
                  }
                });
                advanceGuided(update);
              }}
            >
              {guidedStep + 1 === steps.length ? "Ver precotización ✓" : "Continuar →"}
            </button>
          </div>
        )}

        <button className="tgr-back-btn" onClick={() => {
          if (guidedStep === 0) { setMode("idle"); setClientType(""); setLead({}); }
          else setGuidedStep(g => g - 1);
        }}>← Atrás</button>
      </div>
    );
  }

  function getStepConfig(step) {
    switch (step) {
      case "pest":
        return { question: "¿Qué plaga o servicio necesitas?", field: "pestType", options: PEST_OPTS };
      case "infestation":
        return { question: "¿Cuál es el nivel de infestación?", field: "infestationLevel", options: INFESTATION_OPTS };
      case "propertySize":
        return {
          question: "¿Cuál es el tamaño aproximado del inmueble?",
          field: "propertySize",
          options: clientType === "residential" ? SIZE_OPTS_RES : SIZE_OPTS_COM
        };
      case "petsChildren":
        return {
          question: "¿Hay mascotas o niños en el hogar?",
          hint: "Esto nos ayuda a elegir el producto más seguro.",
          field: "petsChildren",
          options: ["Sí", "No"]
        };
      case "affectedAreas":
        return {
          question: "¿Qué áreas están afectadas? (puedes elegir varias)",
          field: "affectedAreas",
          options: AFFECTED_AREAS_OPTS,
          multi: true
        };
      case "businessType":
        return { question: "¿Cuál es el giro de tu negocio?", field: "businessType", options: BUSINESS_OPTS };
      case "compliance":
        return {
          question: "¿Requieres cumplimiento con alguna normativa?",
          hint: "Para auditorías, permisos o certificaciones.",
          field: "compliance",
          options: COMPLIANCE_OPTS
        };
      case "schedule":
        return {
          question: "¿Cuál es el horario ideal para el servicio?",
          fields: [
            { key: "schedule", label: "Horario preferido", placeholder: "Ej. Lunes y Miércoles de 8 a 10 am", type: "text" }
          ]
        };
      case "frequency":
        return { question: "¿Con qué frecuencia necesitas el servicio?", field: "frequency", options: FREQ_OPTS };
      case "location":
        return {
          question: "¿Dónde te ubicamos?",
          fields: [
            { key: "city",   parent: "location", label: "Municipio",  placeholder: "Ej. Villahermosa" },
            { key: "colony", parent: "location", label: "Colonia",    placeholder: "Ej. Tabasco 2000" },
          ]
        };
      case "contact":
        return {
          question: "¿Cómo te contactamos?",
          fields: [
            { key: "name",  parent: "contact", label: "Nombre completo", placeholder: "Tu nombre" },
            { key: "phone", parent: "contact", label: "Teléfono / WhatsApp", placeholder: "993 XXX XXXX", type: "tel" },
            { key: "email", parent: "contact", label: "Correo (opcional)", placeholder: "tu@email.com", type: "email" },
          ]
        };
      default: return null;
    }
  }

  // Pantalla final (done)
  function renderDone() {
    const isResidential = clientType === "residential";
    return (
      <div className="tgr-done">
        <div className="tgr-done-check">✓</div>
        <h3 className="tgr-done-title">¡Solicitud recibida!</h3>
        {folio && <p className="tgr-done-folio">Folio: <strong>{folio}</strong></p>}

        {typing && (
          <div className="tgr-typing-box">
            <span className="tgr-dot" /><span className="tgr-dot" /><span className="tgr-dot" />
            <span className="tgr-typing-txt">Generando precotización...</span>
          </div>
        )}

        {precotizacion && !typing && (
          <div className="tgr-precot-box">
            <p className="tgr-precot-label">💰 Precotización estimada</p>
            <p className="tgr-precot-text">{precotizacion}</p>
            <p className="tgr-precot-note">⚠️ Sujeta a revisión tras visita de diagnóstico sin costo.</p>
          </div>
        )}

        <p className="tgr-done-txt">
          {submitted
            ? "Hemos enviado tu información a nuestro equipo. En breve nos pondremos en contacto."
            : "Procesando tu solicitud..."}
        </p>

        {/* Botón WhatsApp — aparece al FINAL del flujo */}
        <a
          href={waUrlFromLead()}
          target="_blank"
          rel="noopener noreferrer"
          className="tgr-wa-btn"
        >
          {isResidential
            ? "📲 Continuar por WhatsApp"
            : "📞 Hablar con asesor comercial"}
        </a>

        <button className="tgr-restart-btn" onClick={() => {
          setMode("idle"); setLead({}); setClientType(""); setFolio("");
          setPrecotizacion(""); setSubmitted(false); setMsgs([]); setGuidedStep(0);
        }}>
          Iniciar nueva consulta
        </button>
      </div>
    );
  }

  // Pantalla fallback WhatsApp (cuando Gemini falla)
  function renderWaFallback() {
    return (
      <div className="tgr-fallback">
        <div className="tgr-fallback-icon">⚠️</div>
        <h3 className="tgr-fallback-title">Asistente no disponible</h3>
        <p className="tgr-fallback-txt">El asistente IA está temporalmente fuera de línea. Puedes contactarnos directamente o usar el formulario guiado.</p>

        <a
          href={waUrl("Necesito información sobre fumigación.")}
          target="_blank"
          rel="noopener noreferrer"
          className="tgr-wa-btn"
        >
          💬 Ir a WhatsApp
        </a>

        <button className="tgr-outline-btn" onClick={() => {
          setMode("idle"); setMsgs([]);
        }}>
          📋 Continuar con asistente guiado
        </button>
      </div>
    );
  }

  // Chat mode
  function renderChat() {
    return (
      <div className="tgr-chat">
        <div className="tgr-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`tgr-msg tgr-msg-${m.role}`}>
              {m.role === "assistant" && <span className="tgr-msg-avatar">🤖</span>}
              <div className="tgr-bubble">{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="tgr-msg tgr-msg-assistant">
              <span className="tgr-msg-avatar">🤖</span>
              <div className="tgr-bubble tgr-bubble-typing">
                <span className="tgr-dot"/><span className="tgr-dot"/><span className="tgr-dot"/>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="tgr-chat-input-row">
          <input
            className="tgr-chat-input"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
          />
          <button className="tgr-send-btn" onClick={sendChat} disabled={sending || !input.trim()}>
            ➤
          </button>
        </div>

        <button className="tgr-back-btn" onClick={() => { setMode("idle"); setMsgs([]); }}>
          ← Volver
        </button>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════
  return (
    <>
      {/* Estilos inline */}
      <style>{CSS}</style>

      {/* Botón flotante */}
      <button
        className="tgr-fab"
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir asistente TGR"
      >
        {open ? "✕" : <img src={LOGO} alt="TGR" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.textContent = "🪲"; }} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="tgr-panel">
          {/* Header */}
          <div className="tgr-header">
            <img src={LOGO} alt="TGR" className="tgr-header-logo" onError={e => e.target.style.display="none"} />
            <div>
              <p className="tgr-header-title">TGR Fumigaciones</p>
              <p className="tgr-header-sub">Control integral de plagas</p>
            </div>
            <div className="tgr-online-dot" title="En línea" />
          </div>

          {/* Contenido */}
          <div className="tgr-body">
            {mode === "idle"       && renderIdle()}
            {mode === "guided"     && renderGuidedStep()}
            {mode === "chat"       && renderChat()}
            {mode === "done"       && renderDone()}
            {mode === "wa_fallback"&& renderWaFallback()}
          </div>
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// CSS
// ══════════════════════════════════════════════════════════════════
const CSS = `
/* Reset */
.tgr-fab, .tgr-panel, .tgr-panel * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

/* FAB */
.tgr-fab {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  width: 60px; height: 60px; border-radius: 50%;
  background: linear-gradient(135deg, #14532d, #166534);
  border: none; cursor: pointer;
  box-shadow: 0 4px 20px rgba(20,83,45,.45);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; color: #fff; transition: transform .2s, box-shadow .2s;
}
.tgr-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(20,83,45,.55); }

/* Panel */
.tgr-panel {
  position: fixed; bottom: 96px; right: 24px; z-index: 9998;
  width: 360px; max-height: 600px;
  background: #fff; border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,.18);
  display: flex; flex-direction: column;
  overflow: hidden;
  animation: tgrSlideUp .25s ease;
}
@keyframes tgrSlideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }

/* Header */
.tgr-header {
  background: linear-gradient(135deg, #14532d, #166534);
  padding: 14px 16px; display: flex; align-items: center; gap: 10px;
}
.tgr-header-logo { width:36px; height:36px; border-radius:50%; border: 2px solid rgba(255,255,255,.3); object-fit:cover; }
.tgr-header-title { margin:0; color:#fff; font-size:14px; font-weight:700; }
.tgr-header-sub   { margin:2px 0 0; color:#bbf7d0; font-size:11px; }
.tgr-online-dot   { width:8px; height:8px; border-radius:50%; background:#4ade80; margin-left:auto; box-shadow: 0 0 0 2px rgba(74,222,128,.3); }

/* Body */
.tgr-body { flex:1; overflow-y:auto; padding:16px; scroll-behavior:smooth; }

/* IDLE */
.tgr-welcome { text-align:center; margin-bottom:16px; }
.tgr-logo-wrap { margin-bottom:8px; }
.tgr-logo-sm { width:52px; height:52px; border-radius:50%; object-fit:cover; border:2px solid #d1fae5; }
.tgr-title    { margin:0; font-size:16px; font-weight:800; color:#14532d; }
.tgr-subtitle { margin:2px 0 0; font-size:11px; color:#6b7280; }
.tgr-prompt-txt { text-align:center; color:#374151; font-size:13px; margin:0 0 12px; font-weight:600; }

.tgr-type-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:12px; }
.tgr-type-btn  {
  border:1px solid #d1fae5; background:#f0fdf4; border-radius:10px;
  padding:10px 6px; cursor:pointer; text-align:center; transition:.15s;
  display:flex; flex-direction:column; align-items:center; gap:3px;
}
.tgr-type-btn:hover { background:#dcfce7; border-color:#86efac; transform:translateY(-1px); }
.tgr-type-icon  { font-size:22px; }
.tgr-type-label { font-size:11px; font-weight:700; color:#14532d; }
.tgr-type-sub   { font-size:9px; color:#6b7280; }

.tgr-divider { text-align:center; position:relative; margin:10px 0; color:#9ca3af; font-size:12px; }
.tgr-divider::before, .tgr-divider::after { content:''; position:absolute; top:50%; width:42%; height:1px; background:#e5e7eb; }
.tgr-divider::before { left:0; } .tgr-divider::after { right:0; }

.tgr-chat-btn {
  width:100%; padding:11px; border:1px solid #d1d5db; border-radius:8px;
  background:#f9fafb; color:#374151; font-size:13px; font-weight:600;
  cursor:pointer; transition:.15s;
}
.tgr-chat-btn:hover { background:#f3f4f6; }

/* GUIDED */
.tgr-guided { display:flex; flex-direction:column; gap:10px; }
.tgr-progress-bar { height:4px; background:#e5e7eb; border-radius:4px; overflow:hidden; }
.tgr-progress-fill { height:100%; background:linear-gradient(90deg,#14532d,#4ade80); border-radius:4px; transition:width .3s; }
.tgr-step-count { margin:0; font-size:10px; color:#9ca3af; text-align:right; }
.tgr-step-q   { margin:4px 0 0; font-size:14px; font-weight:700; color:#111827; }
.tgr-step-hint{ margin:2px 0 0; font-size:11px; color:#6b7280; }

.tgr-opts { display:flex; flex-direction:column; gap:6px; }
.tgr-opts-multi { flex-direction:column; }
.tgr-opt-btn {
  padding:9px 12px; border:1px solid #e5e7eb; border-radius:8px;
  background:#f9fafb; color:#374151; font-size:12px; cursor:pointer;
  text-align:left; transition:.12s;
}
.tgr-opt-btn:hover { background:#f0fdf4; border-color:#86efac; color:#14532d; }
.tgr-opt-sel  { background:#dcfce7 !important; border-color:#16a34a !important; color:#14532d !important; font-weight:700; }

.tgr-next-btn {
  width:100%; padding:11px; background:#14532d; color:#fff;
  border:none; border-radius:8px; font-size:13px; font-weight:700;
  cursor:pointer; margin-top:4px; transition:.15s;
}
.tgr-next-btn:hover { background:#166534; }
.tgr-next-btn:disabled { opacity:.45; cursor:not-allowed; }

.tgr-field-group { display:flex; flex-direction:column; gap:8px; }
.tgr-field { display:flex; flex-direction:column; gap:3px; }
.tgr-label { font-size:11px; font-weight:600; color:#374151; }
.tgr-input {
  padding:9px 11px; border:1px solid #d1d5db; border-radius:7px;
  font-size:13px; outline:none; transition:.12s; color:#111827;
}
.tgr-input:focus { border-color:#16a34a; box-shadow:0 0 0 2px rgba(22,163,74,.15); }

.tgr-back-btn {
  background:none; border:none; color:#9ca3af; font-size:11px;
  cursor:pointer; padding:4px 0; text-align:left;
}
.tgr-back-btn:hover { color:#374151; }

/* CHAT */
.tgr-chat { display:flex; flex-direction:column; gap:8px; height:440px; }
.tgr-messages { flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; }
.tgr-msg { display:flex; align-items:flex-end; gap:6px; }
.tgr-msg-user { flex-direction:row-reverse; }
.tgr-msg-avatar { font-size:18px; }
.tgr-bubble {
  max-width:75%; padding:9px 12px; border-radius:12px;
  font-size:12px; line-height:1.5;
}
.tgr-msg-assistant .tgr-bubble { background:#f3f4f6; color:#111827; border-bottom-left-radius:4px; }
.tgr-msg-user      .tgr-bubble { background:#14532d; color:#fff; border-bottom-right-radius:4px; }
.tgr-bubble-typing { display:flex; gap:4px; align-items:center; padding:10px 14px; }

.tgr-chat-input-row { display:flex; gap:6px; }
.tgr-chat-input {
  flex:1; padding:10px 12px; border:1px solid #d1d5db; border-radius:8px;
  font-size:13px; outline:none;
}
.tgr-chat-input:focus { border-color:#16a34a; }
.tgr-send-btn {
  width:40px; height:40px; border:none; border-radius:8px;
  background:#14532d; color:#fff; font-size:16px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
}
.tgr-send-btn:disabled { opacity:.45; cursor:not-allowed; }

/* DONE */
.tgr-done { display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center; }
.tgr-done-check {
  width:52px; height:52px; border-radius:50%; background:#dcfce7;
  color:#16a34a; font-size:24px; display:flex; align-items:center; justify-content:center;
  border:2px solid #86efac;
}
.tgr-done-title { margin:0; font-size:16px; font-weight:800; color:#14532d; }
.tgr-done-folio { margin:0; font-size:11px; color:#6b7280; }
.tgr-done-folio strong { color:#14532d; font-family:monospace; }
.tgr-done-txt   { margin:0; font-size:12px; color:#6b7280; line-height:1.5; }

.tgr-precot-box {
  width:100%; background:#fefce8; border:1px solid #fde047; border-radius:8px;
  padding:12px 14px; text-align:left;
}
.tgr-precot-label { margin:0 0 6px; font-size:11px; font-weight:700; color:#854d0e; text-transform:uppercase; }
.tgr-precot-text  { margin:0 0 6px; font-size:12px; color:#1c1917; line-height:1.6; white-space:pre-wrap; }
.tgr-precot-note  { margin:0; font-size:10px; color:#713f12; }

.tgr-typing-box {
  display:flex; align-items:center; gap:8px; padding:10px 14px;
  background:#f3f4f6; border-radius:8px; width:100%;
}
.tgr-typing-txt { font-size:12px; color:#6b7280; }

/* WA Button — verde prominente */
.tgr-wa-btn {
  display:inline-block; width:100%; padding:13px 20px;
  background:#16a34a; color:#fff; border-radius:10px;
  font-size:14px; font-weight:700; text-decoration:none; text-align:center;
  transition:.15s; box-shadow: 0 4px 14px rgba(22,163,74,.3);
}
.tgr-wa-btn:hover { background:#15803d; transform:translateY(-1px); box-shadow: 0 6px 18px rgba(22,163,74,.38); }

.tgr-restart-btn {
  background:none; border:none; color:#9ca3af; font-size:11px;
  cursor:pointer; text-decoration:underline;
}

/* FALLBACK */
.tgr-fallback { display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center; padding:8px 0; }
.tgr-fallback-icon  { font-size:36px; }
.tgr-fallback-title { margin:0; font-size:15px; font-weight:700; color:#92400e; }
.tgr-fallback-txt   { margin:0; font-size:12px; color:#6b7280; line-height:1.6; }
.tgr-outline-btn {
  width:100%; padding:11px; border:1px solid #14532d; border-radius:8px;
  background:#fff; color:#14532d; font-size:13px; font-weight:700;
  cursor:pointer; transition:.15s;
}
.tgr-outline-btn:hover { background:#f0fdf4; }

/* Dots loader */
.tgr-dot {
  width:6px; height:6px; border-radius:50%; background:#9ca3af;
  display:inline-block; animation: tgrBounce 1.2s infinite ease-in-out;
}
.tgr-dot:nth-child(2) { animation-delay:.2s; }
.tgr-dot:nth-child(3) { animation-delay:.4s; }
@keyframes tgrBounce { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-5px); } }

/* Scrollbar */
.tgr-body::-webkit-scrollbar, .tgr-messages::-webkit-scrollbar { width:4px; }
.tgr-body::-webkit-scrollbar-thumb, .tgr-messages::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }

@media (max-width: 400px) {
  .tgr-panel { width:calc(100vw - 24px); right:12px; bottom:84px; }
}
`;
