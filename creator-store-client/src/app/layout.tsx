import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Creator IT Academy Merch",
  description: "Мерч для справжніх кодерів та майбутніх IT-майстрів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      {/* <link href="https://fonts.googleapis.com/css?family=Bebas+Neue:regular" rel="stylesheet" /> */}
      <body className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}