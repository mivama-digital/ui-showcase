"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@mivama/ui";

import { PageIntro, Panel, Section } from "../../_components/showcase";

export default function OverlayPrimitivesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Components / 10"
        title="Overlay primitives"
        count="3 component families"
        description="Menus, anchored popovers, and destructive confirmations built on the latest Base UI-backed Mivama primitives."
      />
      <div className="catalog">
        <Section index="10.1" title="DropdownMenu" description="A compact action menu with labels, separators, default items, and destructive actions.">
          <div className="demo-grid single">
            <Panel name="DropdownMenu / project actions">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline">Open project menu</Button>} />
                <DropdownMenuContent>
                  <DropdownMenuLabel>Project</DropdownMenuLabel>
                  <DropdownMenuItem>Edit details</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Archive project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Panel>
          </div>
        </Section>

        <Section index="10.2" title="Popover" description="Anchored contextual content uses the shared portal container and supports accessible title and description semantics.">
          <div className="demo-grid single">
            <Panel name="Popover / release status">
              <Popover>
                <PopoverTrigger render={<Button variant="outline">Open status popover</Button>} />
                <PopoverContent>
                  <PopoverTitle>Release status</PopoverTitle>
                  <PopoverDescription>The current showcase is synchronized against the latest @mivama/ui main branch.</PopoverDescription>
                </PopoverContent>
              </Popover>
            </Panel>
          </div>
        </Section>

        <Section index="10.3" title="AlertDialog" description="Confirmation dialogs make destructive decisions explicit and keep focus inside the modal interaction until resolved.">
          <div className="demo-grid single">
            <Panel name="AlertDialog / destructive confirmation">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive">Delete release</Button>} />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this release?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. The published release record will be removed.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete release</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
