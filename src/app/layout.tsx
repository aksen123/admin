import type { Metadata } from "next";
import Aside from "./Components/Aside";
import "./globals.css";
import RecoilWrapper from "./atoms/RecoilWrapper";
import { GiDumplingBao } from "react-icons/gi";
import GlobalComponent from "./Components/modal/GlobalComponent";
export const metadata: Metadata = {
  title: "dumpling admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden overflow-y-auto">
        <header className="h-12 flex items-center justify-between px-10 border-b-2 border-b-gray-100">
          <div className="flex items-center gap-1 text-2xl font-bold text-blue-700">
            <GiDumplingBao size={30} />
            <span className="">만두 어드민</span>
          </div>
          <ul className="flex space-x-6">
            <li>(구)상점관리자</li>
            <li>개발 연동 가이드</li>
            <li>이용 문의</li>
            <li>홈페이지</li>
          </ul>
        </header>
        <RecoilWrapper>
          <main className="min-h-[calc(100vh-3rem)] max-h-fit bg-gray-200 flex mx-auto shadow-2xl">
            <Aside />
            <section className="w-[70%] min-w-[calc(100%-200px)] flex items-start justify-center">
              {children}
            </section>
          </main>
          <GlobalComponent />
        </RecoilWrapper>
      </body>
    </html>
  );
}
