
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Extra Spaces from Text Online",
  description:
    "Clean text by removing extra spaces, blank lines, and duplicate lines using this free online text cleaning tool.",
};

export default function RemoveExtraSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
