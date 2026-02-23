# OK Gás Engenharia - Dashboard Executivo de Progresso

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge\&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge\&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge\&logo=tailwind-css)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![Code Quality](https://img.shields.io/badge/Code_Quality-A+-green?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)

**Dashboard executivo para apresentar o orçamento do Sistema SaaS — OK Gás Engenharia**

</div>

***

## Visão Geral

O **OK Gás Engenharia - Dashboard Executivo de Progresso** é uma aplicação web moderna desenvolvida
para apresentar de forma visual, interativa e executiva o orçamento do **Sistema SaaS** para a OK
Gás Engenharia — empresa de instalação de sistemas de gás (GN, GLP, medicinais) nos estados RS, SC e
PR.

### Caso de Uso

Este dashboard apresenta o orçamento completo do projeto em **5 etapas modulares**, com investimento
total de **R$ 40.000**. O sistema permite:

* **Visualização executiva** de métricas, KPIs e progresso financeiro
* **Roadmap detalhado** com substeps e valores por etapa
* **Comparativo de mercado** com benchmarks do setor
* **Exportação profissional** de relatórios em PDF

### Sobre o Projeto OK Gás

* **Cliente**: OK Gás Engenharia (Vitor Garcia — Sócio Diretor)
* **Segmento**: Instalação de sistemas de gás (GN, GLP, medicinais) — RS, SC, PR
* **Parceiro principal**: Sulgás (distribuidora GN do RS — grupo Compass/Cosan)
* **Colaboradores ativos**: 25
* **Frota**: 15 veículos operacionais (100% Fiat e VW)
* **Obras em andamento**: 19
* **Sistema existente**: ExpertaSYS v5.2 (gestão qualidade ISO 9001 — mantido)

### Diferenciais do Sistema

* **Offline-first (PWA)** — funciona sem internet em campo
* **IA no WhatsApp** — registro de dados por linguagem natural (Claude API)
* **Assinatura digital do cliente** com geolocalização
* **Dashboard tempo real** para o gestor
* **Complementar ao ExpertaSYS** — integração via placa/CPF/nº pedido

***

## Características

### Dashboard Executivo

* **Métricas em Tempo Real**: Acompanhamento de progresso, investimentos e cronogramas
* **Interface Intuitiva**: Design moderno dark theme com animações suaves e responsivo
* **Visualizações Avançadas**: Gráficos interativos com Recharts
* **Experiência Imersiva**: Sistema de luzes animadas e efeitos visuais

### Visualizações de Dados

* **Gráfico de Barras**: Progresso por etapa (Pago vs Restante)
* **Gráfico de Linha**: Acumulado planejado vs recebido
* **Gráfico de Pizza**: Distribuição geral de investimentos
* **Comparativo de Mercado**: Benchmark com freelancers, agências e software houses

### Roadmap Detalhado

* **5 Etapas Estruturadas**: Do MVP com gestão de frotas até relatórios com IA
* **Subetapas Detalhadas**: Breakdown completo com descrições técnicas
* **Status Visuais**: Indicadores de progresso (Concluída/Em Andamento/Pendente)

### Exportação Profissional

* **PDF de Alta Qualidade**: Geração com html2canvas + jsPDF
* **Captura Visual Completa**: Preserva exatamente o visual do dashboard
* **Formatação Executiva**: Layout otimizado para apresentações

***

## Stack Tecnológica

### Frontend Core

* **[Next.js 15.5.0](https://nextjs.org/)** - Framework React com App Router
* **[React 19](https://reactjs.org/)** - Biblioteca de interface moderna
* **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática avançada

### UI/UX

* **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Framework CSS utility-first
* **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Otimização de classes
* **[Class Variance Authority](https://cva.style/)** - Variantes de componentes
* **[Lucide React](https://lucide.dev/)** - Ícones modernos e consistentes
* **[next-themes](https://github.com/pacocoursey/next-themes)** - Sistema de temas

### Visualização de Dados

* **[Recharts](https://recharts.org/)** - Gráficos React responsivos
* **[html2canvas](https://html2canvas.hertzen.com/)** - Captura de tela para PDF
* **[jsPDF](https://github.com/parallax/jsPDF)** - Geração de PDFs

### Stack do Sistema SaaS (Referência)

* Next.js 14+, React, TypeScript, Prisma, PostgreSQL
* Tailwind CSS, shadcn/ui
* N8N, Evolution API, Claude API (Anthropic)

***

## Arquitetura

### Estrutura do Projeto

```
okgas-orcamento-dashboard/
├── app/                          # Next.js App Router
│   ├── globals.css              # Estilos globais e animações
│   ├── layout.tsx               # Layout raiz da aplicação
│   └── page.tsx                 # Página principal
├── components/                   # Componentes React
│   ├── okgas-dashboard.tsx      # Dashboard principal
│   ├── pdf-export.tsx           # Sistema de exportação PDF
│   └── theme-provider.tsx       # Provider de temas
├── lib/                          # Utilitários e helpers
│   └── utils.ts                 # Funções utilitárias
├── public/                       # Assets estáticos
├── docs/                         # Documentação
├── next.config.mjs              # Configuração Next.js
├── tailwind.config.js           # Configuração Tailwind
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências e scripts
```

### Componentes Principais

1. **OkGasDashboard**: Componente principal do dashboard
2. **PDFExport**: Sistema de exportação com captura visual
3. **Stat**: Cards de estatísticas com animações
4. **ChartContainer**: Wrapper para gráficos com efeitos
5. **ModuleCard**: Cards detalhados das etapas do projeto

***

## Quick Start

### Pré-requisitos

* **Node.js**: `>= 18.17.0` ([Download](https://nodejs.org/))
* **pnpm**: `>= 8.0.0` ([Instalação](https://pnpm.io/installation))
* **Git**: Para controle de versão ([Download](https://git-scm.com/))

### Instalação Rápida

```bash
# 1. Clone o repositório
git clone <repo-url>
cd DashboardOkGas

# 2. Instale as dependências
pnpm install

# 3. Execute em modo desenvolvimento
pnpm run dev

# 4. Acesse a aplicação
open http://localhost:3000
```

### Verificação da Instalação

```bash
# Verificar qualidade do código
pnpm run quality:check

# Executar build de produção
pnpm run build

# Visualizar build local
pnpm run start
```

***

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev              # Servidor de desenvolvimento
pnpm run build            # Build de produção
pnpm run start            # Servidor de produção

# Qualidade de Código
pnpm run lint             # ESLint
pnpm run lint:fix         # ESLint com correção automática
pnpm run format           # Prettier
pnpm run format:check     # Verificar formatação

# Qualidade Completa
pnpm run quality:check    # Verificação completa
pnpm run quality:fix      # Correção automática completa
```

***

## Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy de produção
vercel --prod
```

***

## Licença

Este projeto está licenciado sob a **MIT License**.

```
MIT License

Copyright (c) 2026 Harry | Desenvolvedor Full-Stack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

***

<div align="center">

**Construído por Harry | Desenvolvedor Full-Stack**

</div>
