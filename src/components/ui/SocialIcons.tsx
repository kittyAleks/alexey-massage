// lucide-react більше не постачає брендові іконки, тому тримаємо власні.

type IconProps = { className?: string };

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.94 4.6a1.2 1.2 0 0 0-1.62-1.04L2.8 10.33c-1.03.4-1.02 1.86.02 2.24l4.38 1.6 1.7 5.33c.27.85 1.35 1.1 1.97.46l2.44-2.5 4.42 3.25c.7.52 1.7.13 1.88-.72L21.94 4.6Zm-4.1 3.13-7.86 7.07-.32 3.3-1.27-4.02 9.45-6.35Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.05s.88 2.37 1 2.54c.12.16 1.73 2.64 4.2 3.7 1.56.68 2.17.73 2.95.62.48-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function ViberIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.5c-4.9 0-8.5 1.6-8.5 7.6 0 3.2 1 5.3 3 6.5v3.9l3.1-2.8c.8.1 1.6.2 2.4.2 4.9 0 8.5-1.6 8.5-7.8S16.9 2.5 12 2.5Z" />
      <path d="M9.2 7.4c.3-.3.8-.3 1 0l.8 1.1c.2.3.2.7-.1 1l-.4.4c.4.9 1.1 1.6 2 2l.4-.4c.3-.3.7-.3 1-.1l1.1.8c.3.2.3.7 0 1l-.5.5c-.5.5-1.3.6-2 .3a7.3 7.3 0 0 1-3.6-3.6c-.3-.7-.2-1.5.3-2l.5-.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
