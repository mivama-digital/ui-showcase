"use client";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  Avatar, AvatarFallback, AvatarImage,
  Bubble, Button,
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Item, Kbd, KbdGroup, Marker,
  Message, MessageScroller,
  Typography,
} from "@mivama/ui";
import { ChevronDown, FileText, User } from "lucide-react";
import { useState } from "react";

import { PageIntro, Panel, Section } from "../_components/showcase";

export default function ContentPage() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <main>
      <PageIntro eyebrow="Components / 02" title="Content" count="11 families" description="Typography hierarchy, card surfaces, conversation feeds, keyboard shortcuts, avatars, accordions, and collapsible disclosures." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="02.1" title="Typography" description="Semantic variants covering document headings, paragraph copy, leads, and small notes.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Typography / headings" wide>
              <div className="flex flex-col gap-3.5">
                <Typography variant="h1">Heading 1 Display</Typography>
                <Typography variant="h2">Heading 2 Section</Typography>
                <Typography variant="h3">Heading 3 Subsection</Typography>
                <Typography variant="h4">Heading 4 Group</Typography>
              </div>
            </Panel>
            <Panel name="Typography / copy">
              <div className="flex flex-col gap-3.5">
                <Typography variant="lead">Lead copy introduces key concepts with balanced typographic rhythm.</Typography>
                <Typography variant="p">Standard body paragraph for general layout and readable content blocks.</Typography>
                <Typography variant="small">Small text for captions, hints, and supplementary notes.</Typography>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="02.2" title="Card" description="Surface primitive for grouped information with headers, titles, descriptions, content, and footers.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Card / complete">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly workspace</CardTitle>
                  <CardDescription>All systems are healthy and reporting on schedule.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed m-0">The complete composition uses header, title, description, content, and footer.</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">Open workspace</Button>
                  <Button size="sm" variant="ghost">Share</Button>
                </CardFooter>
              </Card>
            </Panel>
            <Panel name="Card / content only">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground leading-relaxed m-0">A card can render lightweight grouped content without dedicated header slots.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Dismiss</Button>
                </CardFooter>
              </Card>
            </Panel>
          </div>
        </Section>

        <Section index="02.3" title="Conversation & Messages" description="Message layouts, message scrollers, and bubble message primitives for chat and activity streams.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Message & Bubble / feed">
              <div className="flex flex-col gap-3">
                <Message className="flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground">Alex</span>
                  <Bubble variant="received">The latest package release is published and verified.</Bubble>
                </Message>
                <Message className="flex-col items-end gap-1">
                  <span className="text-xs font-semibold text-muted-foreground">You</span>
                  <Bubble variant="sent">Running local verification against all test suites now.</Bubble>
                </Message>
              </div>
            </Panel>
            <Panel name="MessageScroller / container">
              <MessageScroller className="h-48 p-4">
                <div className="space-y-4">
                  <Message className="flex-col gap-1">
                    <span className="text-xs text-muted-foreground">System</span>
                    <Bubble variant="received">Showcase dependency graph refreshed.</Bubble>
                  </Message>
                  <Message className="flex-col gap-1">
                    <span className="text-xs text-muted-foreground">CI</span>
                    <Bubble variant="received">65 components verified.</Bubble>
                  </Message>
                </div>
              </MessageScroller>
            </Panel>
          </div>
        </Section>

        <Section index="02.4" title="Items, Markers, and Shortcuts" description="Selectable items, highlighted markers, and keyboard combinations.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Item & Marker / list">
              <div className="flex flex-col gap-1">
                <Item className="gap-2">
                  <FileText className="size-4 text-muted-foreground" />
                  <span>Release notes with <Marker>v26.9.10</Marker> tag</span>
                </Item>
                <Item className="gap-2">
                  <FileText className="size-4 text-muted-foreground" />
                  <span>Component coverage audit <Marker>100%</Marker></span>
                </Item>
              </div>
            </Panel>
            <Panel name="Kbd & KbdGroup / shortcuts">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Search palette</span>
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Toggle sidebar</span>
                  <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>B</Kbd>
                  </KbdGroup>
                </div>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="02.5" title="Avatar" description="Profile image representations with initials fallback for reliable rendering.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Avatar / variants">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Sarah" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback><User className="size-4" /></AvatarFallback>
                </Avatar>
              </div>
            </Panel>
          </div>
        </Section>

        <Section index="02.6" title="Accordion & Collapsible" description="Expandable vertical content disclosures for FAQs, lists, and collapsible sections.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Accordion / single open">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is @mivama-digital/ui?</AccordionTrigger>
                  <AccordionContent>A centrally maintained shadcn/ui distribution with design tokens and React primitives.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How is it synchronized?</AccordionTrigger>
                  <AccordionContent>Showcase sync checks upstream commits and verifies the package against Next.js.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Panel>
            <Panel name="Collapsible / toggle panel">
              <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Repository settings</span>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <span>{collapsibleOpen ? "Hide" : "Show"}</span>
                      <ChevronDown className={`size-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="rounded-md border p-3 text-sm text-muted-foreground">
                  Upstream branch: <code>main</code> · Package scope: <code>@mivama-digital</code>
                </CollapsibleContent>
              </Collapsible>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
