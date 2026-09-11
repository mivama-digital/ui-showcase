import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@mivama/ui";

import { PageIntro, Section } from "../_components/showcase";
import { ThemeControls } from "../_components/theme-controls";

const themes = ["product", "editorial", "portal"] as const;
const densities = ["comfortable", "compact"] as const;

export default function ThemesPage() {
  return (
    <main>
      <PageIntro eyebrow="System / v3" title="Themes and density" count="3 themes · 2 densities" description="Theme and density are independent document contracts. Dark mode remains an ancestor class, so portalled overlays inherit the active document tokens." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="V3.1" title="Document contract" description="Change the attributes on the document root. Product and comfortable are the stable defaults.">
          <div className="grid gap-4 p-4 md:p-6 border border-border rounded-lg bg-card">
            <ThemeControls />
            <code className="overflow-x-auto p-3 rounded-md bg-muted text-xs font-mono block">{'<html data-mivama-theme="product" data-density="comfortable">'}</code>
            <p className="text-xs text-muted-foreground leading-relaxed m-0">Keep <code>className=&quot;dark&quot;</code> independent. Because the contract lives on <code>html</code>, content rendered through a portal uses the same active tokens.</p>
          </div>
        </Section>

        <Section index="V3.2" title="Theme matrix" description="Each theme is shown at both supported densities without component-level spacing overrides.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themes.flatMap((theme) => densities.map((density) => (
              <article className="min-w-0 p-4 border border-border rounded-lg bg-background text-foreground" data-density={density} data-mivama-theme={theme} key={`${theme}-${density}`}>
                <div className="flex justify-between items-center gap-4 mb-4 text-xs font-semibold capitalize">
                  <span>{theme}</span>
                  <Badge variant="outline">{density}</Badge>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{theme === "product" ? "Product workspace" : theme === "editorial" ? "Editorial story" : "Client portal"}</CardTitle>
                    <CardDescription>Shared semantics, tuned surface and rhythm.</CardDescription>
                  </CardHeader>
                  <CardContent><p className="text-xs text-muted-foreground leading-relaxed m-0">Cards and controls inherit the selected theme and density from their application shell.</p></CardContent>
                  <CardFooter><Button size="sm">Primary action</Button><Button size="sm" variant="outline">Secondary</Button></CardFooter>
                </Card>
              </article>
            )))}
          </div>
        </Section>
      </div>
    </main>
  );
}
