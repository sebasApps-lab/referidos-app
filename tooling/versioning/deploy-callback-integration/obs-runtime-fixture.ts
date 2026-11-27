import { selectFixture } from "./edge-fixture.ts";

export { corsHeaders, jsonResponse, supabaseAdmin } from "./edge-fixture.ts";

let opsFrom: (table: string) => unknown;
let legacyTenant: string | undefined;

export function configureObsFixture({
  ops,
  runtime,
  legacy,
}: {
  ops: (table: string) => unknown;
  runtime: (table: string) => unknown;
  legacy?: string;
}) {
  opsFrom = ops;
  legacyTenant = legacy;
  return selectFixture({
    from: runtime,
    rpc() { throw new Error("Unexpected OBS fixture RPC"); },
  });
}

export function createClient() {
  return { from: (table: string) => opsFrom(table) };
}

export function resolveTenantIdByHint() {
  if (!legacyTenant) throw new Error("Unexpected legacy OBS tenant lookup");
  return Promise.resolve(legacyTenant);
}

export async function sha256Hex(value: string) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
