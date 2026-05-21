// app/page.js
// Proyecto listo para Vercel + Next.js + TailwindCSS

export default function TGRFumigaciones() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Control Profesional de Plagas
            </h1>

            <p className="mt-6 text-lg text-green-100 leading-relaxed">
              Servicio residencial y comercial con atención rápida,
              segura y profesional.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/529999999999"
                className="bg-white text-green-800 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
              >
                WhatsApp
              </a>

              <a
                href="#servicios"
                className="border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-green-800 transition"
              >
                Ver Servicios
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="bg-white rounded-3xl p-6 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">
                Agenda tu servicio
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  type="email"
                  placeholder="Correo"
                  className="w-full border rounded-xl px-4 py-3"
                />

                <textarea
                  placeholder="Describe el problema"
                  className="w-full border rounded-xl px-4 py-3 h-28"
                />

                <button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  Solicitar Servicio
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Nuestros Servicios</h2>
            <p className="text-gray-600 mt-4">
              Soluciones efectivas para hogares y negocios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Control Residencial',
                desc: 'Protección para casas, departamentos y jardines.',
              },
              {
                title: 'Control Comercial',
                desc: 'Atención especializada para negocios y oficinas.',
              },
              {
                title: 'Prevención y Seguimiento',
                desc: 'Planes periódicos para mantener espacios seguros.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-6">
                  🛡️
                </div>

                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Atención rápida y profesional
            </h2>

            <div className="mt-8 space-y-6">
              {[
                'Técnicos capacitados',
                'Productos seguros y certificados',
                'Atención por WhatsApp',
                'Servicio residencial y comercial',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    ✔
                  </div>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-700 rounded-3xl p-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-6">
              ¿Necesitas atención inmediata?
            </h3>

            <p className="text-green-100 leading-relaxed mb-8">
              Contáctanos ahora y agenda tu servicio en minutos.
            </p>

            <a
              href="https://wa.me/529999999999"
              className="inline-block bg-white text-green-800 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              TGR Fumigaciones
            </h3>
            <p className="text-gray-400 mt-2">
              Servicio profesional de control de plagas.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://wa.me/529999999999"
              className="bg-green-700 px-5 py-3 rounded-xl hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE */}
      <a
        href="https://wa.me/529999999999"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition hover:scale-110"
      >
        💬
      </a>
    </div>
  )
}
