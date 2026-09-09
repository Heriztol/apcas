import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signIn(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect(`/login?error=${encodeURIComponent("Unable to sign in. Check your school email and password.")}`);
  redirect("/dashboard");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="grid min-h-screen place-items-center bg-[#f4f8f5] px-5 soft-grid"><section className="w-full max-w-md rounded-2xl border border-[#dce8df] bg-white p-7 shadow-xl"><div className="mb-7 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#0b4624] text-sm font-black text-white">A</div><div><p className="text-sm font-black tracking-wide text-[#07351c]">APCAS</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-700">Student Council</p></div></div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">Secure sign in</p><h1 className="mt-1 text-2xl font-black tracking-tight text-[#173324]">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Use your approved school account to access the council workspace.</p>{error && <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{error}</p>}<form action={signIn} className="mt-6 space-y-4"><label className="block text-xs font-bold text-slate-700">School email<input required type="email" name="email" autoComplete="email" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" /></label><label className="block text-xs font-bold text-slate-700">Password<input required type="password" name="password" autoComplete="current-password" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" /></label><button type="submit" className="w-full rounded-lg bg-[#0b4624] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#07351c]">Sign in</button></form><p className="mt-5 text-center text-[11px] leading-5 text-slate-400">Access is managed by the APCAS Student Council administrator.</p></section></main>;
}