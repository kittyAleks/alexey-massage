"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content/site";
import { SectionHeading } from "./ui/SectionHeading";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const strip = useRef<HTMLDivElement>(null);
  const scrollStrip = (dir: 1 | -1) =>
    strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: "smooth" });

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
        <SectionHeading eyebrow="Галерея" title="Кабінет у залі" align="left" />
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollStrip(dir)}
              aria-label={dir < 0 ? "Попередні фото" : "Наступні фото"}
              className="grid size-12 place-items-center rounded-full border border-ink-900/15 transition hover:bg-ink-900 hover:text-sand-50"
            >
              {dir < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Одна стрічка фото, гортається вбік — сторінка не стає довшою. */}
      <div ref={strip} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 xl:scroll-px-[calc((100vw-80rem)/2+2rem)] xl:px-[calc((100vw-80rem)/2+2rem)]">
        {gallery.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Відкрити фото: ${img.alt}`}
            className="shrink-0 snap-start overflow-hidden rounded-[1.5rem]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              sizes="(min-width: 640px) 30rem, 80vw"
              style={{ aspectRatio: `${img.w} / ${img.h}` }}
              className="h-64 w-auto max-w-none object-cover sm:h-80"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Перегляд фото"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрити"
              className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-sand-50/10 text-sand-50 transition hover:bg-sand-50/20"
            >
              <X className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Попереднє фото"
              className="absolute left-3 z-10 grid size-12 place-items-center rounded-full bg-sand-50/10 text-sand-50 transition hover:bg-sand-50/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Наступне фото"
              className="absolute right-3 z-10 grid size-12 place-items-center rounded-full bg-sand-50/10 text-sand-50 transition hover:bg-sand-50/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative h-[80vh] w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={gallery[index].src}
                  alt={gallery[index].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-sand-200/70">
              {index + 1} / {gallery.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
