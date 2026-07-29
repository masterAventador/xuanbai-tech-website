import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteShell } from "./components/SiteChrome.jsx";
import { BaizePage } from "./views/BaizePage.jsx";
import { HomePage } from "./views/HomePage.jsx";
import { QianshouPage } from "./views/QianshouPage.jsx";
import { TiangongPage } from "./views/TiangongPage.jsx";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

function renderPage(Page) {
  return render(
    <SiteShell>
      <Page />
    </SiteShell>,
  );
}

afterEach(() => {
  cleanup();
});

describe("玄白科技官网", () => {
  it("主页提供三个产品详情入口", () => {
    renderPage(HomePage);

    expect(
      screen.getByRole("heading", { name: "让 AI 真正参与工作" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "了解白泽" })).toHaveAttribute(
      "href",
      "/baize",
    );
    expect(screen.getByRole("link", { name: "了解天工" })).toHaveAttribute(
      "href",
      "/tiangong",
    );
    expect(screen.getByRole("link", { name: "了解千手" })).toHaveAttribute(
      "href",
      "/qianshou",
    );
  });

  it("天工详情页呈现完整创作过程而不是单一工具", () => {
    renderPage(TiangongPage);

    expect(screen.getByText("所有创作，共用同一个起点。")).toBeInTheDocument();
    expect(screen.getByText("界面与体验")).toBeInTheDocument();
    expect(screen.getByText("表达与汇报")).toBeInTheDocument();
    expect(screen.getByText("视觉与动态内容")).toBeInTheDocument();
  });

  it("千手详情页明确发布确认和消息来源", () => {
    renderPage(QianshouPage);

    expect(screen.getByText("发布前，最后决定权仍在你")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "确认发布" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("抖音").length).toBeGreaterThan(0);
    expect(screen.getAllByText("微信").length).toBeGreaterThan(0);
    expect(screen.getAllByText("小红书").length).toBeGreaterThan(0);
    expect(screen.getAllByText("快手").length).toBeGreaterThan(0);
  });

  it("联系表单校验必填项并给出提交成功反馈", async () => {
    const user = userEvent.setup();
    renderPage(HomePage);

    await user.click(screen.getAllByRole("button", { name: "联系合作" })[0]);
    expect(
      screen.getByRole("dialog", { name: "和玄白科技聊聊" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "提交联系信息" }));
    expect(screen.getByText("请填写称呼和联系方式")).toBeInTheDocument();

    await user.type(screen.getByLabelText("怎么称呼你"), "林先生");
    await user.type(screen.getByLabelText("联系方式"), "lin@example.com");
    await user.click(screen.getByRole("button", { name: "提交联系信息" }));

    expect(screen.getByText("已收到，我们会尽快联系你。")).toBeInTheDocument();
  });

  it("窄屏导航可以展开和关闭", async () => {
    const user = userEvent.setup();
    renderPage(BaizePage);

    const toggle = screen.getByRole("button", { name: "打开导航" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "移动端导航" })).toHaveClass(
      "is-open",
    );

    await user.click(screen.getByRole("button", { name: "关闭导航" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
