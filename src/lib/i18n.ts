export type Locale = "pt" | "en" | "es";

export const messages = {
  pt: {
    appName: "Minha Rotina", dashboard: "Painel inicial", tasks: "Minhas tarefas",
    calendar: "Agenda", notifications: "Notificações", history: "Histórico",
    reports: "Relatórios", settings: "Configurações", search: "Buscar",
    today: "Hoje", welcome: "Bom dia!", welcomeText: "Organize seu dia. Acompanhe suas atividades.",
    total: "Atividades do dia", completed: "Concluídas", pending: "Pendentes",
    progress: "Progresso diário", quickAccess: "Acesso rápido", newTask: "Nova tarefa",
    addActivity: "Adicionar atividade", viewCalendar: "Ver programação",
    upcoming: "Próximas atividades", seeAll: "Ver todas", priority: "Prioridade",
    all: "Todas", high: "Alta", medium: "Média", low: "Baixa",
    done: "Concluída", toDo: "A fazer", noTasks: "Nenhuma tarefa encontrada.",
    taskTitle: "Título da atividade", category: "Categoria", time: "Horário",
    add: "Adicionar", cancel: "Cancelar", demo: "Dados demonstrativos",
    language: "Idioma", lightMode: "Tema claro", profile: "Meu perfil",
    pageComing: "Esta área será implementada na próxima etapa.",
    calendarDesc: "Visualização semanal e mensal das atividades.",
    notificationsDesc: "Preferências, dispositivos e histórico de lembretes.",
    historyDesc: "Consulte atividades concluídas, adiadas e não realizadas.",
    reportsDesc: "Acompanhe indicadores e evolução da sua rotina.",
    settingsDesc: "Gerencie seu perfil, idioma e preferências do sistema."
  },
  en: {
    appName: "My Routine", dashboard: "Dashboard", tasks: "My tasks",
    calendar: "Calendar", notifications: "Notifications", history: "History",
    reports: "Reports", settings: "Settings", search: "Search",
    today: "Today", welcome: "Good morning!", welcomeText: "Plan your day. Keep track of your activities.",
    total: "Today's activities", completed: "Completed", pending: "Pending",
    progress: "Daily progress", quickAccess: "Quick access", newTask: "New task",
    addActivity: "Add activity", viewCalendar: "View schedule",
    upcoming: "Upcoming activities", seeAll: "See all", priority: "Priority",
    all: "All", high: "High", medium: "Medium", low: "Low",
    done: "Completed", toDo: "To do", noTasks: "No tasks found.",
    taskTitle: "Activity title", category: "Category", time: "Time",
    add: "Add", cancel: "Cancel", demo: "Demo data",
    language: "Language", lightMode: "Light theme", profile: "My profile",
    pageComing: "This area will be implemented in the next stage.",
    calendarDesc: "Weekly and monthly activity view.",
    notificationsDesc: "Preferences, devices and reminder history.",
    historyDesc: "Review completed, postponed and unfinished activities.",
    reportsDesc: "Track indicators and your routine progress.",
    settingsDesc: "Manage your profile, language and system preferences."
  },
  es: {
    appName: "Mi Rutina", dashboard: "Panel principal", tasks: "Mis tareas",
    calendar: "Agenda", notifications: "Notificaciones", history: "Historial",
    reports: "Informes", settings: "Configuración", search: "Buscar",
    today: "Hoy", welcome: "¡Buenos días!", welcomeText: "Organiza tu día. Sigue tus actividades.",
    total: "Actividades de hoy", completed: "Completadas", pending: "Pendientes",
    progress: "Progreso diario", quickAccess: "Acceso rápido", newTask: "Nueva tarea",
    addActivity: "Añadir actividad", viewCalendar: "Ver programación",
    upcoming: "Próximas actividades", seeAll: "Ver todas", priority: "Prioridad",
    all: "Todas", high: "Alta", medium: "Media", low: "Baja",
    done: "Completada", toDo: "Por hacer", noTasks: "No se encontraron tareas.",
    taskTitle: "Título de la actividad", category: "Categoría", time: "Hora",
    add: "Añadir", cancel: "Cancelar", demo: "Datos de demostración",
    language: "Idioma", lightMode: "Tema claro", profile: "Mi perfil",
    pageComing: "Esta área se implementará en la próxima etapa.",
    calendarDesc: "Vista semanal y mensual de actividades.",
    notificationsDesc: "Preferencias, dispositivos e historial de recordatorios.",
    historyDesc: "Consulta actividades completadas, pospuestas y pendientes.",
    reportsDesc: "Sigue los indicadores y la evolución de tu rutina.",
    settingsDesc: "Administra tu perfil, idioma y preferencias del sistema."
  }
} as const;

export type MessageKey = keyof typeof messages.pt;
