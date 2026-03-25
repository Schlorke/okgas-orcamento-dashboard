# Resumo Completo do Orçamento — OK Gás Engenharia

**Proposta Comercial • Dashboard Executivo de Progresso**  
**Sistema SaaS — Gestão de Frotas, IA no WhatsApp e Controle de Processos**  
**Data do documento:** 13 de março de 2026  
**Versão:** 1.0  
**Responsável:** Harry | Desenvolvedor Full-Stack

---

## 1. Visão Geral Financeira

| Indicador | Valor |
|-----------|-------|
| **Investimento Total Planejado** | R$ 40.000 |
| **Total Recebido** | R$ 4.000 |
| **Total a Receber** | R$ 36.000 |
| **Progresso Financeiro** | 10% |
| **Etapas Concluídas (por valor)** | 0% |
| **Prazo Estimado** | 18–24 semanas |

---

## 2. Resumo por Etapa

| Etapa | Título | Total | Recebido | Restante | Status |
|-------|--------|-------|----------|----------|--------|
| **E1** | MVP — Cadastro de Clientes + Gestão de Frotas + Offline-First + Assinatura Digital | R$ 14.000 | R$ 4.000 | R$ 10.000 | Em Andamento |
| **E2** | Dashboard Real-Time + Inteligência Artificial no WhatsApp | R$ 10.000 | R$ 0 | R$ 10.000 | Pendente |
| **E3** | Manutenção Preventiva + Alertas + Notificações WhatsApp | R$ 4.800 | R$ 0 | R$ 4.800 | Pendente |
| **E4** | Tarefas + Cadastro Inteligente + Workflows de Processos | R$ 6.400 | R$ 0 | R$ 6.400 | Pendente |
| **E5** | Relatórios com IA + Analytics Gerencial | R$ 4.800 | R$ 0 | R$ 4.800 | Pendente |

---

## 3. Detalhamento Completo por Etapa

### Etapa E1 — MVP (Em Andamento)

**Valor total:** R$ 14.000  
**Recebido:** R$ 4.000  
**Restante:** R$ 10.000  
**Progresso:** 29%

#### Submódulos

| # | Submódulo | Valor | Status | Descrição |
|---|-----------|-------|--------|-----------|
| 1 | **Setup & Arquitetura Base** | R$ 1.500 | ✅ Concluído | Next.js 14+ (App Router), TypeScript strict, Prisma + PostgreSQL, autenticação (NextAuth.js/Clerk), multi-tenancy (orgId), deploy Vercel + Railway, CI/CD com GitHub Actions. |
| 2 | Arquitetura Offline-First (PWA) | R$ 2.500 | Em andamento (adiantamento parcial) | Service Workers com Workbox, IndexedDB via Dexie.js, fila de sincronização (SyncQueue), Background Sync API, indicador online/offline na UI, conflict resolution. |
| 3 | CRUD Clientes (Entidade Central) | R$ 2.000 | Pendente | Cadastro completo de clientes como entidade raiz do sistema: nome, CPF/CNPJ, endereço, contato, proprietário, tipo (residencial/comercial/condomínio), status de cadastro Sulgás. Listagem com filtros, busca e paginação. |
| 4 | CRUD Veículos + Motoristas | R$ 2.500 | Pendente | Cadastro de 15 veículos (placa, modelo, ano, Nº Frota, RENAVAM, status). Cadastro de motoristas com CNH, validade e vinculação veículo↔motorista. Tabela com filtros por status (Em Circulação / Em Manutenção). |
| 5 | Registro de Abastecimento e KM | R$ 2.000 | Pendente | Formulários web + offline sync para registrar abastecimento (data, veículo, litros, valor, tipo combustível, posto, KM) e atualização de hodômetro. Salvamento local em IndexedDB quando sem internet. |
| 6 | Assinatura Digital do Cliente | R$ 1.500 | Pendente | Componente HTML5 Canvas (touch) para captura de assinatura manuscrita do cliente na conclusão de serviço. Registro de nome, CPF, geolocalização (GPS) e timestamp. Funciona offline. |
| 7 | Dashboard com KPIs + Layout Base | R$ 2.000 | ✅ Concluído | Dashboard principal com cards de KPIs (total veículos, consumo mensal, alertas ativos, trocas de óleo pendentes). Sidebar, header, dark mode, responsivo mobile-first. |

