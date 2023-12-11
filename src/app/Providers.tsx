"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
