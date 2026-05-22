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

  openGraph: {
    title: "TGR Fumigaciones",
    description:
      "Control profesional de plagas en Villahermosa y Tabasco.",
    url: "https://tgr-fumigaciones.vercel.app",
    siteName: "TGR Fumigaciones",
    locale: "es_MX",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}