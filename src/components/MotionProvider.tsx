"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Поважаємо системне налаштування «Зменшити рух»: Motion сам вимкне
// зсуви й масштабування, залишивши плавну появу.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
