"use client";

import { Bell, CalendarDays, ChartNoAxesCombined, Clock3, Settings, Sparkles } from "lucide-react";
import { messages } from "@/lib/i18n";

const config = {
  calendar: { icon: CalendarDays, title: "Agenda", description: messages.pt.calendarDesc, bullets: ["Visualização semanal e mensal", "Atividades organizadas por horário", "Filtros por categoria e prioridade"] },
  notifications: { icon: Bell, title: "Central de notificações", description: messages.pt.notificationsDesc, bullets: ["Preferências de lembretes", "Dispositivos autorizados", "Histórico de notificações enviadas"] },
  history: { icon: Clock3, title: "Histórico de atividades", description: messages.pt.historyDesc, bullets: ["Atividades concluídas", "Atividades adiadas ou canceladas", "Filtros por período"] },
  reports: { icon: ChartNoAxesCombined, title: "Relatórios", description: messages.pt.reportsDesc, bullets: ["Taxa de conclusão", "Resumo semanal e mensal", "Evolução das atividades"] },
  settings: { icon: Settings, title: "Configurações", description: messages.pt.settingsDesc, bullets: ["Perfil e preferências", "Idioma da interface", "Preferências de notificações"] }
};

export function PagePlaceholder({ section }: { section: keyof typeof config }) {
  const item = config[section];
  const Icon = item.icon;
  return <div className="page-stack">
    <section className="welcome-row"><div><div className="eyebrow">MINHA ROTINA</div><h1>{item.title}</h1><p>{item.description}</p></div></section>
    <div className="coming-card"><div className="coming-icon"><Icon size={27}/></div><span className="coming-badge"><Sparkles size={13}/> Em desenvolvimento</span><h2>Esta área está sendo preparada</h2><p>O espaço já está organizado na navegação. As funcionalidades serão conectadas nas próximas etapas do projeto.</p><div className="coming-list">{item.bullets.map(b=><div key={b}><span>✓</span>{b}</div>)}</div></div>
  </div>;
}
