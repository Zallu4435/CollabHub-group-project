import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingNavigation from "@/components/FloatingNavigation";
import FloatingChatBot from "@/components/FloatingChatBot";
import FeedbackModal from "@/components/FeedbackModal";
import FloatingHelp from "@/components/FloatingHelp";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Community Platform - Connect, Create, Collaborate",
  description: "Join thousands of creators in our thriving community. Share projects, collaborate, and grow together.",
  keywords: ["community", "collaboration", "projects", "marketplace", "blog", "creators"],
  authors: [{ name: "Community Platform" }],
  openGraph: {
    title: "Community Platform - Your Ultimate Community Hub",
    description: "Connect, Create, Collaborate, and Grow Together",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Platform",
    description: "Connect, Create, Collaborate, and Grow Together",
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
        <CurrencyProvider>
          <AnnouncementBanner />
          {children}
          <FloatingNavigation />
          <FloatingChatBot />
          <FloatingHelp />
          <FeedbackModal />
        </CurrencyProvider>
      </body>
    </html>
  );
}