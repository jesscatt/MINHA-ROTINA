# Minha Rotina

Primeira versão da interface web para gerenciamento de tarefas pessoais e recorrentes.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## O que está incluído

- Dashboard inicial com indicadores e próximas atividades.
- Navegação entre painel, tarefas, agenda, notificações, histórico, relatórios e configurações.
- Tela de tarefas com busca, filtros e marcação de conclusão demonstrativa.
- Preferência de idioma na interface: português, inglês e espanhol.
- Layout responsivo para computador e telas menores.
- Dados demonstrativos locais.

## O que ainda NÃO está conectado

Esta entrega é um protótipo de interface. Ainda não possui:
- autenticação real e gestão de contas;
- banco de dados persistente;
- sincronização entre dispositivos;
- notificações push;
- recorrência automática no servidor;
- permissões multiusuário e políticas RLS.

Esses recursos serão implementados nas próximas etapas com Supabase, Web Push e agendamento no servidor.

## Estrutura

```text
src/
  app/
    agenda/
    configuracoes/
    historico/
    notificacoes/
    relatorios/
    tarefas/
    globals.css
    layout.tsx
    page.tsx
  components/
    app-shell.tsx
    dashboard.tsx
    page-placeholder.tsx
    tasks-view.tsx
  lib/
    i18n.ts
    mock-data.ts
  types/
    task.ts
```

## Próxima etapa recomendada

1. Criar projeto no Supabase.
2. Implementar autenticação e perfis.
3. Criar tabelas de tarefas, regras de recorrência e ocorrências.
4. Substituir os dados demonstrativos por consultas reais.
5. Implementar notificações push e serviço de agendamento.
