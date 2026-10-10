import { Star } from "lucide-react";
import { reviews } from "@/content/site";
import { SectionHeading } from "./ui/SectionHeading";

export function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Відгуки" title="Що кажуть клієнти" align="left" />
      </div>

      {/* Відгуки в один ряд: на телефоні гортаються вбік. */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 xl:scroll-px-[calc((100vw-80rem)/2+2rem)] xl:px-[calc((100vw-80rem)/2+2rem)]">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-[1.75rem] bg-sand-100 p-7 sm:w-[24rem]"
          >
            <span className="flex gap-0.5 text-bronze-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <blockquote className="text-lg leading-relaxed text-ink-800">«{r.text}»</blockquote>
            <figcaption className="mt-auto">
              <span className="font-semibold text-ink-900">{r.name}</span>
              <span className="text-sm text-ink-600"> · {r.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
