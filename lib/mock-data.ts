import type { BudgetAggregate, ProjectConnection, Task } from "@/lib/types";

export const organizationTasks: Task[] = [
  { id: "task-1", title: "Finalize Nursing Week program flow", scope: "ORGANIZATION", status: "IN_PROGRESS", priority: "HIGH", dueDate: "Aug 25, 2026", assignees: ["Council member", "Anna Reyes"], links: { project: "Nursing Week 2026", event: "Opening Program" } },
  { id: "task-2", title: "Confirm venue and equipment request", scope: "ORGANIZATION", status: "TODO", priority: "MEDIUM", dueDate: "Aug 24, 2026", assignees: ["Carlos Rivera"], links: { project: "Nursing Week 2026", budget: "Nursing Week Budget" } },
  { id: "task-3", title: "Review submitted sponsor proposal", scope: "ORGANIZATION", status: "TODO", priority: "LOW", dueDate: "Aug 29, 2026", assignees: ["Council member"], links: { project: "Nursing Week 2026" } },
];

export const personalTasks: Task[] = [
  { id: "private-1", title: "Prepare President's Board notes", scope: "PERSONAL", status: "TODO", priority: "HIGH", dueDate: "Aug 25, 2026", assignees: [], ownerUserId: "current-user" },
  { id: "private-2", title: "Review council account roster", scope: "PERSONAL", status: "IN_PROGRESS", priority: "MEDIUM", dueDate: "Aug 27, 2026", assignees: [], ownerUserId: "current-user" },
];

// This is shaped exactly like a server-returned aggregate/RPC result. Client components only render it.
export const nursingWeekBudget: BudgetAggregate = {
  allocated: 30000, actualSpent: 18500, remaining: 11500, utilizationPercent: 61.67, approvedExpenseCount: 8,
  categorySpend: [
    { name: "Food & refreshment", allocated: 9000, actualSpent: 6500 },
    { name: "Printing", allocated: 4000, actualSpent: 3200 },
    { name: "Transport", allocated: 5000, actualSpent: 4800 },
    { name: "Equipment", allocated: 7000, actualSpent: 2500 },
    { name: "Other", allocated: 5000, actualSpent: 1500 },
  ],
};

export const projectConnections: Record<string, ProjectConnection[]> = {
  Events: [{ name: "Nursing Week Opening", date: "Aug 26 · 8:00 AM", owner: "Conference Room A", state: "Confirmed" }],
  "Organization Tasks": organizationTasks.map((task) => ({ name: task.title, date: task.dueDate, owner: task.assignees.join(", "), state: task.status.replace("_", " ") })),
  Documents: [{ name: "Nursing Week Proposal v3.pdf", date: "Aug 24, 2026", owner: "Anna Reyes", state: "Approved" }, { name: "Venue request letter.docx", date: "Aug 22, 2026", owner: "Carlos Rivera", state: "Submitted" }],
  "Meeting Action Items": [{ name: "Submit equipment inventory", date: "Aug 23, 2026", owner: "Facilities Committee", state: "Open" }],
};
