"use client";

import {
  ArrowRight,
  Brain,
  Check,
  CloudArrowUp,
  Database,
  FileText,
  FingerprintSimple,
  FlowArrow,
  PlugsConnected,
  ShieldCheck,
  StopCircle,
  UserFocus,
} from "@phosphor-icons/react";
import {
  BaizeWorkbenchPreview,
  FinalCta,
  HeroActions,
  SectionIntro,
} from "../components/Shared.jsx";

const CAPABILITIES = [
  {
    number: "01",
    title: "汇聚企业知识",
    copy: "连接文档、网页、数据库与业务资料，把分散信息沉淀成可检索、可追溯的企业知识资产。",
    icon: Database,
    details: ["文档与文件", "网页内容", "业务数据库", "权限继承"],
  },
  {
    number: "02",
    title: "封装业务能力",
    copy: "把 HTTP API、MCP 服务与内部工具变成 AI 可以按权限调用、按规则执行的企业能力。",
    icon: PlugsConnected,
    details: ["HTTP 接口", "MCP 服务", "内部工具", "调用审计"],
  },
  {
    number: "03",
    title: "组织数字员工",
    copy: "按角色配置目标、知识、技能与长期记忆，让数字员工进入真实岗位，而不是停在演示里。",
    icon: UserFocus,
    details: ["角色设定", "知识范围", "业务能力", "协作边界"],
  },
  {
    number: "04",
    title: "编排并交付结果",
    copy: "从理解问题到调用能力、生成结果与人工确认，全过程可追溯、可复核、可停止。",
    icon: FlowArrow,
    details: ["工作流编排", "结果核验", "人工确认", "审计记录"],
  },
];

const WORKFLOW = ["理解问题", "选择能力", "调用执行", "返回结果", "后续建议"];

export function BaizePage() {
  return (
    <main className="product-page baize-page">
      <section className="hero hero-product hero-baize">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-product-grid container">
          <div className="hero-content">
            <span className="eyebrow">白泽 · 企业智能中台</span>
            <h1>让企业的知识、系统与 AI，在一处协同。</h1>
            <p className="hero-lead">
              连接分散的数据和业务能力，为每个团队配置可管理、可审计、能执行的数字员工。
            </p>
            <HeroActions
              primary="预约企业演示"
              secondary="了解平台能力"
              secondaryTo="/baize#capabilities"
            />
          </div>
          <BaizeWorkbenchPreview compact />
        </div>
      </section>

      <section className="problem-solution container">
        <SectionIntro
          align="center"
          title="企业不缺 AI，缺的是把 AI 接进真实业务的方法。"
        />
        <div className="compare-canvas">
          <div className="compare-side compare-current">
            <span>现在</span>
            <h3>知识分散，系统割裂，流程依赖人工</h3>
            <ul>
              <li>答案藏在文档、群聊和不同后台</li>
              <li>查一次数据，要切换多个业务系统</li>
              <li>AI 知道怎么说，却不知道怎么做</li>
            </ul>
          </div>
          <ArrowRight aria-hidden="true" className="compare-arrow" />
          <div className="compare-side compare-future">
            <span>白泽</span>
            <h3>连接知识与能力，组织数字员工</h3>
            <ul>
              <li>统一检索企业知识，并返回来源</li>
              <li>按权限调用业务接口和 MCP 服务</li>
              <li>从问题出发，交付可核验的结果</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="capability-foundation" id="capabilities">
        <div className="container">
          <SectionIntro
            align="center"
            copy="从知识与能力，到组织与执行，构建可管理、可审计、能交付的企业级 AI 平台。"
            eyebrow="企业 AI 能力底座"
            title="白泽如何成为企业 AI 能力底座"
          />
          <div className="capability-stack">
            {CAPABILITIES.map((item) => {
              const Icon = item.icon;
              return (
                <article className="capability-row" key={item.number}>
                  <span className="capability-number">{item.number}</span>
                  <div className="capability-copy">
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                  <div className="capability-details">
                    {item.details.map((detail) => (
                      <span key={detail}>
                        <Check aria-hidden="true" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scenario-section container">
        <div className="scenario-copy">
          <span className="eyebrow">示例工作场景</span>
          <h2>问一句：前天产品日活是多少？</h2>
          <p>白泽理解你的业务问题，选择可信能力，返回可追溯的结果与依据。</p>
        </div>
        <div className="workflow-canvas">
          {WORKFLOW.map((step, index) => (
            <div className="workflow-node" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              <small>
                {
                  [
                    "识别指标与时间",
                    "匹配权限与接口",
                    "传入参数并执行",
                    "汇总数据与来源",
                    "给出下一步建议",
                  ][index]
                }
              </small>
            </div>
          ))}
        </div>
      </section>

      <section className="boundary-section">
        <div className="container boundary-grid">
          <SectionIntro
            eyebrow="治理与安全"
            title="每一次执行，都有边界。"
            copy="白泽知道能做什么、执行到哪一步、谁最终确认，也保留每一次调用记录。"
          />
          <div className="boundary-board">
            <div>
              <FingerprintSimple aria-hidden="true" />
              <strong>权限控制</strong>
              <span>按角色、知识范围与业务权限调用能力</span>
            </div>
            <div>
              <ShieldCheck aria-hidden="true" />
              <strong>执行留痕</strong>
              <span>调用参数、返回结果与确认动作可追溯</span>
            </div>
            <div>
              <UserFocus aria-hidden="true" />
              <strong>人工审核</strong>
              <span>敏感与高风险动作等待人工确认</span>
            </div>
            <div>
              <StopCircle aria-hidden="true" />
              <strong>停止控制</strong>
              <span>执行过程可暂停、取消和紧急停止</span>
            </div>
          </div>
        </div>
      </section>

      <section className="start-small container">
        <SectionIntro
          eyebrow="逐步连接"
          title="从一个场景开始，逐步连接更多业务。"
          copy="不需要先重建所有系统。先选知识库、业务接口或数字员工其中一个切入点，再平滑扩展。"
        />
        <div className="start-small-steps">
          <div>
            <FileText aria-hidden="true" />
            <span>先接知识库</span>
          </div>
          <div>
            <CloudArrowUp aria-hidden="true" />
            <span>先接一个业务接口</span>
          </div>
          <div>
            <Brain aria-hidden="true" />
            <span>先配置一个数字员工</span>
          </div>
        </div>
      </section>

      <FinalCta
        copy="用一个能核验结果的问题，验证 AI 是否真正进入了你的业务。"
        label="预约企业演示"
        title="从第一个真实业务场景开始。"
      />
    </main>
  );
}
