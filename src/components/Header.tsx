"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-sand-50/85 py-3 shadow-[0_1px_0_rgba(28,36,32,0.08)] backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className={`relative z-10 font-display text-2xl font-semibold tracking-tight transition-colors ${
            solid ? "text-ink-900" : "text-sand-50"
          }`}
        >
          Олексій<span className="text-bronze-400">.</span>
          <span className="ml-2 hidden text-sm font-sans font-medium tracking-[0.2em] uppercase opacity-70 sm:inline">
            масаж
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-bronze-400 ${
                solid ? "text-ink-800" : "text-sand-100"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href={site.phoneHref}
            className={`hidden items-center gap-2 text-sm font-semibold md:flex ${
              solid ? "text-ink-900" : "text-sand-50"
            }`}
          >
            <Phone className="size-4 text-bronze-400" />
            {site.phone}
          </a>
          <a
            href="#booking"
            className="hidden rounded-full bg-bronze-500 px-5 py-2.5 text-sm font-semibold text-sand-50 transition hover:bg-bronze-600 sm:inline-flex"
          >
            Записатися
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            className={`grid size-11 place-items-center rounded-full border transition lg:hidden ${
              solid || open
                ? "border-ink-900/15 text-ink-900"
                : "border-sand-50/30 text-sand-50"
            } ${open ? "bg-sand-50" : ""}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col bg-sand-50 px-5 pt-28 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="border-b border-ink-900/10 py-4 font-display text-4xl text-ink-900"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href={site.phoneHref}
                className="text-center text-lg font-semibold text-ink-900"
              >
                {site.phone}
              </a>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="rounded-full bg-bronze-500 py-4 text-center font-semibold text-sand-50"
              >
                Записатися на сеанс
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
