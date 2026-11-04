-- Esquema inicial para futura integração multiusuário com Supabase.
-- Execute somente depois de criar o projeto Supabase e revisar as políticas.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone text not null default 'America/Sao_Paulo',
  locale text not null default 'pt' check (locale in ('pt','en','es')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 90),
  category text not null default 'Pessoal',
  scheduled_time time not null,
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.recurrence_rules (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  weekdays smallint[] not null default array[1,2,3,4,5]::smallint[],
  starts_on date not null default current_date,
  ends_on date,
  reminder_lead_minutes integer not null default 0 check (reminder_lead_minutes between 0 and 10080),
  created_at timestamptz not null default now(),
  check (array_length(weekdays,1) between 1 and 7)
);

create table if not exists public.task_occurrences (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  occurrence_date date not null,
  status text not null default 'pending' check (status in ('pending','completed','skipped')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(task_id, occurrence_date)
);

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

create table if not exists public.notification_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  occurrence_date date not null,
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  status text not null default 'queued' check (status in ('queued','sent','failed','cancelled')),
  error_message text,
  created_at timestamptz not null default now(),
  unique(task_id, occurrence_date, scheduled_for)
);

create index if not exists tasks_user_active_idx on public.tasks(user_id, is_active);
create index if not exists occurrences_user_date_idx on public.task_occurrences(user_id, occurrence_date desc);
create index if not exists notifications_due_idx on public.notification_logs(status, scheduled_for);

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.recurrence_rules enable row level security;
alter table public.task_occurrences enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.notification_logs enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "tasks_own" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recurrence_rules_own" on public.recurrence_rules for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "task_occurrences_own" on public.task_occurrences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "push_subscriptions_own" on public.push_subscriptions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notification_logs_select_own" on public.notification_logs for select using (auth.uid() = user_id);
