import React from "react";
import Link from "next/link";
import AboutHeader from "@/components/about/AboutHeader";
import ProjectOverview from "@/components/about/ProjectOverview";
import TechStackCost from "@/components/about/TechStackCost";
import CurrentArchitecture from "@/components/about/CurrentArchitecture";
import AwsRoadmap from "@/components/about/AwsRoadmap";
import SecurityMeasures from "@/components/about/SecurityMeasures";

export const metadata = {
  title: "About | Task Manager",
  description: "Project Specification and AWS Cloud Migration Roadmap for Task Manager.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-zinc-100 font-sans text-zinc-950 transition-colors dark:from-zinc-950 dark:via-slate-950 dark:to-blue-950 dark:text-zinc-50">
      <AboutHeader />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Documentation & Strategy
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Project Specification
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            In-depth analysis of the Task Manager architecture, cost optimizations, security patterns, and future cloud-scale expansion.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <ProjectOverview />
          <TechStackCost />
          <CurrentArchitecture />
          <AwsRoadmap />
          <SecurityMeasures />

          {/* Technical FAQ CTA Card */}
          <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Deep Dive
                  </span>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Technical FAQ
                  </h2>
                </div>
              </div>

              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Explore comprehensive technical documentation covering the application architecture,
                tech stack details, performance optimizations, and the complete AWS cloud migration roadmap.
                Get answers to complex questions about code design patterns, database strategies, and security implementations.
              </p>

              <div className="mt-2">
                <Link
                  href="/technical-faq"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 dark:bg-purple-500 dark:hover:bg-purple-400 dark:hover:shadow-purple-400/25"
                >
                  <span>View Technical FAQ</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200/50 py-8 text-center text-xs text-zinc-400 transition-colors dark:border-zinc-800/40 dark:text-zinc-500">
        <p>© {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
      </footer>
    </div>
  );
}
