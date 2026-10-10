"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

// Вертикальне відео 9:16. Щоб замінити — покладіть файл у public/video і змініть шлях.
const VIDEO_SRC = "/video/massage.mp4";
const POSTER_SRC = "/images/video-poster.jpg";

const points = [
  "Працюю з кожною групою м'язів окремо",
  "Інтенсивність — за вашим відчуттям",
  "Без поспіху: повний час сеансу",
];

export function VideoPresentation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section id="video" className="relative overflow-hidden bg-ink-900 py-24 text-sand-50 sm:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/3 size-[40rem] rounded-full bg-bronze-500/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[24rem_1fr] lg:gap-24">
        <Reveal y={48} className="order-2 mx-auto w-full max-w-sm lg:order-1">
          <div className="relative aspect-9/16 overflow-hidden rounded-[2rem] bg-ink-950 shadow-2xl ring-1 ring-sand-50/10">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              controls={playing}
              playsInline
              preload="none"
              onEnded={() => setPlaying(false)}
              className="absolute inset-0 size-full object-cover"
            />

            <AnimatePresence>
              {!playing && (
                <motion.button
                  type="button"
                  onClick={start}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Відтворити відео"
                  className="group absolute inset-0 grid place-items-center"
                >
                  <Image
                    src={POSTER_SRC}
                    alt=""
                    fill
                    sizes="384px"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-ink-950/40 transition group-hover:bg-ink-950/30" />
                  <span className="relative grid size-24 place-items-center rounded-full bg-sand-50 text-ink-900 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                    <span className="absolute inset-0 animate-ping rounded-full bg-sand-50/40 [animation-duration:2.5s]" />
                    <Play className="relative ml-1 size-8 fill-current" />
                  </span>
                  <span className="absolute bottom-6 left-6 flex flex-col items-start text-left">
                    <span className="text-xs font-semibold tracking-[0.25em] text-bronze-300 uppercase">
                      Зі звуком
                    </span>
                    <span className="font-display text-2xl">{site.name} за роботою</span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            eyebrow="Відео"
            title="Подивіться, як я працюю"
            description="Справжній сеанс у моєму кабінеті — без постановки. Так ви знатимете, чого очікувати ще до першої зустрічі."
            align="left"
            tone="dark"
          />
          <Reveal delay={0.15}>
            <ul className="flex flex-col gap-4">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-4 text-lg text-sand-100/90">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bronze-500/20 text-bronze-300">
                    <Check className="size-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
