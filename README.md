# APCAS SCMS

A runnable Next.js App Router vertical slice of the APCAS Student Council Management System. The Word specification is the functional source of truth; supplied images informed visual direction only.

## Included flows

- President-only account provisioning UI with 8-digit `17XXXXXX` validation, duplicate warning, and exactly three safe suggestions.
- Independent Organization and President Personal Task containers, including the data/permission distinction required by the final decision.
- FullCalendar-powered monthly planner surface.
- Connected Nursing Week project view for events, shared tasks, documents, meeting action items, and server-owned live budget aggregates.
- Supabase-ready service boundary, database schema, constraints, RLS starter policies, aggregate view, and environment template.

## Run locally in VS Code

1. Open this folder in VS Code.
2. Copy `.env.example` to `.env.local` and paste the **Project URL** and **anon key** from Supabase.
3. In a terminal, run `pnpm install`, then `pnpm dev`.
4. Open `http://localhost:3000`. Try `/admin/access` using the prefilled `17123456` to exercise the duplicate ID response.

## Connect Supabase

1. Create a Supabase project, then open its SQL Editor and run `supabase/schema.sql`.
2. In Authentication, enable email/password and configure your approved school email settings.
3. Create the first President account, then set `profiles.is_access_administrator = true` for that user in a protected bootstrap step.
4. Replace the mock account service with a Supabase RPC that checks `council_accounts.council_id` and inserts the account plus audit row in one transaction. Do not expose the service-role key to the browser.
5. Create a private Storage bucket for documents/receipts and add signed-URL, type/size validation, and download auditing.

## GitHub and Vercel

```powershell
git init
git add .
git commit -m "Initial APCAS SCMS vertical slice"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/apcas-scms.git
git push -u origin main
```

In Vercel: **Add New → Project → Import the GitHub repository**. Add all values from `.env.local` under Project Settings → Environment Variables, then deploy. Vercel automatically redeploys on pushes to `main`.

Before production, finish the listed database policies for every normal operational table, replace each mock repository, add server-side audit writes, and test both President and Council Member access paths.
