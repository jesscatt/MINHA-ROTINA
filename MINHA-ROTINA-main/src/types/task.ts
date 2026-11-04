export type TaskPriority = "low" | "medium" | "high";
export type Task = {
  id: string;
  title: string;
  category: string;
  time: string;
  priority: TaskPriority;
  days: number[];
  notes: string;
  createdAt: string;
  completedDates: string[];
};
export type AppSettings = { theme: "light" | "dark"; locale: "pt" | "en" | "es"; remindersEnabled: boolean; reminderLead: number; weekStartsOn: 0 | 1; defaultCategory: string };
