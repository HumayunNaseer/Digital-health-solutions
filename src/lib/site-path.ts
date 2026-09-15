const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function sitePath(path: string): string {
  return path.startsWith("/") && !path.startsWith("//")
    ? `${base}${path}`
    : path;
}

export function routePath(path: string): string {
  return base && (path === base || path.startsWith(`${base}/`))
    ? path.slice(base.length) || "/"
    : path;
}
