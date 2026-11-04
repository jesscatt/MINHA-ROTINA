"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppSettings, Task } from "@/types/task";
const TASKS_KEY = "minha-rotina-v2-tasks";
const SETTINGS_KEY = "minha-rotina-v2-settings";
const defaults: AppSettings = { theme: "light", locale: "pt", remindersEnabled: true, reminderLead: 0, weekStartsOn: 1, defaultCategory: "Pessoal" };
type ContextValue = { tasks: Task[]; settings: AppSettings; hydrated: boolean; addTask: (task: Omit<Task,"id"|"createdAt"|"completedDates">) => void; updateTask: (task: Task) => void; deleteTask: (id: string) => void; toggleTask: (id: string, date: string) => void; updateSettings: (patch: Partial<AppSettings>) => void };
const AppContext = createContext<ContextValue | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
 const [tasks,setTasks]=useState<Task[]>([]); const [settings,setSettings]=useState<AppSettings>(defaults); const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(TASKS_KEY); if(raw) setTasks(JSON.parse(raw)); else {const old=localStorage.getItem("minha-rotina-tasks"); if(old){const parsed=JSON.parse(old);setTasks(parsed.map((t: any)=>({id:String(t.id),title:t.name||t.title||"Atividade",category:t.category||"Pessoal",time:t.time||"09:00",priority:t.priority==="Alta"?"high":t.priority==="Baixa"?"low":"medium",days:t.days||[1,2,3,4,5],notes:t.note||"",createdAt:new Date().toISOString(),completedDates:t.done?[new Date().toLocaleDateString("en-CA")]:[]})));}} const s=localStorage.getItem(SETTINGS_KEY); if(s)setSettings({...defaults,...JSON.parse(s)}); else {const theme=localStorage.getItem("minha-rotina-theme");if(theme)setSettings(v=>({...v,theme:theme as "light"|"dark"}));}}catch{}setHydrated(true);},[]);
 useEffect(()=>{if(hydrated){localStorage.setItem(TASKS_KEY,JSON.stringify(tasks));localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));document.documentElement.dataset.theme=settings.theme;}},[tasks,settings,hydrated]);
 const value=useMemo<ContextValue>(()=>({tasks,settings,hydrated,addTask:(t)=>setTasks(old=>[...old,{...t,id:crypto.randomUUID(),createdAt:new Date().toISOString(),completedDates:[]}]),updateTask:(t)=>setTasks(old=>old.map(x=>x.id===t.id?t:x)),deleteTask:(id)=>setTasks(old=>old.filter(x=>x.id!==id)),toggleTask:(id,date)=>setTasks(old=>old.map(t=>t.id===id?{...t,completedDates:t.completedDates.includes(date)?t.completedDates.filter(d=>d!==date):[...t.completedDates,date]}:t)),updateSettings:(p)=>setSettings(old=>({...old,...p}))}),[tasks,settings,hydrated]);
 return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp(){const value=useContext(AppContext);if(!value)throw new Error("useApp deve ser usado dentro de AppProvider");return value;}
export function dateKey(date: Date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,"0"),d=String(date.getDate()).padStart(2,"0");return `${y}-${m}-${d}`;}
