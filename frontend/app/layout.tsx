import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOONSHOT — Closed-Loop Quant Singularity 2026",
  description: "CausalForge • EvoAlpha Zoo • ShadowCrowd • Omniverse • Nautilus • Liquidity — One cycle. Billions in alpha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-[#67e8f9] min-h-screen`}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {children}
      </body>
    </html>
  );
}
