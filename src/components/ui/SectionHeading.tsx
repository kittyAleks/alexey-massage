import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal
      className={`flex flex-col gap-4 ${centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-xl"}`}
    >
      <span
        className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-bronze-300" : "text-bronze-600"}`}
      >
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl ${dark ? "text-sand-50" : "text-ink-900"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-sand-200/70" : "text-ink-600"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
