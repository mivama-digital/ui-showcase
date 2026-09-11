"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mivama/ui";
import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { componentPages } from "./showcase-pages";

function subscribeTheme(onChange: () => void) {
  window.addEventListener("mivama-theme-change", onChange);
  return () => window.removeEventListener("mivama-theme-change", onChange);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function toggleTheme() {
  const nextDark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", nextDark);
  localStorage.setItem("mivama-theme", nextDark ? "dark" : "light");
  window.dispatchEvent(new Event("mivama-theme-change"));
}

export function ShowcaseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => false);

  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
    return () => { delete document.documentElement.dataset.hydrated; };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        className="fixed top-2 left-2 z-50 -translate-y-24 focus:translate-y-0 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-bold no-underline transition-transform shadow-md"
        href="#main-content"
      >
        Skip to content
      </a>
      <nav
        aria-label="Component pages"
        className="sticky top-0 z-40 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 min-h-14 px-4 md:px-8 py-2 border-b border-border bg-background/95 backdrop-blur-md overflow-x-clip max-w-full"
      >
        <Link
          className="shrink-0 text-sm font-bold tracking-tight text-foreground no-underline focus-visible:outline-2 focus-visible:outline-ring"
          href="/"
        >
          Mivama UI
        </Link>
        <div className="flex w-full md:w-auto items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {componentPages.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 px-2.5 py-1.5 rounded-md text-xs font-medium no-underline transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                href={page.href}
                key={page.href}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
        <Button
          aria-label={`Use ${dark ? "light" : "dark"} theme`}
          aria-pressed={dark}
          className="shrink-0 absolute top-2.5 right-4 md:static"
          onClick={toggleTheme}
          size="sm"
          type="button"
          variant="outline"
        >
          {dark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
          <span>{dark ? "Light" : "Dark"}</span>
        </Button>
      </nav>
      <div className="focus:outline-none" id="main-content" tabIndex={-1}>
        {children}
      </div>
      <footer className="flex flex-col md:flex-row justify-between gap-4 py-8 px-4 md:px-8 text-xs text-muted-foreground border-t border-border mt-12">
        <span>@mivama/ui · installed package exports</span>
        <span>Multi-page component and state reference.</span>
      </footer>
    </div>
  );
}
