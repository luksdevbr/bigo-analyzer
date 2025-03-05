import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { LanguageProvider } from "@/context/languages";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigO Analyzer",
  description: "A web tool to analyze code complexity in Big-O notation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center min-w-[396px] py-1 px-3 w-full border-solid border-b-1 border-(--border-color)">
            <h1 className="text-[18px]">
              Big<span className="font-bold text-[23px]">O</span> Analyzer
            </h1>
            <LanguageSwitcher/>        
          </header>
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}
