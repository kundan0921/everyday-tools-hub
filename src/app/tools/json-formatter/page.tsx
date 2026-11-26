
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
        {/* Page introduction */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <FileJson size={28} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Free Online Developer Tool
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Free Online JSON Formatter & Validator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Format, beautify, minify and validate JSON data online.
            Make complex JSON easier to read, check syntax errors and
            prepare compact JSON for APIs and development projects.
          </p>
        </div>

        {/* JSON editor */}
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

          <label htmlFor="json-input" className="sr-only">
            Enter JSON data
          </label>

          <textarea
            id="json-input"
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

              <pre
                aria-live="polite"
                className="max-h-[500px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-950 p-5 font-mono text-sm leading-7 text-green-300"
              >
                {output}
              </pre>
            </div>
          )}
        </div>

        {/* How to use */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            How to Use the JSON Formatter
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            You can process JSON data in a few simple steps. This tool
            works directly in your browser without requiring an account
            or software installation.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <span className="font-bold text-blue-600">01</span>
              <h3 className="mt-2 font-semibold">Paste JSON data</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your JSON code into the input editor or click
                Example to load sample JSON.
              </p>
            </div>

            <div>
              <span className="font-bold text-blue-600">02</span>
              <h3 className="mt-2 font-semibold">Choose an action</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select Format JSON, Minify JSON or Validate JSON,
                depending on what you need.
              </p>
            </div>

            <div>
              <span className="font-bold text-blue-600">03</span>
              <h3 className="mt-2 font-semibold">Copy the result</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review the processed JSON and click Copy Result to
                use it in your application or project.
              </p>
            </div>
          </div>
        </section>

        {/* Features explained */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            JSON Formatter, Minifier and Validator Features
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Each operation is designed for a different JSON development
            task. Choose the one that matches your requirement.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Format JSON</h3>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs leading-6 text-green-300">
{`{
  "name": "John",
  "age": 25
}`}
              </pre>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Adds indentation and line breaks to make JSON data
                easier to read, understand and debug.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Minify JSON</h3>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs leading-6 text-green-300">
{`{"name":"John","age":25}`}
              </pre>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Removes unnecessary whitespace and formatting to
                produce compact JSON output.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Validate JSON</h3>
              <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">
                <Check size={16} className="mr-2 inline" />
                Valid JSON
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Checks whether the input follows valid JSON syntax
                and displays a parsing error if it does not.
              </p>
            </article>
          </div>
        </section>

        {/* JSON explanation */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            What Is JSON?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            JSON stands for JavaScript Object Notation. It is a
            lightweight text-based data format used to store and
            exchange structured information between applications.
            JSON is widely used in web development, APIs, configuration
            files and data exchange between different systems.
          </p>

          <h3 className="mt-6 font-bold">Example of JSON data</h3>

          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-green-300">
{`{
  "name": "Alex",
  "age": 24,
  "isStudent": true,
  "skills": ["JavaScript", "React", "Node.js"]
}`}
          </pre>

          <p className="mt-4 leading-7 text-slate-600">
            JSON supports objects, arrays, strings, numbers, boolean
            values and null. It uses double quotes around property
            names and string values. A valid JSON document must follow
            the JSON syntax rules.
          </p>
        </section>

        {/* Common errors */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Common JSON Syntax Errors
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            If your JSON cannot be parsed, check for common formatting
            mistakes like these.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold">1. Using single quotes</h3>
              <p className="mt-2 text-sm text-red-600">
                Invalid: {'{ name: \'John\' }'}
              </p>
              <p className="mt-1 text-sm text-green-700">
                Correct: {'{ "name": "John" }'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">2. Missing double quotes around keys</h3>
              <p className="mt-2 text-sm text-red-600">
                Invalid: {'{ name: "John" }'}
              </p>
              <p className="mt-1 text-sm text-green-700">
                Correct: {'{ "name": "John" }'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">3. Trailing commas</h3>
              <p className="mt-2 text-sm text-red-600">
                Invalid: {'{ "name": "John", }'}
              </p>
              <p className="mt-1 text-sm text-green-700">
                Correct: {'{ "name": "John" }'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">4. Missing commas between properties</h3>
              <p className="mt-2 text-sm text-red-600">
                Invalid: {'{ "name": "John" "age": 25 }'}
              </p>
              <p className="mt-1 text-sm text-green-700">
                Correct: {'{ "name": "John", "age": 25 }'}
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Who Can Use This JSON Tool?
          </h2>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">Web developers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Format API responses, inspect structured data and
                prepare JSON configuration files.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Software engineering students</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn JSON syntax and practice working with objects,
                arrays and nested data.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Backend developers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review JSON payloads used in REST APIs and
                application-to-application communication.
              </p>
            </div>

            <div>
              <h3 className="font-bold">QA testers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Check JSON test data and validate syntax before
                using it in test cases.
              </p>
            </div>
          </div>
        </section>

        {/* About and privacy */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            About the Free Online JSON Formatter
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            The EverydayToolsHub JSON Formatter is a browser-based
            utility for formatting, minifying and validating JSON
            data. It uses standard JavaScript JSON parsing and
            serialization to process your input.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Formatting adds two-space indentation for readability.
            Minification removes unnecessary whitespace. Validation
            checks whether the supplied content can be parsed as
            JSON and reports syntax errors when parsing fails.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            This tool checks JSON syntax, not whether the data follows
            a particular API schema or business rule. A syntactically
            valid JSON document may still contain unexpected or
            incorrect application data.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            JSON processing happens in your browser. Your input is
            not uploaded to our server for formatting or validation.
            Avoid pasting passwords, access tokens or other sensitive
            information into online tools.
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
                question: "What is a JSON formatter?",
                answer:
                  "A JSON formatter is a tool that organizes JSON data with indentation and line breaks, making it easier to read, understand and debug.",
              },
              {
                question: "Is this JSON formatter free?",
                answer:
                  "Yes. You can format, minify and validate JSON using EverydayToolsHub without creating an account or installing software.",
              },
              {
                question: "What is the difference between formatting and minifying JSON?",
                answer:
                  "Formatting adds indentation and line breaks for readability. Minifying removes unnecessary whitespace to create compact JSON output.",
              },
              {
                question: "How do I validate JSON online?",
                answer:
                  "Paste your JSON into the editor and click Validate JSON. The tool checks whether the input follows valid JSON syntax and displays an error if parsing fails.",
              },
              {
                question: "Why is my JSON invalid?",
                answer:
                  "Common reasons include missing double quotes around property names, single quotes, trailing commas, missing commas and unmatched brackets or braces.",
              },
              {
                question: "Does JSON support comments?",
                answer:
                  "Standard JSON does not support comments. Remove comments before validating JSON with this tool.",
              },
              {
                question: "Can I use this tool for API responses?",
                answer:
                  "Yes. You can paste JSON API responses to format, minify or check their syntax. This tool does not validate an API-specific schema.",
              },
              {
                question: "Is my JSON data uploaded?",
                answer:
                  "No. JSON processing takes place in your browser, and the input is not sent to a server for processing by this tool.",
              },
              {
                question: "Does this tool work on mobile devices?",
                answer:
                  "Yes. The JSON formatter is designed to work on desktop computers, tablets and mobile browsers.",
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
            Explore other free utilities from EverydayToolsHub.
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
              href="/tools/remove-extra-spaces"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Remove Extra Spaces
              <p className="mt-1 text-sm font-normal text-slate-500">
                Clean spaces, blank lines and duplicates.
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
