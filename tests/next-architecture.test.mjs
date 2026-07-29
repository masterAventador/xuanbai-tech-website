import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, ROOT), "utf8");
}

test("uses Next.js App Router with a static Sites-compatible build", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const nextConfig = await read("next.config.mjs");

  assert.match(packageJson.scripts.dev, /^next dev\b/);
  assert.match(packageJson.scripts.build, /^next build\b/);
  assert.equal(packageJson.scripts.preview, "serve dist/client");
  assert.ok(packageJson.dependencies.next);
  assert.equal(packageJson.dependencies["react-router-dom"], undefined);
  assert.equal(packageJson.dependencies.vite, undefined);
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /distDir:\s*["']dist\/client["']/);
});

test("defines a shared layout and metadata for every public page", async () => {
  const routes = [
    ["src/app/page.jsx", "玄白科技"],
    ["src/app/baize/page.jsx", "白泽"],
    ["src/app/tiangong/page.jsx", "天工"],
    ["src/app/qianshou/page.jsx", "千手"],
  ];

  const layout = await read("src/app/layout.jsx");
  assert.match(layout, /export const metadata\s*=/);
  assert.match(layout, /<html[^>]+data-scroll-behavior="smooth"/);
  assert.match(layout, /<SiteShell>/);

  for (const [route, expectedTitle] of routes) {
    const source = await read(route);
    assert.match(source, /export const metadata\s*=/);
    assert.match(source, new RegExp(expectedTitle));
  }
});

test("does not retain the Vite or client-side router entrypoints", async () => {
  const sources = await Promise.all([
    read("src/components/Shared.jsx"),
    read("src/components/SiteChrome.jsx"),
  ]);

  for (const source of sources) {
    assert.doesNotMatch(source, /react-router-dom/);
  }
});

test("keeps icon-based presentation components behind a client boundary", async () => {
  const clientModules = [
    "src/components/Shared.jsx",
    "src/views/HomePage.jsx",
    "src/views/BaizePage.jsx",
    "src/views/TiangongPage.jsx",
    "src/views/QianshouPage.jsx",
  ];

  for (const modulePath of clientModules) {
    const source = await read(modulePath);
    assert.match(source, /^"use client";/);
  }
});

test("removes obsolete Vite entrypoints and documents the new architecture", async () => {
  const obsoleteFiles = [
    "index.html",
    "vite.config.mjs",
    "src/App.jsx",
    "src/main.jsx",
  ];

  for (const relativePath of obsoleteFiles) {
    await assert.rejects(access(new URL(relativePath, ROOT)), {
      code: "ENOENT",
    });
  }

  const readme = await read("README.md");
  assert.match(readme, /Next\.js App Router/);
  assert.doesNotMatch(readme, /React、Vite、React Router/);
});

test("reuses the globally linked Playwright with the system Chrome channel", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const playwrightConfig = await read("playwright.config.js");
  const readme = await read("README.md");

  assert.equal(packageJson.devDependencies["@playwright/test"], undefined);
  assert.equal(packageJson.devDependencies.playwright, undefined);
  assert.match(playwrightConfig, /channel:\s*["']chrome["']/);
  assert.match(readme, /npm link --no-save @playwright\/test playwright/);
});

test("ships a brand favicon with the static site", async () => {
  const icon = await read("src/app/icon.svg");

  assert.match(icon, /<svg\b/);
  assert.match(icon, /玄白科技/);
});
