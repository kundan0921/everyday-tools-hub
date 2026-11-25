
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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
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

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Type size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Text Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Online Word Counter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Count words, characters, sentences and paragraphs instantly.
            Paste or type your text below to get started.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-lg">Your text</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Start typing or paste your content
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!text}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
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
              className="min-h-[350px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-5 text-base leading-8 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />

            <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
              <span>Live counting enabled</span>
              <span>{stats.characters} characters entered</span>
            </div>
          </section>

          <aside className="space-y-4">
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

            {[
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
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
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

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">How to use the Word Counter</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <div>
              <span className="font-bold text-blue-600">01</span>
              <h3 className="mt-2 font-semibold">Enter your text</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Type directly or paste text into the editor.
              </p>
            </div>
            <div>
              <span className="font-bold text-blue-600">02</span>
              <h3 className="mt-2 font-semibold">View your results</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                See word, character, sentence and paragraph counts update as you type.
              </p>
            </div>
            <div>
              <span className="font-bold text-blue-600">03</span>
              <h3 className="mt-2 font-semibold">Copy or clear</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy your text or clear the editor when finished.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-slate-500">
          Your text is processed in your browser and is not sent to our server.
        </p>
      </section>
    </main>
  );
}
