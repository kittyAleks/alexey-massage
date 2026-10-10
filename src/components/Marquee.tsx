import { Sparkles } from "lucide-react";

const items = [
  "Спортивний масаж",
  "Відновлення після тренувань",
  "Класичний масаж",
  "Шийно-комірцева зона",
  "Глибокотканинний масаж",
  "Лімфодренаж",
  "Кабінет у тренажерному залі",
  "Подарункові сертифікати",
];

export function Marquee() {
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink-900/10 bg-sand-100 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl whitespace-nowrap text-ink-800 italic sm:text-3xl"
          >
            {item}
            <Sparkles className="size-5 text-bronze-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
