import React from "react";
import FaqViewer from "@/components/faq/FaqViewer";
import TechnicalFaqHeader from "@/components/faq/TechnicalFaqHeader";

export const metadata = {
  title: "Technical FAQ | Task Manager",
  description: "Comprehensive technical documentation covering architecture, tech stack, and cloud migration specifications.",
};

export default function TechnicalFaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-zinc-100 font-sans text-zinc-950 transition-colors dark:from-zinc-950 dark:via-slate-950 dark:to-blue-950 dark:text-zinc-50">
      <TechnicalFaqHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 sm:hidden">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Technical Documentation
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Technical FAQ
          </h1>
        </div>
        <div className="mb-8">
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Explore in-depth technical questions and answers about the Task Manager application architecture,
            code design patterns, performance optimizations, and AWS cloud migration roadmap.
          </p>
        </div>

        <FaqViewer />
      </main>

      <footer className="border-t border-zinc-200/50 py-8 text-center text-xs text-zinc-400 transition-colors dark:border-zinc-800/40 dark:text-zinc-500">
        <p>© {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
      </footer>
    </div>
  );
}
