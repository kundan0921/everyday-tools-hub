
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Braces,
  Check,
  Copy,
  FileJson,
  Minimize2,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const sampleJSON = `{
  "name": "EverydayToolsHub",
  "type": "Free Online Tools",
  "features": [
    "Word Counter",
    "Case Converter",
    "JSON Formatter"
  ],
  "active": true,
  "users": 1000
}`;

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const processJSON = (mode: "format" | "minify" | "validate") => {
    setError("");
    setSuccess("");
    setOutput("");
    setCopied(false);

    if (!input.trim()) {
      setError("Please enter some JSON data first.");
      return;
    }

    try {
      const parsed = JSON.parse(input);

      if (mode === "format") {
        setOutput(JSON.stringify(parsed, null, 2));
        setSuccess("JSON formatted successfully!");
      }

      if (mode === "minify") {
        setOutput(JSON.stringify(parsed));
        setSuccess("JSON minified successfully!");
      }

      if (mode === "validate") {
        setOutput(JSON.stringify(parsed, null, 2));
        setSuccess("Valid JSON! Your JSON syntax is correct.");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid JSON syntax.";

      setError(`Invalid JSON: ${message}`);
    }
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy. Please copy the result manually.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setSuccess("");
    setCopied(false);
  };

  const loadExample = () => {
    setInput(sampleJSON);
    setOutput("");
    setError("");
    setSuccess("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
            <span className="rounded-xl bg-blue-600 p-2 text-white">
              <Braces size={20} />
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
            <FileJson size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Developer Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            JSON Formatter & Validator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Format, beautify, minify and validate JSON data online.
            A simple tool for developers and beginners.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">JSON Input</h2>
              <p className="mt-1 text-sm text-slate-500">
                Paste your JSON data below.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadExample}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600"
              >
                <Sparkles size={16} />
                Example
              </button>

              <button
                onClick={handleClear}
                disabled={!input && !output}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-red-500 disabled:opacity-40"
              >
                <RotateCcw size={16} />
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError("");
              setSuccess("");
              setOutput("");
              setCopied(false);
            }}
            placeholder='Paste JSON here... Example: {"name":"John","age":25}'
            spellCheck={false}
            className="min-h-[300px] w-full resize-y rounded-xl border border-slate-200 bg-slate-950 p-5 font-mono text-sm leading-7 text-green-300 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => processJSON("format")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <WandSparkles size={17} />
              Format JSON
            </button>

            <button
              onClick={() => processJSON("minify")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
            >
              <Minimize2 size={17} />
              Minify JSON
            </button>

            <button
              onClick={() => processJSON("validate")}
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-green-100"
            >
              <Check size={17} />
              Validate JSON
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
            >
              {success}
            </div>
          )}

          {output && (
            <div className="mt-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Result</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your processed JSON data.
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Result"}
                </button>
              </div>

              <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-950 p-5 font-mono text-sm leading-7 text-green-300">
                {output}
              </pre>
            </div>
          )}
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            How to use the JSON Formatter
          </h2>

          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <span className="font-bold text-blue-600">01</span>
              <h3 className="mt-2 font-semibold">Paste JSON</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your JSON data into the input editor.
              </p>
            </div>

            <div>
              <span className="font-bold text-blue-600">02</span>
              <h3 className="mt-2 font-semibold">Choose an action</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Format, minify or validate your JSON.
              </p>
            </div>

            <div>
              <span className="font-bold text-blue-600">03</span>
              <h3 className="mt-2 font-semibold">Copy the result</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy your processed JSON and use it in your project.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-slate-500">
          JSON processing happens in your browser. Your input is not uploaded
          to our server.
        </p>
      </section>
    </main>
  );
}
