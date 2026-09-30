import { PlusIcon } from "@/components/ui/Icons";
import type { Faq } from "@/content/types";

/** Native disclosure list: accessible and interactive with no JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-b border-rule">
      {faqs.map((faq, index) => (
        <details key={faq.question} open={index === 0} className="group border-t border-rule">
          <summary className="flex min-h-[76px] cursor-pointer items-center justify-between gap-6 py-4 text-lg font-semibold lg:min-h-[84px] lg:text-xl">
            {faq.question}
            <PlusIcon className="faq-icon shrink-0 transition-transform duration-200" />
          </summary>
          <p className="body-copy pb-7 pr-0 lg:pr-20">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
