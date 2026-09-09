import { NextResponse } from "next/server";
import { provisionAccount } from "@/lib/account-service";

export async function POST(request: Request) {
  // Production guard: resolve the Supabase session and require profile.is_access_administrator here.
  const body = await request.json();
  const result = provisionAccount({ councilId: body.councilId ?? "", name: body.name ?? "", email: body.email ?? "", status: body.status ?? "ACTIVE" });
  return NextResponse.json(result, { status: result.ok ? 201 : result.reason === "DUPLICATE" ? 409 : 400 });
}
