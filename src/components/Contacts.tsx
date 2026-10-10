"use client";

import { CalendarCheck, Clock, Dumbbell, MapPin, Phone, Plus } from "lucide-react";
import { faq, site } from "@/content/site";
import { useBooking } from "./BookingDialog";
import { InstagramIcon, TelegramIcon, ViberIcon, WhatsAppIcon } from "./ui/SocialIcons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const messengers = [
  { href: site.telegram, label: "Telegram", Icon: TelegramIcon, hover: "hover:bg-[#229ED9]" },
  { href: site.viber, label: "Viber", Icon: ViberIcon, hover: "hover:bg-[#7360F2]" },
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon, hover: "hover:bg-[#25D366] hover:text-ink-950" },
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon, hover: "hover:bg-bronze-500" },
];

const contacts = [
  { Icon: Dumbbell, text: site.location },
  { Icon: MapPin, text: site.address },
  { Icon: Clock, text: site.hours },
];

// Часті питання й контакти в одному блоці — щоб сторінка закінчувалася швидше.
export function Contacts() {
  const { openBooking } = useBooking();

  return (
    <section id="faq" className="bg-sand-100 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Питання" title="Часті запитання" align="left" />
          <Reveal className="flex flex-col">
            {faq.map((item, i) => (
              <details
                key={item.q}
                name="faq"
                open={i === 0}
                className="group border-b border-ink-900/10 py-5 first:pt-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink-900 sm:text-2xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-900/15 transition group-open:rotate-45 group-open:border-bronze-500 group-open:bg-bronze-500 group-open:text-sand-50">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pt-3 pr-12 leading-relaxed text-ink-600">{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            id="contacts"
            className="flex flex-col gap-7 rounded-[2rem] bg-ink-900 p-7 text-sand-50 sm:p-10 lg:sticky lg:top-28"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-4xl leading-tight">Запишіться на сеанс</h2>
              <p className="text-sand-200/70">Відповім на запитання й підберу зручний час.</p>
            </div>

            <a href={site.phoneHref} className="flex items-center gap-4 transition hover:text-bronze-300">
              <span className="grid size-11 place-items-center rounded-full bg-sand-50/10">
                <Phone className="size-5 text-bronze-300" />
              </span>
              <span className="text-xl font-semibold">{site.phone}</span>
            </a>

            <ul className="flex flex-col gap-3 text-sand-100/85">
              {contacts.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <Icon className="size-5 shrink-0 text-bronze-300" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {messengers.map(({ href, label, Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full bg-sand-50/10 px-4 py-2.5 text-sm font-medium transition ${hover}`}
                >
                  <Icon className="size-4" /> {label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-bronze-500 px-8 py-4 font-semibold text-sand-50 transition hover:bg-bronze-400"
            >
              <CalendarCheck className="size-5" />
              Залишити заявку
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
