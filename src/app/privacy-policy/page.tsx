
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the EverydayToolsHub privacy policy and learn how our free online tools handle your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="text-sm font-semibold text-cyan-700">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-black text-slate-900">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: November 25, 2026
        </p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900">1. Introduction</h2>
            <p className="mt-2">
              Welcome to EverydayToolsHub. We provide free online tools to
              help users with text editing, JSON formatting, calculations,
              and other everyday tasks. This policy explains how information
              may be handled when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              2. Information We Process
            </h2>
            <p className="mt-2">
              Our current tools are designed to process the text and numbers
              you enter directly in your browser. We do not intentionally
              send the content entered into these tools to our own servers.
            </p>
            <p className="mt-2">
              Our hosting provider or other website services may collect
              technical information such as IP address, browser type, device
              information, and access logs as part of normal website
              operation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              3. Cookies and Analytics
            </h2>
            <p className="mt-2">
              We may use cookies or similar technologies in the future for
              website functionality, analytics, and advertising. If these
              services are introduced, this policy will be updated to
              explain their use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              4. Third-Party Services and Advertising
            </h2>
            <p className="mt-2">
              Our website may use third-party services, including hosting,
              analytics, and advertising providers. These providers may
              process information under their own privacy policies.
            </p>
            <p className="mt-2">
              If advertising services such as Google AdSense are introduced,
              third-party vendors may use cookies or similar technologies
              to serve and measure advertisements, subject to applicable
              consent and privacy requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              5. Data Security
            </h2>
            <p className="mt-2">
              We aim to use reasonable measures to protect our website.
              However, no internet transmission or electronic storage
              method can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              6. Children's Privacy
            </h2>
            <p className="mt-2">
              Our website provides general-purpose online utilities and is
              not specifically directed at children. Please do not submit
              sensitive personal information through our tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              7. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy when our website features
              or services change. The latest version will be published on
              this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              8. Contact
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, please use
              our Contact page.
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
