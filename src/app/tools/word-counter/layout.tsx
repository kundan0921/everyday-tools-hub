
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word Counter Online",
  description:
    "Count words, characters, sentences, and paragraphs instantly with our free online word counter. Estimate reading time easily.",
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
