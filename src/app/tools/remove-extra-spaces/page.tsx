
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
        {/* Page introduction */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Eraser size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Online Text Cleaning Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Remove Extra Spaces from Text Online
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Clean unwanted spaces, remove blank lines and delete duplicate
            lines from your text. Paste your content, choose cleaning
            options and get a cleaner result in seconds.
          </p>
        </div>

        {/* Text cleaner */}
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

          <label htmlFor="cleaner-input" className="sr-only">
            Enter text to clean
          </label>

          <textarea
            id="cleaner-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-56 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          <div className="mt-3 text-xs text-slate-400">
            {input.trim() ? input.trim().split(/\s+/).length : 0} words ·{" "}
            {input.length} characters
          </div>

          {/* Cleaning options */}
          <div className="my-7">
            <h3 className="mb-4 font-bold">Choose Cleaning Options</h3>

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
                  onChange={(event) =>
                    setRemoveBlankLines(event.target.checked)
                  }
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
                  onChange={(event) =>
                    setRemoveDuplicates(event.target.checked)
                  }
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

          {/* Output */}
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

            <div
              aria-live="polite"
              className="min-h-40 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-700"
            >
              {output || (
                <span className="text-slate-400">
                  Your cleaned text will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />
            <h2 className="text-2xl font-bold">
              How to Remove Extra Spaces from Text
            </h2>
          </div>

          <p className="mt-3 leading-7 text-slate-600">
            Follow these steps to clean text using this free online tool.
            You do not need to install any software or create an account.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-bold text-blue-600">01</p>
              <h3 className="mt-2 font-semibold">Paste your text</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter or paste the content that contains unwanted spaces,
                blank lines or repeated lines.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-600">02</p>
              <h3 className="mt-2 font-semibold">Choose cleaning options</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select whether you want to remove extra spaces, blank lines
                or duplicate lines.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-600">03</p>
              <h3 className="mt-2 font-semibold">Clean and copy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Click Clean My Text, review the result and copy the cleaned
                content.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            Text Cleaning Features
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Use the available options individually or combine them to
            organize your text according to your needs.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Remove Extra Spaces</h3>
              <p className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-600">
                Before: Hello&nbsp;&nbsp;&nbsp; World
                <br />
                After: Hello World
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Reduces consecutive spaces and tabs to one normal space
                and trims whitespace from the beginning and end of each
                line.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Remove Blank Lines</h3>
              <p className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-600">
                Before: First line
                <br />
                <br />
                Second line
                <br />
                After: First line
                <br />
                Second line
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Removes empty lines from your content while keeping
                non-empty lines in their original order.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Remove Duplicate Lines</h3>
              <p className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-600">
                Before: Apple
                <br />
                Apple
                <br />
                Banana
                <br />
                After: Apple
                <br />
                Banana
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Removes repeated lines without changing the order of the
                first occurrence. Comparison ignores letter case.
              </p>
            </article>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            When Should You Use a Text Cleaner?
          </h2>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">Students and researchers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clean copied notes, assignment content and lists before
                adding them to documents or presentations.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Office professionals</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Organize copied reports, contact lists and text extracted
                from different documents.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Developers and data users</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Remove repeated lines and unnecessary whitespace from
                sample text, lists and text-based data.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Writers and content creators</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Prepare paragraphs, drafts and copied content for easier
                editing and formatting.
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            About the Free Online Text Cleaner
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Extra spaces, empty lines and repeated entries can make text
            difficult to read and organize. A text cleaner helps remove
            these unwanted elements without requiring you to edit each
            line manually.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            The EverydayToolsHub text cleaner provides three operations:
            whitespace cleanup, blank-line removal and duplicate-line
            removal. You can select one option or combine multiple
            operations before generating your cleaned result.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Duplicate-line detection is case-insensitive, so lines such
            as "Apple" and "apple" are treated as duplicates. The first
            occurrence is preserved. Review the output before using it,
            especially when capitalization or line formatting is important.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Text cleaning takes place in your browser. The tool does not
            need to upload your text to a server to perform these
            operations.
          </p>
        </section>

        {/* FAQs */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-3">
            {[
              {
                question: "How can I remove extra spaces from text?",
                answer:
                  "Paste your text into the input box, select Remove extra spaces and click Clean My Text. The tool reduces consecutive spaces and tabs and trims whitespace at the start and end of each line.",
              },
              {
                question: "Is this online text cleaner free?",
                answer:
                  "Yes. You can use the EverydayToolsHub text cleaner for free without creating an account or installing additional software.",
              },
              {
                question: "Can I remove blank lines from text?",
                answer:
                  "Yes. Select the Remove blank lines option before clicking Clean My Text. Empty lines will be removed from the result.",
              },
              {
                question: "How does duplicate-line removal work?",
                answer:
                  "The tool compares complete lines without considering letter case. It keeps the first occurrence and removes later matching lines.",
              },
              {
                question: "Can I use multiple cleaning options together?",
                answer:
                  "Yes. You can select any combination of the three options. The tool applies the cleaning operations in sequence.",
              },
              {
                question: "Will the tool change my original input?",
                answer:
                  "No. Your original text remains in the input box. The cleaned result appears separately in the output area.",
              },
              {
                question: "Does this tool work on mobile devices?",
                answer:
                  "Yes. The text cleaner is designed for desktop computers, tablets and mobile phones.",
              },
              {
                question: "Is my text uploaded to a server?",
                answer:
                  "The cleaning operations are performed in your browser. Your text is not sent to a server for processing by this tool.",
              },
            ].map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 p-4"
              >
                <summary className="cursor-pointer font-semibold text-slate-800 marker:text-blue-600">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">Explore More Free Tools</h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Try these other tools from EverydayToolsHub.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/tools/word-counter"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Word Counter
              <p className="mt-1 text-sm font-normal text-slate-500">
                Count words, characters and sentences.
              </p>
            </Link>

            <Link
              href="/tools/case-converter"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Case Converter
              <p className="mt-1 text-sm font-normal text-slate-500">
                Change text capitalization instantly.
              </p>
            </Link>

            <Link
              href="/tools/json-formatter"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              JSON Formatter
              <p className="mt-1 text-sm font-normal text-slate-500">
                Format, minify and validate JSON data.
              </p>
            </Link>

            <Link
              href="/tools/percentage-calculator"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Percentage Calculator
              <p className="mt-1 text-sm font-normal text-slate-500">
                Calculate percentages and percentage changes.
              </p>
            </Link>
          </div>
        </section>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} EverydayToolsHub. Simple tools for
          everyday tasks.
        </div>
      </footer>
    </main>
  );
}
