import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleContactApiRequest, sendApiNotFound } from "./contact-api.mjs";
import { createContactLeadStore } from "./contact-database.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function setSecurityHeaders(response) {
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
}

async function findStaticFile(staticDir, pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidates =
    relativePath === ""
      ? ["index.html"]
      : relativePath.endsWith("/")
        ? [`${relativePath}index.html`]
        : [relativePath, `${relativePath}.html`, `${relativePath}/index.html`];

  for (const candidate of candidates) {
    const resolved = path.resolve(staticDir, candidate);
    if (
      resolved !== staticDir &&
      !resolved.startsWith(`${staticDir}${path.sep}`)
    ) {
      continue;
    }

    try {
      const fileStat = await stat(resolved);
      if (fileStat.isFile()) {
        return { path: resolved, size: fileStat.size };
      }
    } catch {
      // Try the next static-export filename.
    }
  }

  return null;
}

async function serveStatic(request, response, staticDir, requestUrl) {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  let file = await findStaticFile(staticDir, requestUrl.pathname);
  const acceptsHtml = request.headers.accept?.includes("text/html");
  if (!file && acceptsHtml) {
    file = await findStaticFile(staticDir, "/");
  }

  if (!file) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const extension = path.extname(file.path).toLowerCase();
  response.writeHead(200, {
    "Cache-Control":
      extension === ".html"
        ? "no-cache"
        : "public, max-age=31536000, immutable",
    "Content-Length": file.size,
    "Content-Type": MIME_TYPES.get(extension) ?? "application/octet-stream",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(file.path).pipe(response);
}

export function createXuanbaiServer({
  databasePath = path.join(ROOT, "data", "contact-leads.sqlite3"),
  staticDir = path.join(ROOT, "dist", "client"),
} = {}) {
  const resolvedStaticDir = path.resolve(staticDir);
  const store = createContactLeadStore(databasePath);

  const server = createServer((request, response) => {
    setSecurityHeaders(response);
    const requestUrl = new URL(
      request.url ?? "/",
      `http://${request.headers.host ?? "localhost"}`,
    );

    Promise.resolve()
      .then(async () => {
        if (
          await handleContactApiRequest(request, response, store, requestUrl)
        ) {
          return;
        }

        if (requestUrl.pathname.startsWith("/api/")) {
          sendApiNotFound(response);
          return;
        }

        await serveStatic(request, response, resolvedStaticDir, requestUrl);
      })
      .catch((error) => {
        console.error("[server] 请求处理失败", error);
        if (!response.headersSent) {
          response.writeHead(500, {
            "Content-Type": "application/json; charset=utf-8",
          });
        }
        response.end(JSON.stringify({ message: "服务器暂时不可用" }));
      });
  });

  server.once("close", () => store.close());
  return server;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const host = process.env.HOST ?? "127.0.0.1";
  const port = Number.parseInt(process.env.PORT ?? "4174", 10);
  const server = createXuanbaiServer({
    databasePath:
      process.env.XUANBAI_DB_PATH ??
      path.join(ROOT, "data", "contact-leads.sqlite3"),
    staticDir:
      process.env.XUANBAI_STATIC_DIR ?? path.join(ROOT, "dist", "client"),
  });

  server.listen(port, host, () => {
    console.log(`玄白科技官网已启动：http://${host}:${port}`);
  });

  const stop = () => server.close();
  process.once("SIGINT", stop);
  process.once("SIGTERM", stop);
}
