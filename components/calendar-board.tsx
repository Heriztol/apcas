"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Bell, CalendarDots, MapPin, Plus, UsersThree, X } from "@phosphor-icons/react";
import { Button, Card, Badge } from "@/components/ui";

type CalendarEvent = { title: string; start: string; color: string };

export function CalendarBoard() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { title: "Nursing Week Planning", start: "2026-08-03", color: "#22a565" },
    { title: "Submit Event Proposal", start: "2026-08-07", color: "#ef7d6d" },
    { title: "Committee Meeting", start: "2026-08-12", color: "#4b94d0" },
    { title: "Meeting with Adviser", start: "2026-08-19", color: "#8b6bd9" },
    { title: "Document Submission", start: "2026-08-26", color: "#22a565" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-08-28");

  function addEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !date) return;
    setEvents((current) => [...current, { title: title.trim(), start: date, color: "#0b4624" }]);
    setTitle("");
    setShowForm(false);
  }

  return <div className="space-y-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">Planner and reminders</p><h1 className="mt-1 text-2xl font-black tracking-tight">Council calendar</h1></div><Button type="button" onClick={() => setShowForm(true)}><Plus size={16} weight="bold" /> Add event</Button></div>{showForm && <Card className="border-emerald-200 p-5"><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-black">Create calendar event</h2><button type="button" aria-label="Close event form" onClick={() => setShowForm(false)}><X size={18} /></button></div><form onSubmit={addEvent} className="grid gap-3 sm:grid-cols-[1fr_180px_auto]"><input required autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Event title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" /><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" /><Button type="submit">Create event</Button></form></Card>}<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]"><Card className="p-4 sm:p-5"><FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" initialDate="2026-08-01" headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,dayGridWeek" }} height="auto" editable selectable events={events} /></Card><aside className="space-y-4"><Card className="p-5"><div className="flex items-center justify-between"><CalendarDots size={22} className="text-emerald-700" weight="bold" /><Badge tone="green">Confirmed</Badge></div><h2 className="mt-3 text-sm font-black">Nursing Week Planning</h2><p className="mt-1 text-xs text-slate-500">Mon, Aug 3, 2026 · 8:00-9:30 AM</p><div className="mt-4 space-y-2 border-t border-[#e7efe9] pt-4 text-xs text-slate-600"><p className="flex gap-2"><MapPin size={16} className="text-emerald-600" weight="bold" />Conference Room A</p><p className="flex gap-2"><UsersThree size={16} className="text-emerald-600" weight="bold" />6 council attendees</p><p className="flex gap-2"><Bell size={16} className="text-emerald-600" weight="bold" />Two reminders enabled</p></div></Card><Card className="p-5"><h2 className="text-sm font-black">Connected records</h2><p className="mt-2 text-xs leading-5 text-slate-500">Events can connect to projects, tasks, documents, meetings, and budget records.</p></Card></aside></div></div>;
}
