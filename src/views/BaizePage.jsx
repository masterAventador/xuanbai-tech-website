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
    title: "连接并持续更新知识",
    copy: "连接企业内部文档、网页、数据库与业务资料，把分散信息沉淀成可检索、可追溯的知识资产，并支持知识库定时自动更新。",
    icon: Database,
    details: ["内部文档", "业务数据库", "定时同步", "权限继承"],
  },
  {
    number: "02",
    title: "连接企业现有业务系统",
    copy: "无需重建 CRM、ERP、OA 或运营看板，数字员工即可在授权范围内查询数据、发起流程并完成真实业务任务。",
    icon: PlugsConnected,
    details: ["运营数据", "客户续约", "员工考勤", "流程审批"],
  },
  {
    number: "03",
    title: "配置可执行的数字员工",
    copy: "按角色配置知识、业务能力与权限。数字员工理解用户意图，选择已授权的能力完成任务，并根据真实数据解释结果。",
    icon: UserFocus,
    details: ["意图理解", "知识范围", "业务权限", "结果解释"],
  },
  {
    number: "04",
    title: "拖拽编排工作流",
    copy: "通过拖拽节点连接检索、判断、调用与通知步骤，配置完成后既可手动触发，也可按计划定时自动执行。",
    icon: FlowArrow,
    details: ["可视化节点", "定时执行", "异常暂停", "运行记录"],
  },
];

const WORKFLOW = [
  "理解意图",
  "检查业务权限",
  "定位所需数据",
  "执行业务查询",
  "解释返回结果",
];

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
              用数字员工连接企业知识库与现有业务系统，让人通过一次对话完成检索、查询与业务执行。
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
              <li>连接企业现有业务系统与数据</li>
              <li>按权限完成任务，并解释真实返回结果</li>
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
          <h2>问一句：这个月有哪些客户即将续约？</h2>
          <p>
            白泽理解业务意图，检查数字员工权限，调用 CRM
            中的续约数据，再把结果解释成清晰、可追溯的答案。
          </p>
        </div>
        <div className="workflow-canvas">
          {WORKFLOW.map((step, index) => (
            <div className="workflow-node" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              <small>
                {
                  [
                    "识别续约与时间范围",
                    "检查角色与数据权限",
                    "定位续约数据",
                    "查询 CRM 中的客户记录",
                    "汇总客户与续约时间",
                  ][index]
                }
              </small>
            </div>
          ))}
        </div>
      </section>

      <section className="scenario-section container">
        <div className="scenario-copy">
          <span className="eyebrow">工作流自动化</span>
          <h2>拖拽编排，按计划自动执行。</h2>
          <p>
            将知识检索、条件判断、业务调用与消息通知连接成工作流，设置每天、每周或指定时间自动运行。
          </p>
        </div>
        <div className="workflow-canvas">
          {["定时触发", "检索知识", "判断条件", "调用系统", "通知结果"].map(
            (step, index) => (
              <div className="workflow-node" key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
                <small>
                  {
                    [
                      "按计划启动工作流",
                      "读取最新企业资料",
                      "按业务规则分支",
                      "执行已授权能力",
                      "推送结果与运行记录",
                    ][index]
                  }
                </small>
              </div>
            ),
          )}
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
          copy="不需要先重建 CRM、ERP、OA 或运营看板。先选知识库、一个业务场景或一名数字员工作为切入点，再平滑扩展。"
        />
        <div className="start-small-steps">
          <div>
            <FileText aria-hidden="true" />
            <span>先接知识库</span>
          </div>
          <div>
            <CloudArrowUp aria-hidden="true" />
            <span>先连接一个业务场景</span>
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
