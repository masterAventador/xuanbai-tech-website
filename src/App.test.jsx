import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteShell } from "./components/SiteChrome.jsx";
import { BaizePage } from "./views/BaizePage.jsx";
import { HomePage } from "./views/HomePage.jsx";
import { QianshouPage } from "./views/QianshouPage.jsx";
import { TiangongPage } from "./views/TiangongPage.jsx";

const { navigationState } = vi.hoisted(() => ({
  navigationState: { pathname: "/" },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

function renderPage(Page, { pathname = "/" } = {}) {
  navigationState.pathname = pathname;
  return render(
    <SiteShell>
      <Page />
    </SiteShell>,
  );
}

afterEach(() => {
  cleanup();
  navigationState.pathname = "/";
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
    expect(document.body).not.toHaveTextContent(/最终决定|关键动作前把决定权/);
  });

  it("天工详情页呈现完整创作过程而不是单一工具", () => {
    renderPage(TiangongPage);

    expect(screen.getByText(/左侧对话，右侧工作区/)).toBeInTheDocument();
    expect(screen.getByText(/网页端与桌面端/)).toBeInTheDocument();
    expect(screen.getByText("所有创作，共用同一个起点。")).toBeInTheDocument();
    expect(screen.getByText("界面与体验")).toBeInTheDocument();
    expect(screen.getByText("表达与汇报")).toBeInTheDocument();
    expect(screen.getByText("视觉与动态内容")).toBeInTheDocument();
    expect(
      screen.queryByText(/Open Design|Claude Design/i),
    ).not.toBeInTheDocument();
  });

  it("白泽详情页说明知识更新和定时工作流，但不泄露技术实现路径", () => {
    renderPage(BaizePage);

    expect(screen.getByText(/知识库定时自动更新/)).toBeInTheDocument();
    expect(screen.getAllByText(/连接企业现有业务系统/).length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByRole("heading", { name: "拖拽编排，按计划自动执行。" }),
    ).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(
      /HTTP|MCP|参数映射|analytics\.query\.metrics/i,
    );
  });

  it("千手详情页明确桌面端 RPA、自动发布和微信自运营能力", () => {
    renderPage(QianshouPage);

    expect(screen.getByText(/桌面端 RPA 自运营平台/)).toBeInTheDocument();
    expect(screen.getAllByText(/近 1 小时热点/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/自动发布/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/微信好友申请/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("抖音").length).toBeGreaterThan(0);
    expect(screen.getAllByText("快手").length).toBeGreaterThan(0);
    expect(screen.getAllByText("视频号").length).toBeGreaterThan(0);
  });

  it("带尾斜杠的产品路由也会显示当前导航 indicator", () => {
    renderPage(TiangongPage, { pathname: "/tiangong/" });

    const mainNavigation = screen.getByRole("navigation", { name: "主导航" });
    const currentLink = within(mainNavigation).getByRole("link", {
      name: "天工",
      current: "page",
    });
    expect(currentLink).toHaveClass("is-active");
    expect(mainNavigation.getElementsByClassName("is-active")).toHaveLength(1);
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
