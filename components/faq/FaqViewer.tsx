"use client";

import React, { useState, useMemo } from "react";
import { faqCategories, FAQCategory, FAQItem } from "@/lib/faq-data";

export default function FaqViewer() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItemIds, setOpenItemIds] = useState<Set<string>>(new Set());

  // Handle accordion toggle
  const toggleAccordion = (id: string) => {
    const newOpenIds = new Set(openItemIds);
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id);
    } else {
      newOpenIds.add(id);
    }
    setOpenItemIds(newOpenIds);
  };

  // Expand All / Collapse All functions
  const expandAll = (filteredItems: FAQItem[]) => {
    setOpenItemIds(new Set(filteredItems.map(item => item.id)));
  };

  const collapseAll = () => {
    setOpenItemIds(new Set());
  };

  // SVG Helper
  const getIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Layers":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "Code":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "Cloud":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case "Database":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      default:
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        );
    }
  };

  // Filter categories and items based on search query and active category
  const filteredData = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return faqCategories
      .map((category) => {
        // If searching and active category is not "all" and matches current category or if activeCategoryId matches
        const isCategoryActive = activeCategoryId === "all" || activeCategoryId === category.id;

        if (!isCategoryActive) {
          return null;
        }

        const matchedItems = category.items.filter((item) => {
          if (!normalizedQuery) return true;
          return (
            item.question.toLowerCase().includes(normalizedQuery) ||
            item.answer.toLowerCase().includes(normalizedQuery)
          );
        });

        if (matchedItems.length === 0) {
          return null;
        }

        return {
          ...category,
          items: matchedItems,
        };
      })
      .filter((category): category is FAQCategory => category !== null);
  }, [activeCategoryId, searchQuery]);

  // Flat list of all currently viewable items (useful for bulk action expand)
  const allViewableItems = useMemo(() => {
    return filteredData.flatMap((cat) => cat.items);
  }, [filteredData]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      {/* Sidebar Section */}
      <aside className="lg:col-span-1">
        <div className="sticky top-6 flex flex-col gap-2 rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/60">
          <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Categories
          </h2>
          <nav className="mt-2 flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0">
            {/* "All Categories" Toggle Button */}
            <button
              onClick={() => {
                setActiveCategoryId("all");
                setOpenItemIds(new Set());
              }}
              className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeCategoryId === "all"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/40"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              All Categories
            </button>

            {/* List of Main Categories */}
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setOpenItemIds(new Set());
                }}
                className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategoryId === category.id
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/40"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {getIcon(category.icon, "w-5 h-5")}
                </div>
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="lg:col-span-3">
        {/* Search Input Bar & Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search technical topics & answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => expandAll(allViewableItems)}
              disabled={allViewableItems.length === 0}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              disabled={openItemIds.size === 0}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Categories / Accordions Content */}
        {filteredData.length > 0 ? (
          <div className="space-y-8">
            {filteredData.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-2 dark:border-zinc-800/50">
                  {getIcon(category.icon, "w-5 h-5 text-blue-500 dark:text-blue-400")}
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.items.map((item) => {
                    const isOpen = openItemIds.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700/80"
                      >
                        {/* Header Trigger */}
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-zinc-900 transition-colors focus:outline-none dark:text-zinc-100"
                        >
                          <span className="pr-4 text-sm sm:text-base font-semibold leading-snug">
                            {item.question}
                          </span>
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition-transform duration-200 dark:bg-zinc-800 dark:text-zinc-400 ${
                              isOpen ? "rotate-180 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" : ""
                            }`}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </button>

                        {/* Collapsible Panel */}
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen ? "max-h-[500px] border-t border-zinc-100 dark:border-zinc-800/50" : "max-h-0"
                          }`}
                        >
                          <div className="p-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 py-16 text-center dark:border-zinc-800">
            <div className="rounded-full bg-zinc-50 p-4 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-white">
              No technical Q&As found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              We could not find any answers matching &ldquo;{searchQuery}&rdquo;. Try using different terms or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategoryId("all");
              }}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Clear Search & Filter
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
