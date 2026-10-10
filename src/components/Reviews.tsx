import { Quote, Star } from "lucide-react";
import { reviews } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Reviews() {
  return (
    <section id="reviews" className="py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Відгуки" title="Що кажуть клієнти" align="left" />
          <Reveal className="flex items-center gap-4">
            <span className="font-display text-6xl text-ink-900">4.9</span>
            <span className="flex flex-col gap-1">
              <span className="flex gap-0.5 text-bronze-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <span className="text-sm text-ink-600">понад 200 відгуків</span>
            </span>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={0.08 * i} className="h-full">
              <figure className="flex h-full flex-col gap-6 rounded-[1.75rem] bg-sand-100 p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5 text-bronze-500">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-4 fill-current" />
                    ))}
                  </span>
                  <Quote className="size-8 text-bronze-400/50" />
                </div>
                <blockquote className="font-display text-2xl leading-snug text-ink-900">
                  «{r.text}»
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-ink-900 font-display text-xl text-sand-50">
                    {r.name[0]}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-ink-900">{r.name}</span>
                    <span className="text-sm text-ink-600">{r.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
