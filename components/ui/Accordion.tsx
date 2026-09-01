"use client";

import { useState } from "react";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-medium text-cabin">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cabin/10 text-plum transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {/* Height-animated via a grid-template-rows transition (0fr -> 1fr)
                so the content collapses/expands smoothly instead of popping
                in and out — no JS height measurement needed. */}
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-graphite-soft">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
