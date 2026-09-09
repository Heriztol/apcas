import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeCouncilId, validateCouncilId } from "@/lib/account-service";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("is_access_administrator").eq("id", user.id).maybeSingle();
  if (!profile?.is_access_administrator) return NextResponse.json({ message: "President access required." }, { status: 403 });
  const body = await request.json();
  const councilId = normalizeCouncilId(String(body.councilId ?? ""));
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const status = body.status === "PENDING" ? "PENDING" : "ACTIVE";
  const formatError = validateCouncilId(councilId);
  if (formatError || name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ message: formatError ?? "Name and a valid school email are required." }, { status: 400 });

  const admin = createAdminClient();
  const { data: existing } = await admin.from("council_accounts").select("id").eq("council_id", councilId).maybeSingle();
  if (existing) return NextResponse.json({ ok: false, reason: "DUPLICATE", message: `Council ID ${councilId} already exists.`, suggestions: [] }, { status: 409 });
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, { data: { full_name: name, council_id: councilId } });
  if (inviteError || !invited.user) return NextResponse.json({ message: inviteError?.message ?? "Unable to invite account." }, { status: 400 });
  const authUserId = invited.user.id;
  const { error: profileError } = await admin.from("profiles").insert({ id: authUserId, full_name: name, school_email: email });
  const { data: account, error: accountError } = await admin.from("council_accounts").insert({ auth_user_id: authUserId, council_id: councilId, status, created_by: user.id }).select("id, council_id, status").single();
  if (profileError || accountError) {
    await admin.auth.admin.deleteUser(authUserId);
    return NextResponse.json({ message: profileError?.message ?? accountError?.message ?? "Unable to create council account." }, { status: 400 });
  }
  return NextResponse.json({ ok: true, account: { id: account.id, councilId: account.council_id, name, email, status: account.status } }, { status: 201 });
}
