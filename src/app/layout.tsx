
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "FastClaww | Deploy AI Assistants Instantly",
  description: "The premium platform for deploying AI agents in minutes. No code required.",
  icons: {
    icon: '/logo.svg',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${jakarta.variable} ${outfit.variable} font-sans bg-black text-white antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}>
        {children}
      </body>
    </html>
  );
}
