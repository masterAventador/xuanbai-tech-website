"use client";

import {
  ArrowRight,
  ChatCircleDots,
  Check,
  Layout,
  Palette,
  PresentationChart,
  Shapes,
  VideoCamera,
} from "@phosphor-icons/react";
import {
  FinalCta,
  HeroActions,
  ImagePanel,
  SectionIntro,
} from "../components/Shared.jsx";

const CREATIVE_AREAS = [
  {
    id: "prototype-design",
    title: "界面与体验",
    copy: "从信息架构到高保真界面，让产品页面与交互方案可以被看见、讨论和继续修改。",
    image: "/assets/tiangong/design-dashboard.webp",
    icon: Layout,
  },
  {
    id: "presentation-design",
    title: "表达与汇报",
    copy: "把业务材料、研究结果和策略思路整理成结构清晰、视觉一致的演示与报告。",
    image: "/assets/tiangong/editorial-deck.png",
    icon: PresentationChart,
  },
  {
    id: "visual-motion",
    title: "视觉与动态内容",
    copy: "生成品牌视觉、动态内容和视频表达，让创意从静态画面延伸到完整叙事。",
    image: "/assets/tiangong/motion-video.png",
    icon: VideoCamera,
  },
];

export function TiangongPage() {
  return (
    <main className="product-page tiangong-page">
      <section className="hero hero-product hero-tiangong">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-product-grid container">
          <div className="hero-content">
            <span className="eyebrow eyebrow-warm">
              天工 · AI 设计与内容创作平台
            </span>
            <h1>一个工作台，容纳从想法到作品的全过程。</h1>
            <p className="hero-lead">
              左侧对话，右侧工作区。写下需求、带上参考，直接生成产品原型、演示文稿、视觉与动态内容。
            </p>
            <HeroActions
              primary="申请体验天工"
              secondary="浏览作品类型"
              secondaryTo="/tiangong#work-types"
            />
          </div>
          <ImagePanel
            alt="天工创作工作台首页"
            className="hero-product-shot hero-product-shot-light"
            src="/assets/tiangong/workspace-home.webp"
          />
        </div>
      </section>

      <section className="delivery-section container">
        <div className="delivery-copy">
          <SectionIntro
            title="你不是在选择一个工具，而是在选择一种交付形式。"
            copy="从品牌官网到产品原型，从演示汇报到视觉内容，天工把你的想法变成可以继续使用的作品。"
          />
          <ul className="check-list check-list-warm">
            <li>
              <Check aria-hidden="true" />
              作品类型围绕真实交付组织
            </li>
            <li>
              <Check aria-hidden="true" />
              参考与素材在项目中持续保留
            </li>
            <li>
              <Check aria-hidden="true" />
              输出可以继续编辑与迭代
            </li>
            <li>
              <Check aria-hidden="true" />
              网页端与桌面端覆盖不同创作现场
            </li>
          </ul>
        </div>
        <div className="work-mosaic">
          <ImagePanel
            alt="网站设计作品预览"
            src="/assets/tiangong/app-preview.webp"
          />
          <ImagePanel
            alt="实时数据看板作品预览"
            src="/assets/tiangong/live-dashboard.png"
          />
          <ImagePanel
            alt="动态视频作品预览"
            src="/assets/tiangong/motion-video.png"
          />
        </div>
      </section>

      <section className="shared-start">
        <div className="container shared-start-grid">
          <SectionIntro
            eyebrow="统一起点"
            title="所有创作，共用同一个起点。"
            copy="在左侧用自然语言描述目标，右侧工作区实时承接作品；参考资料、设计系统和历史版本始终留在同一个项目里。"
          />
          <ImagePanel
            alt="天工开始新创作界面"
            className="shared-start-image"
            src="/assets/tiangong/workspace-home.webp"
          />
        </div>
      </section>

      <section className="creative-areas container" id="work-types">
        {CREATIVE_AREAS.map((area) => {
          const Icon = area.icon;
          return (
            <article className="creative-area" id={area.id} key={area.title}>
              <div className="creative-area-copy">
                <Icon aria-hidden="true" />
                <h2>{area.title}</h2>
                <p>{area.copy}</p>
                <span>
                  查看代表作品
                  <ArrowRight aria-hidden="true" />
                </span>
              </div>
              <ImagePanel alt={`${area.title}作品示例`} src={area.image} />
            </article>
          );
        })}
      </section>

      <section className="design-system-section">
        <div className="container">
          <SectionIntro
            eyebrow="持续一致"
            title="把做对的东西，变成下一次创作的起点。"
            copy="模板、设计系统与品牌资产在项目内持续复用，确保表达与体验保持一致。"
          />
          <div className="design-system-board">
            <div className="template-preview">
              <ImagePanel
                alt="天工作品模板"
                src="/assets/tiangong/app-preview.webp"
              />
              <span>品牌官网模板</span>
            </div>
            <div className="token-preview">
              <Palette aria-hidden="true" />
              <strong>设计系统</strong>
              <div className="swatches" aria-label="品牌颜色">
                <span className="swatch swatch-ink" />
                <span className="swatch swatch-coral" />
                <span className="swatch swatch-sand" />
                <span className="swatch swatch-mist" />
              </div>
              <p>颜色、字体、间距和圆角在作品间保持一致。</p>
            </div>
            <div className="recent-projects">
              <Shapes aria-hidden="true" />
              <strong>最近项目</strong>
              <span>年度增长策略提案</span>
              <span>产品官网改版</span>
              <span>未来能源品牌短片</span>
            </div>
          </div>
        </div>
      </section>

      <section className="iteration-section container">
        <div>
          <SectionIntro
            eyebrow="继续迭代"
            title="天工不只生成，也陪你把作品改到满意。"
            copy="用自然语言给出修改意见，继续对比版本，也可以回到具体作品里手动调整。"
          />
          <div className="feedback-box">
            <ChatCircleDots aria-hidden="true" />
            <p>
              “整体风格不错，但希望关键信息更突出，背景减少装饰，让核心结论更清晰。”
            </p>
            <button type="button">继续生成优化版本</button>
          </div>
        </div>
        <div className="version-compare">
          <ImagePanel
            alt="天工作品原始版本"
            src="/assets/tiangong/app-preview.webp"
          />
          <ImagePanel
            alt="天工作品优化版本"
            src="/assets/tiangong/design-dashboard.webp"
          />
        </div>
      </section>

      <FinalCta
        copy="在同一个工作台，把想法变成可交付、可继续修改的作品。"
        label="申请体验天工"
        title="打开天工，开始下一件作品。"
        tone="warm"
      />
    </main>
  );
}
