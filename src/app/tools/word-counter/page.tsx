
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  FileText,
  RotateCcw,
  Check,
  Type,
  AlignLeft,
  Clock,
} from "lucide-react";

const faqs = [
  {
    question: "What is a word counter?",
    answer:
      "A word counter is an online tool that calculates the number of words in a piece of text. It can also count characters, sentences, paragraphs and estimate reading time.",
  },
  {
    question: "How do I count words online?",
    answer:
      "Paste or type your content into the text editor above. The word counter automatically calculates the number of words and updates the results as you type.",
  },
  {
    question: "Does this word counter count characters?",
    answer:
      "Yes. It displays total characters, including spaces, and characters without spaces. This is useful for social media posts, forms and writing with character limits.",
  },
  {
    question: "Is this word counter free?",
    answer:
      "Yes. EverydayToolsHub Word Counter is free to use. You do not need to create an account, install software or pay a subscription.",
  },
  {
    question: "Is my text saved or uploaded?",
    answer:
      "No. The word counting calculations happen directly in your browser. Your text is not uploaded to our server by this tool.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Estimated reading time is calculated using an average reading speed of 200 words per minute. Actual reading time depends on the reader and the complexity of the text.",
  },
];

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const words = text.trim()
      ? text.trim().split(/\s+/).filter(Boolean)
      : [];

    const characters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;

    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;

    const paragraphs = text.trim()
      ? text.split(/\n+/).filter((p) => p.trim().length > 0).length
      : 0;

    const readingTime = Math.ceil(words.length / 200);

    return {
      words: words.length,
      characters,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy. Please select and copy the text manually.");
    }
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  const statItems = [
    {
      label: "Characters",
      value: stats.characters,
      icon: Type,
    },
    {
      label: "Characters without spaces",
      value: stats.charactersWithoutSpaces,
      icon: AlignLeft,
    },
    {
      label: "Sentences",
      value: stats.sentences,
      icon: FileText,
    },
    {
      label: "Paragraphs",
      value: stats.paragraphs,
      icon: AlignLeft,
    },
    {
      label: "Estimated reading time",
      value: `${stats.readingTime} min`,
      icon: Clock,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold"
            aria-label="EverydayToolsHub homepage"
          >
            <span className="rounded-xl bg-blue-600 p-2 text-white">
              <FileText size={20} />
            </span>
            Everyday<span className="text-blue-600">Tools</span>Hub
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main tool */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Type size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Online Text Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Free Online Word Counter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Count words, characters, sentences and paragraphs instantly.
            Check your writing length and estimated reading time with our
            simple, free online word counter.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Text editor */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Your text</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Start typing or paste your content
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!text}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={!text}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RotateCcw size={16} />
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Start typing or paste your text here..."
              aria-label="Enter text to count words and characters"
              className="min-h-[350px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-5 text-base leading-8 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />

            <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
              <span>Live counting enabled</span>
              <span>{stats.characters.toLocaleString()} characters entered</span>
            </div>
          </section>

          {/* Statistics */}
          <aside
            className="space-y-4"
            aria-label="Text statistics"
            aria-live="polite"
          >
            <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-200">
              <div className="flex items-center gap-2 text-blue-100">
                <FileText size={19} />
                <span className="text-sm font-semibold">Total words</span>
              </div>

              <p className="mt-4 text-5xl font-black tabular-nums">
                {stats.words.toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-blue-100">
                Words in your text
              </p>
            </div>

            {statItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                      <Icon size={18} />
                    </span>

                    <span className="text-sm font-medium text-slate-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="font-bold tabular-nums">
                    {typeof item.value === "number"
                      ? item.value.toLocaleString()
                      : item.value}
                  </span>
                </div>
              );
            })}
          </aside>
        </div>

        {/* How to use */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            How to Use the Online Word Counter
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            You can check the length of any text in three simple steps.
            No registration or software installation is required.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <span className="font-bold text-blue-600">01</span>
              <h3 className="mt-2 font-semibold">Enter your text</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Type directly into the editor or paste content from a
                document, email, article or assignment.
              </p>
            </div>

            <div>
              <span className="font-bold text-blue-600">02</span>
              <h3 className="mt-2 font-semibold">Check your statistics</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                View your word count, character count, sentences,
                paragraphs and estimated reading time instantly.
              </p>
            </div>

            <div>
              <span className="font-bold text-blue-600">03</span>
              <h3 className="mt-2 font-semibold">Copy or clear your text</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy your original content when finished or clear the
                editor to start another word count.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Features of Our Free Word Counter
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            EverydayToolsHub provides useful writing statistics in one
            place, helping you understand the length and structure of
            your content.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">Instant word counting</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get an updated word count automatically while typing or
                editing your text.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Character counting</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                See the total number of characters, including spaces,
                and the number without whitespace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Sentence and paragraph count</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Understand the basic structure of your writing through
                sentence and paragraph statistics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Reading time estimate</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get an approximate reading time based on an average
                reading speed of 200 words per minute.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Copy and clear options</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Easily copy your text or clear the editor whenever you
                want to start again.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Free and browser-based</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use the tool directly in your browser without creating
                an account or downloading an application.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Who Can Use an Online Word Counter?
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <h3 className="font-semibold">Students and researchers</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Check the length of essays, assignments, reports,
                research summaries and academic writing before submission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Bloggers and content writers</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Monitor article length, organize written content and
                estimate how long readers may need to finish an article.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Freelancers and professionals</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Review proposals, business documents, emails and other
                written material when a word or character limit matters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Social media creators</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Check the length of captions, descriptions and short
                posts before publishing them.
              </p>
            </div>
          </div>
        </section>

        {/* How counting works */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            How Does Word Counting Work?
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This tool separates text into words using whitespace, such
            as spaces and line breaks. It then calculates characters,
            sentences and paragraphs using simple text rules.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold">Example</h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              &quot;Learning new skills can create better opportunities.&quot;
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Words", value: "7" },
                { label: "Characters", value: "56" },
                { label: "Sentences", value: "1" },
                { label: "Paragraphs", value: "1" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-200 bg-white p-3"
                >
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-1 text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Note: Sentence counting uses common punctuation marks
            (periods, question marks and exclamation marks). It is an
            estimate and may not recognize every abbreviation or unusual
            sentence structure correctly.
          </p>
        </section>

        {/* FAQs */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 divide-y divide-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-800">
                  {faq.question}

                  <span className="text-xl text-blue-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Explore More Free Tools</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Try other EverydayToolsHub utilities to make everyday
            writing and calculations easier.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/tools/case-converter"
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Case Converter
            </Link>

            <Link
              href="/tools/remove-extra-spaces"
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Remove Extra Spaces
            </Link>

            <Link
              href="/tools/json-formatter"
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              JSON Formatter
            </Link>

            <Link
              href="/tools/percentage-calculator"
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Percentage Calculator
            </Link>
          </div>
        </section>

        {/* Privacy note */}
        <p className="mt-8 text-center text-sm leading-6 text-slate-500">
          Your text is processed in your browser and is not sent to our
          server by this tool. You can use the word counter without
          creating an account.
        </p>
      </section>
    </main>
  );
}