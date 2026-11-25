
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
        {/* Page introduction */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Type size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Online Text Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Free Online Case Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Convert text to uppercase, lowercase, title case, sentence case,
            alternating case or reverse case instantly. Paste your text,
            choose a format and copy the converted result.
          </p>
        </div>

        {/* Converter */}
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

          <label htmlFor="case-input" className="sr-only">
            Enter text to convert
          </label>

          <textarea
            id="case-input"
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
                  aria-pressed={selectedCase === option.value}
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

            <div
              aria-live="polite"
              className="min-h-40 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-700"
            >
              {converted || (
                <span className="text-slate-400">
                  Your converted text will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            How to Use the Online Case Converter
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            You can change the capitalization of your text in a few simple
            steps. No account or software installation is required.
          </p>

          <ol className="mt-6 space-y-4">
            {[
              {
                title: "Enter your text",
                description:
                  "Type directly into the text box or paste content from a document, email or website.",
              },
              {
                title: "Select a conversion format",
                description:
                  "Choose uppercase, lowercase, title case, sentence case, alternating case or reverse case.",
              },
              {
                title: "Review the result",
                description:
                  "Your converted text appears automatically in the result area.",
              },
              {
                title: "Copy your converted text",
                description:
                  "Click Copy result to use the converted text wherever you need it.",
              },
            ].map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Conversion types */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            Different Text Case Formats Explained
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Each format changes the capitalization of your text in a
            different way. Here are examples to help you choose the right
            option.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "UPPERCASE",
                example: "THIS IS AN EXAMPLE.",
                description:
                  "Changes every letter to capital letters. Useful for short headings, labels and emphasis.",
              },
              {
                title: "lowercase",
                example: "this is an example.",
                description:
                  "Changes every letter to lowercase. Helpful when text has inconsistent capitalization.",
              },
              {
                title: "Title Case",
                example: "This Is An Example.",
                description:
                  "Capitalizes the first letter of words. Often used for headings and titles.",
              },
              {
                title: "Sentence case",
                example: "This is an example.",
                description:
                  "Capitalizes the beginning of a sentence while converting the remaining letters to lowercase.",
              },
              {
                title: "aLtErNaTiNg CaSe",
                example: "tHiS iS aN eXaMpLe.",
                description:
                  "Alternates lowercase and uppercase letters. It is often used for playful or informal text.",
              },
              {
                title: "Reverse Case",
                example: "tHIS IS AN EXAMPLE.",
                description:
                  "Switches the case of each letter: lowercase becomes uppercase and uppercase becomes lowercase.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-3 break-words rounded-lg bg-slate-50 p-3 font-mono text-sm text-blue-700">
                  {item.example}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            When Can You Use a Case Converter?
          </h2>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">Students and teachers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Format assignment headings, notes, presentation titles and
                educational documents without manually changing every letter.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Writers and bloggers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Adjust article headings, blog titles and text formatting
                while editing written content.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Developers and professionals</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quickly change capitalization in sample text, documentation,
                labels and other work-related content.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Social media users</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Prepare captions, short headings and informal text for
                different social media platforms.
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold">
              About Our Free Text Case Converter
            </h2>
          </div>

          <p className="mt-4 leading-7 text-slate-600">
            A text case converter is an online tool that changes the
            capitalization of existing text. Instead of rewriting a
            paragraph or manually editing individual words, you can select
            a format and get the converted result immediately.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            EverydayToolsHub provides six conversion formats in one simple
            interface. You can paste short phrases, long paragraphs or
            multiple lines of text, switch between formats and copy the
            result. The conversion runs in your browser, so the tool does
            not need to send your text to a server for processing.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Please review the result before using it in formal documents.
            Automatic title case and sentence case conversion follows
            straightforward capitalization rules and may not handle every
            language, abbreviation or special writing style correctly.
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
                question: "What is an online case converter?",
                answer:
                  "An online case converter is a tool that changes the capitalization of text. It can convert text into uppercase, lowercase, title case, sentence case and other formats.",
              },
              {
                question: "Is this case converter free to use?",
                answer:
                  "Yes. You can use the EverydayToolsHub case converter for free without creating an account or installing software.",
              },
              {
                question: "Can I convert a large paragraph?",
                answer:
                  "Yes. You can paste paragraphs or multiple lines into the text box. Very large text may depend on your browser and device performance.",
              },
              {
                question: "What is the difference between uppercase and lowercase?",
                answer:
                  "Uppercase changes letters into capital letters, such as HELLO. Lowercase changes letters into small letters, such as hello.",
              },
              {
                question: "Does the tool convert text automatically?",
                answer:
                  "Yes. The result updates automatically when you type or paste text and whenever you select a different conversion format.",
              },
              {
                question: "Is my text uploaded to a server?",
                answer:
                  "The conversion is performed in your browser. This tool does not send the entered text to a server for conversion.",
              },
              {
                question: "Can I use this tool on a mobile phone?",
                answer:
                  "Yes. The page is designed to work on mobile phones, tablets and desktop browsers.",
              },
              {
                question: "Does title case follow every grammar rule?",
                answer:
                  "No. This tool uses a simple capitalization rule that capitalizes the first letter of words. It may not follow every language or publishing style guide.",
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
            Try these other EverydayToolsHub tools to make everyday text
            and calculation tasks easier.
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
              href="/tools/remove-extra-spaces"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Remove Extra Spaces
              <p className="mt-1 text-sm font-normal text-slate-500">
                Clean unwanted spaces and blank lines.
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
