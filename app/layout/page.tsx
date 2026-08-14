"use client";

import {
  Badge,
  BentoGrid,
  BentoGridItem,
  Button,
  Container,
  EditorialGrid,
  ScrollLayer,
  ScrollScene,
  Section as UiSection,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@mivama/ui";
import { Home, LayoutGrid, Search, Settings, Users } from "lucide-react";
import Link from "next/link";

import { PageIntro, Panel, Section } from "../_components/showcase";

export default function LayoutPage() {
  return (
    <SidebarProvider className="sidebar-page" style={{ "--sidebar-width": "14rem" } as React.CSSProperties}>
      <Sidebar aria-label="Workspace sidebar" collapsible="icon" role="navigation">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem><SidebarMenuButton size="lg" tooltip="Mivama OS" render={<Link href="/layout" aria-label="Mivama OS home" />}><LayoutGrid /><span>Mivama OS</span></SidebarMenuButton></SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton isActive tooltip="Overview" render={<Link aria-current="page" href="/layout" />}><Home /><span>Overview</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton tooltip="Projects" render={<Link href="/content" />}><LayoutGrid /><span>Projects</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton tooltip="People" render={<Link href="/content" />}><Users /><span>People</span></SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton tooltip="Search" render={<Link href="/navigation" />}><Search /><span>Search</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton disabled><LayoutGrid /><span>Disabled item</span></SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><SidebarMenu><SidebarMenuItem><SidebarMenuButton tooltip="Settings" render={<Link href="/forms" />}><Settings /><span>Settings</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <PageIntro eyebrow="Components / 09" title="Layout" count="8 component families" description="Application navigation, structural primitives, responsive content grids, scroll scenes, and contextual overlays." />
        <div className="catalog">
          <Section index="09.1" title="Sidebar" description="This page uses the full official Sidebar composition with responsive Sheet behavior, labeled groups, linked menus, collapse controls, footer, rail, and inset content.">
            <div className="demo-grid single">
              <Panel name="Sidebar / live application frame">
                <div className="sidebar-inset-sample"><div className="stack"><SidebarTrigger aria-label="Toggle showcase sidebar" /><Badge variant="secondary">Live workspace</Badge></div><h3>Project command center</h3><p>The catalog itself is rendered inside SidebarInset. Use the toggle, rail, or Control+B to inspect the official responsive behavior.</p></div>
              </Panel>
            </div>
          </Section>

          <Section index="09.2" title="Separator" description="Horizontal and vertical primitives in layouts with explicit dimensions.">
            <div className="demo-grid">
              <Panel name="Separator / horizontal"><p className="sample-copy">Content above</p><Separator className="spaced-separator" /><p className="sample-copy">Content below</p></Panel>
              <Panel name="Separator / vertical"><div className="separator-demo"><span>Strategy</span><Separator orientation="vertical" /><span>Design</span><Separator orientation="vertical" /><span>Delivery</span></div></Panel>
            </div>
          </Section>

          <Section index="09.3" title="Container + Section" description="Shared page gutters, reading widths, section densities, tones, and borders now come directly from the design system.">
            <div className="demo-grid single">
              <Panel name="Container / reading inside branded section">
                <UiSection tone="brand" density="compact" bordered={false}>
                  <Container size="reading">
                    <div className="column">
                      <Badge variant="secondary">Reading container</Badge>
                      <h3>One structural language across Mivama products</h3>
                      <p>Container owns width and gutters while Section owns vertical rhythm and surface tone.</p>
                    </div>
                  </Container>
                </UiSection>
              </Panel>
            </div>
          </Section>

          <Section index="09.4" title="BentoGrid + EditorialGrid" description="Responsive product and editorial compositions without duplicating layout CSS in consuming applications.">
            <div className="demo-grid">
              <Panel name="BentoGrid / mixed spans">
                <BentoGrid>
                  <BentoGridItem span={2}><div className="column"><Badge>Primary</Badge><h3>Wide product story</h3><p>Span two columns when the composition needs a dominant card.</p></div></BentoGridItem>
                  <BentoGridItem><div className="column"><Badge variant="secondary">Metric</Badge><strong>31 stable families</strong></div></BentoGridItem>
                  <BentoGridItem><div className="column"><Badge variant="outline">Status</Badge><strong>Preview ready</strong></div></BentoGridItem>
                </BentoGrid>
              </Panel>
              <Panel name="EditorialGrid / flowing content">
                <EditorialGrid>
                  <div className="column"><Badge variant="secondary">01</Badge><h3>Foundation</h3><p>Tokens and themes establish the visual system.</p></div>
                  <div className="column"><Badge variant="secondary">02</Badge><h3>Primitives</h3><p>Components keep behavior and accessibility consistent.</p></div>
                  <div className="column"><Badge variant="secondary">03</Badge><h3>Compositions</h3><p>Shared layouts make product previews faster to assemble.</p></div>
                </EditorialGrid>
              </Panel>
            </div>
          </Section>

          <Section index="09.5" title="ScrollScene" description="Declarative reveal and parallax layers expose motion intent through data attributes while respecting the design-system motion CSS.">
            <div className="demo-grid single">
              <Panel name="ScrollScene / reveal + parallax">
                <ScrollScene>
                  <ScrollLayer effect="reveal" distance={24}><div className="column"><Badge>Reveal</Badge><h3>Motion stays declarative</h3></div></ScrollLayer>
                  <ScrollLayer effect="parallax" direction="down" distance={16}><p className="sample-copy">A secondary layer can move independently without product-specific animation code.</p></ScrollLayer>
                </ScrollScene>
              </Panel>
            </div>
          </Section>

          <Section index="09.6" title="Tooltip" description="The standalone tooltip family is previewed explicitly instead of only appearing indirectly through SidebarMenuButton.">
            <div className="demo-grid single">
              <Panel name="Tooltip / explicit composition">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="outline" />}>Hover or focus for details</TooltipTrigger>
                    <TooltipContent>Uses the shared Mivama portal and tooltip surface.</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Panel>
            </div>
          </Section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
