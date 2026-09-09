import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  const { data: profile, error } = await supabase.from("profiles").select("full_name, school_email, is_access_administrator").eq("id", user.id).maybeSingle();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ profile: profile ?? { full_name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Council member", school_email: user.email ?? "", is_access_administrator: false } });
}
