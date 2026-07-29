import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-sc";
import { SiteShell } from "../components/SiteChrome.jsx";
import "../styles.css";

export const metadata = {
  description:
    "玄白科技围绕企业智能、AI 设计与新媒体运营，打造白泽、天工和千手三款 AI 产品。",
  title: "玄白科技｜让 AI 真正参与工作",
};

export default function RootLayout({ children }) {
  return (
    <html data-scroll-behavior="smooth" lang="zh-CN">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
