import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

function waitForOutputOrExit(child, expectedText, timeoutMs) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => {
      reject(new Error(`等待生产服务启动超时：${output}`));
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timeout);
      child.stdout.off("data", onData);
      child.off("exit", onExit);
    };
    const onData = (chunk) => {
      output += chunk.toString();
      if (output.includes(expectedText)) {
        cleanup();
        resolve();
      }
    };
    const onExit = (code, signal) => {
      cleanup();
      reject(
        new Error(
          `生产服务尚未监听便退出：code=${code}, signal=${signal}, output=${output}`,
        ),
      );
    };

    child.stdout.on("data", onData);
    child.once("exit", onExit);
  });
}

test("生产服务通过 current 软链接启动时仍会持续监听", async () => {
  const temporaryDirectory = await mkdtemp(
    path.join(tmpdir(), "xuanbai-production-lifecycle-"),
  );
  const staticDirectory = path.join(temporaryDirectory, "static");
  const currentLink = path.join(temporaryDirectory, "current");
  await mkdir(staticDirectory);
  await writeFile(path.join(staticDirectory, "index.html"), "玄白科技");
  await symlink(ROOT, currentLink);

  const child = spawn(
    process.execPath,
    [path.join(currentLink, "server", "index.mjs")],
    {
      cwd: currentLink,
      env: {
        ...process.env,
        HOST: "127.0.0.1",
        PORT: "43120",
        XUANBAI_DB_PATH: path.join(temporaryDirectory, "contact-leads.sqlite3"),
        XUANBAI_STATIC_DIR: staticDirectory,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  try {
    await waitForOutputOrExit(child, "玄白科技官网已启动", 10_000);
    const response = await fetch("http://127.0.0.1:43120/");
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "玄白科技");
  } finally {
    child.kill("SIGTERM");
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
});
