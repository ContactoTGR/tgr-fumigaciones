import "./globals.css";

export const metadata = {
  title: "TGR Fumigaciones",
  description: "Control profesional de plagas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}