import { Nunito } from "next/font/google";
import "@/app/globals.css";
import React from "react";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${nunito.variable} antialiased h-full w-full m-0`}>
        {children}
      </body>
    </html>
  );
}
