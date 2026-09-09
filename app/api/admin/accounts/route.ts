import { NextResponse } from "next/server";
import { provisionAccount } from "@/lib/account-service";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("is_access_administrator").eq("id", user.id).maybeSingle();
  if (!profile?.is_access_administrator) return NextResponse.json({ message: "President access required." }, { status: 403 });
  const body = await request.json();
  const result = provisionAccount({ councilId: body.councilId ?? "", name: body.name ?? "", email: body.email ?? "", status: body.status ?? "ACTIVE" });
  return NextResponse.json(result, { status: result.ok ? 201 : result.reason === "DUPLICATE" ? 409 : 400 });
}
