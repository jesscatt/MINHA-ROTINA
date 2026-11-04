# Minha Rotina

Aplicação web para cadastrar atividades, organizar horários, definir recorrência por dia da semana e acompanhar a conclusão diária.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Funcionalidades desta versão

- Dashboard com indicadores calculados a partir das tarefas reais cadastradas.
- Cadastro, edição e exclusão de tarefas.
- Nome, categoria, horário, prioridade, observações e recorrência em dias selecionados.
- Conclusão registrada por data: concluir hoje não marca automaticamente as próximas ocorrências.
- Agenda diária por data.
- Histórico de conclusões.
- Relatórios por período e categoria.
- Configurações de tema claro/escuro, idioma (PT/EN/ES), primeiro dia da semana, categoria padrão e antecedência de lembrete.
- Exportação de backup JSON.
- Dados persistidos no navegador por localStorage.
- Manifesto PWA e Service Worker com cache básico/offline shell e recepção de eventos push.
- Layout responsivo.

## Limitações importantes

Esta entrega funciona localmente no navegador. Ainda não possui autenticação conectada, banco remoto, sincronização entre dispositivos ou envio de notificações push agendadas. A permissão do navegador permite notificações locais, mas não cria sozinha um sistema de lembretes em segundo plano.

Para receber lembretes com o navegador fechado, é necessário concluir a integração de Web Push: criar e salvar subscriptions, enviar notificações no servidor usando chaves VAPID e executar um agendador (por exemplo, Supabase Cron/Edge Functions). O Service Worker já inclui o manipulador do evento `push`, mas o servidor emissor ainda não está configurado.

## Preparação para multiusuário e Supabase

O arquivo `supabase/migrations/202611040001_initial_schema.sql` define a estrutura inicial para perfis, tarefas, regras de recorrência, ocorrências diárias, subscriptions e logs de notificações, com políticas RLS para separar os dados por usuário.

1. Crie um projeto no Supabase.
2. Execute a migration SQL no SQL Editor.
3. Copie `.env.example` para `.env.local` e preencha as variáveis do Supabase.
4. Implemente a autenticação e substitua o armazenamento local pelas consultas autenticadas antes de disponibilizar contas reais.
5. Configure VAPID, endpoint seguro para registrar subscriptions e função agendada para emitir os lembretes.

A migration prepara o banco e as políticas; não significa que a autenticação e a sincronização já estejam conectadas nesta versão.

## Publicar na Vercel

1. Envie o conteúdo do repositório ao GitHub.
2. Importe o repositório na Vercel.
3. Use as configurações padrão de Next.js.
4. Publique. Não é necessário preencher variáveis Supabase enquanto a aplicação permanecer no modo local.

## Estrutura

```text
src/
  app/                 Rotas Next.js
  components/          Dashboard, tarefas, páginas e registro do Service Worker
  lib/                 Contexto global, persistência local e idiomas
  types/               Tipos de tarefas e configurações
public/
  manifest.webmanifest
  sw.js
supabase/migrations/   Esquema inicial multiusuário com RLS
.env.example
```
