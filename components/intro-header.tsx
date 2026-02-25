"use client"

/**
 * Header da animação de introdução: tela cheia com logo → recolhe para barra fixa com nav.
 * Escuta o evento 'page-ready' e aplica a sequência de classes/timers descrita na documentação.
 * Logo da intro: okgas_flame_blue_preview.webp em public/
 */
import { useEffect, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

const WaveAnimation = dynamic(
  () => import("@/components/gl").then(mod => mod.WaveAnimation),
  { ssr: false }
)

const handleLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  if (href.startsWith("#")) {
    e.preventDefault()
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }
}

const IntroHeader = () => {
  const [isReady, setIsReady] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeaderStable, setIsHeaderStable] = useState(false)
  const [logoSrcFailed, setLogoSrcFailed] = useState(false)
  const onLogoError = useCallback(() => setLogoSrcFailed(true), [])

  useEffect(() => {
    let readyFrame: number | null = null
    let timer1: ReturnType<typeof setTimeout> | null = null
    let timer2: ReturnType<typeof setTimeout> | null = null
    let stabilityTimer: ReturnType<typeof setTimeout> | null = null

    const startHeaderSequence = () => {
      if (readyFrame !== null) return
      readyFrame = requestAnimationFrame(() => setIsReady(true))
      timer1 = setTimeout(() => {
        setIsAnimated(true)
        stabilityTimer = setTimeout(() => {
          setIsHeaderStable(true)
          document.body.classList.add("intro-complete")
          window.dispatchEvent(new CustomEvent("intro-complete"))
        }, 1200)
      }, 1500)
      timer2 = setTimeout(() => setIsNavVisible(true), 3080)
    }

    const handlePageReady = () => {
      startHeaderSequence()
      window.removeEventListener("page-ready", handlePageReady)
    }

    if (typeof document !== "undefined") {
      if (document.body?.classList.contains("page-ready")) {
        startHeaderSequence()
      } else {
        window.addEventListener("page-ready", handlePageReady)
      }
    }

    return () => {
      if (readyFrame !== null) cancelAnimationFrame(readyFrame)
      if (timer1) clearTimeout(timer1)
      if (timer2) clearTimeout(timer2)
      if (stabilityTimer) clearTimeout(stabilityTimer)
      window.removeEventListener("page-ready", handlePageReady)
    }
  }, [])

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "#progresso", label: "Progresso" },
    { href: "#etapas", label: "Etapas" },
  ]

  const headerClasses = [
    "intro-header",
    isAnimated ? "animate_header" : "",
    isReady ? "header-ready" : "header-preload",
    isHeaderStable ? "header-stable" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <header className={headerClasses}>
      <div className="header-background">
        <WaveAnimation hovering={false} />
      </div>
      <Link href="/" className="logo">
        {logoSrcFailed ? (
          <span className="logo-text-fallback">OK Gás Engenharia</span>
        ) : (
          <Image
            src="/okgas_flame_blue_preview.webp"
            alt="OK Gás Engenharia"
            width={260}
            height={260}
            onError={onLogoError}
            priority
          />
        )}
      </Link>
      <div className="header-inner">
        <nav>
          <ul
            hidden={!isReady && !isMobileMenuOpen && !isNavVisible}
            className={`${isNavVisible ? "animate_nav" : ""} ${isMobileMenuOpen ? "active" : ""}`}
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={e => {
                    handleLinkClick(e, link.href)
                    setIsMobileMenuOpen(false)
                  }}
                  aria-label={`Ir para ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        type="button"
        className={`hamburger ${isNavVisible ? "nav-ready" : ""} ${isMobileMenuOpen ? "active" : ""}`}
        hidden={!isReady}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Abrir menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}

export default IntroHeader
