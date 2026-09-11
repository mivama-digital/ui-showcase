"use client";

import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger,
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@mivama/ui";
import { ChevronRight, Folder } from "lucide-react";
import Link from "next/link";

import { PageIntro, Panel, Section } from "../_components/showcase";

function TabExample({ orientation, variant }: { orientation: "horizontal" | "vertical"; variant: "default" | "line" }) {
  return (
    <Tabs defaultValue="overview" orientation={orientation}>
      <TabsList aria-label={`${orientation} ${variant} tabs`}>
        <TabsTrigger value="overview"><Folder className="size-4 mr-1.5" />Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content for the active project.</TabsContent>
      <TabsContent value="activity">Recent collaborator activity.</TabsContent>
      <TabsContent value="settings">Settings are disabled in this fixture.</TabsContent>
    </Tabs>
  );
}

export default function NavigationPage() {
  return (
    <main>
      <PageIntro eyebrow="Components / 05" title="Navigation" count="5 families" description="Hierarchical location, page movement, tab views, top-level navigation menus, and desktop menubars." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="05.1" title="Breadcrumb" description="Collapsed, custom-separator, and linked breadcrumb hierarchies.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Breadcrumb / collapsed">
              <Breadcrumb aria-label="Collapsed breadcrumb">
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Workspace</Link></BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink asChild><Link href="/navigation">Projects</Link></BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>UI refresh</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Panel>
            <Panel name="Breadcrumb / custom separator">
              <Breadcrumb aria-label="Custom separator breadcrumb">
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator><ChevronRight className="size-3.5" /></BreadcrumbSeparator>
                  <BreadcrumbItem><BreadcrumbPage>A very long current page label</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Panel>
          </div>
        </Section>

        <Section index="05.2" title="Pagination" description="Active links, edge movement controls, and ellipsis for long page counts.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Pagination / middle page">
              <Pagination aria-label="Middle page pagination">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
                  <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="?page=3">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </Panel>
            <Panel name="Pagination / long range">
              <Pagination aria-label="Long range pagination">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="?page=4" /></PaginationItem>
                  <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationLink href="?page=5" isActive>5</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationLink href="?page=12">12</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="?page=6" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </Panel>
          </div>
        </Section>

        <Section index="05.3" title="Tabs" description="Horizontal and vertical tab lists with disabled tab states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Tabs / horizontal default"><TabExample orientation="horizontal" variant="default" /></Panel>
            <Panel name="Tabs / horizontal line"><TabExample orientation="horizontal" variant="line" /></Panel>
            <Panel name="Tabs / vertical default"><TabExample orientation="vertical" variant="default" /></Panel>
            <Panel name="Tabs / vertical line"><TabExample orientation="vertical" variant="line" /></Panel>
          </div>
        </Section>

        <Section index="05.4" title="Navigation Menu" description="Header navigation menu with drop-down panels and content links.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="NavigationMenu / primary header">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 md:w-[400px]">
                      <div className="grid gap-3">
                        <NavigationMenuLink asChild>
                          <Link href="/actions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Actions</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Buttons, toggles, badges</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/forms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Forms</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Inputs, checkboxes, selects</p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="px-4 py-2 text-sm font-medium">
                      <Link href="/themes">Themes</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </Panel>
          </div>
        </Section>

        <Section index="05.5" title="Menubar" description="Desktop application menu bar with submenus and keyboard shortcuts.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Menubar / standard toolbar">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>New Project <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                    <MenubarItem>Open... <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                    <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
