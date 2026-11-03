export type TaskStatus = "pending" | "completed" | "overdue";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  category: string;
  time: string;
  priority: TaskPriority;
  status: TaskStatus;
  repeat: string;
};
