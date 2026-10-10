"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { services, site } from "@/content/site";
import { TelegramIcon, ViberIcon, WhatsAppIcon } from "./ui/SocialIcons";

// Форма запису відкривається у вікні з будь-якого місця сторінки — не треба гортати донизу.
type Booking = { openBooking: (service?: string) => void };

const BookingContext = createContext<Booking | null>(null);

export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) throw new Error("useBooking must be used inside BookingProvider");
  return value;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(services[0].title);

  const openBooking = useCallback((title?: string) => {
    if (title) setService(title);
    setOpen(true);
  }, []);

  return (
    <BookingContext value={{ openBooking }}>
      {children}
      <AnimatePresence>
        {open && <BookingModal service={service} onService={setService} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </BookingContext>
  );
}

type Status = "idle" | "error" | "done";

const fieldClass =
  "w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-5 py-3.5 text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-bronze-500 focus:ring-4 focus:ring-bronze-500/15";

type ModalProps = { service: string; onService: (title: string) => void; onClose: () => void };

function BookingModal({ service, onService, onClose }: ModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Поки без бази: збираємо заявку в текст і надсилаємо в месенджер.
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
      `Послуга: ${service}`,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-sand-100 p-6 text-ink-900 shadow-2xl sm:rounded-[2rem] sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити"
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-ink-900/5 transition hover:bg-ink-900/10"
        >
          <X className="size-5" />
        </button>

        {status !== "done" ? (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 pr-12">
              <h2 id="booking-title" className="font-display text-3xl">
                Запис на масаж
              </h2>
              <p className="text-ink-600">Залиште заявку — я зв&apos;яжуся й підберу зручний час.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-ink-600">Послуга</span>
                <select value={service} onChange={(e) => onService(e.target.value)} className={fieldClass}>
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
                rows={2}
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
          </form>
        ) : (
          <div className="flex flex-col gap-5">
            <span className="grid size-14 place-items-center rounded-full bg-bronze-500 text-sand-50">
              <CalendarCheck className="size-7" />
            </span>
            <h2 id="booking-title" className="font-display text-3xl">
              Майже готово!
            </h2>
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
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
