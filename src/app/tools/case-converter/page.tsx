
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Type,
  Sparkles,
} from "lucide-react";

type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "alternating"
  | "reverse";

const caseOptions: { label: string; value: CaseType }[] = [
  { label: "UPPERCASE", value: "upper" },
  { label: "lowercase", value: "lower" },
  { label: "Title Case", value: "title" },
  { label: "Sentence case", value: "sentence" },
  { label: "aLtErNaTiNg", value: "alternating" },
  { label: "Reverse Case", value: "reverse" },
];

function convertText(input: string, type: CaseType) {
  switch (type) {
    case "upper":
      return input.toUpperCase();

    case "lower":
      return input.toLowerCase();

    case "title":
      return input.toLowerCase().replace(
        /\b[a-z]/g,
        (char) => char.toUpperCase()
      );

    case "sentence":
      return input.toLowerCase().replace(
        /(^\s*[a-z]|[.!?]\s+[a-z])/g,
        (char) => char.toUpperCase()
      );

    case "alternating":
      return Array.from(input)
        .map((char, index) =>
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join("");

    case "reverse":
      return Array.from(input)
        .map((char) =>
          char === char.toLowerCase()
            ? char.toUpperCase()
            : char.toLowerCase()
        )
        .join("");

    default:
      return input;
  }
}

export default function CaseConverterPage() {
  const [text, setText] = useState("");
  const [converted, setConverted] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("upper");
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleConvert = (type: CaseType) => {
    setSelectedCase(type);
    setConverted(convertText(text, type));
    setCopied(false);
  };

  const handleInput = (value: string) => {
    setText(value);
    setConverted(convertText(value, selectedCase));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!converted) return;

    try {
      await navigator.clipboard.writeText(converted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy. Please copy the text manually.");
    }
  };

  const handleClear = () => {
    setText("");
    setConverted("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-extrabold">
            Everyday<span className="text-blue-600">Tools</span>Hub
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} /> Back to Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Type size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Text Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Online Case Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Change text capitalization instantly. Convert your text into
            uppercase, lowercase, title case and more.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Enter your text</h2>

            <button
              onClick={handleClear}
              disabled={!text}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-red-500 disabled:opacity-40"
            >
              <RotateCcw size={16} /> Clear
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => handleInput(event.target.value)}
            placeholder="Type or paste your text here..."
            className="min-h-48 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          <div className="mt-3 text-xs text-slate-400">
            {words} words · {text.length} characters
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-bold">Choose conversion type</h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {caseOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleConvert(option.value)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    selectedCase === option.value
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold">Converted text</h3>

              <button
                onClick={handleCopy}
                disabled={!converted}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy result"}
              </button>
            </div>

            <div className="min-h-40 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-700">
              {converted || (
                <span className="text-slate-400">
                  Your converted text will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold">About Case Converter</h2>
          </div>
          <p className="mt-4 leading-7 text-slate-600">
            A case converter changes the capitalization of your text without
            requiring you to type everything again. It is useful for editing
            documents, preparing headings, formatting notes and cleaning text.
          </p>
        </section>
      </section>
    </main>
  );
}
