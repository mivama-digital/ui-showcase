"use client";

import { createContext, useContext } from "react";
import type { MivamaDensity, MivamaTheme } from "@mivama/ui/provider";

type ShowcaseContractValue = {
  theme: MivamaTheme;
  density: MivamaDensity;
  setTheme: (theme: MivamaTheme) => void;
  setDensity: (density: MivamaDensity) => void;
};

const ShowcaseContractContext = createContext<ShowcaseContractValue | null>(null);

export function ShowcaseContractProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ShowcaseContractValue;
}) {
  return <ShowcaseContractContext.Provider value={value}>{children}</ShowcaseContractContext.Provider>;
}

export function useShowcaseContract() {
  const context = useContext(ShowcaseContractContext);

  if (!context) {
    throw new Error("useShowcaseContract must be used within ShowcaseContractProvider");
  }

  return context;
}
