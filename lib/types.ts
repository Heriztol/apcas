/** Domain types mirror the Day 1 PostgreSQL model; UI never owns authorization or financial totals. */
export type AccountStatus = "ACTIVE" | "PENDING" | "DISABLED" | "REVOKED";
export type TaskScope = "ORGANIZATION" | "PERSONAL";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface CouncilAccount { id: string; councilId: string; name: string; email: string; status: AccountStatus; }
export interface Task { id: string; title: string; scope: TaskScope; status: TaskStatus; priority: Priority; dueDate: string; assignees: string[]; links?: { project?: string; event?: string; meeting?: string; budget?: string }; ownerUserId?: string; }
export interface BudgetAggregate { allocated: number; actualSpent: number; remaining: number; utilizationPercent: number; approvedExpenseCount: number; categorySpend: { name: string; allocated: number; actualSpent: number }[]; }
export interface ProjectConnection { name: string; date: string; owner: string; state: string; }
