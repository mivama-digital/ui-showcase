"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { MivamaProvider, type MivamaDensity, type MivamaTheme } from "@mivama/ui/provider";

import { ShowcaseContractProvider } from "./showcase-contract";
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
  const [theme, setTheme] = useState<MivamaTheme>("product");
  const [density, setDensity] = useState<MivamaDensity>("comfortable");
  const contract = useMemo(
    () => ({ theme, density, setTheme, setDensity }),
    [theme, density],
  );

  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
    return () => { delete document.documentElement.dataset.hydrated; };
  }, []);

  return (
    <ShowcaseContractProvider value={contract}>
      <MivamaProvider theme={theme} density={density} data-mivama-shell="">
        <div className="lab-shell">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <nav className="site-nav" aria-label="Component pages">
            <Link className="site-mark" href="/">Mivama UI</Link>
            <div className="site-nav-links">
              {componentPages.map((page) => (
                <Link
                  aria-current={pathname === page.href ? "page" : undefined}
                  href={page.href}
                  key={page.href}
                >
                  {page.label}
                </Link>
              ))}
            </div>
            <button
              aria-label={`Use ${dark ? "light" : "dark"} theme`}
              aria-pressed={dark}
              className="theme-toggle"
              onClick={toggleTheme}
              type="button"
            >
              {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              <span>{dark ? "Light" : "Dark"}</span>
            </button>
          </nav>
          <div id="main-content" tabIndex={-1}>{children}</div>
          <footer className="footer-note">
            <span>@mivama/ui · installed package exports</span>
            <span>Multi-page component and state reference.</span>
          </footer>
        </div>
      </MivamaProvider>
    </ShowcaseContractProvider>
  );
}
