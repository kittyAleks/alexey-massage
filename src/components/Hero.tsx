"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Dumbbell, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site, stats } from "@/content/site";
import { useBooking } from "./BookingDialog";

const ease = [0.22, 1, 0.36, 1] as const;

// Відео — фон на весь перший екран.
const HERO_VIDEO = "/video/massage.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { openBooking } = useBooking();
  const [video, setVideo] = useState(false);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-950 text-sand-50"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image src={HERO_POSTER} alt="" fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
        <video
          className="absolute inset-0 size-full object-cover object-[50%_40%] motion-reduce:hidden"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/75 via-ink-950/55 to-ink-950/90 lg:from-ink-950/60 lg:via-ink-950/40 lg:to-ink-950/85" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-ink-950/85 via-ink-950/45 to-transparent lg:block" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pt-32 pb-16 sm:px-8">
        <motion.div style={{ opacity: fade }} className="flex max-w-3xl flex-col">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-sand-50/20 bg-sand-50/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur"
          >
            <Dumbbell className="size-3.5 text-bronze-300" />
            {site.role}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display text-[clamp(2.9rem,8vw,6.5rem)] leading-[0.95] font-medium tracking-tight"
          >
            Повернемо тілу <em className="text-bronze-300">легкість</em> і силу
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-sand-100/85 sm:text-xl"
          >
            Масаж у кабінеті тренажерного залу: знімаю біль і напругу, допомагаю швидше
            відновлюватись після тренувань і повертаю свободу рухів.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => openBooking()}
              className="group inline-flex items-center gap-3 rounded-full bg-bronze-500 px-8 py-4 font-semibold text-sand-50 shadow-lg shadow-bronze-600/30 transition hover:bg-bronze-400"
            >
              Записатись на сеанс
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => setVideo(true)}
              className="group inline-flex items-center gap-3 rounded-full px-3 py-2 font-semibold text-sand-50"
            >
              <span className="grid size-12 place-items-center rounded-full border border-sand-50/40 transition group-hover:border-bronze-300 group-hover:bg-sand-50/10">
                <Play className="size-4 fill-current" />
              </span>
              Дивитись відео
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative border-t border-sand-50/15 bg-ink-950/50 backdrop-blur-md"
      >
        <dl className="mx-auto grid max-w-7xl grid-cols-3 px-5 sm:px-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 border-l border-sand-50/10 py-6 pl-4 first:border-l-0 first:pl-0 sm:py-8 sm:pl-8"
            >
              <dt className="order-2 text-xs text-sand-200/70 sm:text-sm">{s.label}</dt>
              <dd className="font-display text-3xl font-medium text-sand-50 sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* Портал: секція має isolate, тож без нього шапка перекривала б вікно. */}
      {video && createPortal(<VideoModal onClose={() => setVideo(false)} />, document.body)}
    </section>
  );
}

// Те саме відео на весь екран, з кнопками керування.
function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name} за роботою`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/95 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрити"
        className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-sand-50/10 text-sand-50 transition hover:bg-sand-50/20"
      >
        <X className="size-6" />
      </button>
      <video
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="aspect-9/16 max-h-[88svh] w-auto max-w-full rounded-2xl bg-black"
      />
    </motion.div>
  );
}
