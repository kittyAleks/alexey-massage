import { Plus } from "lucide-react";
import { faq } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Faq() {
  return (
    <section id="faq" className="bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <SectionHeading
          eyebrow="Питання"
          title="Часті запитання"
          description="Не знайшли відповідь? Напишіть мені в месенджер — відповім протягом години."
          align="left"
        />

        <Reveal className="flex flex-col">
          {faq.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              open={i === 0}
              className="group border-b border-ink-900/10 py-6 first:pt-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl text-ink-900 sm:text-3xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink-900/15 transition group-open:rotate-45 group-open:border-bronze-500 group-open:bg-bronze-500 group-open:text-sand-50">
                  <Plus className="size-5" />
                </span>
              </summary>
              <p className="max-w-2xl pt-4 pr-16 text-lg leading-relaxed text-ink-600">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
