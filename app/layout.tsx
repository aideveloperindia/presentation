import type { Metadata } from "next";
import { Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";

const notoSansTelugu = Noto_Sans_Telugu({
  weight: ["400", "500", "600", "700"],
  subsets: ["telugu"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Road Safety Digital Platform - Presentation",
  description: "Interactive presentation for Road Safety Month",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansTelugu.className}>{children}</body>
    </html>
  );
}
