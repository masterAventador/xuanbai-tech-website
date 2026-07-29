"use client";

import {
  ArrowRight,
  ChartLineUp,
  ChatCenteredText,
  Check,
  Database,
  FileText,
  GearSix,
  Lightning,
  MagnifyingGlass,
  PaperPlaneTilt,
  PlugsConnected,
  ShieldCheck,
  Sparkle,
  UserFocus,
  VideoCamera,
} from "@phosphor-icons/react";
import Link from "next/link";

export function SectionIntro({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={`section-intro section-intro-${align}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function ArrowLink({ children, to, tone = "cyan" }) {
  return (
    <Link className={`arrow-link arrow-link-${tone}`} href={to}>
      {children}
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}

export function HeroActions({ primary, secondary, secondaryTo }) {
  return (
    <div className="hero-actions">
      <button
        className="button button-primary"
        data-contact-trigger
        type="button"
      >
        {primary}
        <ArrowRight aria-hidden="true" />
      </button>
      {secondary ? (
        <Link className="button button-quiet" href={secondaryTo}>
          {secondary}
        </Link>
      ) : null}
    </div>
  );
}

export function BaizeWorkbenchPreview({ compact = false }) {
  return (
    <div
      className={
        compact
          ? "product-window baize-window is-compact"
          : "product-window baize-window"
      }
    >
      <div className="window-topbar">
        <div className="window-brand">
          <span className="window-mark">
            <Sparkle aria-hidden="true" weight="fill" />
          </span>
          白泽工作空间
        </div>
        <span className="status-dot">运行正常</span>
      </div>
      <div className="workbench-layout">
        <aside className="workbench-sidebar">
          <span className="is-active">
            <ChatCenteredText aria-hidden="true" />
            对话
          </span>
          <span>
            <Database aria-hidden="true" />
            知识库
          </span>
          <span>
            <PlugsConnected aria-hidden="true" />
            能力
          </span>
          <span>
            <UserFocus aria-hidden="true" />
            数字员工
          </span>
        </aside>
        <div className="workbench-main">
          <div className="chat-question">
            前天产品日活是多少？环比变化如何？
          </div>
          <div className="trace-block">
            <span>识别时间</span>
            <strong>2026-07-27</strong>
          </div>
          <div className="trace-block">
            <span>调用业务能力</span>
            <strong>运营数据查询</strong>
            <small>权限校验通过 · 已留痕</small>
          </div>
          <div className="answer-block">
            <span>前天产品日活</span>
            <strong>128,340</strong>
            <em>环比 +6.31%</em>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HotspotPreview({ compact = false }) {
  const items = [
    { time: "8 分钟前", tag: "刚刚起量", title: "固态电池量产时间表再次提前" },
    { time: "21 分钟前", tag: "高互动", title: "新能源汽车保险费用为何变化？" },
    { time: "36 分钟前", tag: "正在扩散", title: "夏季续航实测引发两派争论" },
  ];

  return (
    <div
      className={
        compact
          ? "product-window hotspot-window is-compact"
          : "product-window hotspot-window"
      }
    >
      <div className="window-topbar">
        <div className="window-brand">
          <span className="window-mark">
            <Lightning aria-hidden="true" weight="fill" />
          </span>
          千手 · 热点发现
        </div>
        <span className="status-dot">20 分钟监测</span>
      </div>
      <div className="search-bar">
        <MagnifyingGlass aria-hidden="true" />
        <span>新能源</span>
        <button type="button">立即查找</button>
      </div>
      <div className="hotspot-list">
        {items.map((item, index) => (
          <div className="hotspot-row" key={item.title}>
            <span className="rank">{index + 1}</span>
            <div>
              <strong>{item.title}</strong>
              <small>
                抖音 · {item.time} · <em>{item.tag}</em>
              </small>
            </div>
            <ChartLineUp aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const FLOW_ICONS = {
  find: MagnifyingGlass,
  angle: Sparkle,
  create: VideoCamera,
  approve: ShieldCheck,
  publish: PaperPlaneTilt,
  interact: ChatCenteredText,
  data: Database,
  file: FileText,
  settings: GearSix,
};

export function FlowLine({ items }) {
  return (
    <div className="flow-line">
      {items.map((item, index) => {
        const Icon = FLOW_ICONS[item.icon] ?? Check;
        return (
          <div className="flow-step" key={item.label}>
            <span className="flow-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon aria-hidden="true" />
            <strong>{item.label}</strong>
            <small>{item.copy}</small>
          </div>
        );
      })}
    </div>
  );
}

export function ImagePanel({ alt, className = "", src }) {
  return (
    <figure className={`image-panel ${className}`}>
      <img alt={alt} loading="lazy" src={src} />
    </figure>
  );
}

export function FinalCta({ copy, label, title, tone = "warm" }) {
  return (
    <section className={`final-cta final-cta-${tone}`}>
      <div>
        <span className="eyebrow">玄白科技</span>
        <h2>{title}</h2>
        <p>{copy}</p>
        <button
          className="button button-primary"
          data-contact-trigger
          type="button"
        >
          {label}
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
