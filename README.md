# alexey-massage

Одностраничный сайт массажиста Олексія (на украинском): массаж в кабинете тренажёрного зала.

**Прод:** https://alexey-massage-henna.vercel.app

**Стек:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Motion · lucide-react

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка
```

## Публикация на Vercel

Проект привязан к команде `aleksandras-projects-14a9f73c`:

```bash
npx vercel deploy --prod
```

## Где что менять

| Что | Где |
| --- | --- |
| Тексты, цены, отзывы, FAQ, телефон, мессенджеры, адрес | `src/content/site.ts` |
| Видео (шапка и блок «Відео») | `public/video/massage.mp4` |
| Обложки видео | `public/images/hero-poster.jpg`, `public/images/video-poster.jpg` |
| Фото «Про мене» | `public/images/about.jpg` |
| Галерея | `public/images/g1.jpg … g9.jpg` и список `gallery` в `site.ts` |
| Фон шапки (десктоп) | `public/images/hero-bg.jpg` |
| Цвета и шрифты | `src/app/globals.css`, `src/app/layout.tsx` |

Кадры массажа взяты из собственного видео, фото зала — с [Unsplash](https://unsplash.com).

## Форма записи

Пока без базы данных: форма проверяет поля и формирует текст заявки — в WhatsApp он уходит готовым сообщением, для Telegram и Viber копируется в буфер обмена. Следующий шаг — сохранять заявки в Supabase (`src/components/Booking.tsx`, функция `onSubmit`).
