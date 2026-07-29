# 玄白科技官网

玄白科技的独立品牌官网，集中介绍三款产品：

- **白泽**：用数字员工连接企业知识库与现有业务系统，并提供可视化、可定时执行的工作流。
- **天工**：通过对话在统一工作区生成原型、演示、视觉与动态内容，覆盖网页端和桌面端。
- **千手**：覆盖热点发现、文生视频、自动剪辑、跨平台发布、社交互动和微信运营的桌面端 RPA 自运营平台。

网站以“让 AI 真正参与工作”为核心叙事，同时明确自动化遵循权限与规则、企业数据与能力调用可控、产品面向真实工作结果三个原则。

## 页面

- `/`：玄白科技首页与三款产品总览
- `/baize`：白泽产品介绍
- `/tiangong`：天工产品介绍
- `/qianshou`：千手产品介绍

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

开发服务同时运行 Next.js 页面和真实联系信息接口，提交数据写入
`data/contact-leads.sqlite3`。生产方式先构建，再启动 Node.js 服务：

```bash
npm run build
npm start
```

查看最近 200 条联系信息：

```bash
npm run leads:list
```

服务器使用其他数据库路径时，通过 `XUANBAI_DB_PATH` 指定实际文件。
联系信息只允许提交，不提供公开查询接口。

## 质量检查

```bash
npm run format:check
npm run lint
npm test
npm run test:server
npm run test:architecture
npm run build
npm run test:sites
```

端到端测试复用本机全局 Playwright 与用户安装的 Google Chrome，不在项目内重复保存 Playwright。首次安装依赖或执行 `npm install` 后，先建立全局链接：

```bash
npm link --no-save @playwright/test playwright
npm run test:e2e
```

## 技术栈

Next.js App Router、React、Node.js、SQLite、Phosphor Icons、Vitest、Testing
Library 与 Playwright。

所有公开页面会在构建时生成独立 HTML，页面标题与简介也分别维护。共享导航、联系表单和产品展示组件继续放在 `src/`，新增产品时在 `src/app/` 增加路由入口，并在 `src/views/` 组织页面内容。

## 当前说明

联系表单通过同域名的 `/api/contact-leads` 接口写入 SQLite，数据库确认成功后页面才显示提交完成。产品页面使用了各项目的真实界面截图；`design-references/` 保留了本次改版选定的视觉方向，方便后续持续校准。
