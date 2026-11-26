export type Row = Record<string, unknown>;
type Handler = (request: Request) => Response | Promise<Response>;
type Database = { from: (table: string) => unknown; rpc: (name: string, args: Row) => unknown };

let handler: Handler | undefined;
let database: Database | undefined;

export function serve(fn: Handler) {
  handler = fn;
}

export function selectFixture(nextDatabase: Database) {
  if (!handler) throw new Error("The Edge handler was not registered.");
  database = nextDatabase;
  return handler;
}

export function corsHeaders() {
  return {};
}

export function jsonResponse(body: unknown, status: number, headers: HeadersInit) {
  return Response.json(body, { status, headers });
}

export const supabaseAdmin = {
  from(table: string) {
    if (!database) throw new Error("A database fixture is required.");
    return database.from(table);
  },
  rpc(name: string, args: Row) {
    if (!database) throw new Error("A database fixture is required.");
    return database.rpc(name, args);
  },
};
