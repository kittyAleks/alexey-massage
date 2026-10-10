import { Award, Check } from "lucide-react";
import Image from "next/image";
import { about, site } from "@/content/site";
import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          {/* Вертикальний портрет із підписом на самому фото — показуємо цілком, без обрізання. */}
          <div className="relative aspect-941/1672 overflow-hidden rounded-[2rem] bg-ink-900 shadow-2xl shadow-ink-900/20">
            <Image
              src="/images/about.jpg"
              alt={`${site.name} у своєму кабінеті`}
              fill
              sizes="(min-width: 768px) 448px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-4 -bottom-6 flex items-center gap-4 rounded-2xl bg-ink-900 p-5 pr-7 text-sand-50 shadow-2xl sm:-right-8">
            <span className="grid size-12 place-items-center rounded-full bg-bronze-500">
              <Award className="size-6" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-3xl leading-none">3 000+</span>
              <span className="text-sm text-sand-200/70">проведених сеансів</span>
            </span>
          </div>
          <div className="absolute -top-6 -left-6 -z-10 size-40 rounded-full bg-bronze-300/40 blur-3xl" />
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-bronze-600 uppercase">
              <span className="h-px w-8 bg-current" />
              Про мене
            </span>
            <h2 className="font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
              {about.title}
            </h2>
          </Reveal>

          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 * (i + 1)}>
              <p className="text-lg leading-relaxed text-ink-600">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <ul className="flex flex-col gap-4">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-bronze-500/15 text-bronze-600">
                    <Check className="size-4" />
                  </span>
                  <span className="text-ink-800">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="font-display text-3xl text-ink-900 italic">— {site.name}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
