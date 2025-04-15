import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import '../styles/globals.scss';

export const metadata = {
  title: "Arenas Inmobiliaria",
  description:
    "Arenas Inmobiliaria © 2025. Tu plataforma confiable para arrendar, comprar o alquilar inmuebles de forma segura.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <PluginInit />
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
