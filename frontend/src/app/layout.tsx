import type { Metadata } from "next";
import "./globals.css";
import { Inter, Nunito } from 'next/font/google'; // importe de fuentes para el sistema

// fuentes: establecidas en diseño
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' }); 
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });


export const metadata: Metadata = {
  title: "App Finanzas",
  description: "Aplicación web para el control del dinero. Gestiona Ingresos, Gastos, Metas, Cartera y más",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
