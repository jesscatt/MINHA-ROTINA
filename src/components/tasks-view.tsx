"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Plus, Search, SlidersHorizontal } from "lucide-react";
import { mockTasks } from "@/lib/mock-data";
import type { Task } from "@/types/task";

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");

  const visible = useMemo(() => tasks.filter(task => {
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesFilter && task.title.toLowerCase().includes(search.toLowerCase());
  }), [tasks, filter, search]);

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks(old => [...old, { id: String(Date.now()), title: title.trim(), category: "Pessoal", time, priority: "medium", status: "pending", repeat: "Sem repetição" }]);
    setTitle("");
    setShowForm(false);
  }

  return <div className="page-stack">
    <section className="welcome-row"><div><div className="eyebrow">GERENCIAMENTO</div><h1>Minhas tarefas</h1><p>Organize, priorize e acompanhe suas atividades.</p></div><button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17}/> Nova tarefa</button></section>
    <div className="task-summary-row"><div className="mini-summary"><b>{tasks.length}</b><span>Total de atividades</span></div><div className="mini-summary"><b>{tasks.filter(t=>t.status==="completed").length}</b><span>Concluídas</span></div><div className="mini-summary"><b>{tasks.filter(t=>t.status!=="completed").length}</b><span>Pendentes</span></div></div>
    <section className="panel task-management">
      <div className="task-toolbar">
        <div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar atividade..."/></div>
        <div className="filter-wrap"><SlidersHorizontal size={16}/><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Todas as tarefas</option><option value="pending">Pendentes</option><option value="completed">Concluídas</option></select><ChevronDown size={14}/></div>
      </div>
      {showForm && <form className="new-task-form" onSubmit={addTask}><div className="form-title">Cadastrar atividade</div><label>Nome da atividade<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex.: Conferir relatórios" required/></label><label>Horário<input type="time" value={time} onChange={e=>setTime(e.target.value)}/></label><div className="form-actions"><button type="button" className="secondary-button" onClick={()=>setShowForm(false)}>Cancelar</button><button className="primary-button" type="submit">Adicionar atividade</button></div></form>}
      <div className="table-head"><span>ATIVIDADE</span><span>CATEGORIA</span><span>HORÁRIO</span><span>RECORRÊNCIA</span><span>STATUS</span></div>
      {visible.map(task => <div className="table-task-row" key={task.id}><div className="table-task-name"><button className={`task-check ${task.status==="completed"?"checked":""}`} onClick={()=>setTasks(old=>old.map(t=>t.id===task.id?{...t,status:t.status==="completed"?"pending":"completed"}:t))} aria-label="Alternar conclusão">{task.status==="completed"&&<Check size={13}/>}</button><div><b>{task.title}</b><small className={`priority-label ${task.priority}`}>{task.priority==="high"?"Prioridade alta":task.priority==="medium"?"Prioridade média":"Prioridade baixa"}</small></div></div><span>{task.category}</span><span className="table-time">{task.time}</span><span className="recurrence-label">{task.repeat}</span><span><i className={`status-pill ${task.status}`}>{task.status==="completed"?"Concluída":"Pendente"}</i></span></div>)}
      {visible.length===0 && <div className="empty-state">Nenhuma atividade encontrada para esse filtro.</div>}
    </section>
    <p className="footnote">Nesta versão, as alterações são temporárias. A persistência online será adicionada na integração com o banco de dados.</p>
  </div>;
}
