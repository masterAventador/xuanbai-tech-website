# 玄白科技官网

玄白科技的独立品牌官网，集中介绍三款产品：

- **白泽**：面向企业知识库、业务系统与数字员工的 AI 中台。
- **天工**：将界面、演示、海报与动态内容集中在一个工作台的 AI 设计平台。
- **千手**：面向短视频与社交媒体运营团队的 AI 新媒体运营平台。

网站以“让 AI 真正参与工作”为核心叙事，同时明确重要操作由人确认、企业数据与权限可控、产品面向真实工作结果三个原则。

## 页面

- `/`：玄白科技首页与三款产品总览
- `/baize`：白泽产品介绍
- `/tiangong`：天工产品介绍
- `/qianshou`：千手产品介绍

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

## 质量检查

```bash
npm run format:check
npm run lint
npm test
npm run build
npm run test:sites
```

端到端测试复用本机全局 Playwright 与用户安装的 Google Chrome，不在项目内重复保存 Playwright。首次安装依赖或执行 `npm install` 后，先建立全局链接：

```bash
npm link --no-save @playwright/test playwright
npm run test:e2e
```

## 技术栈

Next.js App Router、React、Phosphor Icons、Vitest、Testing Library 与 Playwright。

所有公开页面会在构建时生成独立 HTML，页面标题与简介也分别维护。共享导航、联系表单和产品展示组件继续放在 `src/`，新增产品时在 `src/app/` 增加路由入口，并在 `src/views/` 组织页面内容。

## 当前说明

联系表单目前完成了前端交互与状态反馈，尚未接入真实提交接口。产品页面使用了各项目的真实界面截图；`design-references/` 保留了本次改版选定的视觉方向，方便后续持续校准。
