"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

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
    <section id="gallery" className="bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Галерея"
          title="Кабінет у залі"
          description="Масаж і тренування в одному місці: прийшли на заняття — і одразу відновилися в кабінеті поруч."
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((img, i) => (
            <Reveal key={img.src} delay={0.05 * (i % 3)} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Відкрити фото: ${img.alt}`}
                className="group relative block w-full overflow-hidden rounded-[1.5rem]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-ink-950/60 via-transparent to-transparent p-5 opacity-0 transition group-hover:opacity-100">
                  <span className="text-sm font-medium text-sand-50">{img.alt}</span>
                  <span className="grid size-10 place-items-center rounded-full bg-sand-50/90 text-ink-900">
                    <Maximize2 className="size-4" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
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