---

### Etapa E2 — Dashboard Real-Time + IA no WhatsApp (Pendente)

**Valor total:** R$ 10.000  
**Recebido:** R$ 0  
**Restante:** R$ 10.000  
**Progresso:** 0%

#### Submódulos

| # | Submódulo | Valor | Status | Descrição |
|---|-----------|-------|--------|-----------|
| 1 | Dashboard Tempo Real (Gestor) | R$ 2.500 | Pendente | Painel gerencial com WebSockets/SSE para atualização automática. O gestor abre o celular e vê situação de obras, veículos e equipes sem ligar pra ninguém. Push notifications. |
| 2 | Setup N8N + Evolution API | R$ 1.500 | Pendente | Instalação e configuração do N8N (self-hosted) como orquestrador de workflows e Evolution API para conexão com WhatsApp. Webhook de mensagens incoming. |
| 3 | Bot IA WhatsApp (Claude API) | R$ 3.500 | Pendente | Integração com Anthropic Claude API para interpretar mensagens em português coloquial. Motorista envia "abastecimento 250 45L gasolina Shell" e a IA parseia, registra no sistema e confirma via WhatsApp formatado. |
| 4 | Histórico de Mensagens + Painel Web | R$ 2.500 | Pendente | Tela no painel administrativo mostrando todas as mensagens processadas pelo bot, ação identificada, confiança da IA e resposta enviada. Filtros por data, tipo de ação e usuário. |

---

### Etapa E3 — Manutenção Preventiva + Alertas (Pendente)

**Valor total:** R$ 4.800  
**Recebido:** R$ 0  
**Restante:** R$ 4.800  
**Progresso:** 0%

#### Submódulos

| # | Submódulo | Valor | Status | Descrição |
|---|-----------|-------|--------|-----------|
| 1 | CRUD Manutenção Preventiva/Corretiva | R$ 1.800 | Pendente | Cadastro de manutenções (tipo, descrição, custo, peças, óleo). Agendamento por KM ou data. Histórico completo por veículo. Troca de óleo (5w30 Syntium, intervalo 10.000 km — padrão da frota OK Gás). |
| 2 | Sistema de Alertas Inteligentes | R$ 1.500 | Pendente | Alertas automáticos por severidade (Crítico/Médio/Baixo): vencimento CNH, seguro, CRLV, troca de óleo, manutenção preventiva, consumo anormal de combustível, inconsistência de KM. |
| 3 | Cron Jobs N8N + Notificações WhatsApp | R$ 1.500 | Pendente | Rotina diária às 08h (seg-sex) via N8N: verifica documentos vencendo em 15/30 dias, manutenções próximas, troca de óleo. Envia alerta formatado via WhatsApp para o gestor. |

---

### Etapa E4 — Tarefas + Cadastro Inteligente (Pendente)

**Valor total:** R$ 6.400  
**Recebido:** R$ 0  
**Restante:** R$ 6.400  
**Progresso:** 0%

#### Submódulos

| # | Submódulo | Valor | Status | Descrição |
|---|-----------|-------|--------|-----------|
| 1 | Cadastro Automático de Clientes via WhatsApp | R$ 2.200 | Pendente | Colaborador cola dados do cliente no grupo (CPF, CNPJ, endereço, contato). A IA extrai, estrutura e cadastra automaticamente no sistema, eliminando o retrabalho manual de digitação. |
| 2 | Sistema de Tarefas com Delegação | R$ 2.200 | Pendente | Criar tarefas via web ou WhatsApp (@menção). Kanban de acompanhamento (Pendente/Em Andamento/Concluída). Notificações automáticas, cobrança de follow-up pela IA, visibilidade de progresso. |
| 3 | Workflows de Laudo/ART/Termo | R$ 2.000 | Pendente | Checklists automatizados para processos burocráticos: emissão de Laudo RRT, Termo de Conformidade, ART (CREA). Cada workflow com etapas, responsáveis, prazos e status rastreável. |

---

### Etapa E5 — Relatórios com IA (Pendente)

**Valor total:** R$ 4.800  
**Recebido:** R$ 0  
**Restante:** R$ 4.800  
**Progresso:** 0%

#### Submódulos

