"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Bell, CalendarDays, ChartNoAxesCombined, CheckSquare, ChevronDown,
  CircleHelp, Clock3, LayoutDashboard, ListTodo, Menu, Search, Settings,
  UserCircle, X, Languages
} from "lucide-react";
import { Locale, messages } from "@/lib/i18n";

type Active = "dashboard" | "tasks" | "calendar" | "notifications" | "history" | "reports" | "settings";

const navItems: { id: Active; href: string; icon: typeof LayoutDashboard; key: keyof typeof messages.pt }[] = [
  { id: "dashboard", href: "/", icon: LayoutDashboard, key: "dashboard" },
  { id: "tasks", href: "/tarefas", icon: ListTodo, key: "tasks" },
  { id: "calendar", href: "/agenda", icon: CalendarDays, key: "calendar" },
  { id: "notifications", href: "/notificacoes", icon: Bell, key: "notifications" },
  { id: "history", href: "/historico", icon: Clock3, key: "history" },
  { id: "reports", href: "/relatorios", icon: ChartNoAxesCombined, key: "reports" },
  { id: "settings", href: "/configuracoes", icon: Settings, key: "settings" }
];

export function AppShell({ children, active }: { children: React.ReactNode; active: Active }) {
  const [locale, setLocale] = useState<Locale>("pt");
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = messages[locale];
  const pathname = usePathname();
  const dateLabel = useMemo(() => new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale, {
    weekday: "long", day: "numeric", month: "long"
  }).format(new Date()), [locale]);

  const sidebar = (
    <aside className="sidebar">
      <Link href="/" className="brand" onClick={() => setMobileOpen(false)}>
        <span className="brand-mark"><CheckSquare size={21} /></span>
        <span><strong>{t.appName}</strong><small>ORGANIZAÇÃO PESSOAL</small></span>
        <button className="mobile-close icon-button" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} aria-label="Fechar menu"><X size={19}/></button>
      </Link>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const selected = active === item.id;
          return <Link key={item.id} href={item.href} onClick={() => setMobileOpen(false)} className={`nav-link ${selected ? "active" : ""}`}>
            <Icon size={18} strokeWidth={1.8}/><span>{t[item.key]}</span>
            {item.id === "notifications" && <i className="nav-dot"/>}
          </Link>;
        })}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon"><CircleHelp size={18}/></div>
          <strong>Precisa de ajuda?</strong>
          <p>Consulte orientações sobre sua rotina.</p>
          <button className="text-button">Central de ajuda <span>→</span></button>
        </div>
        <div className="user-mini">
          <div className="avatar">JR</div>
          <div className="user-meta"><strong>Usuário</strong><small>Conta pessoal</small></div>
          <button className="icon-button" aria-label="Opções do perfil"><ChevronDown size={16}/></button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="app-frame">
      {sidebar}
      {mobileOpen && <button className="mobile-scrim" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}/>}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={20}/></button>
            <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{t[navItems.find(n => n.id === active)?.key ?? "dashboard"]}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="date-chip"><CalendarDays size={15}/><span>{dateLabel}</span></div>
            <label className="language-select"><Languages size={16}/><select value={locale} onChange={(e) => setLocale(e.target.value as Locale)} aria-label={t.language}><option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option></select></label>
            <button className="icon-button notification-button" aria-label="Notificações"><Bell size={19}/><i/></button>
            <div className="top-avatar">JR</div>
          </div>
        </header>
        <div className="page-content">
          <div className="demo-banner"><span className="demo-dot"/> {t.demo} · As alterações desta versão são demonstrativas e não ficam salvas após atualizar a página.</div>
          {children}
        </div>
      </main>
    </div>
  );
}
