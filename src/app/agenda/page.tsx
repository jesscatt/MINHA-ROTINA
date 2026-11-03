import { AppShell } from "@/components/app-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function AgendaPage() {
  return <AppShell active="calendar"><PagePlaceholder section="calendar" /></AppShell>;
}
