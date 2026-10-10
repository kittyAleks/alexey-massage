"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useBooking } from "./BookingDialog";

// На телефоні кнопка запису завжди під рукою — з'являється, щойно перший екран прокручено.
export function MobileCta() {
  const { openBooking } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 bg-sand-50/90 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-1px_0_rgba(28,36,32,0.08)] backdrop-blur-xl transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.phoneHref}
        aria-label={`Подзвонити: ${site.phone}`}
        className="grid size-13 shrink-0 place-items-center rounded-full border border-ink-900/15 text-ink-900"
      >
        <Phone className="size-5" />
      </a>
      <button
        type="button"
        onClick={() => openBooking()}
        className="flex-1 rounded-full bg-bronze-500 font-semibold text-sand-50"
      >
        Записатися на сеанс
      </button>
    </div>
  );
}
