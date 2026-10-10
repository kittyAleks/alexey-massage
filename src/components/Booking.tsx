"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Clock, Dumbbell, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { services, site } from "@/content/site";
import { InstagramIcon, TelegramIcon, ViberIcon, WhatsAppIcon } from "./ui/SocialIcons";
import { Reveal } from "./ui/Reveal";

type Status = "idle" | "error" | "done";

const fieldClass =
  "w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-5 py-4 text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-bronze-500 focus:ring-4 focus:ring-bronze-500/15";

const messengers = [
  { href: site.telegram, label: "Telegram", Icon: TelegramIcon, hover: "hover:bg-[#229ED9]" },
  { href: site.viber, label: "Viber", Icon: ViberIcon, hover: "hover:bg-[#7360F2]" },
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon, hover: "hover:bg-[#25D366] hover:text-ink-950" },
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon, hover: "hover:bg-bronze-500" },
];

export function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Поки без бази: збираємо заявку в текст і надсилаємо в месенджер.
  // Пізніше тут буде запис у Supabase.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      return;
    }

    const lines = [
      "Вітаю! Хочу записатися на масаж.",
      `Ім'я: ${name}`,
      `Телефон: ${phone}`,
      `Послуга: ${data.get("service")}`,
      data.get("date") ? `Бажана дата: ${data.get("date")}` : "",
      data.get("comment") ? `Коментар: ${data.get("comment")}` : "",
    ].filter(Boolean);

    setMessage(lines.join("\n"));
    setStatus("done");
  };

  // Telegram і Viber не приймають текст у посиланні на чат — копіюємо його в буфер.
  const copyAndOpen = async (href: string) => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      // буфер обміну недоступний — просто відкриваємо чат
    }
    window.open(href, "_blank", "noopener");
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-ink-900 py-24 text-sand-50 sm:py-32">
      <div className="pointer-events-none absolute -right-40 -bottom-40 size-[36rem] rounded-full bg-bronze-500/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <Reveal className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-bronze-300 uppercase">
              <span className="h-px w-8 bg-current" />
              Запис
            </span>
            <h2 className="font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
              Запишіться на сеанс
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-sand-200/70">
              Залиште заявку — я зв&apos;яжуся з вами, відповім на запитання й підберу зручний час.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-4 transition hover:text-bronze-300">
                <span className="grid size-12 place-items-center rounded-full bg-sand-50/10">
                  <Phone className="size-5 text-bronze-300" />
                </span>
                <span className="text-lg font-semibold">{site.phone}</span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-sand-50/10">
                <Dumbbell className="size-5 text-bronze-300" />
              </span>
              <span className="text-sand-100/90">{site.location}</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-sand-50/10">
                <MapPin className="size-5 text-bronze-300" />
              </span>
              <span className="text-sand-100/90">{site.address}</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-sand-50/10">
                <Clock className="size-5 text-bronze-300" />
              </span>
              <span className="text-sand-100/90">{site.hours}</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            {messengers.map(({ href, label, Icon, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full bg-sand-50/10 px-5 py-3 font-medium transition ${hover}`}
              >
                <Icon className="size-5" /> {label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative rounded-[2rem] bg-sand-100 p-6 text-ink-900 shadow-2xl sm:p-10">
            <AnimatePresence mode="wait">
              {status !== "done" ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="mb-2 font-display text-3xl">Заявка на масаж</h3>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-ink-600">Ваше ім&apos;я</span>
                    <input name="name" autoComplete="name" placeholder="Олена" className={fieldClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-ink-600">Телефон</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+380 (__) ___-__-__"
                      className={fieldClass}
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-ink-600">Послуга</span>
                      <select name="service" className={fieldClass} defaultValue={services[0].title}>
                        {services.map((s) => (
                          <option key={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-ink-600">Бажана дата</span>
                      <input name="date" type="date" className={fieldClass} />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-ink-600">Коментар</span>
                    <textarea
                      name="comment"
                      rows={3}
                      placeholder="Що турбує, зручний час, тренуєтеся чи ні…"
                      className={`${fieldClass} resize-none`}
                    />
                  </label>

                  {status === "error" && (
                    <p role="alert" className="text-sm font-medium text-red-700">
                      Вкажіть ім&apos;я та коректний номер телефону.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-ink-900 px-8 py-4 font-semibold text-sand-50 transition hover:bg-bronze-600"
                  >
                    <CalendarCheck className="size-5" />
                    Надіслати заявку
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-bronze-500 text-sand-50">
                    <CalendarCheck className="size-8" />
                  </span>
                  <h3 className="font-display text-3xl">Майже готово!</h3>
                  <p className="text-ink-600">
                    Надішліть заявку в зручний месенджер — я відповім найближчим часом.
                    {copied && " Текст уже скопійовано — просто вставте його в чат."}
                  </p>
                  <pre className="rounded-2xl bg-sand-50 p-5 font-sans text-sm whitespace-pre-wrap text-ink-800 ring-1 ring-ink-900/5">
                    {message}
                  </pre>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => copyAndOpen(site.telegram)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#229ED9] px-5 py-4 font-semibold text-white transition hover:brightness-95"
                    >
                      <TelegramIcon className="size-5" /> Telegram
                    </button>
                    <button
                      type="button"
                      onClick={() => copyAndOpen(site.viber)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7360F2] px-5 py-4 font-semibold text-white transition hover:brightness-95"
                    >
                      <ViberIcon className="size-5" /> Viber
                    </button>
                    <a
                      href={`${site.whatsapp}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-4 font-semibold text-ink-950 transition hover:brightness-95"
                    >
                      <WhatsAppIcon className="size-5" /> WhatsApp
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setCopied(false);
                    }}
                    className="text-sm font-medium text-ink-600 underline underline-offset-4 hover:text-ink-900"
                  >
                    Змінити заявку
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
