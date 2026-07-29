import { randomUUID } from "node:crypto";

const CONTACT_API_PATH = "/api/contact-leads";
const MAX_BODY_BYTES = 16 * 1024;
const SCENE_OPTIONS = new Set([
  "企业 AI 中台",
  "AI 设计与内容创作",
  "桌面端 RPA 自运营",
  "综合合作",
]);

function sendJson(response, status, payload, additionalHeaders = {}) {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    ...additionalHeaders,
  });
  response.end(JSON.stringify(payload));
}

function normalizeText(value, maximumLength) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maximumLength);
}

async function readJsonBody(request) {
  const contentType = request.headers["content-type"] ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    const error = new Error("只接受 JSON 请求");
    error.status = 415;
    throw error;
  }

  let totalBytes = 0;
  const chunks = [];
  for await (const chunk of request) {
    totalBytes += chunk.length;
    if (totalBytes > MAX_BODY_BYTES) {
      const error = new Error("请求内容过大");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("请求内容不是有效 JSON");
    error.status = 400;
    throw error;
  }
}

function validateContactLead(payload) {
  const lead = {
    contact: normalizeText(payload?.contact, 160),
    name: normalizeText(payload?.name, 80),
    note: normalizeText(payload?.note, 2000),
    scene: normalizeText(payload?.scene, 80),
    sourcePath: normalizeText(payload?.sourcePath, 240) || "/",
    website: normalizeText(payload?.website, 240),
  };

  if (!lead.name || !lead.contact || !SCENE_OPTIONS.has(lead.scene)) {
    const error = new Error("请完整填写称呼、联系方式和产品方向");
    error.status = 422;
    throw error;
  }

  return lead;
}

export async function handleContactApiRequest(
  request,
  response,
  store,
  requestUrl,
) {
  if (requestUrl.pathname !== CONTACT_API_PATH) {
    return false;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { message: "此接口只接受提交" }, { Allow: "POST" });
    return true;
  }

  try {
    const payload = await readJsonBody(request);
    const validated = validateContactLead(payload);
    const id = randomUUID();

    if (!validated.website) {
      store.create({
        contact: validated.contact,
        createdAt: new Date().toISOString(),
        id,
        name: validated.name,
        note: validated.note,
        scene: validated.scene,
        sourcePath: validated.sourcePath,
        status: "new",
      });
    }

    sendJson(response, 201, { id, ok: true });
  } catch (error) {
    const status = Number.isInteger(error.status) ? error.status : 503;
    if (status === 503) {
      console.error("[contact-leads] 数据写入失败", error);
    }
    sendJson(response, status, {
      message:
        status === 503 ? "联系信息暂时无法保存，请稍后再试" : error.message,
    });
  }

  return true;
}

export function sendApiNotFound(response) {
  sendJson(response, 404, { message: "接口不存在" });
}
