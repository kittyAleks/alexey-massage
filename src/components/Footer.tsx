import { nav, site } from "@/content/site";
import { InstagramIcon, TelegramIcon, ViberIcon, WhatsAppIcon } from "./ui/SocialIcons";

const socials = [
  { href: site.telegram, label: "Telegram", Icon: TelegramIcon },
  { href: site.viber, label: "Viber", Icon: ViberIcon },
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 text-sand-200/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <a href="#top" className="font-display text-3xl font-semibold text-sand-50">
            Олексій<span className="text-bronze-400">.</span>
            <span className="ml-2 font-sans text-sm font-medium tracking-[0.2em] uppercase opacity-60">
              масаж
            </span>
          </a>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm transition hover:text-sand-50">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-sand-50/15 text-sand-50 transition hover:border-bronze-400 hover:bg-bronze-500"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-sand-50/10 pt-8 text-xs sm:flex-row">
          <span>© {site.brand}. Усі права захищені.</span>
          <span>Масаж не є медичною послугою. Є протипоказання.</span>
        </div>
      </div>
    </footer>
  );
}
