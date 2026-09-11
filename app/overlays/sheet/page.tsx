"use client";

import {
  Button,
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger,
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
  Switch,
} from "@mivama/ui";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, MoreVertical } from "lucide-react";

import { PageIntro, Panel, Section } from "../../_components/showcase";

const sheets = [
  { side: "top", icon: ArrowUp },
  { side: "right", icon: ArrowRight },
  { side: "bottom", icon: ArrowDown },
  { side: "left", icon: ArrowLeft },
] as const;

export default function SheetPage() {
  return (
    <main>
      <PageIntro eyebrow="Components / 07" title="Sheet & Menus" count="4 families" description="Directional sliding sheet panels, bottom drawers, action dropdowns, and contextual right-click menus." />
      <div className="px-4 md:px-12 py-4 pb-16">
        <Section index="07.1" title="Sheet sides" description="Top, right, bottom, and left placements use direction-specific sliding transitions.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sheets.map(({ side, icon: Icon }) => (
              <Panel name={`Sheet / ${side}`} key={side}>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline"><Icon className="size-4 mr-1.5" />Open {side}</Button>
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>{side[0].toUpperCase() + side.slice(1)} sheet</SheetTitle>
                      <SheetDescription>This panel enters from the {side} edge of the viewport.</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 px-4 py-4">
                      <label className="flex items-center gap-2.5 text-xs"><Switch aria-label="Email alerts" defaultChecked />Email alerts</label>
                      <label className="flex items-center gap-2.5 text-xs"><Switch aria-label="Quiet mode" />Quiet mode</label>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild><Button>Save settings</Button></SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </Panel>
            ))}
            <Panel name="Sheet / explicit close">
              <Sheet>
                <SheetTrigger asChild><Button>Explicit close only</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Explicit close control</SheetTitle>
                    <SheetDescription>Explicit close button in footer.</SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild><Button variant="outline">Close sheet</Button></SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </Panel>
          </div>
        </Section>

        <Section index="07.2" title="Drawer" description="Bottom sliding drawer optimized for mobile interactions and gesture dismissal.">
          <div className="grid grid-cols-1 gap-4">
            <Panel name="Drawer / bottom drawer">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Set daily activity goal</DrawerTitle>
                      <DrawerDescription>Adjust your daily steps and active calories target.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 text-center">
                      <div className="text-5xl font-bold tracking-tighter">10,000</div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">Steps / day</div>
                    </div>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </Panel>
          </div>
        </Section>

        <Section index="07.3" title="Dropdown Menu & Context Menu" description="Action menus triggered by button click or pointer secondary right-click.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="DropdownMenu / actions">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm"><MoreVertical className="size-4 mr-1.5" />Options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate item</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete item</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Panel>
            <Panel name="ContextMenu / right click surface">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
                  Right-click anywhere here
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Back</ContextMenuItem>
                  <ContextMenuItem>Forward</ContextMenuItem>
                  <ContextMenuItem>Reload</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Inspect</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
