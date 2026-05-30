import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI消费者洞察分析平台",
  description:
    "基于AI的用户反馈分析工具，帮助市场人员快速理解消费者需求、痛点和产品评价，实现消费者洞察自动化。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
