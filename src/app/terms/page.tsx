
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using free online tools provided by EverydayToolsHub.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="text-sm font-semibold text-cyan-700">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-black text-slate-900">
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: November 25, 2026
        </p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By accessing and using EverydayToolsHub, you agree to these
              Terms of Service. If you do not agree with these terms,
              please do not use the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              2. Our Services
            </h2>
            <p className="mt-2">
              EverydayToolsHub provides free online utilities, including
              word counting, text conversion, JSON formatting, text cleaning,
              and percentage calculations.
            </p>
            <p className="mt-2">
              We may add, modify, suspend, or discontinue tools and features
              at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              3. Acceptable Use
            </h2>
            <p className="mt-2">
              You agree not to misuse the website, attempt unauthorized
              access, interfere with its operation, distribute malicious
              software, or use the services for unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              4. Accuracy of Results
            </h2>
            <p className="mt-2">
              Our tools are provided for general informational and
              productivity purposes. Although we aim to provide accurate
              results, you are responsible for checking important outputs
              before relying on them.
            </p>
            <p className="mt-2">
              Do not rely solely on our calculators or tools for financial,
              legal, medical, or other high-impact decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              5. Intellectual Property
            </h2>
            <p className="mt-2">
              The website's original design, branding, and content are
              protected by applicable intellectual property laws. You may
              use the tools for personal or lawful business purposes.
              You retain responsibility for content you enter into them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              6. Third-Party Services
            </h2>
            <p className="mt-2">
              Our website may contain links to third-party websites or use
              third-party services. We are not responsible for their
              content, availability, or privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              7. Disclaimer
            </h2>
            <p className="mt-2">
              The website and its tools are provided on an "as is" and
              "as available" basis, without warranties to the extent
              permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              8. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the extent permitted by applicable law, EverydayToolsHub
              shall not be liable for indirect or consequential losses,
              loss of data, or damages arising from the use or inability
              to use the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              9. Changes to These Terms
            </h2>
            <p className="mt-2">
              We may revise these terms as the website develops. Updated
              terms will be published on this page with a revised date.
              Continued use of the website after changes means you accept
              the updated terms, subject to applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              10. Contact
            </h2>
            <p className="mt-2">
              If you have questions about these terms, please contact us
              through our Contact page.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-block font-semibold text-cyan-700 hover:underline"
            >
              Contact EverydayToolsHub →
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
