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

test("千手明确发布确认与消息来源", async ({ page }) => {
  await page.goto("/qianshou");
  await expect(page.getByRole("button", { name: "确认发布" })).toBeVisible();

  for (const platform of ["抖音", "微信", "小红书", "快手"]) {
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
