
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact EverydayToolsHub for questions, feedback, suggestions, or reporting issues with our free online tools.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-800">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mt-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
            <MessageCircle size={28} />
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            Contact Us
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Have a question, suggestion, or found an issue with one of
            our tools? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-3 text-cyan-700 shadow-sm">
              <Mail size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Email Support
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Send us your questions and feedback.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-600">
            For support, feedback, or business enquiries, please email:
          </p>
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=nexaimer91@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-3 inline-block font-semibold text-cyan-700 hover:underline"
>
  nexaimer91@gmail.com
</a>

<p className="mt-2 text-xs text-slate-500">
  Click the email address to contact us.
</p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">
            What can you contact us about?
          </h2>

          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-6 text-slate-600">
            <li>Reporting a problem with a tool</li>
            <li>Suggesting a new online tool</li>
            <li>Sharing feedback about the website</li>
            <li>Business and collaboration enquiries</li>
          </ul>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            Please also review our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-cyan-700 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="font-semibold text-cyan-700 hover:underline"
            >
              Terms of Service
            </Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
