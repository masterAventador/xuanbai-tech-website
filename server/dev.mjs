import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import next from "next";
import { handleContactApiRequest, sendApiNotFound } from "./contact-api.mjs";
import { createContactLeadStore } from "./contact-database.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.HOST ?? "127.0.0.1";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const app = next({ dev: true, hostname: host, port });
const nextHandler = app.getRequestHandler();

await app.prepare();

const store = createContactLeadStore(
  process.env.XUANBAI_DB_PATH ??
    path.join(ROOT, "data", "contact-leads.sqlite3"),
);

const server = createServer((request, response) => {
  const requestUrl = new URL(
    request.url ?? "/",
    `http://${request.headers.host ?? "localhost"}`,
  );

  Promise.resolve()
    .then(async () => {
      if (await handleContactApiRequest(request, response, store, requestUrl)) {
        return;
      }
      if (requestUrl.pathname.startsWith("/api/")) {
        sendApiNotFound(response);
        return;
      }
      await nextHandler(request, response);
    })
    .catch((error) => {
      console.error("[dev-server] 请求处理失败", error);
      if (!response.headersSent) {
        response.writeHead(500);
      }
      response.end("Internal server error");
    });
});

server.listen(port, host, () => {
  console.log(`玄白科技开发服务已启动：http://${host}:${port}`);
});

let stopping = false;

async function stop() {
  if (stopping) {
    return;
  }
  stopping = true;

  const forcedExit = setTimeout(() => process.exit(1), 10_000);
  forcedExit.unref();

  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  store.close();
  await app.close();
  process.exit(0);
}

process.once("SIGINT", () => void stop());
process.once("SIGTERM", () => void stop());
