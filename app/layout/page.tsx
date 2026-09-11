"use client";

import { useRef } from "react";
import {
  Badge,
  Button,
  DirectionProvider,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
  useSidebar,
} from "@mivama/ui";
import { Home, LayoutGrid, Search, Settings, Users } from "lucide-react";
import Link from "next/link";

import { PageIntro, Panel, Section } from "../_components/showcase";

function LayoutPageContent() {
  const { setOpenMobile, isMobile } = useSidebar();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Sidebar
        className="top-14 h-[calc(100svh-3.5rem)]"
        aria-label="Workspace sidebar"
        collapsible="icon"
        role="navigation"
        {...(isMobile
          ? {
              onOpenChange: (open: boolean) => {
                setOpenMobile(open);
                if (!open) {
                  setTimeout(() => {
                    triggerRef.current?.focus();
                  }, 0);
                }
              },
            }
          : {})}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Mivama OS" asChild>
                <Link href="/layout" aria-label="Mivama OS home">
                  <LayoutGrid />
                  <span>Mivama OS</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Overview" asChild>
                    <Link aria-current="page" href="/layout">
                      <Home />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Projects" asChild>
                    <Link href="/content">
                      <LayoutGrid />
                      <span>Projects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="People" asChild>
                    <Link href="/content">
                      <Users />
                      <span>People</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Search" asChild>
                    <Link href="/navigation">
                      <Search />
                      <span>Search</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <LayoutGrid />
                    <span>Disabled item</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" asChild>
                <Link href="/forms">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="md:peer-data-[state=expanded]:ml-64 md:peer-data-[state=collapsed]:ml-12 transition-[margin] duration-200 ease-linear">
        <PageIntro eyebrow="Components / 09" title="Layout" count="6 families" description="Application navigation, resizable panels, scroll areas, separators, directional context, and tooltips." />
        <div className="px-4 md:px-12 py-4 pb-16">
          <Section index="09.1" title="Sidebar" description="Live collapsible sidebar with responsive mobile Sheet behavior, labeled groups, and icon tooltips.">
            <div className="grid grid-cols-1 gap-4">
              <Panel name="Sidebar / live application frame">
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <SidebarTrigger
                      ref={triggerRef}
                      aria-label="Toggle showcase sidebar"
                    />
                    <Badge variant="secondary">Live workspace</Badge>
                  </div>
                  <h3 className="text-base font-semibold mt-4 mb-2">Project command center</h3>
                  <p className="text-sm text-muted-foreground m-0">The catalog itself is rendered inside SidebarInset. Use the toggle, rail, or Control+B to inspect the responsive behavior.</p>
                </div>
              </Panel>
            </div>
          </Section>

          <Section index="09.2" title="Separator" description="Horizontal and vertical dividers in layouts with explicit dimensions.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Panel name="Separator / horizontal">
                <p className="text-xs text-muted-foreground leading-relaxed m-0">Content above separator</p>
                <Separator className="my-6" />
                <p className="text-xs text-muted-foreground leading-relaxed m-0">Content below separator</p>
              </Panel>
              <Panel name="Separator / vertical">
                <div className="flex items-center gap-4 h-8 text-xs text-muted-foreground">
                  <span>Strategy</span>
                  <Separator orientation="vertical" />
                  <span>Design</span>
                  <Separator orientation="vertical" />
                  <span>Delivery</span>
                </div>
              </Panel>
            </div>
          </Section>

          <Section index="09.3" title="Resizable Panels" description="Accessible draggable divider panels for multi-pane application layouts.">
            <div className="grid grid-cols-1 gap-4">
              <Panel name="ResizablePanelGroup / split view">
                <div className="h-48 w-full rounded-lg border border-border">
                  <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel defaultSize={30} minSize={20}>
                      <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground bg-muted/40">
                        Sidebar pane
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={70}>
                      <div className="flex h-full items-center justify-center p-4 text-sm font-medium">
                        Editor workspace pane
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </Panel>
            </div>
          </Section>

          <Section index="09.4" title="Scroll Area" description="Custom styled scrollbars providing cross-platform scroll appearance.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Panel name="ScrollArea / vertical list">
                <ScrollArea className="h-36 w-full rounded-md border border-border p-3">
                  <div className="space-y-2 text-sm">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Link
                        href="#release-note"
                        key={i}
                        className="block rounded border-b border-border pb-1 text-muted-foreground hover:text-foreground no-underline focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        Release note item #{i + 1} with changelog summary details.
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </Panel>
              <Panel name="DirectionProvider / RTL support">
                <DirectionProvider dir="ltr">
                  <div className="p-3 border border-border rounded-md text-sm text-muted-foreground">
                    DirectionProvider sets the text and interaction flow for bidirectional components (LTR and RTL).
                  </div>
                </DirectionProvider>
              </Panel>
            </div>
          </Section>

          <Section index="09.5" title="Tooltip" description="Hover and focus triggered contextual popover tips.">
            <div className="grid grid-cols-1 gap-4">
              <Panel name="Tooltip / trigger">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover or focus for details</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Uses the shared Mivama portal and tooltip surface.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Panel>
            </div>
          </Section>
        </div>
      </SidebarInset>
    </>
  );
}

export default function LayoutPage() {
  return (
    <SidebarProvider className="min-h-[calc(100svh-3.5rem)]">
      <LayoutPageContent />
    </SidebarProvider>
  );
}
