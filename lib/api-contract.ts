/** Representative API contract from Specification §17. Each mutation belongs in a service that enforces session, scope and audit rules. */
export const apiContract = {
  auth: ["POST /auth/login", "POST /auth/logout", "POST /auth/reset"],
  accounts: ["GET /admin/accounts", "POST /admin/accounts", "PATCH /admin/accounts/:id", "DELETE /admin/accounts/:id"],
  events: ["GET /events", "POST /events", "PATCH /events/:id", "DELETE /events/:id"],
  tasks: ["GET /tasks?scope=ORGANIZATION|PERSONAL", "POST /tasks", "PATCH /tasks/:id", "DELETE /tasks/:id"],
  projects: ["GET /projects", "POST /projects", "PATCH /projects/:id", "DELETE /projects/:id"],
  documents: ["POST /documents", "GET /documents/:id", "POST /documents/:id/versions"],
  meetings: ["GET /meetings", "POST /meetings", "PATCH /meetings/:id"],
  budgets: ["GET /budgets", "POST /budgets", "PATCH /budgets/:id", "POST /budgets/:id/expenses"],
  expenses: ["PATCH /expenses/:id", "POST /expenses/:id/void"],
  concerns: ["GET /concerns", "POST /concerns", "PATCH /concerns/:id"],
  announcements: ["GET /announcements", "POST /announcements", "PATCH /announcements/:id"],
  notifications: ["GET /notifications", "PATCH /notifications/:id/read"],
  audit: ["GET /audit-logs"],
} as const;
