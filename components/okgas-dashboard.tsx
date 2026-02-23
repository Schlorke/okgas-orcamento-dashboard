"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts"
import PDFExport from "./pdf-export"

const BarChartIcon = () => (
  <svg
    className="h-6 w-6 text-blue-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M3 3v14h14V3H3zm2 12V9h2v6H5zm4 0V9h2v8H9zm4 0V5h2v10h-2z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg
    className="h-6 w-6 text-blue-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
)

const PieChartIcon = () => (
  <svg
    className="h-6 w-6 text-blue-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6v6h6c0 3.31-2.69 6-6 6z" />
  </svg>
)

const MapIcon = () => (
  <svg
    className="h-6 w-6 text-blue-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
)

const ClipboardListIcon = () => (
  <svg
    className="h-6 w-6 text-blue-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
)

const CheckCircleIcon = ({
  className = "h-6 w-6 text-white",
}: {
  className?: string
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const BuildingIcon = () => (
  <svg
    className="h-6 w-6 text-blue-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

// Hook otimizado para detectar elementos na viewport (mobile-first)
const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    const element = ref.current
    if (!element || hasBeenVisible) return

    const isMobile = window.innerWidth < 768
    const opts = optionsRef.current
    const threshold = opts?.threshold ?? (isMobile ? 0.05 : 0.3)
    const rootMargin = opts?.root
      ? undefined
      : isMobile
        ? "100px 0px"
        : "50px 0px"

    observerRef.current = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setHasBeenVisible(true)
          observerRef.current?.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [hasBeenVisible])

  return [ref, hasBeenVisible] as const
}

export default function OkGasDashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Observer SIMPLES apenas para adicionar classe CSS quando no centro
  useEffect(() => {
    if (!isClient) return

    const titleElement = document.querySelector(".roadmap-title-css-animation")
    if (!titleElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleElement.classList.add("in-view")
          observer.unobserve(titleElement)
        }
      },
      { threshold: 0.3, rootMargin: "50px 0px" }
    )

    observer.observe(titleElement)
    return () => observer.disconnect()
  }, [isClient])

  type Substep = {
    name: string
    value: number
    justification: string
    completed?: boolean
  }
  type Module = {
    id: number
    key: string
    title: string
    total: number
    paid: number
    substeps: Substep[]
  }

  const modules: Module[] = [
    {
      id: 1,
      key: "E1",
      title:
        "MVP — Cadastro de Clientes + Gestão de Frotas + Offline-First + Assinatura Digital",
      total: 14000,
      paid: 0,
      substeps: [
        {
          name: "Setup & Arquitetura Base",
          value: 1500,
          justification:
            "Next.js 14+ (App Router), TypeScript strict, Prisma + PostgreSQL, autenticação (NextAuth.js/Clerk), multi-tenancy (orgId), deploy Vercel + Railway, CI/CD com GitHub Actions.",
        },
        {
          name: "Arquitetura Offline-First (PWA)",
          value: 2500,
          justification:
            "Service Workers com Workbox, IndexedDB via Dexie.js, fila de sincronização (SyncQueue), Background Sync API, indicador online/offline na UI, conflict resolution.",
        },
        {
          name: "CRUD Clientes (Entidade Central)",
          value: 2000,
          justification:
            "Cadastro completo de clientes como entidade raiz do sistema: nome, CPF/CNPJ, endereço, contato, proprietário, tipo (residencial/comercial/condomínio), status de cadastro Sulgás. Listagem com filtros, busca e paginação.",
        },
        {
          name: "CRUD Veículos + Motoristas",
          value: 2500,
          justification:
            "Cadastro de 15 veículos (placa, modelo, ano, Nº Frota, RENAVAM, status). Cadastro de motoristas com CNH, validade e vinculação veículo↔motorista. Tabela com filtros por status (Em Circulação / Em Manutenção).",
        },
        {
          name: "Registro de Abastecimento e KM",
          value: 2000,
          justification:
            "Formulários web + offline sync para registrar abastecimento (data, veículo, litros, valor, tipo combustível, posto, KM) e atualização de hodômetro. Salvamento local em IndexedDB quando sem internet.",
        },
        {
          name: "Assinatura Digital do Cliente",
          value: 1500,
          justification:
            "Componente HTML5 Canvas (touch) para captura de assinatura manuscrita do cliente na conclusão de serviço. Registro de nome, CPF, geolocalização (GPS) e timestamp. Funciona offline.",
        },
        {
          name: "Dashboard com KPIs + Layout Base",
          value: 2000,
          justification:
            "Dashboard principal com cards de KPIs (total veículos, consumo mensal, alertas ativos, trocas de óleo pendentes). Sidebar, header, dark mode, responsivo mobile-first.",
        },
      ],
    },
    {
      id: 2,
      key: "E2",
      title: "Dashboard Real-Time + Inteligência Artificial no WhatsApp",
      total: 10000,
      paid: 0,
      substeps: [
        {
          name: "Dashboard Tempo Real (Gestor)",
          value: 2500,
          justification:
            "Painel gerencial com WebSockets/SSE para atualização automática. O gestor abre o celular e vê situação de obras, veículos e equipes sem ligar pra ninguém. Push notifications.",
        },
        {
          name: "Setup N8N + Evolution API",
          value: 1500,
          justification:
            "Instalação e configuração do N8N (self-hosted) como orquestrador de workflows e Evolution API para conexão com WhatsApp. Webhook de mensagens incoming.",
        },
        {
          name: "Bot IA WhatsApp (Claude API)",
          value: 3500,
          justification:
            "Integração com Anthropic Claude API para interpretar mensagens em português coloquial. Motorista envia 'abastecimento 250 45L gasolina Shell' e a IA parseia, registra no sistema e confirma via WhatsApp formatado.",
        },
        {
          name: "Histórico de Mensagens + Painel Web",
          value: 2500,
          justification:
            "Tela no painel administrativo mostrando todas as mensagens processadas pelo bot, ação identificada, confiança da IA e resposta enviada. Filtros por data, tipo de ação e usuário.",
        },
      ],
    },
    {
      id: 3,
      key: "E3",
      title: "Manutenção Preventiva + Alertas + Notificações WhatsApp",
      total: 4800,
      paid: 0,
      substeps: [
        {
          name: "CRUD Manutenção Preventiva/Corretiva",
          value: 1800,
          justification:
            "Cadastro de manutenções (tipo, descrição, custo, peças, óleo). Agendamento por KM ou data. Histórico completo por veículo. Troca de óleo (5w30 Syntium, intervalo 10.000 km — padrão da frota OK Gás).",
        },
        {
          name: "Sistema de Alertas Inteligentes",
          value: 1500,
          justification:
            "Alertas automáticos por severidade (Crítico/Médio/Baixo): vencimento CNH, seguro, CRLV, troca de óleo, manutenção preventiva, consumo anormal de combustível, inconsistência de KM.",
        },
        {
          name: "Cron Jobs N8N + Notificações WhatsApp",
          value: 1500,
          justification:
            "Rotina diária às 08h (seg-sex) via N8N: verifica documentos vencendo em 15/30 dias, manutenções próximas, troca de óleo. Envia alerta formatado via WhatsApp para o gestor.",
        },
      ],
    },
    {
      id: 4,
      key: "E4",
      title: "Tarefas + Cadastro Inteligente + Workflows de Processos",
      total: 6400,
      paid: 0,
      substeps: [
        {
          name: "Cadastro Automático de Clientes via WhatsApp",
          value: 2200,
          justification:
            "Colaborador cola dados do cliente no grupo (CPF, CNPJ, endereço, contato). A IA extrai, estrutura e cadastra automaticamente no sistema, eliminando o retrabalho manual de digitação.",
        },
        {
          name: "Sistema de Tarefas com Delegação",
          value: 2200,
          justification:
            "Criar tarefas via web ou WhatsApp (@menção). Kanban de acompanhamento (Pendente/Em Andamento/Concluída). Notificações automáticas, cobrança de follow-up pela IA, visibilidade de progresso.",
        },
        {
          name: "Workflows de Laudo/ART/Termo",
          value: 2000,
          justification:
            "Checklists automatizados para processos burocráticos: emissão de Laudo RRT, Termo de Conformidade, ART (CREA). Cada workflow com etapas, responsáveis, prazos e status rastreável.",
        },
      ],
    },
    {
      id: 5,
      key: "E5",
      title: "Relatórios com IA + Analytics Gerencial",
      total: 4800,
      paid: 0,
      substeps: [
        {
          name: "Geração de Relatórios via IA",
          value: 1800,
          justification:
            "Relatórios automáticos de abastecimento, manutenção, custos por veículo, desempenho de frota. A IA analisa os dados e gera insights em linguagem natural.",
        },
        {
          name: "Consultas por Linguagem Natural",
          value: 1500,
          justification:
            "Gestor pergunta no WhatsApp: 'qual veículo gastou mais esse mês?' ou 'status das obras em Caxias'. A IA consulta o banco e responde com dados reais formatados.",
        },
        {
          name: "Relatório Semanal Automático + Dashboard Completo",
          value: 1500,
          justification:
            "Toda sexta 17h, a IA gera resumo executivo da semana (abastecimentos, KMs, manutenções, tarefas) e envia via WhatsApp para admin/gestor. Dashboard gerencial consolidado no painel web.",
        },
      ],
    },
  ]

  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })

  const totalPlanned = modules?.reduce((s, m) => s + m.total, 0) || 0
  const totalPaid = modules?.reduce((s, m) => s + m.paid, 0) || 0
  const totalRemaining = totalPlanned - totalPaid

  const completedValue =
    modules?.filter(m => m.paid >= m.total)?.reduce((s, m) => s + m.total, 0) ||
    0

  const percentPaid = Math.round((totalPaid / totalPlanned) * 100)
  const percentCompletedByValue = Math.round(
    (completedValue / totalPlanned) * 100
  )

  const market = [
    { label: "Seu Orçamento (5 etapas)", value: totalPlanned },
    { label: "Freelancer Sênior", value: 75000 },
    { label: "Agência Pequena", value: 120000 },
    { label: "Software House", value: 225000 },
  ]

  const perStageTotals =
    modules?.map(m => ({
      name: m.key,
      Pago: m.paid,
      Restante: Math.max(0, m.total - m.paid),
    })) || []

  const cumulative =
    modules?.reduce(
      (acc: { name: string; Planejado: number; Recebido: number }[], m) => {
        const prev = acc.length
          ? acc[acc.length - 1]
          : { Planejado: 0, Recebido: 0 }
        acc.push({
          name: m.key,
          Planejado: prev.Planejado + m.total,
          Recebido: prev.Recebido + m.paid,
        })
        return acc
      },
      []
    ) || []

  const piePaid = [
    { name: "Recebido", value: totalPaid },
    { name: "A Receber", value: totalRemaining },
  ]

  const pieColors = ["#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"]

  // Componente Header com animação
  const HeaderContent = ({
    modules,
    totalPlanned,
    totalPaid,
    totalRemaining,
    percentPaid,
    dashboardRef,
  }: {
    modules: Module[]
    totalPlanned: number
    totalPaid: number
    totalRemaining: number
    percentPaid: number
    dashboardRef: React.RefObject<HTMLDivElement | null>
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.3 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-gradient-to-r from-blue-400/15 to-sky-400/15 px-4 py-2 backdrop-blur-2xl">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
            <span className="text-sm font-medium text-blue-200">
              Proposta Comercial
            </span>
          </div>
          <h1 className="bg-gradient-to-r from-white via-blue-200 to-sky-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            OK Gás Engenharia
          </h1>
          <p className="text-lg font-medium text-gray-300">
            Dashboard Executivo de Progresso
          </p>
          <p className="text-sm text-gray-400">
            Sistema SaaS — Gestão de Frotas, IA no WhatsApp e Controle de
            Processos
          </p>
          <p className="text-sm text-gray-400">
            23/02/2026 • Versão 1.0 • Harry | Desenvolvedor Full-Stack
          </p>
        </div>
        <div className="flex gap-3">
          <PDFExport
            modules={modules}
            totalInvestment={totalPlanned}
            totalPaid={totalPaid}
            totalRemaining={totalRemaining}
            progressPercentage={percentPaid}
            dashboardRef={dashboardRef}
          />
        </div>
      </div>
    )
  }

  const Stat = ({
    label,
    value,
    hint,
  }: {
    label: string
    value: string
    hint?: string
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.5 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element hover:shadow-3xl hover-scale-smooth group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-900/30 via-sky-900/20 to-blue-800/15 p-4 shadow-2xl backdrop-blur-3xl transition-all duration-600 ease-in-out will-change-transform hover:shadow-blue-400/20 sm:rounded-3xl sm:p-6 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 via-transparent to-sky-400/8 opacity-0 transition-all duration-600 ease-in-out group-hover:opacity-100" />
        <div className="relative z-10">
          <div className="mb-1 text-xs font-medium text-blue-200 sm:mb-2 sm:text-sm">
            {label}
          </div>
          <div className="mb-1 bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
            {value}
          </div>
          {hint && (
            <div className="text-xs text-blue-300 opacity-80">{hint}</div>
          )}
        </div>
        <div className="hover-scale-smooth animate-slow-pulse absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-300/30 to-sky-300/30 blur-xl transition-all duration-600 ease-in-out will-change-transform group-hover:scale-150" />
      </div>
    )
  }

  const Section = ({
    id,
    title,
    children,
  }: {
    id?: string
    title: string | React.ReactNode
    children: React.ReactNode
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.3 })

    return (
      <section
        id={id}
        ref={ref}
        className={`scroll-reveal-element space-y-4 sm:space-y-6 ${id ? "scroll-mt-20" : ""} ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <h2 className="bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
          {title}
        </h2>
        {children}
      </section>
    )
  }

  const ChartContainer = ({
    children,
    className = "",
  }: {
    children: React.ReactNode
    className?: string
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.5 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element hover:shadow-3xl will-change-shadow relative h-72 overflow-hidden rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-900/30 via-sky-900/20 to-blue-800/15 p-3 shadow-2xl backdrop-blur-3xl transition-all duration-600 ease-in-out hover:shadow-blue-400/20 sm:h-80 sm:rounded-3xl sm:p-6 ${className} ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-sky-400/5" />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    )
  }

  // Componente ModuleCard com animação
  const ModuleCard = ({
    module: m,
    progress,
    isCompleted,
    isActive,
    brl,
  }: {
    module: Module
    progress: number
    isCompleted: boolean
    isActive: boolean
    brl: Intl.NumberFormat
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver()

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element hover:shadow-3xl hover-scale-smooth group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-900/30 via-sky-900/20 to-blue-800/15 p-4 shadow-2xl backdrop-blur-3xl transition-all duration-600 ease-in-out will-change-transform hover:scale-[1.02] sm:rounded-3xl sm:p-8 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-all duration-600 ease-in-out group-hover:opacity-100">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              isCompleted
                ? "from-blue-400/12 via-transparent to-blue-400/8"
                : isActive
                  ? "from-sky-400/12 via-transparent to-sky-400/8"
                  : "from-blue-400/8 via-transparent to-sky-400/8"
            }`}
          />
        </div>

        <div className="relative z-10">
          <div className="mb-3 grid grid-cols-2 items-start gap-x-3 gap-y-2 sm:mb-6 sm:grid-cols-[1fr_auto] sm:gap-x-4 sm:gap-y-2">
            {/* Linha 1 coluna 1: chave (E3) */}
            <div className="min-w-0 text-sm font-bold tracking-wider text-blue-300">
              {m.key}
            </div>
            {/* Linha 1 coluna 2: status (Pendente) */}
            <div className="flex min-w-0 justify-end sm:justify-self-end">
              {isCompleted ? (
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-blue-300/35 bg-gradient-to-br from-blue-400/25 to-sky-500/25 px-3 py-1 backdrop-blur-xl">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  <span className="text-xs font-medium text-white">
                    Concluída
                  </span>
                </div>
              ) : isActive ? (
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-sky-300/35 bg-gradient-to-br from-sky-400/25 to-blue-500/25 px-3 py-1 backdrop-blur-xl">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  <span className="text-xs font-medium text-white">
                    Em Andamento
                  </span>
                </div>
              ) : (
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-gray-400/35 bg-gradient-to-br from-gray-500/25 to-gray-600/25 px-3 py-1 backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="text-xs font-medium text-white">
                    Pendente
                  </span>
                </div>
              )}
            </div>
            {/* Linha 2: título (mobile: largura total; sm+: coluna 1) */}
            <h3 className="col-span-2 flex min-w-0 flex-wrap items-center gap-2 text-lg leading-tight font-bold tracking-tight break-words text-white sm:col-span-1 sm:text-xl">
              {m.title}
              {isCompleted && (
                <CheckCircleIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              )}
            </h3>
            {/* Linha 2 coluna 2 (mobile: full width, alinhado à direita): preço */}
            <div className="col-span-2 flex min-w-0 justify-end text-right sm:col-span-1 sm:justify-self-end">
              <div className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                {brl.format(m.total)}
              </div>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
            <div className="rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-800/30 to-blue-700/20 p-3 backdrop-blur-2xl sm:rounded-2xl sm:p-4">
              <div className="mb-1 text-xs font-medium text-blue-200">
                Recebido
              </div>
              <div className="text-sm font-bold text-white sm:text-lg">
                {brl.format(m.paid)}
              </div>
            </div>
            <div className="rounded-xl border border-sky-400/25 bg-gradient-to-br from-sky-800/30 to-sky-700/20 p-3 backdrop-blur-2xl sm:rounded-2xl sm:p-4">
              <div className="mb-1 text-xs font-medium text-sky-200">
                Restante
              </div>
              <div className="text-sm font-bold text-white sm:text-lg">
                {brl.format(Math.max(0, m.total - m.paid))}
              </div>
            </div>
            <div className="rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-800/30 to-blue-800/30 p-3 backdrop-blur-xl sm:rounded-2xl sm:p-4">
              <div className="mb-1 text-xs font-medium text-blue-200">
                Progresso
              </div>
              <div className="text-sm font-bold text-white sm:text-lg">
                {progress}%
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {m.substeps.map((s, i) => {
              const isSubstepCompleted = isCompleted || s.completed === true
              return (
                <div
                  key={i}
                  className="group/substep flex items-start gap-3 rounded-xl border border-transparent bg-gradient-to-r from-blue-800/15 to-transparent p-3 backdrop-blur-xl transition-all duration-600 ease-in-out hover:border-blue-400/25 hover:from-blue-700/25 hover:to-sky-800/15 sm:gap-4 sm:rounded-2xl sm:p-4"
                >
                  <div
                    className={`mt-2 h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-br shadow-lg ${
                      [
                        "from-blue-400 to-blue-600",
                        "from-sky-400 to-sky-600",
                        "from-blue-300 to-blue-500",
                        "from-sky-300 to-sky-500",
                      ][i % 4]
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className={`mb-1 text-sm font-semibold text-white ${
                        isSubstepCompleted ? "relative" : ""
                      }`}
                      style={
                        isSubstepCompleted
                          ? {
                              textDecoration: "line-through",
                              textDecorationColor: "#ffffff",
                              textDecorationThickness: "1.5px",
                              textDecorationStyle: "solid",
                            }
                          : {}
                      }
                    >
                      {s.name}
                    </div>
                    <p className="text-xs leading-relaxed text-blue-200">
                      {s.justification}
                    </p>
                  </div>
                  <div
                    className="rounded-full border border-blue-400/25 bg-gradient-to-r from-blue-800/50 to-sky-800/50 px-2 py-0.5 text-xs font-bold whitespace-nowrap text-white backdrop-blur-xl sm:px-3 sm:py-1 sm:text-sm"
                    style={
                      isSubstepCompleted
                        ? {
                            textDecoration: "line-through",
                            textDecorationColor: "#ffffff",
                            textDecorationThickness: "2px",
                            textDecorationStyle: "solid",
                          }
                        : {}
                    }
                  >
                    {brl.format(s.value)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hover-scale-smooth animate-slow-pulse absolute -top-6 -right-6 z-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300/30 to-sky-300/30 blur-2xl transition-all duration-600 ease-in-out will-change-transform group-hover:scale-150" />
      </div>
    )
  }

  // Componente ExecutiveSummary com animação
  const ExecutiveSummary = () => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.5 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element relative overflow-hidden rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-900/30 via-sky-900/20 to-blue-800/15 p-5 shadow-2xl backdrop-blur-3xl sm:rounded-3xl sm:p-8 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-sky-400/5" />
        <div className="relative z-10 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
                Status Atual
              </h3>
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-lg">📋</span>
                  <span className="text-white">
                    Proposta comercial apresentada ao cliente
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🎯</span>
                  <span className="text-white">
                    5 etapas planejadas — entrega modular com valor incremental
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">📊</span>
                  <span className="text-white">
                    Investimento total: R$ 40.000 — prazo estimado: 18-24
                    semanas
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-sky-300" />
                Vantagem Competitiva
              </h3>
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-lg">💰</span>
                  <span className="text-white">
                    <span className="font-semibold">Preço competitivo:</span>{" "}
                    até 80% menor que software houses
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🧩</span>
                  <span className="text-white">
                    <span className="font-semibold">Entrega modular:</span>{" "}
                    valor a cada etapa, pague conforme recebe
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🚀</span>
                  <span className="text-white">
                    <span className="font-semibold">Tecnologia moderna:</span>{" "}
                    Next.js, TypeScript, IA (Claude), PWA offline-first
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">📱</span>
                  <span className="text-white">
                    <span className="font-semibold">
                      WhatsApp como interface:
                    </span>{" "}
                    equipe de campo registra dados por mensagem
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🔧</span>
                  <span className="text-white">
                    <span className="font-semibold">
                      Complementar ao ExpertaSYS:
                    </span>{" "}
                    não substitui, preenche as lacunas operacionais
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
        <div className="text-lg text-white">Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div
      ref={dashboardRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Luz superior direita - GRANDE */}
        <div className="animate-very-slow-pulse absolute -top-40 -right-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/50 to-sky-500/40 blur-3xl" />
        {/* Luz inferior esquerda - GRANDE */}
        <div className="animate-very-slow-pulse absolute -bottom-40 -left-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-sky-400/40 to-blue-500/50 blur-3xl" />
        {/* Luz central - MUITO GRANDE */}
        <div className="animate-very-slow-pulse absolute top-1/2 left-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-blue-300/40 to-sky-300/35 blur-3xl" />
        {/* Luz superior esquerda - MÉDIA */}
        <div className="animate-very-slow-pulse absolute top-20 left-20 z-0 h-60 w-60 rounded-full bg-gradient-to-br from-sky-500/40 to-blue-400/35 blur-2xl" />
        {/* Luz inferior direita - MÉDIA */}
        <div className="animate-very-slow-pulse absolute right-20 bottom-20 z-0 h-60 w-60 rounded-full bg-gradient-to-br from-blue-400/35 to-sky-500/40 blur-2xl" />

        {/* Luzes adicionais para mais atmosfera */}
        <div className="animate-very-slow-pulse absolute top-1/4 left-1/4 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/30 to-sky-400/25 blur-2xl" />
        <div className="animate-very-slow-pulse absolute right-1/4 bottom-1/4 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/30 to-blue-400/25 blur-2xl" />
        <div className="animate-very-slow-pulse absolute bottom-1/3 left-1/3 z-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300/35 to-sky-300/30 blur-xl" />
        <div className="animate-very-slow-pulse absolute top-1/3 right-1/3 z-0 h-32 w-32 rounded-full bg-gradient-to-br from-sky-300/35 to-blue-300/30 blur-xl" />
      </div>

      <header className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12 sm:pb-8">
        <HeaderContent
          modules={modules}
          totalPlanned={totalPlanned}
          totalPaid={totalPaid}
          totalRemaining={totalRemaining}
          percentPaid={percentPaid}
          dashboardRef={dashboardRef}
        />
      </header>

      <main className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 pb-12 sm:space-y-12 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          <Stat
            label="Total Planejado"
            value={brl.format(totalPlanned)}
            hint="Soma das 5 etapas"
          />
          <Stat
            label="Recebido"
            value={brl.format(totalPaid)}
            hint={`${percentPaid}% do total`}
          />
          <Stat
            label="A Receber"
            value={brl.format(totalRemaining)}
            hint={`${100 - percentPaid}% pendente`}
          />
          <Stat
            label="Concluído por Valor"
            value={`${percentCompletedByValue}%`}
            hint="Etapas quitadas vs total"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">
          <Section
            id="progresso"
            title={
              <div className="flex items-center gap-2">
                <BarChartIcon /> Progresso por Etapa
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={perStageTotals}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    formatter={v => brl.format(Number(v ?? 0))}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="rect" />
                  <Bar
                    dataKey="Pago"
                    stackId="a"
                    fill="url(#paidGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="Restante"
                    stackId="a"
                    fill="url(#remainingGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="paidGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient
                      id="remainingGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section
            title={
              <div className="flex items-center gap-2">
                <TrendingUpIcon /> Acumulado Planejado vs Recebido
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulative}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <YAxis
                    tickFormatter={v => brl.format(v)}
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <Tooltip
                    formatter={v => brl.format(Number(v ?? 0))}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="rect" />
                  <Line
                    type="monotone"
                    dataKey="Planejado"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ fill: "#60a5fa", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Recebido"
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={{ fill: "#34d399", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section
            title={
              <div className="flex items-center gap-2">
                <PieChartIcon /> Distribuição Geral
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={piePaid}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                    stroke="none"
                  >
                    {piePaid.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={v => brl.format(Number(v ?? 0))}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="rect" />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section
            title={
              <div className="flex items-center gap-2">
                <BuildingIcon /> Comparativo de Mercado
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={market}>
                  <defs>
                    <linearGradient
                      id="marketGradient0"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient
                      id="marketGradient1"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient
                      id="marketGradient2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient
                      id="marketGradient3"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="label"
                    interval={0}
                    angle={-12}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 11, fill: "#e5e7eb" }}
                  />
                  <YAxis
                    tickFormatter={v => brl.format(v)}
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <Tooltip
                    formatter={v => brl.format(Number(v ?? 0))}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {market.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#marketGradient${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>
        </div>

        {/* Roadmap section — wrapper keeps title + cards as one unit for consistent space-y-12 */}
        <div id="etapas" className="scroll-mt-20 space-y-4 sm:space-y-6">
          <div className="roadmap-title-css-animation">
            <h2 className="bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
              <div className="flex items-center gap-2">
                <MapIcon /> Roadmap Detalhado — Etapas & Investimento (
                {modules?.length || 0} etapas)
              </div>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-8 xl:grid-cols-2">
            {modules && modules.length > 0 ? (
              modules.map(m => {
                const progress = Math.round((m.paid / m.total) * 100)
                const isCompleted = m.paid >= m.total
                const isActive = m.paid > 0 && m.paid < m.total

                return (
                  <ModuleCard
                    key={m.id}
                    module={m}
                    progress={progress}
                    isCompleted={isCompleted}
                    isActive={isActive}
                    brl={brl}
                  />
                )
              })
            ) : (
              <div className="col-span-2 p-8 text-center text-white">
                <p>⚠️ Nenhum módulo encontrado. Verificando dados...</p>
              </div>
            )}
          </div>
        </div>

        <Section
          title={
            <div className="flex items-center gap-2">
              <ClipboardListIcon /> Resumo Executivo & Insights
            </div>
          }
        >
          <ExecutiveSummary />
        </Section>
      </main>
    </div>
  )
}
