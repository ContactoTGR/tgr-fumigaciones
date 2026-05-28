import TGRWidget from "@/app/components/TGRWidget";

export const metadata = {
  title: "TGR Fumigaciones | Control Profesional de Plagas en Tabasco",
  description:
    "Empresa profesional de fumigación y control de plagas en Villahermosa, Tabasco. Control de cucarachas, roedores, termitas, mosquitos y más. Servicio residencial y comercial.",
  keywords: [
    "fumigaciones en Villahermosa",
    "control de plagas Tabasco",
    "fumigaciones Tabasco",
    "fumigación de cucarachas",
    "control de roedores",
    "fumigación profesional",
    "empresa COFEPRIS",
    "fumigaciones cerca de mí",
    "fumigaciones residenciales",
    "fumigaciones comerciales",
  ],
  authors: [{ name: "TGR Fumigaciones" }],
  creator: "TGR Fumigaciones",
  metadataBase: new URL("https://tgr-fumigaciones.vercel.app"),
  openGraph: {
    title: "TGR Fumigaciones | Control Profesional de Plagas en Tabasco",
    description:
      "Control profesional de plagas en Villahermosa y Tabasco. Servicio residencial y comercial certificado COFEPRIS.",
    url: "https://tgr-fumigaciones.vercel.app",
    siteName: "TGR Fumigaciones",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGR Fumigaciones | Control de Plagas en Tabasco",
    description: "Control profesional de plagas en Villahermosa y Tabasco.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect para mejorar velocidad de carga de fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Color de barra en móviles Android/Chrome */}
        <meta name="theme-color" content="#0d1a0d" />

        {/* WhatsApp / redes sociales — imagen de previsualización */}
        <meta property="og:image" content="https://tgr-fumigaciones.vercel.app/og-image.jpg" />
        <meta name="twitter:image" content="https://tgr-fumigaciones.vercel.app/og-image.jpg" />
      </head>
      <body>
        {children}
        <TGRWidget />
      </body>
    </html>
  );
}