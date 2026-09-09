import type { CouncilAccount } from "@/lib/types";

const ID_PATTERN = /^17\d{6}$/;
const existingIds = new Set(["17123456", "17000001", "17999999"]);

export function normalizeCouncilId(value: string) { return value.trim().replace(/\s/g, ""); }
export function validateCouncilId(value: string) {
  const councilId = normalizeCouncilId(value);
  return ID_PATTERN.test(councilId) ? null : "Council ID must contain exactly 8 digits and start with 17.";
}

/** Replace this with a Supabase RPC using a UNIQUE index + transaction before production release. */
export function generateSafeSuggestions(councilId: string): string[] {
  const base = Number(councilId);
  const suggestions: string[] = [];
  for (let offset = 1; suggestions.length < 3 && base + offset <= 17999999; offset += 1) {
    const candidate = String(base + offset);
    if (ID_PATTERN.test(candidate) && !existingIds.has(candidate)) suggestions.push(candidate);
  }
  return suggestions;
}

export function provisionAccount(input: Omit<CouncilAccount, "id">) {
  const councilId = normalizeCouncilId(input.councilId);
  const formatError = validateCouncilId(councilId);
  if (formatError) return { ok: false as const, reason: "INVALID" as const, message: formatError };
  // Transaction boundary in production: recheck unique council_accounts.council_id, then insert + audit log together.
  if (existingIds.has(councilId)) return { ok: false as const, reason: "DUPLICATE" as const, message: `Council ID ${councilId} already exists.`, suggestions: generateSafeSuggestions(councilId) };
  existingIds.add(councilId);
  return { ok: true as const, account: { ...input, councilId, id: crypto.randomUUID() } };
}
