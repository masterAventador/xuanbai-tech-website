import { expect, test } from "@playwright/test";

test("首页业务场景导航直达对应产品介绍", async ({ page, isMobile }) => {
  test.skip(isMobile, "移动端导航由专门用例覆盖");

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "让 AI 真正参与工作" }),
  ).toBeVisible();

  for (const scenario of [
    {
      name: "企业知识问答",
      path: "/baize",
      anchor: "knowledge-base",
    },
    {
      name: "业务数据查询",
      path: "/baize",
      anchor: "business-query",
    },
    {
      name: "原型设计",
      path: "/tiangong",
      anchor: "prototype-design",
    },
    {
      name: "演示汇报",
      path: "/tiangong",
      anchor: "presentation-design",
    },
    {
      name: "热门动态",
      path: "/qianshou",
      anchor: "hotspot-discovery",
    },
    {
      name: "内容自运营",
      path: "/qianshou",
      anchor: "workflow",
    },
  ]) {
    await page
      .getByRole("navigation", { name: "主导航" })
      .getByRole("link", { name: scenario.name, exact: true })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${scenario.path}/?#${scenario.anchor}$`),
    );
    await expect(page.locator(`#${scenario.anchor}`)).toBeInViewport();
    await page.goto("/");
  }
});

test("业务场景详情显示唯一当前导航 indicator", async ({ page, isMobile }) => {
  test.skip(isMobile, "桌面端页签 indicator 由此用例覆盖");

  for (const scenario of [
    {
      name: "业务数据查询",
      path: "/baize#business-query",
    },
    {
      name: "演示汇报",
      path: "/tiangong#presentation-design",
    },
    {
      name: "热门动态",
      path: "/qianshou#hotspot-discovery",
    },
  ]) {
    await page.goto(scenario.path);
    const navigation = page.getByRole("navigation", { name: "主导航" });
    const currentLink = navigation.getByRole("link", {
      name: scenario.name,
      exact: true,
    });
    await expect(currentLink).toHaveAttribute("aria-current", "location");
    await expect(currentLink).toHaveClass(/is-active/);
    await expect(navigation.locator(".is-active")).toHaveCount(1);
  }
});

test("白泽只呈现业务价值，不公开技术实现路径", async ({ page }) => {
  await page.goto("/baize");
  await expect(page.getByText(/知识库定时自动更新/)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "拖拽编排，按计划自动执行。" }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/HTTP|MCP|参数映射/i);
});

test("联系合作表单提供校验与成功反馈", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "联系合作" }).first().click();
  await page.getByRole("button", { name: "提交联系信息" }).click();
  await expect(page.locator(".form-error")).toHaveText("请填写称呼和联系方式");

  await page.getByRole("button", { name: "想了解什么：企业 AI 中台" }).click();
  await page.getByRole("option", { name: "AI 设计与内容创作" }).click();

  const uniqueContact = `e2e-${Date.now()}@xuanbai.tech`;
  await page.getByLabel("怎么称呼你").fill("玄白访客");
  await page.getByLabel("联系方式").fill(uniqueContact);
  await page.getByLabel("补充说明").fill("真实链路自动化验收");
  await page.getByRole("button", { name: "提交联系信息" }).click();
  await expect(
    page.getByRole("heading", { name: "已收到，我们会尽快联系你。" }),
  ).toBeVisible();

  const persisted = await page.request.get(
    `/api/test-only/contact-leads/${encodeURIComponent(uniqueContact)}`,
  );
  expect(persisted.status()).toBe(404);
});

test("千手明确自动发布、自运营与消息来源", async ({ page }) => {
  await page.goto("/qianshou");
  await expect(
    page.getByRole("button", { name: "自动发布已开启" }),
  ).toBeVisible();
  await expect(page.getByText(/微信好友申请/).first()).toBeVisible();

  for (const platform of ["抖音", "快手", "视频号", "微信"]) {
    await expect(
      page.getByText(platform, { exact: true }).first(),
    ).toBeVisible();
  }
});

test("移动端导航可以展开并进入业务场景", async ({ page, isMobile }) => {
  test.skip(!isMobile, "仅在移动端项目运行");

  await page.goto("/");
  await page.getByRole("button", { name: "打开导航" }).click();
  await page
    .getByRole("navigation", { name: "移动端导航" })
    .getByRole("link", { name: "企业知识问答", exact: true })
    .click();
  await expect(page).toHaveURL(/\/baize\/?#knowledge-base$/);
  await expect(page.locator("#knowledge-base")).toBeInViewport();
});
