import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const CONTACT_LEADS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS contact_leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    scene TEXT NOT NULL,
    note TEXT NOT NULL DEFAULT '',
    source_path TEXT NOT NULL DEFAULT '/',
    status TEXT NOT NULL DEFAULT 'new'
      CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx
    ON contact_leads (created_at DESC);

  CREATE INDEX IF NOT EXISTS contact_leads_status_idx
    ON contact_leads (status, created_at DESC);
`;

export function createContactLeadStore(databasePath) {
  const resolvedPath = path.resolve(databasePath);
  mkdirSync(path.dirname(resolvedPath), { recursive: true });

  const database = new DatabaseSync(resolvedPath);
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec("PRAGMA busy_timeout = 5000;");
  database.exec(CONTACT_LEADS_SCHEMA);

  const insertContactLead = database.prepare(`
    INSERT INTO contact_leads (
      id,
      name,
      contact,
      scene,
      note,
      source_path,
      status,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let closed = false;

  return {
    close() {
      if (!closed) {
        closed = true;
        database.close();
      }
    },
    create(lead) {
      insertContactLead.run(
        lead.id,
        lead.name,
        lead.contact,
        lead.scene,
        lead.note,
        lead.sourcePath,
        lead.status,
        lead.createdAt,
      );
    },
    path: resolvedPath,
  };
}
