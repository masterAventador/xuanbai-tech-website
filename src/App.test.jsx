import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App.jsx";

function renderAt(pathname = "/") {
  window.history.pushState({}, "", pathname);
  return render(<App />);
}

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
});

describe("玄白科技官网", () => {
  it("从主页进入三个产品详情页", async () => {
    const user = userEvent.setup();
    renderAt();

    expect(
      screen.getByRole("heading", { name: "让 AI 真正参与工作" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "了解白泽" }));
    expect(
      screen.getByRole("heading", {
        name: "让企业的知识、系统与 AI，在一处协同。",
      }),
    ).toBeInTheDocument();

    await user.click(
      within(screen.getByRole("navigation", { name: "主导航" })).getByRole(
        "link",
        { name: "天工" },
      ),
    );
    expect(
      screen.getByRole("heading", {
        name: "一个工作台，容纳从想法到作品的全过程。",
      }),
    ).toBeInTheDocument();

    await user.click(
      within(screen.getByRole("navigation", { name: "主导航" })).getByRole(
        "link",
        { name: "千手" },
      ),
    );
    expect(
      screen.getByRole("heading", {
        name: "热点刚出现，内容就开始行动",
      }),
    ).toBeInTheDocument();
  });

  it("天工详情页呈现完整创作过程而不是单一工具", () => {
    renderAt("/tiangong");

    expect(screen.getByText("所有创作，共用同一个起点。")).toBeInTheDocument();
    expect(screen.getByText("界面与体验")).toBeInTheDocument();
    expect(screen.getByText("表达与汇报")).toBeInTheDocument();
    expect(screen.getByText("视觉与动态内容")).toBeInTheDocument();
  });

  it("千手详情页明确发布确认和消息来源", () => {
    renderAt("/qianshou");

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
    renderAt();

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
    renderAt();

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
