"use client";

import type { MivamaDensity, MivamaTheme } from "@mivama/ui/provider";

import { useShowcaseContract } from "./showcase-contract";

const themes = ["product", "editorial", "portal"] as const;
const densities = ["comfortable", "compact"] as const;

export function ThemeControls() {
  const { theme, density, setTheme, setDensity } = useShowcaseContract();

  return (
    <div className="contract-controls" aria-label="Application shell theme and density controls">
      <label>
        <span>Theme</span>
        <select value={theme} onChange={(event) => setTheme(event.target.value as MivamaTheme)}>
          {themes.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label>
        <span>Density</span>
        <select value={density} onChange={(event) => setDensity(event.target.value as MivamaDensity)}>
          {densities.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
    </div>
  );
}
