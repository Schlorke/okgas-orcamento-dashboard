"use client"

/**
 * Envolve a primeira tela com a animação de introdução: chama usePageLoading,
 * renderiza o IntroHeader (tela cheia → barra) e o conteúdo dentro de .main
 * para que o CSS body.page-loading oculte até page-ready.
 */

import { usePageLoading } from "@/hooks/usePageLoading"
import IntroHeader from "@/components/intro-header"

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  usePageLoading({
    minLoadingTime: 2500,
    maxLoadingTime: 10000,
  })

  return (
    <>
      <IntroHeader />
      <main className="main">{children}</main>
    </>
  )
}
