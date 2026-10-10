"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Dumbbell, Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site, stats } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

// Вертикальне відео: на мобільному — фон на весь екран, на десктопі — картка праворуч.
const HERO_VIDEO = "/video/massage.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-950 text-sand-50"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-20 hidden lg:block">
        <Image src="/images/hero-bg.jpg" alt="" fill sizes="(min-width: 1024px) 100vw, 10vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink-950/80" />
        <div className="absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/70 to-ink-950/40" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pt-32 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ opacity: fade }} className="flex flex-col">
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
            відновлюватися після тренувань і повертаю свободу рухів.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 rounded-full bg-bronze-500 px-8 py-4 font-semibold text-sand-50 shadow-lg shadow-bronze-600/30 transition hover:bg-bronze-400"
            >
              Записатися на сеанс
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#video"
              className="group inline-flex items-center gap-3 rounded-full px-3 py-2 font-semibold text-sand-50"
            >
              <span className="grid size-12 place-items-center rounded-full border border-sand-50/40 transition group-hover:border-bronze-300 group-hover:bg-sand-50/10">
                <Play className="size-4 fill-current" />
              </span>
              Дивитися відео
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:justify-self-end"
        >
          <div className="relative size-full overflow-hidden lg:aspect-9/16 lg:h-[min(70vh,640px)] lg:w-auto lg:rounded-[2rem] lg:shadow-2xl lg:shadow-black/50 lg:ring-1 lg:ring-sand-50/15">
            <Image src={HERO_POSTER} alt="" fill priority sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
            <video
              className="absolute inset-0 size-full object-cover motion-reduce:hidden"
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-linear-to-b from-ink-950/75 via-ink-950/55 to-ink-950/90 lg:hidden" />
            <div className="absolute inset-x-0 bottom-0 hidden items-center gap-3 bg-linear-to-t from-ink-950/85 to-transparent p-5 pt-16 lg:flex">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-bronze-300 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-bronze-400" />
              </span>
              <span className="text-sm font-medium text-sand-100">{site.name} за роботою</span>
            </div>
          </div>
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
    </section>
  );
}
