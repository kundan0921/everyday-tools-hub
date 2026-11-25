
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter and Validator Online",
  description:
    "Format, beautify, minify, and validate JSON online for free. Quickly check JSON syntax and make data easier to read.",
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
