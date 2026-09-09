import type { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: ReactNode }) { return <section className={clsx("surface rounded-2xl", className)}>{children}</section>; }
export function Badge({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "amber" | "red" | "slate" | "blue" }) {
  const colors = { green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", red: "bg-rose-50 text-rose-700", slate: "bg-slate-100 text-slate-600", blue: "bg-sky-50 text-sky-700" };
  return <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", colors[tone])}>{children}</span>;
}
export function Button({ className, children, ...props }: ComponentProps<"button">) { return <button className={clsx("inline-flex items-center justify-center gap-2 rounded-lg bg-[#0b4624] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#07351c] disabled:opacity-50", className)} {...props}>{children}</button>; }
export const peso = (value: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
