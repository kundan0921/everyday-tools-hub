
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Percentage Calculator Online",
  description:
    "Calculate percentages, find what percentage one number is of another, and calculate percentage increases or decreases for free.",
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
