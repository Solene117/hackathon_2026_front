import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
};

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.question}
            className="rounded-xl border border-neutral-300 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left"
            >
              <span className="font-bold">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-[#27509B] transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-neutral-200 px-4 pb-4 pt-3">
                <p className="text-sm leading-relaxed text-neutral-600">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
