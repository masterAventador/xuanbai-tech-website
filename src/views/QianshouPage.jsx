"use client";

import {
  ChatCenteredText,
  Check,
  ShieldCheck,
  Sparkle,
  VideoCamera,
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
  { icon: "find", label: "发现热点", copy: "追踪近 1 小时机会" },
  { icon: "angle", label: "生成选题", copy: "形成角度与脚本" },
  { icon: "create", label: "自动成片", copy: "画面、配音与剪辑" },
  { icon: "approve", label: "按规则检查", copy: "匹配账号与权限" },
  { icon: "publish", label: "自动发布", copy: "分发到目标平台" },
  { icon: "interact", label: "持续运营", copy: "评论、私信与微信" },
];

const PLATFORM_ITEMS = [
  { name: "抖音", count: "99+", tone: "douyin" },
  { name: "快手", count: "18", tone: "kuaishou" },
  { name: "视频号", count: "67", tone: "wechat" },
  { name: "微信", count: "32", tone: "wechat" },
];

export function QianshouPage() {
  return (
    <main className="product-page qianshou-page">
      <section className="hero hero-product hero-qianshou">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-product-grid container">
          <div className="hero-content">
            <span className="eyebrow">千手 · 桌面端 RPA 自运营平台</span>
            <h1>热点刚出现，内容就开始行动</h1>
            <p className="hero-lead">
              从近 1
              小时热点发现、文生视频与自动剪辑，到跨平台发布、评论私信和桌面微信运营，让内容增长持续自动运行。
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

      <section className="speed-section container" id="hotspot-discovery">
        <SectionIntro
          copy="按动漫、能源等分类持续抓取各平台近 1 小时热点，再按新鲜度、上升速度与互动质量排序，让高流量机会更早进入生产。"
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
          <h2>一句话成片，素材也能自动剪。</h2>
          <p>
            输入一句话即可生成视频内容并自动合成语音；上传多段素材后，也能自动配音、拼接镜头并去除空白间隙。
          </p>
          <ul className="check-list">
            <li>
              <VideoCamera aria-hidden="true" />
              从一句话生成脚本、画面与成片
            </li>
            <li>
              <Sparkle aria-hidden="true" />
              自动合成语音与字幕
            </li>
            <li>
              <Check aria-hidden="true" />
              自动剪辑并去除空白间隙
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
            eyebrow="跨平台自动发布"
            title="从生成到发布，按你的规则持续运行。"
            copy="为账号配置平台、时间、分类和权限，千手即可把合规内容自动发布到抖音、快手、视频号等平台；需要时也可开启发布前确认。"
          />
          <div className="approval-canvas">
            <ImagePanel
              alt="千手发布清单真实界面"
              src="/assets/qianshou/publishing.png"
            />
            <div className="approval-panel">
              <span className="platform-pill">抖音</span>
              <h3>新能源热点：三个判断信号</h3>
              <p>今天 18:30 · 自动发布计划</p>
              <div className="approval-checks">
                <span>
                  <Check aria-hidden="true" />
                  内容规则已检查
                </span>
                <span>
                  <Check aria-hidden="true" />
                  账号权限已匹配
                </span>
                <span>
                  <Check aria-hidden="true" />
                  平台与时间已配置
                </span>
              </div>
              <button className="button button-primary" type="button">
                自动发布已开启
              </button>
              <small>
                <ShieldCheck aria-hidden="true" />
                异常、敏感或低置信度内容将暂停并提醒接管
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="interaction-section container">
        <SectionIntro
          eyebrow="消息与互动"
          title="不只发布内容，也持续经营每一次互动。"
          copy="千手自动回复各平台作品评论和后台私信，也能操作用户电脑上的微信，处理好友申请、打招呼和日常消息回复。"
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
              <p>新的好友申请已通过，并自动发送打招呼消息。</p>
              <em>RPA 已执行</em>
            </div>
            <div className="message-row">
              <span className="platform-pill">视频号</span>
              <p>想了解视频里提到的能源数据来源。</p>
              <em>AI 已回复</em>
            </div>
            <div className="message-row">
              <span className="platform-pill">快手</span>
              <p>能发一下视频里提到的清单吗？</p>
              <em>AI 托管中</em>
            </div>
          </div>
          <div className="ai-rules">
            <ChatCenteredText aria-hidden="true" />
            <h3>自运营能力</h3>
            <span>作品评论与后台私信：自动回复</span>
            <span>微信好友申请：自动通过并打招呼</span>
            <span>微信日常消息：按规则自动回复</span>
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
