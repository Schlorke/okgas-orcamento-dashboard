import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://okgas.vercel.app"),
  title: "OK Gás Engenharia — Dashboard Executivo de Progresso",
  description:
    "Sistema SaaS — Gestão de Frotas, IA no WhatsApp e Controle de Processos para OK Gás Engenharia",
  generator: "Next.js",
  openGraph: {
    title: "OK Gás Engenharia — Dashboard Executivo",
    description: "Gestão de Frotas, IA no WhatsApp e Controle de Processos",
    type: "website",
    locale: "pt_BR",
    siteName: "OK Gás Engenharia",
  },
  twitter: {
    card: "summary_large_image",
    title: "OK Gás Engenharia — Dashboard Executivo",
    description: "Gestão de Frotas, IA no WhatsApp e Controle de Processos",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="page-loading font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
