import { AppShell } from "@/components/app-shell"; import { ProjectWorkspace, type WorkspaceTab } from "@/components/project-workspace";

const queryTabs: Record<string, WorkspaceTab> = { documents: "Documents", "meeting-action-items": "Meeting Action Items", "live-budget": "Live Budget" };
export default async function NursingWeekPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) { const { tab } = await searchParams; return <AppShell><ProjectWorkspace initialTab={queryTabs[tab ?? ""]} /></AppShell>; }
