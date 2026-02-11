/**
 * Hermes fallback URL implementation for environments where URL is partial/broken.
 * It covers the subset required by supabase-js:
 * - new URL(absolute)
 * - new URL(relative, base)
 * - protocol/host/hostname/port/pathname/search/hash/origin/href
 * - protocol setter (used for realtime ws URL)
 */

type ParsedAbsolute = {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
};

const ABSOLUTE_RE =
  /^([a-zA-Z][a-zA-Z\d+.-]*:)?\/\/([^\/?#]*)([^?#]*)(\?[^#]*)?(#.*)?$/;

function normalizePath(pathname: string) {
  const parts = pathname.split("/");
  const stack: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      stack.pop();
      continue;
    }
    stack.push(part);
  }
  return "/" + stack.join("/");
}

function parseHost(authority: string) {
  let username = "";
  let password = "";
  let hostPort = authority;

  const at = authority.lastIndexOf("@");
  if (at >= 0) {
    const auth = authority.slice(0, at);
    hostPort = authority.slice(at + 1);
    const sep = auth.indexOf(":");
    if (sep >= 0) {
      username = auth.slice(0, sep);
      password = auth.slice(sep + 1);
    } else {
      username = auth;
    }
  }

  let hostname = hostPort;
  let port = "";
  if (!hostPort.startsWith("[")) {
    const colon = hostPort.lastIndexOf(":");
    if (colon > -1) {
      const maybePort = hostPort.slice(colon + 1);
      if (/^\d+$/.test(maybePort)) {
        hostname = hostPort.slice(0, colon);
        port = maybePort;
      }
    }
  }

  return { username, password, hostname, port };
}

function parseAbsoluteUrl(value: string): ParsedAbsolute {
  const input = String(value || "").trim();
  const match = input.match(ABSOLUTE_RE);
  if (!match || !match[1]) {
    throw new Error("Invalid URL");
  }
  const protocol = match[1];
  const authority = match[2] || "";
  const pathname = match[3] || "/";
  const search = match[4] || "";
  const hash = match[5] || "";

  const host = parseHost(authority);
  return {
    protocol,
    username: host.username,
    password: host.password,
    hostname: host.hostname,
    port: host.port,
    pathname: pathname || "/",
    search,
    hash,
  };
}

function isAbsoluteUrl(value: string) {
  return /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(value);
}

function resolveRelativeUrl(input: string, baseHref: string) {
  const base = parseAbsoluteUrl(baseHref);
  const baseHost = base.port ? `${base.hostname}:${base.port}` : base.hostname;
  const baseOrigin = `${base.protocol}//${baseHost}`;

  if (input.startsWith("//")) return `${base.protocol}${input}`;
  if (input.startsWith("/")) return `${baseOrigin}${input}`;
  if (input.startsWith("?")) return `${baseOrigin}${base.pathname}${input}`;
  if (input.startsWith("#")) return `${baseOrigin}${base.pathname}${base.search}${input}`;

  const baseDir = base.pathname.endsWith("/")
    ? base.pathname
    : base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1);
  const nextPath = normalizePath(`${baseDir}${input}`);
  return `${baseOrigin}${nextPath}`;
}

class URLShim {
  private _protocol = "";
  private _username = "";
  private _password = "";
  private _hostname = "";
  private _port = "";
  private _pathname = "/";
  private _search = "";
  private _hash = "";

  constructor(input: string, base?: string | { href?: string; toString?: () => string }) {
    const raw = String(input || "");
    let absolute = raw;

    if (!isAbsoluteUrl(raw)) {
      if (!base) throw new Error("Invalid URL");
      const baseHref =
        typeof base === "string"
          ? base
          : String((base as any).href || (base as any).toString?.() || "");
      absolute = resolveRelativeUrl(raw, baseHref);
    }

    this.assignFromAbsolute(absolute);
  }

  private assignFromAbsolute(absolute: string) {
    const parsed = parseAbsoluteUrl(absolute);
    this._protocol = parsed.protocol;
    this._username = parsed.username;
    this._password = parsed.password;
    this._hostname = parsed.hostname;
    this._port = parsed.port;
    this._pathname = parsed.pathname || "/";
    this._search = parsed.search || "";
    this._hash = parsed.hash || "";
  }

  get protocol() {
    return this._protocol;
  }
  set protocol(value: string) {
    const next = String(value || "").trim();
    this._protocol = next.endsWith(":") ? next : `${next}:`;
  }

  get username() {
    return this._username;
  }
  set username(value: string) {
    this._username = String(value || "");
  }

  get password() {
    return this._password;
  }
  set password(value: string) {
    this._password = String(value || "");
  }

  get hostname() {
    return this._hostname;
  }
  set hostname(value: string) {
    this._hostname = String(value || "");
  }

  get port() {
    return this._port;
  }
  set port(value: string) {
    this._port = String(value || "");
  }

  get host() {
    return this._port ? `${this._hostname}:${this._port}` : this._hostname;
  }
  set host(value: string) {
    const parsed = parseHost(String(value || ""));
    this._hostname = parsed.hostname;
    this._port = parsed.port;
  }

  get pathname() {
    return this._pathname;
  }
  set pathname(value: string) {
    const next = String(value || "");
    this._pathname = next.startsWith("/") ? next : `/${next}`;
  }

  get search() {
    return this._search;
  }
  set search(value: string) {
    const next = String(value || "");
    this._search = !next ? "" : next.startsWith("?") ? next : `?${next}`;
  }

  get hash() {
    return this._hash;
  }
  set hash(value: string) {
    const next = String(value || "");
    this._hash = !next ? "" : next.startsWith("#") ? next : `#${next}`;
  }

  get origin() {
    return `${this._protocol}//${this.host}`;
  }

  get href() {
    const auth =
      this._username || this._password
        ? `${this._username}${this._password ? `:${this._password}` : ""}@`
        : "";
    return `${this._protocol}//${auth}${this.host}${this._pathname}${this._search}${this._hash}`;
  }
  set href(value: string) {
    this.assignFromAbsolute(String(value || ""));
  }

  toString() {
    return this.href;
  }
}

function nativeUrlIsBroken() {
  try {
    const base = new URL("https://example.com/");
    const auth = new URL("auth/v1", base);
    const rt = new URL("realtime/v1", base);
    rt.protocol = rt.protocol.replace("http", "ws");
    return !auth.href || !rt.href || !base.hostname;
  } catch {
    return true;
  }
}

if (nativeUrlIsBroken()) {
  (globalThis as any).URL = URLShim as any;
}

