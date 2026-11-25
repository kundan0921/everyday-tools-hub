
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Eraser,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export default function TextCleanerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removeSpaces, setRemoveSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanText = () => {
    let result = input;

    if (removeSpaces) {
      result = result
        .split("\n")
        .map((line) => line.replace(/[ \t]+/g, " ").trim())
        .join("\n");
    } else {
      result = result
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    if (removeBlankLines) {
      result = result
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .join("\n");
    }

    if (removeDuplicates) {
      const seen = new Set<string>();

      result = result
        .split("\n")
        .filter((line) => {
          const key = line.toLowerCase();

          if (seen.has(key)) return false;

          seen.add(key);
          return true;
        })
        .join("\n");
    }

    setOutput(result);
    setCopied(false);
  };

  const copyText = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy text. Please copy it manually.");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
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
            <Eraser size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Text Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Remove Extra Spaces
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Clean unwanted spaces, blank lines and duplicate lines from
            your text in seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Input Text</h2>

            <button
              onClick={clearAll}
              disabled={!input && !output}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-red-500 disabled:opacity-40"
            >
              <RotateCcw size={16} /> Clear
            </button>
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-56 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          <div className="my-7">
            <h3 className="mb-4 font-bold">Cleaning options</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:border-blue-300">
                <input
                  type="checkbox"
                  checked={removeSpaces}
                  onChange={(event) => setRemoveSpaces(event.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm font-medium">
                  Remove extra spaces
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:border-blue-300">
                <input
                  type="checkbox"
                  checked={removeBlankLines}
                  onChange={(event) => setRemoveBlankLines(event.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm font-medium">
                  Remove blank lines
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:border-blue-300">
                <input
                  type="checkbox"
                  checked={removeDuplicates}
                  onChange={(event) => setRemoveDuplicates(event.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm font-medium">
                  Remove duplicate lines
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={cleanText}
            disabled={!input.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <WandSparkles size={18} />
            Clean My Text
          </button>

          <div className="mt-9">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Cleaned Text</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your cleaned result will appear here.
                </p>
              </div>

              <button
                onClick={copyText}
                disabled={!output}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>

            <div className="min-h-40 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-700">
              {output || (
                <span className="text-slate-400">
                  Your cleaned text will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold">How to use Text Cleaner</h2>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-bold text-blue-600">01</p>
              <h3 className="mt-2 font-semibold">Paste your text</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add the text you want to clean.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-600">02</p>
              <h3 className="mt-2 font-semibold">Choose options</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select the cleaning operations you need.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-600">03</p>
              <h3 className="mt-2 font-semibold">Clean and copy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Generate the cleaned text and copy your result.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-slate-500">
          Text processing happens in your browser.
        </p>
      </section>
    </main>
  );
}
