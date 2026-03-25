# AGENTS.md

## Contexto do projeto

Este projeto é um dashboard executivo comercial para a OK Gás, com roadmap por etapas e submódulos.
As informações principais vivem em `components/okgas-dashboard.tsx`, especialmente no array
`modules`.

## Objetivo desta orientação

Quando o usuário disser que um submódulo foi concluído, está em andamento, ou pedir ajuste de
valores, o agente deve aplicar as mudanças de forma intuitiva, sem exigir instruções detalhadas
repetidas.

## Regra visual para submódulo concluído (padrão oficial)

Ao marcar um submódulo como concluído:

1. Definir `completed: true` no item correto de `substeps`.
2. Manter `line-through` no nome e no valor do submódulo.
3. Aplicar visual "slate reduzido" (menos destaque) no card do submódulo concluído:
   - fundo em tons `slate` com opacidade menor;
   - borda `slate` discreta;
   - marcador (dot) em `slate`;
   - textos em `slate` claro, preservando legibilidade.
4. O submódulo concluído deve parecer finalizado e com menor prioridade visual que os
   pendentes/ativos.

## Regra financeira obrigatória (coerência de valores)

Sempre que houver conclusão de submódulo ou atualização de progresso financeiro:

1. Atualizar `paid` no módulo (`modules[x].paid`) para refletir o valor recebido.
2. Garantir consistência entre:
   - `paid` da etapa;
   - valores de submódulos concluídos;
   - KPIs derivados (`Recebido`, `%`, `A Receber`, gráficos e acumulados).
3. Não alterar `total` da etapa, exceto se o usuário pedir explicitamente.
4. Tratar como padrão:
   - `paid === total` -> etapa `Concluída`;
   - `0 < paid < total` -> etapa `Em Andamento`;
   - `paid === 0` -> etapa `Pendente`.

## Interpretação padrão de pedidos do usuário

Quando o usuário usar frases como:

- "cliente fechou módulo X",
- "marca como concluído",
- "atualiza valores recebidos",
- "deixa o concluído apagado/slate",

o agente deve automaticamente:

1. encontrar o submódulo citado;
2. marcar `completed: true` no submódulo;
3. aplicar estilo de concluído em `slate reduzido`;
4. atualizar `paid` da etapa correspondente;
5. validar lint/build se a alteração for de código.

## Escopo e segurança de edição

- Priorizar mudanças mínimas e focadas.
- Não mexer em módulos não citados sem necessidade.
- Evitar regressão visual em itens pendentes.
- Se houver ambiguidade sobre valor exato recebido, perguntar apenas o valor faltante.

## Exemplo aplicado (histórico deste projeto)

No módulo E1 (MVP), o submódulo `Setup & Arquitetura Base` foi concluído. Portanto:

- `completed: true` no substep correspondente;
- visual concluído em `slate` reduzido + `line-through`;
- `paid` de E1 atualizado para `1500`.
