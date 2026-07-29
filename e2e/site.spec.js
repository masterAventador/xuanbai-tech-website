import { expect, test } from "@playwright/test";

test("首页可以进入三款产品详情", async ({ page, isMobile }) => {
  test.skip(isMobile, "移动端导航由专门用例覆盖");

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "让 AI 真正参与工作" }),
  ).toBeVisible();

  for (const product of [
    {
      name: "白泽",
      path: "/baize",
      heading: "让企业的知识、系统与 AI，在一处协同。",
    },
    {
      name: "天工",
      path: "/tiangong",
      heading: "一个工作台，容纳从想法到作品的全过程。",
    },
    { name: "千手", path: "/qianshou", heading: "热点刚出现，内容就开始行动" },
  ]) {
    await page
      .getByRole("link", { name: product.name, exact: true })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`${product.path}/?$`));
    await expect(
      page.getByRole("heading", { name: product.heading }),
    ).toBeVisible();
  }
});

test("产品详情页显示当前导航 indicator", async ({ page, isMobile }) => {
  test.skip(isMobile, "桌面端页签 indicator 由此用例覆盖");

  for (const product of [
    { name: "白泽", path: "/baize" },
    { name: "天工", path: "/tiangong" },
    { name: "千手", path: "/qianshou" },
  ]) {
    await page.goto(product.path);
    const currentLink = page
      .getByRole("navigation", { name: "主导航" })
      .getByRole("link", { name: product.name, exact: true });
    await expect(currentLink).toHaveAttribute("aria-current", "page");
    await expect(currentLink).toHaveClass(/is-active/);
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

  await page.getByLabel("怎么称呼你").fill("玄白访客");
  await page.getByLabel("联系方式").fill("example@xuanbai.tech");
  await page.getByRole("button", { name: "提交联系信息" }).click();
  await expect(
    page.getByRole("heading", { name: "已收到，我们会尽快联系你。" }),
  ).toBeVisible();
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

test("移动端导航可以展开并进入产品页", async ({ page, isMobile }) => {
  test.skip(!isMobile, "仅在移动端项目运行");

  await page.goto("/");
  await page.getByRole("button", { name: "打开导航" }).click();
  await page
    .getByRole("navigation", { name: "移动端导航" })
    .getByRole("link", { name: "白泽", exact: true })
    .click();
  await expect(page).toHaveURL(/\/baize\/?$/);
});
