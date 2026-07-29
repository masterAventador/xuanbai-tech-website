"use client";

import {
  ChatCenteredText,
  Check,
  ShieldCheck,
  Sparkle,
  VideoCamera,
  Warning,
} from "@phosphor-icons/react";
import {
  FinalCta,
  FlowLine,
  HeroActions,
  HotspotPreview,
  ImagePanel,
  SectionIntro,
} from "../components/Shared.jsx";

const OPERATING_FLOW = [
  { icon: "find", label: "发现热点", copy: "实时捕捉新鲜机会" },
  { icon: "angle", label: "确定角度", copy: "形成选题和脚本" },
  { icon: "create", label: "生成视频", copy: "成片与轻量剪辑" },
  { icon: "approve", label: "人工确认", copy: "确认内容与平台" },
  { icon: "publish", label: "发布", copy: "进入内容日历" },
  { icon: "interact", label: "处理互动", copy: "普通消息自动托管" },
];

const PLATFORM_ITEMS = [
  { name: "抖音", count: "99+", tone: "douyin" },
  { name: "微信", count: "67", tone: "wechat" },
  { name: "小红书", count: "32", tone: "rednote" },
  { name: "快手", count: "18", tone: "kuaishou" },
];

export function QianshouPage() {
  return (
    <main className="product-page qianshou-page">
      <section className="hero hero-product hero-qianshou">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-product-grid container">
          <div className="hero-content">
            <span className="eyebrow">千手 · AI 新媒体运营</span>
            <h1>热点刚出现，内容就开始行动</h1>
            <p className="hero-lead">
              实时捕捉新鲜热点，立即转化为内容并分发，全流程在一个平台完成，快人一步赢得关注。
            </p>
            <HeroActions
              primary="申请产品内测"
              secondary="了解工作方式"
              secondaryTo="/qianshou#workflow"
            />
          </div>
          <HotspotPreview compact />
        </div>
      </section>

      <section className="speed-section container">
        <SectionIntro
          copy="输入关键词，按新鲜度、上升速度与互动质量排序，帮助团队更早看到值得行动的内容。"
          eyebrow="实时机会"
          title="快，不是多做一步，是少等一步"
        />
        <ImagePanel
          alt="千手热点发现真实界面"
          className="qianshou-real-shot"
          src="/assets/qianshou/hotspots.png"
        />
      </section>

      <section className="operating-flow" id="workflow">
        <div className="container">
          <SectionIntro
            align="center"
            title="一条连续的行动链路，从发现到互动，都在同一处完成。"
          />
          <FlowLine items={OPERATING_FLOW} />
        </div>
      </section>

      <section className="qianshou-feature container">
        <div className="qianshou-feature-copy">
          <span className="eyebrow">内容生产</span>
          <h2>创作留在同一个工作台</h2>
          <p>
            从热点进入创作，在“智能素材成片”“品牌动效成片”和“轻量剪辑”之间选择，不额外弹出另一套应用。
          </p>
          <ul className="check-list">
            <li>
              <VideoCamera aria-hidden="true" />
              从一句想法开始准备脚本与镜头
            </li>
            <li>
              <Sparkle aria-hidden="true" />
              根据内容目标选择成片方式
            </li>
            <li>
              <Check aria-hidden="true" />
              生成后继续进入轻量剪辑
            </li>
          </ul>
        </div>
        <ImagePanel
          alt="千手创作工作台真实界面"
          className="qianshou-real-shot"
          src="/assets/qianshou/creation.png"
        />
      </section>

      <section className="approval-section">
        <div className="container">
          <SectionIntro
            align="center"
            eyebrow="确认后发布"
            title="发布前，最后决定权仍在你"
            copy="AI 可以准备作品、文案与发布时间，但任何发布都不能绕过人工确认。"
          />
          <div className="approval-canvas">
            <ImagePanel
              alt="千手发布清单真实界面"
              src="/assets/qianshou/publishing.png"
            />
            <div className="approval-panel">
              <span className="platform-pill">抖音</span>
              <h3>新能源热点：三个判断信号</h3>
              <p>今天 18:30 · 内容日历</p>
              <div className="approval-checks">
                <span>
                  <Check aria-hidden="true" />
                  内容合规性已检查
                </span>
                <span>
                  <Check aria-hidden="true" />
                  合作信息已确认
                </span>
                <span>
                  <Check aria-hidden="true" />
                  平台与时间已确认
                </span>
              </div>
              <button className="button button-primary" type="button">
                确认发布
              </button>
              <small>
                <ShieldCheck aria-hidden="true" />
                发布确认永远无法被自动化绕过
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="interaction-section container">
        <SectionIntro
          eyebrow="消息与互动"
          title="普通消息交给 AI，重要判断留给人"
          copy="普通评论与私信默认由 AI 自动回复；投诉、敏感内容、低置信度和风险提示会暂停，等待人工处理。"
        />
        <div className="interaction-grid">
          <div className="platform-list">
            {PLATFORM_ITEMS.map((item) => (
              <div
                className={`platform-item platform-${item.tone}`}
                key={item.name}
              >
                <span>{item.name}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
          <div className="message-board">
            <div className="message-tabs">
              <span className="is-active">待处理</span>
              <span>AI 已回复</span>
              <span>全部</span>
            </div>
            <div className="message-row">
              <span className="platform-pill">抖音</span>
              <p>你这里说的电池寿命有数据来源吗？</p>
              <em>AI 托管中</em>
            </div>
            <div className="message-row">
              <span className="platform-pill">微信</span>
              <p>你好，想了解一下你们的合作方式。</p>
              <em>AI 已回复</em>
            </div>
            <div className="message-row is-risk">
              <span className="platform-pill">小红书</span>
              <p>这条内容涉及投诉，需要人工判断。</p>
              <em>等待人工</em>
            </div>
            <div className="message-row">
              <span className="platform-pill">快手</span>
              <p>能发一下视频里提到的清单吗？</p>
              <em>AI 托管中</em>
            </div>
          </div>
          <div className="ai-rules">
            <ChatCenteredText aria-hidden="true" />
            <h3>AI 处理规则</h3>
            <span>普通评论与私信：自动回复</span>
            <span>有效互动：继续跟进</span>
            <span>
              <Warning aria-hidden="true" />
              投诉与敏感内容：等待人工
            </span>
          </div>
        </div>
      </section>

      <FinalCta
        copy="更快捕捉、更快创作、更稳发布，让每一次热点都成为内容机会。"
        label="申请产品内测"
        title="热点不会等，千手先替你盯着。"
        tone="cyan"
      />
    </main>
  );
}
