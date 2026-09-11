"use client";

import { Badge, Button, ButtonGroup, Separator, Toggle, ToggleGroup, ToggleGroupItem } from "@mivama/ui";
import { ArrowRight, Bold, Bookmark, Check, Italic, Settings, Underline } from "lucide-react";
import Link from "next/link";

import { PageIntro, Panel, Section } from "../_components/showcase";

const buttonVariants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
const buttonSizes = ["default", "sm", "lg", "icon"] as const;
const badgeVariants = ["default", "secondary", "destructive", "outline"] as const;

export default function ActionsPage() {
  return (
    <main>
      <PageIntro eyebrow="Components / 01" title="Actions" count="5 families" description="Official Button, Button Group, Badge, Toggle, and Toggle Group primitives across all variants, sizes, and states." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="01.1" title="Button" description="Six variants and four sizes, with icons, asChild link composition, disabled, and invalid states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Button / variants" wide>
              <div className="flex flex-wrap items-center gap-2.5">
                {buttonVariants.map((variant) => <Button variant={variant} key={variant}>{variant}</Button>)}
              </div>
            </Panel>
            <Panel name="Button / sizes">
              <div className="flex flex-wrap items-center gap-2.5">
                {buttonSizes.map((size) => <Button size={size} key={size}>{size}</Button>)}
              </div>
            </Panel>
            <Panel name="Button / icons">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button size="icon" aria-label="Settings"><Settings className="size-4" /></Button>
                <Button><Check className="size-4" />Leading icon</Button>
                <Button>Trailing icon<ArrowRight className="size-4" /></Button>
              </div>
            </Panel>
            <Panel name="Button / states and links">
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button disabled>Disabled</Button>
                  <Button aria-invalid>Invalid</Button>
                  <Button asChild variant="link">
                    <Link href="/content">Rendered anchor link</Link>
                  </Button>
                </div>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="01.2" title="Button Group" description="Grouped buttons sharing border and layout boundaries.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="ButtonGroup / actions">
              <div className="flex flex-wrap items-center gap-2.5">
                <ButtonGroup>
                  <Button variant="outline" size="sm">Years</Button>
                  <Button variant="outline" size="sm">Months</Button>
                  <Button variant="outline" size="sm">Days</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button size="sm">First</Button>
                  <Button size="sm">Second</Button>
                  <Button size="sm">Third</Button>
                </ButtonGroup>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="01.3" title="Badge" description="All four standard variants, plus icon pairings and linked badges.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Badge / variants">
              <div className="flex flex-wrap items-center gap-2.5">
                {badgeVariants.map((variant) => <Badge variant={variant} key={variant}>{variant}</Badge>)}
              </div>
              <Separator className="my-6" />
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge><Check className="size-3 mr-1" />Complete</Badge>
                <Badge variant="outline">Continue<ArrowRight className="size-3 ml-1" /></Badge>
                <Badge variant="secondary"><Link href="/feedback">Linked badge</Link></Badge>
                <Badge variant="destructive">Needs attention</Badge>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="01.4" title="Toggle & Toggle Group" description="Single toggle and multi-item toggle groups for selectable states and toolbar actions.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Toggle / variants">
              <div className="flex flex-wrap items-center gap-2.5">
                <Toggle aria-label="Toggle bold"><Bold className="size-4" /></Toggle>
                <Toggle variant="outline" aria-label="Toggle bookmark"><Bookmark className="size-4" /></Toggle>
                <Toggle disabled aria-label="Disabled toggle"><Italic className="size-4" /></Toggle>
              </div>
            </Panel>
            <Panel name="ToggleGroup / toolbar">
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline"><Underline className="size-4" /></ToggleGroupItem>
              </ToggleGroup>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
