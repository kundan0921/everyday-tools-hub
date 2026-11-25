
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "EverydayToolsHub - Free Online Tools",
    template: "%s | EverydayToolsHub",
  },

  description:
    "Use free online tools at EverydayToolsHub. Count words, convert text cases, format JSON, remove extra spaces, and calculate percentages. Simple, fast, and easy to use.",

  applicationName: "EverydayToolsHub",

  keywords: [
    "free online tools",
    "word counter",
    "case converter",
    "JSON formatter",
    "JSON validator",
    "remove extra spaces",
    "percentage calculator",
    "online text tools",
    "free utility tools",
  ],

  authors: [{ name: "EverydayToolsHub" }],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "EverydayToolsHub - Free Online Tools",
    description:
      "Simple, free online tools for text editing, JSON formatting, and everyday calculations.",
    siteName: "EverydayToolsHub",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EverydayToolsHub - Free Online Tools",
    description:
      "Free online tools for word counting, text conversion, JSON formatting, and calculations.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
