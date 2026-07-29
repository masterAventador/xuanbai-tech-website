import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

function waitForOutput(child, expectedText, timeoutMs) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => {
      reject(new Error(`等待开发服务启动超时：${output}`));
    }, timeoutMs);

    const onData = (chunk) => {
      output += chunk.toString();
      if (output.includes(expectedText)) {
        clearTimeout(timeout);
        child.stdout.off("data", onData);
        resolve();
      }
    };
    child.stdout.on("data", onData);
  });
}

function waitForExit(child, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("开发服务收到 SIGTERM 后没有按时退出"));
    }, timeoutMs);
    child.once("exit", (code, signal) => {
      clearTimeout(timeout);
      resolve({ code, signal });
    });
  });
}

test("开发服务收到 SIGTERM 后会关闭数据库并正常退出", async () => {
  const temporaryDirectory = await mkdtemp(
    path.join(tmpdir(), "xuanbai-dev-lifecycle-"),
  );
  const child = spawn(process.execPath, ["server/dev.mjs"], {
    cwd: ROOT,
    env: {
      ...process.env,
      HOST: "127.0.0.1",
      PORT: "43119",
      XUANBAI_DB_PATH: path.join(temporaryDirectory, "contact-leads.sqlite3"),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForOutput(child, "玄白科技开发服务已启动", 20_000);
    child.kill("SIGTERM");
    const result = await waitForExit(child, 5_000);
    assert.deepEqual(result, { code: 0, signal: null });
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
    }
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
});
