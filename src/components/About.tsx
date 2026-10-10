import { Check } from "lucide-react";
import Image from "next/image";
import { about, site } from "@/content/site";
import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 md:grid-cols-[20rem_1fr] lg:grid-cols-[26rem_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[20rem] md:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-ink-900">
            <Image
              src="/images/oleksii.jpg"
              alt={`${site.name} у тренажерному залі`}
              fill
              sizes="(min-width: 1024px) 416px, 320px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-bronze-600 uppercase">
            <span className="h-px w-8 bg-current" />
            Про мене
          </span>
          <h2 className="font-display text-4xl leading-[1.05] font-medium sm:text-5xl">{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-ink-600">
              {p}
            </p>
          ))}
          <ul className="flex flex-col gap-3">
            {about.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-bronze-600" />
                <span className="text-ink-800">{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
