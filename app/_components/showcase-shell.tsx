"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mivama/ui";
import { Layers, Moon, Sun } from "lucide-react";
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
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center px-4 md:px-8 lg:px-12 h-auto md:h-14 gap-x-4 md:gap-x-6 max-w-full">
          <Link
            className="col-start-1 row-start-1 flex h-12 md:h-14 items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground no-underline hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-ring rounded-md shrink-0"
            href="/"
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
              <Layers className="size-4" />
            </div>
            <span className="font-semibold text-sm">Mivama UI</span>
            <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted/40">
              Showcase
            </span>
          </Link>

          <div className="col-start-2 row-start-1 md:col-start-3 md:row-start-1 flex items-center justify-end">
            <Button
              aria-label={`Use ${dark ? "light" : "dark"} theme`}
              aria-pressed={dark}
              className="h-8 gap-2 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={toggleTheme}
              size="sm"
              type="button"
              variant="ghost"
            >
              {dark ? <Sun aria-hidden="true" className="size-4 text-amber-400" /> : <Moon aria-hidden="true" className="size-4" />}
              <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
            </Button>
          </div>

          <nav
            aria-label="Component pages"
            className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] py-1.5 md:py-0 border-t border-border/30 md:border-t-0 min-w-0"
          >
            {componentPages.map((page) => {
              const isActive = pathname === page.href;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium no-underline transition-all focus-visible:outline-2 focus-visible:outline-ring ${
                    isActive
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  href={page.href}
                  key={page.href}
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
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
