import { Activity, ArrowUpRight, Clock, Dumbbell, Hand, HeartPulse, Layers, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services, type Service } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const icons: Record<Service["icon"], LucideIcon> = {
  back: Hand,
  sport: Dumbbell,
  recovery: HeartPulse,
  lymph: Waves,
  deep: Layers,
  neck: Activity,
};

export function Services() {
  return (
    <section id="services" className="bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Послуги та ціни"
          title="Масаж, підібраний під ваше завдання"
          description="Не знаєте, що обрати? Напишіть мені — підкажу, яка техніка підійде саме вам."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={0.06 * i} className="h-full">
                <article className="group relative flex h-full flex-col gap-6 rounded-[1.75rem] bg-sand-50 p-8 ring-1 ring-ink-900/5 transition duration-500 hover:-translate-y-1 hover:bg-ink-900 hover:shadow-2xl hover:shadow-ink-900/20">
                  {s.popular && (
                    <span className="absolute top-8 right-8 rounded-full bg-bronze-500 px-3 py-1 text-xs font-semibold text-sand-50">
                      Популярне
                    </span>
                  )}
                  <span className="grid size-14 place-items-center rounded-2xl bg-bronze-500/12 text-bronze-600 transition group-hover:bg-bronze-500 group-hover:text-sand-50">
                    <Icon className="size-6" />
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-3xl leading-tight text-ink-900 transition group-hover:text-sand-50">
                      {s.title}
                    </h3>
                    <p className="leading-relaxed text-ink-600 transition group-hover:text-sand-200/75">
                      {s.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-end justify-between border-t border-ink-900/10 pt-6 transition group-hover:border-sand-50/15">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-sm text-ink-400 group-hover:text-sand-200/60">
                        <Clock className="size-4" />
                        {s.duration}
                      </span>
                      <span className="font-display text-3xl font-semibold text-ink-900 transition group-hover:text-bronze-300">
                        {s.price}
                      </span>
                    </div>
                    <a
                      href="#booking"
                      aria-label={`Записатися: ${s.title}`}
                      className="grid size-12 place-items-center rounded-full border border-ink-900/15 text-ink-900 transition group-hover:border-bronze-400 group-hover:bg-bronze-500 group-hover:text-sand-50"
                    >
                      <ArrowUpRight className="size-5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
