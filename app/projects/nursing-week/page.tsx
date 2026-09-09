import { AppShell } from "@/components/app-shell"; import { ProjectConnectedView, type Tab } from "@/components/project-connected-view";

const queryTabs: Record<string, Tab> = { documents: "Documents", "meeting-action-items": "Meeting Action Items", "live-budget": "Live Budget" };
export default async function NursingWeekPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) { const { tab } = await searchParams; return <AppShell><ProjectConnectedView initialTab={queryTabs[tab ?? ""]}/></AppShell>; }