| # | Submódulo | Valor | Status | Descrição |
|---|-----------|-------|--------|-----------|
| 1 | Geração de Relatórios via IA | R$ 1.800 | Pendente | Relatórios automáticos de abastecimento, manutenção, custos por veículo, desempenho de frota. A IA analisa os dados e gera insights em linguagem natural. |
| 2 | Consultas por Linguagem Natural | R$ 1.500 | Pendente | Gestor pergunta no WhatsApp: "qual veículo gastou mais esse mês?" ou "status das obras em Caxias". A IA consulta o banco e responde com dados reais formatados. |
| 3 | Relatório Semanal Automático + Dashboard Completo | R$ 1.500 | Pendente | Toda sexta 17h, a IA gera resumo executivo da semana (abastecimentos, KMs, manutenções, tarefas) e envia via WhatsApp para admin/gestor. Dashboard gerencial consolidado no painel web. |

---

## 4. Histórico de Pagamentos

| Data | Etapa | Submódulo | Valor | Observação |
|------|-------|-----------|-------|------------|
| — | E1 | Setup & Arquitetura Base | R$ 1.500 | Primeira parcela recebida; submódulo concluído |
| — | E1 | Dashboard com KPIs + Layout Base | R$ 2.000 | Quitado com o pagamento adicional; submódulo concluído |
| — | E1 | Arquitetura Offline-First (PWA) | R$ 500 | Crédito parcial do pagamento adicional; abatimento do saldo deste submódulo |

**Total pago até o momento:** R$ 4.000

---

## 5. Progresso Documentado

### O que foi entregue

- **Setup & Arquitetura Base (E1):** Concluído e pago. Inclui:
  - Next.js 14+ com App Router
  - TypeScript strict
  - Prisma + PostgreSQL
  - Autenticação (NextAuth.js/Clerk)
  - Multi-tenancy (orgId)
  - Deploy Vercel + Railway
  - CI/CD com GitHub Actions
- **Dashboard com KPIs + Layout Base (E1):** Concluído e pago.

### Demarcação prática do pagamento adicional (R$ 2.500)

- **R$ 2.000:** Quitação integral do submódulo **Dashboard com KPIs + Layout Base** (entrega concluída).
- **R$ 500:** **Crédito parcial no submódulo Arquitetura Offline-First (PWA)**, abatendo o saldo deste bloco.
- **Impacto financeiro direto na E1:** **R$ 4.000 recebidos** e **R$ 10.000 restantes**.

### Enquadramento financeiro conforme o PDF enviado

- **Trabalho realizado:** R$ 5.250
- **Já recebido:** R$ 4.000
- **Custo adicional iOS:** R$ 119
- **Saldo em aberto deste ciclo (PDF):** **R$ 1.369**

### Próximos passos (ordem sugerida)

1. **E1.2** — Arquitetura Offline-First (PWA) — R$ 2.500  
2. **E1.3** — CRUD Clientes (Entidade Central) — R$ 2.000  
3. **E1.4** — CRUD Veículos + Motoristas — R$ 2.500  
4. **E1.5** — Registro de Abastecimento e KM — R$ 2.000  
5. **E1.6** — Assinatura Digital do Cliente — R$ 1.500  
6. **E1.7** — Dashboard com KPIs + Layout Base — R$ 2.000  

Após conclusão da E1, seguir para E2, E3, E4 e E5 conforme roadmap.

---

## 6. Comparativo de Mercado

| Opção | Valor Estimado |
|-------|----------------|
| **Seu Orçamento (5 etapas)** | R$ 40.000 |
| Freelancer Sênior | R$ 75.000 |
| Agência Pequena | R$ 120.000 |
| Software House | R$ 225.000 |

**Economia estimada:** até ~80% em relação a software houses.

---

## 7. Vantagens da Proposta

- **Entrega modular:** valor a cada etapa; pague conforme recebe
- **Tecnologia moderna:** Next.js, TypeScript, IA (Claude), PWA offline-first
- **WhatsApp como interface:** equipe de campo registra dados por mensagem
- **Complementar ao ExpertaSYS:** não substitui; preenche lacunas operacionais

---

## 8. Legenda de Status

| Status | Significado |
|--------|-------------|
| **Concluído** | Submódulo entregue e pago |
| **Em Andamento** | Etapa com pagamento parcial recebido |
| **Pendente** | Ainda não iniciado ou não pago |

---

*Documento gerado com base nos dados do dashboard executivo do projeto OK Gás Engenharia.*
