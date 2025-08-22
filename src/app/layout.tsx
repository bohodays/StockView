import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Provider from "./_providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockView | 나만의 종목 분석 앱",
  description:
    "실시간 뉴스, 종목 분석, 수익 예측까지 한 번에! 주식 초보부터 고수까지 모두를 위한 스마트한 투자 도우미.",
  icons: {
    icon: "/icons/stock_view_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto w-full max-w-[430px] h-dvh border-x-2 shadow-lg">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
