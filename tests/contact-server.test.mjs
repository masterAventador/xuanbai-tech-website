import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { createXuanbaiServer } from "../server/index.mjs";

async function createFixture() {
  const root = await mkdtemp(path.join(tmpdir(), "xuanbai-contact-"));
  const staticDir = path.join(root, "public");
  const databasePath = path.join(root, "data", "contact-leads.sqlite3");
  await mkdir(staticDir, { recursive: true });
  await writeFile(
    path.join(staticDir, "index.html"),
    "<!doctype html><title>玄白科技</title>",
  );

  const server = createXuanbaiServer({
    databasePath,
    host: "127.0.0.1",
    port: 0,
    staticDir,
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    databasePath,
    root,
    server,
  };
}

async function closeFixture(fixture) {
  await new Promise((resolve, reject) => {
    fixture.server.close((error) => (error ? reject(error) : resolve()));
  });
  await rm(fixture.root, { force: true, recursive: true });
}

test("POST /api/contact-leads 将完整联系信息写入 SQLite", async (t) => {
  const fixture = await createFixture();
  t.after(() => closeFixture(fixture));

  const response = await fetch(`${fixture.baseUrl}/api/contact-leads`, {
    body: JSON.stringify({
      contact: "lin@example.com",
      name: "林先生",
      note: "想预约一次产品演示",
      scene: "AI 设计与内容创作",
      sourcePath: "/tiangong/",
      website: "",
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  assert.equal(response.status, 201);
  const payload = await response.json();
  assert.equal(payload.ok, true);
  assert.match(payload.id, /^[0-9a-f-]{36}$/);

  const database = new DatabaseSync(fixture.databasePath, { readOnly: true });
  const stored = database
    .prepare(
      `SELECT id, name, contact, scene, note, source_path, status, created_at
       FROM contact_leads
       WHERE id = ?`,
    )
    .get(payload.id);
  database.close();

  assert.deepEqual(
    {
      contact: stored.contact,
      name: stored.name,
      note: stored.note,
      scene: stored.scene,
      sourcePath: stored.source_path,
      status: stored.status,
    },
    {
      contact: "lin@example.com",
      name: "林先生",
      note: "想预约一次产品演示",
      scene: "AI 设计与内容创作",
      sourcePath: "/tiangong/",
      status: "new",
    },
  );
  assert.match(stored.created_at, /^\d{4}-\d{2}-\d{2}T/);
});

test("接口拒绝无效数据，并且不会产生空线索记录", async (t) => {
  const fixture = await createFixture();
  t.after(() => closeFixture(fixture));

  const response = await fetch(`${fixture.baseUrl}/api/contact-leads`, {
    body: JSON.stringify({
      contact: "",
      name: "",
      note: "",
      scene: "不存在的产品",
      sourcePath: "/",
      website: "",
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  assert.equal(response.status, 422);

  const database = new DatabaseSync(fixture.databasePath, { readOnly: true });
  const stored = database
    .prepare("SELECT COUNT(*) AS count FROM contact_leads")
    .get();
  database.close();
  assert.equal(stored.count, 0);
});

test("联系信息没有公开查询接口", async (t) => {
  const fixture = await createFixture();
  t.after(() => closeFixture(fixture));

  const response = await fetch(`${fixture.baseUrl}/api/contact-leads`);
  assert.equal(response.status, 405);
});
