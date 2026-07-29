#!/usr/bin/env node
import { existsSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = path.resolve(
  process.env.XUANBAI_DB_PATH ?? "data/contact-leads.sqlite3",
);

if (!existsSync(databasePath)) {
  console.error(`数据库不存在：${databasePath}`);
  process.exit(1);
}

const database = new DatabaseSync(databasePath, { readOnly: true });
const rows = database
  .prepare(
    `SELECT
       created_at AS "提交时间",
       name AS "称呼",
       contact AS "联系方式",
       scene AS "产品方向",
       note AS "补充说明",
       source_path AS "来源页面",
       status AS "跟进状态"
     FROM contact_leads
     ORDER BY created_at DESC
     LIMIT 200`,
  )
  .all();
database.close();

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(rows, null, 2));
} else if (rows.length === 0) {
  console.log("当前还没有联系信息。");
} else {
  console.table(rows);
}
