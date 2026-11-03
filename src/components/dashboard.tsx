"use client";

import Link from "next/link";
import { ArrowUpRight, BellRing, CalendarDays, Check, CheckCheck, Circle, Clock3, ListTodo, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { mockTasks } from "@/lib/mock-data";

export function Dashboard() {
  const [completed, setCompleted] = useState<string[]>(["1"]);
  const tasks = mockTasks;
  const doneCount = completed.length;
  const progress = Math.round(doneCount / 8 * 100);
  const today = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" }).format(new Date());

  return <div className="page-stack">
    <section className="welcome-row">
      <div><div className="eyebrow">TERÇA-FEIRA · {today.toUpperCase()}</div><h1>Bom dia! <span className="wave">✦</span></h1><p>Organize seu dia. Acompanhe suas atividades.</p></div>
      <Link href="/tarefas" className="primary-button"><Plus size={17}/> Nova tarefa</Link>
    </section>

    <section className="stats-grid">
      <StatCard label="Atividades do dia" value="08" detail="Na sua programação" icon={<ListTodo size={19}/>} tone="blue"/>
      <StatCard label="Concluídas" value={String(doneCount).padStart(2, "0")} detail="Muito bem, continue!" icon={<CheckCheck size={19}/>} tone="green"/>
      <StatCard label="Pendentes" value={String(8-doneCount).padStart(2, "0")} detail="Aguardando realização" icon={<Clock3 size={19}/>} tone="amber"/>
      <StatCard label="Progresso diário" value={`${progress}%`} detail="Do total programado" icon={<TrendingUp size={19}/>} tone="violet"/>
    </section>

    <section className="dashboard-grid">
      <div className="panel task-panel">
        <div className="panel-heading"><div><h2>Próximas atividades</h2><p>O que está programado para hoje</p></div><Link href="/tarefas" className="subtle-link">Ver todas <ArrowUpRight size={15}/></Link></div>
        <div className="task-list">
          {tasks.slice(0, 5).map((task) => {
            const isDone = completed.includes(task.id);
            return <div className={`task-row ${isDone ? "is-complete" : ""}`} key={task.id}>
              <button className={`task-check ${isDone ? "checked" : ""}`} onClick={() => setCompleted(old => isDone ? old.filter(id => id !== task.id) : [...old, task.id])} aria-label={isDone ? "Desmarcar tarefa" : "Concluir tarefa"}>{isDone && <Check size={14}/>}</button>
              <div className="task-main"><strong>{task.title}</strong><span>{task.category} <i>·</i> {task.repeat}</span></div>
              <span className="task-time">{task.time}</span>
              <span className={`priority-dot ${task.priority}`} title={`Prioridade ${task.priority}`}/>
            </div>;
          })}
        </div>
        <Link href="/tarefas" className="panel-footer-link">Acessar gerenciamento de tarefas <ArrowUpRight size={15}/></Link>
      </div>

      <div className="right-column">
        <div className="panel progress-panel">
          <div className="panel-heading"><div><h2>Seu progresso</h2><p>Resumo do dia</p></div><span className="soft-icon green"><TrendingUp size={18}/></span></div>
          <div className="progress-number">{progress}<small>%</small></div>
          <div className="progress-track"><span style={{width: `${progress}%`}}/></div>
          <div className="progress-caption"><span>{doneCount} concluídas</span><span>8 atividades</span></div>
          <div className="motivational-note"><span>✦</span> Cada atividade concluída é um passo adiante.</div>
        </div>
        <div className="panel reminder-panel">
          <div className="panel-heading"><div><h2>Próximo lembrete</h2><p>Não perca o horário</p></div><span className="soft-icon amber"><BellRing size={18}/></span></div>
          <div className="reminder-time">09:00</div>
          <strong>Conferir planilhas de reservas</strong>
          <span className="reminder-tag"><span/> Lembrete programado (exemplo)</span>
        </div>
      </div>
    </section>

    <section className="bottom-grid">
      <div className="panel week-panel">
        <div className="panel-heading"><div><h2>Visão da semana</h2><p>Distribuição das atividades</p></div><Link href="/agenda" className="subtle-link">Abrir agenda <ArrowUpRight size={15}/></Link></div>
        <div className="week-bars">
          {[["SEG",5,8],["TER",7,8],["QUA",4,8],["QUI",6,8],["SEX",3,8],["SÁB",1,4],["DOM",1,3]].map(([day, val, max]) => <div className="week-day" key={day}><div className="bar-wrap"><span style={{height: `${Number(val)/Number(max)*100}%`}}/></div><b>{day}</b><small>{val}</small></div>)}
        </div>
      </div>
      <div className="panel quick-panel">
        <div className="panel-heading"><div><h2>Acesso rápido</h2><p>Atalhos da sua rotina</p></div></div>
        <Link href="/tarefas" className="quick-link"><span className="quick-icon blue"><Plus size={17}/></span><span><b>Cadastrar atividade</b><small>Adicione uma nova tarefa</small></span><ArrowUpRight size={16}/></Link>
        <Link href="/agenda" className="quick-link"><span className="quick-icon violet"><CalendarDays size={17}/></span><span><b>Minha agenda</b><small>Visualize sua programação</small></span><ArrowUpRight size={16}/></Link>
      </div>
    </section>
  </div>;
}

function StatCard({label, value, detail, icon, tone}: {label:string; value:string; detail:string; icon:React.ReactNode; tone:string}) {
  return <div className="stat-card"><span className={`stat-icon ${tone}`}>{icon}</span><span className="stat-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}
