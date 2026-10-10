"use client";

import { services } from "@/content/site";
import { useBooking } from "./BookingDialog";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Services() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="bg-sand-100 py-16 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8">
        <SectionHeading eyebrow="Послуги та ціни" title="Послуги" align="left" />

        <Reveal>
          <ul className="grid gap-x-12 lg:grid-cols-2">
            {services.map((s) => (
              <li key={s.title} className="flex items-start justify-between gap-5 border-b border-ink-900/10 py-5">
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-2xl leading-tight text-ink-900">
                    {s.title}
                    {s.popular && (
                      <span className="ml-3 align-middle font-sans text-xs font-semibold text-bronze-600">
                        Популярне
                      </span>
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-600">{s.description}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-display text-2xl font-semibold whitespace-nowrap text-ink-900">{s.price}</span>
                  <span className="text-sm text-ink-400">{s.duration}</span>
                  <button
                    type="button"
                    onClick={() => openBooking(s.title)}
                    className="text-sm font-semibold text-bronze-600 underline-offset-4 hover:underline"
                  >
                    Записатись
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
