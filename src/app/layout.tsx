import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PromptStoreProvider } from "@/context/PromptStore";
import { ThemeProvider, THEME_SCRIPT } from "@/context/ThemeContext";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clawbin — Prompt Gallery",
  description: "Discover, share, and run the best AI prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden">
        {/* Runs synchronously before paint — prevents flash of incorrect theme */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <ThemeProvider>
          <PromptStoreProvider>
            <AppShell>{children}</AppShell>
          </PromptStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
