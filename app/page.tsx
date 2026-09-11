import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Typography } from "@mivama/ui";

import { componentPages } from "./_components/showcase-pages";

export default function HomePage() {
  return (
    <main>
      <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end p-6 md:p-16 border-b border-border min-h-[min(550px,50vh)]">
        <div>
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Mivama design engineering / component index
          </span>
          <Typography variant="h1" className="text-4xl font-extrabold tracking-tight lg:text-5xl mt-2">
            UI <span>component</span><br />field guide.
          </Typography>
        </div>
        <div className="max-w-[280px] text-muted-foreground text-sm leading-relaxed">
          <strong className="block text-4xl font-bold text-foreground mb-1">65</strong>
          official shadcn component modules from the verified <code>@mivama-digital/ui</code> package.
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border-b border-border">
        {componentPages.map((page, index) => (
          <Link
            className="grid grid-cols-[auto_1fr_auto] gap-4 items-start min-h-[160px] p-6 md:p-8 bg-background hover:bg-muted/60 transition-colors no-underline text-foreground focus-visible:outline-2 focus-visible:outline-ring group"
            href={page.href}
            key={page.href}
          >
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase mt-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <Typography variant="h2">{page.label}</Typography>
              <Typography variant="small" className="text-muted-foreground mt-1 block">{page.description}</Typography>
            </div>
            <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </main>
  );
}
