
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case, alternating case, and reverse case with our free online case converter.",
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
