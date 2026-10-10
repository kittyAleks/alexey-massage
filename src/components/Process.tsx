import { steps } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Process() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Як це працює"
          title="Від запису до результату"
          align="left"
        />

        <div role="list" className="grid gap-px overflow-hidden rounded-[1.75rem] bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={0.08 * i} className="h-full">
              <div role="listitem" className="flex h-full flex-col gap-4 bg-sand-50 p-8">
                <span className="font-display text-6xl leading-none text-bronze-400 italic">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl text-ink-900">{step.title}</h3>
                <p className="leading-relaxed text-ink-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
