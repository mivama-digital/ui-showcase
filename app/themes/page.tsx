import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@mivama/ui";

import { PageIntro, Section } from "../_components/showcase";
import { ThemeControls } from "../_components/theme-controls";

const themes = ["product", "editorial", "portal"] as const;
const densities = ["comfortable", "compact"] as const;

export default function ThemesPage() {
  return (
    <main>
      <PageIntro eyebrow="System / v3" title="Themes and density" count="3 themes · 2 densities" description="Theme and density are independent application-shell contracts. Dark mode remains an ancestor class, while MivamaProvider owns the shared UI shell and portal container." />
      <div className="catalog">
        <Section index="V3.1" title="Provider contract" description="Change the MivamaProvider theme and density. Product and comfortable are the stable defaults.">
          <div className="contract-panel">
            <ThemeControls />
            <code>{'<MivamaProvider theme="product" density="comfortable">'}</code>
            <p className="sample-copy">Keep <code>className=&quot;dark&quot;</code> independent on an ancestor. Portalled overlays use the provider-owned container and therefore remain inside the same Mivama theme and density shell.</p>
          </div>
        </Section>

        <Section index="V3.2" title="Theme matrix" description="Each theme is shown at both supported densities without component-level spacing overrides.">
          <div className="theme-matrix">
            {themes.flatMap((theme) => densities.map((density) => (
              <article className="theme-preview" data-density={density} data-mivama-theme={theme} key={`${theme}-${density}`}>
                <div className="theme-preview-label">
                  <span>{theme}</span>
                  <Badge variant="outline">{density}</Badge>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{theme === "product" ? "Product workspace" : theme === "editorial" ? "Editorial story" : "Client portal"}</CardTitle>
                    <CardDescription>Shared semantics, tuned surface and rhythm.</CardDescription>
                  </CardHeader>
                  <CardContent><p className="sample-copy">Cards and controls inherit the selected theme and density from their application shell.</p></CardContent>
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
