
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileText,
  Image,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Type,
  X,
  Zap,
} from "lucide-react";

const tools = [
  {
    name: "Word Counter",
    description: "Count words, characters, sentences and paragraphs instantly.",
    category: "Text Tools",
    icon: FileText,
    color: "blue",
    slug: "word-counter",
    tag: "Popular",
  },
  {
    name: "Case Converter",
    description: "Convert text into uppercase, lowercase and title case.",
    category: "Text Tools",
    icon: Type,
    color: "purple",
    slug: "case-converter",
    tag: "Useful",
  },
  {
    name: "Remove Extra Spaces",
    description: "Clean extra spaces and unnecessary blank lines from text.",
    category: "Text Tools",
    icon: Sparkles,
    color: "orange",
    slug: "remove-extra-spaces",
    tag: "Quick tool",
  },
  {
    name: "JSON Formatter",
    description: "Format, beautify and validate JSON data.",
    category: "Developer Tools",
    icon: Code2,
    color: "green",
    slug: "json-formatter",
    tag: "For developers",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, increases and decreases easily.",
    category: "Calculators",
    icon: Calculator,
    color: "pink",
    slug: "percentage-calculator",
    tag: "Popular",
  },
];

const categories = ["All Tools", "Text Tools", "Developer Tools", "Calculators"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Tools");
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        category === "All Tools" || tool.category === category;
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Everyday<span className="text-blue-600">Tools</span>Hub
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#home" className="transition hover:text-blue-600">Home</a>
            <a href="#tools" className="transition hover:text-blue-600">All Tools</a>
            <a href="#about" className="transition hover:text-blue-600">About</a>
            <a href="#footer" className="transition hover:text-blue-600">Contact</a>
          </nav>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenu && (
          <nav className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-5 text-sm font-medium md:hidden">
            <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
            <a href="#tools" onClick={() => setMobileMenu(false)}>All Tools</a>
            <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
            <a href="#footer" onClick={() => setMobileMenu(false)}>Contact</a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 text-center sm:pt-28 lg:px-8">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm">
            <Sparkles size={14} />
            Simple tools for everyday tasks
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Get things done.
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Without the hassle.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Discover simple, fast and free online tools that make your daily
            tasks easier. No complicated setup. Just useful tools.
          </p>

          <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
            <Search className="ml-3 shrink-0 text-slate-400" size={21} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document.getElementById("tools")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              placeholder="Search for a tool..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
              aria-label="Search tools"
            />
            <a
              href="#tools"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-green-600" />
              Easy to use
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={15} className="text-amber-500" />
              Fast tools
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={15} className="text-blue-600" />
              Free to use
            </span>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-16 lg:px-8">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
              Explore our collection
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tools that make life easier
            </h2>
            <p className="mt-3 text-slate-500">
              Choose a tool and get started in seconds.
            </p>
          </div>
          <span className="text-sm font-semibold text-slate-500">
            {filteredTools.length} tools available
          </span>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <article
                key={tool.slug}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    {tool.tag}
                  </span>
                </div>

                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                  {tool.category}
                </p>
                <h3 className="text-xl font-bold">{tool.name}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                  {tool.description}
                </p>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition group-hover:gap-3"
                >
                  Open tool <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Search className="mx-auto mb-4 text-slate-400" size={32} />
            <h3 className="text-lg font-bold">No tools found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search or select a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Tools");
              }}
              className="mt-5 font-semibold text-blue-600"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
              Why EverydayToolsHub?
            </p>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Useful tools.
              <br />
              Less wasted time.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              We are building a collection of practical online tools to help
              students, professionals, creators and developers complete
              everyday tasks more easily.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Simple", detail: "Clear and easy interfaces" },
              { title: "Fast", detail: "Tools built for quick results" },
              { title: "Accessible", detail: "Designed for different screens" },
              { title: "Practical", detail: "Made for everyday needs" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="sm:col-span-2">
            <Link href="/" className="text-xl font-extrabold">
              Everyday<span className="text-blue-400">Tools</span>Hub
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Simple, useful and accessible online tools for everyday tasks.
              Our goal is to save you time.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <a href="#tools" className="hover:text-white">All Tools</a>
              <a href="#about" className="hover:text-white">About Us</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Information</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 px-5 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} EverydayToolsHub. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
