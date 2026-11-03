import type { Task } from "@/types/task";

export const mockTasks: Task[] = [
  { id: "1", title: "Conferir e-mails e mensagens", category: "Rotina", time: "08:00", priority: "medium", status: "completed", repeat: "Todos os dias úteis" },
  { id: "2", title: "Conferir planilhas de reservas", category: "Trabalho", time: "09:00", priority: "high", status: "pending", repeat: "Segunda a sexta" },
  { id: "3", title: "Atualizar relatórios", category: "Trabalho", time: "10:30", priority: "high", status: "pending", repeat: "Terça e quinta" },
  { id: "4", title: "Verificar pendências", category: "Rotina", time: "14:00", priority: "medium", status: "pending", repeat: "Todos os dias" },
  { id: "5", title: "Organizar atividades de amanhã", category: "Planejamento", time: "16:30", priority: "low", status: "pending", repeat: "Segunda a sexta" }
];
