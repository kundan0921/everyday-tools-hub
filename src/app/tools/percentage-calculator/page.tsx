
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  Copy,
  Check,
  RotateCcw,
  Percent,
} from "lucide-react";

type Mode = "percentage" | "find" | "change";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("percentage");
  const [first, setFirst] = useState("20");
  const [second, setSecond] = useState("500");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function calculate() {
    const a = Number(first);
    const b = Number(second);

    if (first.trim() === "" || second.trim() === "") {
      setError("Please enter both numbers.");
      setResult(null);
      return;
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setError("Please enter valid numbers.");
      setResult(null);
      return;
    }

    if (mode === "percentage") {
      setResult((a / 100) * b);
    } else if (mode === "find") {
      if (b === 0) {
        setError("The second number cannot be zero.");
        setResult(null);
        return;
      }
      setResult((a / b) * 100);
    } else {
      if (a === 0) {
        setError("The original value cannot be zero.");
        setResult(null);
        return;
      }
      setResult(((b - a) / Math.abs(a)) * 100);
    }

    setError("");
    setCopied(false);
  }

  function reset() {
    setFirst("");
    setSecond("");
    setResult(null);
    setError("");
    setCopied(false);
  }

  async function copyResult() {
    if (result === null) return;

    const suffix = mode === "find" || mode === "change" ? "%" : "";
    const text = `${formatNumber(result)}${suffix}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setError("Unable to copy. Please copy the result manually.");
    }
  }

  function formatNumber(value: number) {
    return Number(value.toFixed(6)).toLocaleString("en-IN");
  }

  const labels = {
    percentage: {
      title: "What is X% of Y?",
      first: "Percentage (%)",
      second: "Number",
      placeholder1: "20",
      placeholder2: "500",
      example: "Example: 20% of 500 = 100",
    },
    find: {
      title: "X is what percentage of Y?",
      first: "First number",
      second: "Total number",
      placeholder1: "50",
      placeholder2: "200",
      example: "Example: 50 is 25% of 200",
    },
    change: {
      title: "Percentage increase or decrease",
      first: "Original value",
      second: "New value",
      placeholder1: "100",
      placeholder2: "150",
      example: "Example: From 100 to 150 = 50% increase",
    },
  };

  const current = labels[mode];

  let resultLabel = "Result";

  if (result !== null) {
    if (mode === "percentage") {
      resultLabel = `${first}% of ${second} is`;
    } else if (mode === "find") {
      resultLabel = `${first} is what percentage of ${second}?`;
    } else {
      resultLabel =
        result > 0
          ? "Percentage increase"
          : result < 0
            ? "Percentage decrease"
            : "No percentage change";
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <span className="rounded-xl bg-cyan-600 p-2 text-white">
              <Calculator size={20} />
            </span>
            EverydayToolsHub
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-cyan-700"
          >
            <ArrowLeft size={16} />
            All Tools
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
            <Percent size={28} />
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Free Percentage Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Calculate percentages, find percentage values, and calculate
            percentage increases or decreases quickly and easily.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold">Choose calculation</h2>

          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["percentage", "Percentage of"],
                ["find", "Find percentage"],
                ["change", "Percentage change"],
              ] as [Mode, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  setMode(value);
                  setResult(null);
                  setError("");
                  setCopied(false);
                }}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  mode === value
                    ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                    : "border-slate-200 text-slate-600 hover:border-cyan-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">{current.title}</h2>

            <p className="mt-2 text-sm text-slate-500">
              {current.example}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-number"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {current.first}
                </label>

                <input
                  id="first-number"
                  type="number"
                  step="any"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder={current.placeholder1}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label
                  htmlFor="second-number"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {current.second}
                </label>

                <input
                  id="second-number"
                  type="number"
                  step="any"
                  value={second}
                  onChange={(e) => setSecond(e.target.value)}
                  placeholder={current.placeholder2}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={calculate}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white transition hover:bg-cyan-700"
              >
                <Calculator size={18} />
                Calculate
              </button>

              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={17} />
                Reset
              </button>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {result !== null && !error && (
              <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
                <p className="text-sm font-medium text-cyan-800">
                  {resultLabel}
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-3xl font-black text-cyan-900 sm:text-4xl">
                    {formatNumber(result)}
                    {mode !== "percentage" ? "%" : ""}
                  </p>

                  <button
                    onClick={copyResult}
                    className="flex items-center gap-2 rounded-xl border border-cyan-300 bg-white px-4 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-100"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy result"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">How to use this calculator</h2>

          <ol className="mt-4 list-inside list-decimal space-y-3 text-sm leading-6 text-slate-600">
            <li>Choose the type of percentage calculation.</li>
            <li>Enter the two numbers in the input fields.</li>
            <li>Click the Calculate button.</li>
            <li>View and copy your result.</li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Related free tools</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/tools/word-counter"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:border-cyan-400"
            >
              Word Counter
            </Link>
            <Link
              href="/tools/case-converter"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:border-cyan-400"
            >
              Case Converter
            </Link>
            <Link
              href="/tools/json-formatter"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:border-cyan-400"
            >
              JSON Formatter
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
