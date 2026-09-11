"use client";

import { useSyncExternalStore } from "react";
import { Label, NativeSelect } from "@mivama/ui";

const themes = ["product", "editorial", "portal"] as const;
const densities = ["comfortable", "compact"] as const;

function subscribe(onChange: () => void) {
  window.addEventListener("mivama-contract-change", onChange);
  return () => window.removeEventListener("mivama-contract-change", onChange);
}

function getSnapshot() {
  const root = document.documentElement;
  return `${root.dataset.mivamaTheme ?? "product"}:${root.dataset.density ?? "comfortable"}`;
}

function setContract(name: "mivamaTheme" | "density", value: string) {
  document.documentElement.dataset[name] = value;
  window.dispatchEvent(new Event("mivama-contract-change"));
}

export function ThemeControls() {
  const [theme, density] = useSyncExternalStore(subscribe, getSnapshot, () => "product:comfortable").split(":");

  return (
    <div className="flex flex-wrap gap-4" aria-label="Document theme and density controls">
      <div className="grid gap-1 min-w-[min(12rem,100%)]">
        <Label htmlFor="theme-select" className="text-muted-foreground text-xs font-semibold">Theme</Label>
        <NativeSelect
          id="theme-select"
          className="h-9 px-3 capitalize"
          value={theme}
          onChange={(event) => setContract("mivamaTheme", event.target.value)}
        >
          {themes.map((value) => <option key={value} value={value}>{value}</option>)}
        </NativeSelect>
      </div>
      <div className="grid gap-1 min-w-[min(12rem,100%)]">
        <Label htmlFor="density-select" className="text-muted-foreground text-xs font-semibold">Density</Label>
        <NativeSelect
          id="density-select"
          className="h-9 px-3 capitalize"
          value={density}
          onChange={(event) => setContract("density", event.target.value)}
        >
          {densities.map((value) => <option key={value} value={value}>{value}</option>)}
        </NativeSelect>
      </div>
    </div>
  );
}
