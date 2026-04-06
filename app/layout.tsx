import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Подключаем твой файл

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Base Check-in App",
  description: "Created by Tima",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}