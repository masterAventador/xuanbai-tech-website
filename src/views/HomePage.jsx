"use client";

import {
  ArrowRight,
  Brain,
  Compass,
  CursorClick,
  FlowArrow,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import {
  ArrowLink,
  BaizeWorkbenchPreview,
  FinalCta,
  FlowLine,
  HeroActions,
  HotspotPreview,
  ImagePanel,
  SectionIntro,
} from "../components/Shared.jsx";

const QIANSHOU_FLOW = [
  { icon: "find", label: "热点发现", copy: "捕捉刚出现的机会" },
  { icon: "angle", label: "确定角度", copy: "形成选题与脚本" },
  { icon: "create", label: "生成内容", copy: "成片与轻量剪辑" },
  { icon: "approve", label: "人工确认", copy: "最后决定是否发布" },
  { icon: "publish", label: "发布分发", copy: "进入内容日历" },
  { icon: "interact", label: "互动跟进", copy: "普通消息 AI 托管" },
];

export function HomePage() {
  return (
    <main>
      <section className="hero hero-home">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-content container">
          <span className="eyebrow">玄白科技 · XUANBAI TECHNOLOGY</span>
          <h1>让 AI 真正参与工作</h1>
          <p className="hero-lead">
            把企业知识、创意生产与内容运营交给 AI
            协同推进，让它不只回答问题，而是真正交付结果。
          </p>
          <HeroActions
            primary="走进 AI 工作现场"
            secondary="认识玄白科技"
            secondaryTo="/#about"
          />
        </div>
      </section>

      <section className="statement-band">
        <p>AI 的价值，不在聊天框里，而在工作发生的地方。</p>
        <span>
          它应该理解企业知识、生成可用成果，也应该在关键动作前把决定权交还给人。
        </span>
      </section>

      <section className="home-story container">
        <div className="home-story-copy">
          <span className="eyebrow">企业智能化</span>
          <h2>企业每天都在寻找答案，也在创造新的表达。</h2>
          <p>少在系统之间寻找，多把时间留给判断与创造。</p>
          <div className="story-point">
            <Brain aria-hidden="true" />
            <div>
              <strong>由白泽提供企业知识与数字员工能力</strong>
              <p>
                连接企业数据、知识和业务能力，让问题可以直接转化为可信结果。
              </p>
              <ArrowLink to="/baize">了解白泽</ArrowLink>
            </div>
          </div>
        </div>
        <BaizeWorkbenchPreview />
      </section>

      <section className="home-story home-story-reverse container">
        <ImagePanel
          alt="天工统一创作工作台真实界面"
          className="home-product-image"
          src="/assets/tiangong/workspace-home.webp"
        />
        <div className="home-story-copy">
          <span className="eyebrow eyebrow-warm">内容创作</span>
          <h2>想法不该困在工具之间。</h2>
          <p>从界面、汇报到动态内容，让创作在同一个工作台持续发生。</p>
          <div className="story-point story-point-warm">
            <Sparkle aria-hidden="true" />
            <div>
              <strong>由天工提供 AI 设计与内容创作能力</strong>
              <p>把一句需求变成可以继续编辑、讨论和交付的作品。</p>
              <ArrowLink tone="warm" to="/tiangong">
                了解天工
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="qianshou-home">
        <div className="container">
          <div className="qianshou-home-head">
            <SectionIntro
              copy="从发现机会到持续互动，让 AI 承担重复工作，让人把握方向与最终决定。"
              eyebrow="内容增长"
              title="热点不会等人，内容团队需要在热度发生时行动。"
            />
            <ArrowLink to="/qianshou">了解千手</ArrowLink>
          </div>
          <HotspotPreview />
          <FlowLine items={QIANSHOU_FLOW} />
        </div>
      </section>

      <section className="principles">
        <div className="container">
          <SectionIntro
            align="center"
            eyebrow="共同原则"
            title="产品不同，原则相同：AI 负责推进，人保留决定。"
          />
          <div className="principle-row">
            <div>
              <ShieldCheck aria-hidden="true" />
              <strong>重要操作由人确认</strong>
              <span>发布、执行与敏感动作始终保留人工边界。</span>
            </div>
            <div>
              <FlowArrow aria-hidden="true" />
              <strong>企业数据与权限可控</strong>
              <span>能力调用留痕、可审计，业务系统不被 AI 绕过。</span>
            </div>
            <div>
              <CursorClick aria-hidden="true" />
              <strong>面向真实工作结果</strong>
              <span>从回答问题走向生成、执行与持续推进。</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section container" id="about">
        <div className="about-kicker">
          <Compass aria-hidden="true" />
          <span>关于玄白科技</span>
        </div>
        <div>
          <h2>
            我们关注的不是“再做一个 AI 工具”，而是工作本身怎样被重新组织。
          </h2>
          <p>
            白泽面向企业知识与业务系统，天工面向设计与内容生产，千手面向新媒体运营。三个产品进入不同工作现场，但都围绕同一件事：让
            AI 能够理解目标、调用能力、持续推进，并在关键节点把选择交给人。
          </p>
          <button className="text-link" data-contact-trigger type="button">
            和我们聊聊你的工作场景
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <FinalCta
        copy="从一个真实问题开始，看看 AI 能在你的工作里推进到哪一步。"
        label="联系合作"
        title="让下一次工作，不再从来回切换开始。"
      />
    </main>
  );
}
